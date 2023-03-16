const scheduler = require("node-schedule");

const ruleBuilder = scheduler.RecurrenceRule();

module.exports = { scheduler, ruleBuilder };
