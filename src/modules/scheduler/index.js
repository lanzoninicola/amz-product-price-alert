/** The service responsible for scheduling jobs */
const SchedulerService = require("../scheduler/services/scheduler.service");
const createJob = require("../scheduler/factories/create-job.factory");
const { ruleBuilder } = require("../scheduler/lib/node-schedule");
const {
    everyday,
    everymonth,
    everyDays,
    everyHours,
    everyMinutes,
    everySeconds
} = require("./utils");

module.exports = {
    SchedulerService,
    // this is a factory function, it is exported to help the user create the job
    createJob,
    ruleBuilder,
    everyday,
    everymonth,
    everyDays,
    everyHours,
    everyMinutes,
    everySeconds
};
