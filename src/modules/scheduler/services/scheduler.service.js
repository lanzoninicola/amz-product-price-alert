const { scheduler } = require("../lib/node-schedule");
const cronstrue = require("cronstrue");

/**
 * The service responsible for scheduling jobs
 */
class SchedulerService {
    _enabled = false;

    constructor({ jobs, logger }) {
        this._jobs = jobs || [];
        this._activeJobs = jobs.filter(j => j.disabled !== true);

        const _console = {
            info: console.info,
            error: console.error,
            warn: console.warn
        };
        this._logger = logger || _console;
    }

    /**
     * Returns the list of jobs scheduled by the scheduler service
     * @returns {array} List of jobs scheduled by the scheduler service
     * @public
     * @readonly
     */
    get jobs() {
        return this._jobs;
    }

    /**
     * Returns the list of active jobs scheduled by the scheduler service
     * @returns {array} List of active jobs scheduled by the scheduler service
     */
    get activeJobs() {
        return this._activeJobs;
    }

    /**
     * Add jobs to the scheduler service and schedule them.
     * If the scheduler is disabled, the jobs will not be scheduled
     *
     * @param {object} options Options to pass to the scheduler service
     * @param {boolean} options.printServiceStatus Whether to print the status of the scheduler service in the console
     * @param {boolean} options.printJobs Whether to print the list of jobs scheduled by the scheduler service in the console
     */
    async run(
        options = {
            printServiceStatus: true,
            printJobs: true
        }
    ) {
        if (process.env?.SCHEDULER_ENABLED === "true") {
            this.enableScheduler();
        } else {
            this.disableScheduler();
        }

        options?.printServiceStatus && this._printServiceStatus();

        if (this.isEnabled() === false) {
            return Promise.resolve(false);
        }

        try {
            await this._schedule();

            options?.printJobs && this._printJobs();
        } catch (error) {
            this._logger.error({
                message: "[SchedulerService.run()] : Error scheduling jobs",
                error: error?.message,
                stack: error?.stack
            });
        }
    }

    /**
     * Schedule all jobs added to the scheduler service
     * If the scheduler is disabled, the jobs will not be scheduled
     *
     * @returns {Promise<Job[]>} List of active jobs scheduled by the scheduler service
     * @private
     */
    _schedule() {
        return new Promise((resolve, reject) => {
            const jobs = this._activeJobs.map(job => {
                return scheduler.scheduleJob(job.name, job.schedule, job.job);
            });

            resolve(jobs);
        });
    }

    /**
     * Print the list of jobs scheduled by the scheduler service in the console
     * The string is formatted as a bullet list
     *
     * @returns {string}
     * @private
     */
    _printJobs() {
        let message = "";

        if (this.isEnabled() === false) {
            message = `[Scheduler Service]: Scheduler is disabled. No jobs scheduled`;
            console.log(message);
            return;
        }

        const bulletText = this._jobs
            .map(job => {
                return ` * ${job.name} - (${cronstrue.toString(job.schedule)})`;
            })
            .join("\n");

        if (this._jobs.length === 0) {
            message += `[Scheduler Service]: Nenhuma rotina programada`;
        } else {
            message += `[Scheduler Service]: Rotinas programadas: \n${bulletText}`;
        }

        this._logger.info(message);
    }

    /**
     * Print the status of the scheduler service in the console
     */
    _printServiceStatus() {
        this._logger.info(
            `[Scheduler Service]: Scheduler service is ${this.isEnabled() === false ? "disabled" : "enabled"
            }`
        );
    }

    /**
     * Returns true if the scheduler is enabled, false otherwise
     * @returns {boolean} true if the scheduler is enabled, false otherwise
     * @public
     */
    isEnabled() {
        return this._enabled;
    }

    /**
     * Enable the scheduler service
     * @returns {void}
     * @public
     */
    enableScheduler() {
        this._enabled = true;
    }

    /**
     * Disable the scheduler service
     * All scheduled jobs will be cleared
     * and the scheduler will not schedule any new jobs
     * until the scheduler is enabled again
     * @returns {void}
     * @public
     */
    disableScheduler() {
        this._enabled = false;
        this._jobs = [];
    }
}

/**
 * Singleton instance of the scheduler service
 * @type {SchedulerService}
 *
 * How to use:
 * 1. Import the SchedulerService in a config module (eg. "job-schedule.config.js")
 * 2. Pass the array of jobs to schedule inside the config module
 *      - A job is an object with the following properties:
 *          - name: the name of the job (eg. "my-job")
 *          - schedule: the schedule of the job (eg. 0 2 1 * *)
 *          - job: the function to execute when the job is scheduled (eg. () => console.log("my-job"))
 *          - disabled: whether the job should be disabled or not (eg. false)
 * 3. Call the run() async in the main module (eg. "app.js")
 *
 */
module.exports = SchedulerService;
