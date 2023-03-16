const SchedulerService = require("./scheduler.service");

describe("Scheduler Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // it("should run the _schedule() method if the env var SCHEDULER_ENABLED is 'true'", async () => {
    //     process.env.SCHEDULER_ENABLED = "true";
    //     const schedulerService = new SchedulerService({ jobs: [] });

    //     const _schedule = jest.spyOn(schedulerService, "_schedule");

    //     await schedulerService.run([], {
    //         printServiceStatus: false,
    //         printJobs: false
    //     });

    //     expect(_schedule).toHaveBeenCalledTimes(1);
    // });

    // it("should not run the _schedule() method if the env var SCHEDULER_ENABLED is 'false'", async () => {
    //     process.env.SCHEDULER_ENABLED = "false";
    //     const schedulerService = new SchedulerService({ jobs: [] });

    //     const _schedule = jest.spyOn(schedulerService, "_schedule");

    //     await schedulerService.run([], {
    //         printServiceStatus: false,
    //         printJobs: false
    //     });

    //     expect(_schedule).toHaveBeenCalledTimes(0);
    // });

    // it("should not run the _schedule() method if the env var SCHEDULER_ENABLED is undefined", async () => {
    //     if (process.env.SCHEDULER_ENABLED) {
    //         delete process.env.SCHEDULER_ENABLED;
    //     }
    //     const schedulerService = new SchedulerService({ jobs: [] });

    //     const _schedule = jest.spyOn(schedulerService, "_schedule");

    //     await schedulerService.run([], {
    //         printServiceStatus: false,
    //         printJobs: false
    //     });

    //     expect(process.env.SCHEDULER_ENABLED).toBeUndefined();
    //     expect(_schedule).toHaveBeenCalledTimes(0);
    // });

    // it("should not schedule a job if the job is disabled", async () => {
    //     process.env.SCHEDULER_ENABLED = "true";
    //     const schedulerService = new SchedulerService({ jobs: [] });

    //     await schedulerService.run(
    //         [
    //             {
    //                 name: "test-job",
    //                 schedule: "0 * * * *",
    //                 job: () => {},
    //                 disabled: true
    //             }
    //         ],
    //         {
    //             printServiceStatus: false,
    //             printJobs: false
    //         }
    //     );

    //     expect(schedulerService._jobs).toHaveLength(0);
    // });

    // it("should schedule a job if the disable prop is undefined ", async () => {
    //     process.env.SCHEDULER_ENABLED = "true";
    //     const schedulerService = new SchedulerService({
    //         jobs: [
    //             {
    //                 name: "test-job",
    //                 schedule: "0 * * * *",
    //                 job: () => {}
    //             },
    //             {
    //                 name: "test-job",
    //                 schedule: "0 * * * *",
    //                 job: () => {},
    //                 disabled: true
    //             }
    //         ]
    //     });

    //     schedulerService._schedule = jest.fn();

    //     await schedulerService.run({
    //         printServiceStatus: false,
    //         printJobs: false
    //     });

    //     expect(schedulerService.jobs).toHaveLength(2);
    //     expect(schedulerService.activeJobs).toHaveLength(1);
    //     expect(schedulerService._schedule).toHaveBeenCalledTimes(1);
    // });

    it("should thrown an error if a job is misconfigured ", async () => {
        process.env.SCHEDULER_ENABLED = "true";
        const schedulerService = new SchedulerService({
            jobs: [
                {
                    name: "test-job",
                    schedule: 123456,
                    job: () => {}
                }
            ]
        });

        await schedulerService
            .run({
                printServiceStatus: false,
                printJobs: false
            })
            .then(() => {
                console.log("then");
            })
            .catch(err => {
                console.log("catch");
                console.log(err);
            });

        // expect(schedulerService.jobs).toHaveLength(2);
        // expect(schedulerService.activeJobs).toHaveLength(1);
        // expect(schedulerService._schedule).toHaveBeenCalledTimes(1);
    });
});
