import { SchedulerService } from "../modules/scheduler";


const scheduler = new SchedulerService({
    jobs: [],
    logger: console,
})

export default scheduler