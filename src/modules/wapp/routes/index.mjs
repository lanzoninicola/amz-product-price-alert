import express from 'express'

import healthcheck from './health-check.route.mjs'
import whatsappbot from './whatsappbot.route.mjs'

const router = express.Router()

// routes available only in production mode

const defaultRoutes = [
    {
        path: '/wapp',
        route: whatsappbot
    },
    {
        path: '/health-check',
        route: healthcheck
    }
]

defaultRoutes.forEach(route => {
    if (route.route) {
        router.use(route.path, route.route)
    }
})

// error handler, send stacktrace only during development
router.use((err, req, res, next) => {

    return res.status(500).json({
        message: err.message,
        error: err
    })

})

// routes available only in development mode

// if (config.env === 'development') {
//     const devRoutes = []

//     devRoutes.forEach(route => {
//         if (route.route) {
//             router.use(route.path, route.route)
//         }
//     })
// }

export default router
