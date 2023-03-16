const Job = require("../interfaces/job.interface");

/**
 * Creates a new job object
 *
 * @param {object} param0 The job object
 * @param {string} param0.name The name of the job
 * @param {string} param0.schedule The interval in DAYS or a cron expression to schedule the job (default: 9999 days)
 * @param {function} param0.job The function to execute when the job is scheduled
 * @param {boolean} param0.disabled (Optional) Whether the job should be disabled or not (default: false)
 * @returns
 */
function createJob({ name, schedule, job, disabled = false }) {
    if (typeof name !== "string") {
        throw new Error("The name of the job must be a string");
    }

    if (typeof schedule === "string" && schedule.length === 0) {
        throw new Error("The schedule of the job must not be empty");
    }

    if (typeof schedule === "number" && schedule <= 0) {
        throw new Error("The schedule of the job must be greater than 0");
    }

    if (typeof job !== "function") {
        throw new Error("The job must be a function");
    }

    if (typeof disabled !== "boolean") {
        throw new Error("The disabled property of the job must be a boolean");
    }

    return new Job({ name, schedule, job, disabled });
}

module.exports = createJob;
