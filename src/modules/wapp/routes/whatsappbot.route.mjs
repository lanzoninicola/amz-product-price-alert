import express from 'express'

import { test, sendFile, sendMessage } from '../controllers/whatsapp-bot.mjs';
import whatsappOficialController from '../controllers/whatsapp-oficial.mjs'
import whatsappWppConnectController from '../controllers/whatsapp-wppconnect.mjs'

const router = express.Router();


router.get('/status', //isAuthenticated(),
    async (req, res, next) => {
        try {
            let text = "";

            res.set('Content-Type', 'text/html');

            let responseWppConnect = await whatsappWppConnectController.getStatus();
            let imgQrCodeWppConnect = `<img src="${responseWppConnect.base64Qr}" alt="">`;
            responseWppConnect.base64Qr = undefined;
            text += "<h1> WppConnect </h1>" + imgQrCodeWppConnect + '<br><br><br>' + JSON.stringify(responseWppConnect);


            res.status(200).send(text);
        } catch (err) {
            next(err);
        }
    });


router.get('/webhook', //isAuthenticated(),
    async (req, res, next) => {
        try {
            let query = req.query;
            if (query["hub.verify_token"] !== "abc123") {
                throw new Error("invalid request");
            }
            res.status(200).send(query["hub.challenge"]);
        } catch (err) {
            next(err);
        }
    });

router.post('/webhook', //isAuthenticated(),
    async (req, res, next) => {
        try {
            await whatsappOficialController.webhookOnMessage(req.body);
            res.status(200).send("");
        } catch (err) {
            next(err);
        }
    });


router.get('/test', //isAuthenticated(),
    async (req, res, next) => {
        try {
            let r = await test();
            res.status(200).json(r);
        } catch (err) {
            next(err);
        }
    });

router.post('/sendFile', // isAuthenticated(),
    async (req, res, next) => {
        try {
            let response = await sendFile(req.body.metodoEnvio, req.body.to, req.body.message, req.body.base64file, req.body.filename);
            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    });
router.post('/sendMessage', // isAuthenticated(),
    async (req, res, next) => {
        const { transport: metodoEnvio, to, message } = req.body;

        try {
            let response = await sendMessage(metodoEnvio, to, message);
            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    });


// // Catch ctrl+C
// process.on('SIGINT', function () {
//     whatsappBotController.client && whatsappBotController.client.close();
// });

export default router
