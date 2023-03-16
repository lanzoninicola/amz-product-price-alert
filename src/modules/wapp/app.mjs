import express from "express";
import cors from "cors";
import config from "../../configs/wapp-rest.config.mjs";
import globalLimiter from "./middlewares/rate-limiter.mjs";
import helmet from 'helmet';
import routes from './routes/index.mjs';

const app = express();

app.disable('x-powered-by');

app.use(helmet())

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded());

// enable cors
app.use(
    cors({
        origin: "*",
        methods: "GET,POST",
        allowedHeaders: "Authorization,Content-Type"
    })
);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
    app.use("/api", globalLimiter);
}

app.set('case sensitive routing', false);

app.use("/api", routes);

export default app;


// process.on('SIGTERM', _gracefulShutdown);
// process.on('SIGINT', _gracefulShutdown);
//
// function _gracefulShutdown() {
//     console.info('Graceful shutdown start', new Date().toISOString());
//     server.close(() => {
//         console.info('Graceful shutdown end', new Date().toISOString());
//         process.exit(128 + 1);
//     });
// }
//export default app;
