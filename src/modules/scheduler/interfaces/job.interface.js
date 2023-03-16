class Job {
    constructor({
        name = "",
        schedule = 9999,
        job = () => {},
        disabled = false
    }) {
        this.name = name;

        if (typeof schedule === "string" && Number.isNaN(Number(schedule))) {
            this.schedule = schedule;
        } else {
            this.schedule = this.setIntervals(schedule);
        }
        this.job = job;
        this.disabled = disabled;
    }

    /**
     * Returns a cron expression for a job that runs every X days
     * By default, the job will run at 2am
     *
     * @param {number} days
     * @returns {string}
     * @public
     */
    setIntervals(days) {
        const interval = days || 9999;

        return `0 2 */${interval} * *`;
    }
}

module.exports = Job;
