import { Whatsapp } from "@wppconnect-team/wppconnect";
import { MetodosEnvio, onMessageGlobal } from "./whatsapp-bot.mjs";
import config from "../../../configs/wapp-rest.config.mjs";

import wppconnect from '@wppconnect-team/wppconnect';

class WhatsappWppConnectController {
    /**
     * @type {Whatsapp | any}
     */
    client;
    /**
     * @type {string | any}
     */
    base64Qr;
    /**
     * @type {number | any}
     */
    attempts;


    constructor() {
        // if (process.env.BOT_ENABLE_WPP_CONNECT !== "true") return;

        wppconnect.create({
            session: 'fralda',
            puppeteerOptions: { args: ['--no-sandbox'] },
            catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
                this.base64Qr = base64Qr;
                this.attempts = attempts;
            },
            autoClose: false
        }).then((client) => {
            this.client = client;
            this.client.onMessage(async (message) => {

                // if (config.env == "development") {
                //     if ((message.author || message.from) !== "554691052049@c.us") {
                //         return;
                //     }
                // }

                // sem await mesmo
                this.client.startTyping(message.from).then().catch();

                try {
                    // @ts-ignore
                    if (message['listResponse']?.singleSelectReply) {
                        // @ts-ignore
                        message.body = message['listResponse'].singleSelectReply.selectedRowId;
                    }


                    await onMessageGlobal(MetodosEnvio.wppconnect, message);

                } catch (e) {
                    console.log(e);
                } finally {
                    this.client.stopTyping(message.from).then().catch();
                }
            });
        }).catch((erro) => {
            console.log(erro);
        });
    }

    async getStatus() {
        return {
            base64Qr: this.base64Qr,
            attemps: this.attempts,
            client: this.client && await this.client.getConnectionState()
        }
    }

    /**
     *
     * @param {string} to
     * @param {string} message
     * @param {string} quotedMsg
     */
    async sendMessage(to, message, quotedMsg) {
        let status = await this.getStatus();
        if (!status.client) {
            throw new Error('wpp não conectado.');
        }
        await this.client.sendText(to, message, { quotedMsg: quotedMsg });
    }

    /**
     *
     * @param {string} to
     * @param {object} listMessageOptions  ListMessageOptions
     */
    async sendInterativeMessage(to, listMessageOptions) {
        let status = await this.getStatus();
        if (!status.client) {
            throw new Error('wpp não conectado.');
        }
        await this.client.sendListMessage(to, listMessageOptions);
    }


    async sendFileFromBase64(to, message, base64File, fileName) {
        let status = await this.getStatus();
        if (!status.client) {
            throw new Error('wpp não conectado.');
        }
        await this.client.sendFile(to, base64File, { type: "document", filename: fileName, caption: message });
    }

    async sendImageFromBase64(to, message, base64File, fileName, quotedMsg = "") {
        let status = await this.getStatus();
        if (!status.client) {
            throw new Error('wpp não conectado.');
        }
        await this.client.sendImageFromBase64(to, base64File, fileName, message, quotedMsg);
    }
}

export default new WhatsappWppConnectController();
