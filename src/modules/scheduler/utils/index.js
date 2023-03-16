/**
 * Returns a cron expression for a job that runs every day at 2am
 *
 * @param {*} options
 * @returns
 */
function everyday(
    options = {
        hour: 2
    }
) {
    return `0 0 ${options.hour} * * ?`;
}

/**
 * * Returns a cron expression for a job that runs every month
 *
 * @param {object} options
 * Options for the schedulation cron expression
 * - param {number} options.day - The number of the day of month to run the job (default: 1)
 * @returns
 */
function everymonth(months, options = { day: 1 }) {
    return `0 0 12 ${options.day} * ?`;
}

/**
 * Returns a cron expression for a job that runs every X days
 *
 * @param {number} days - The interval in DAYS or a cron expression to schedule the job (default: 9999 days)
 * @param {object} options
 * Options for the schedulation cron expression
 * - param {number} options.hour - The hour to run the job (default: 2)
 * @returns
 */
function everyDays(
    days,
    options = {
        hour: 2
    }
) {
    return `0 ${options.hour} */${days} * *`;
}

/**
 * Returns a cron expression for a job that runs every X minutes
 *
 * @param {number} minutes - The interval in MINUTES or a cron expression to schedule the job (default: 30 minutes)
 * @returns
 */
function everyMinutes(minutes = 30) {
    return `0 */${minutes} * ? * *`;
}

/**
 * Returns a cron expression for a job that runs every X seconds
 *
 * @param {number} seconds - The interval in SECONDS or a cron expression to schedule the job (default: 10 seconds)
 * @returns
 */
function everySeconds(seconds = 10) {
    return `0/${seconds} * * ? * *`;
}

/**
 * Returns a cron expression for a job that runs every X hours
 *
 * @param {number} hours - The interval in HOURS or a cron expression to schedule the job (default: 9999 days)
 * @returns
 */
function everyHours(hours) {
    return `0 */${hours} * * *`;
}

module.exports = {
    everyday,
    everymonth,
    everyDays,
    everyHours,
    everyMinutes,
    everySeconds
};
