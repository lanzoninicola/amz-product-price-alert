import axios from "axios";
import { MetodosEnvio } from "./whatsapp-bot.mjs";

/** https://developers.facebook.com/blog/post/2022/12/05/auth-tokens/ */
class WhatsappOficialController {
    token;
    url;
    myPhoneNumber;

    constructor({ token, url, myPhoneNumber }) {
        this.token = token;
        this.url = url;
        this.myPhoneNumber = myPhoneNumber;
    }

    /**
     *
     * @param {string} originPhoneNumber
     * @param {string} to
     * @param {string} message
     */
    async sendMessage(originPhoneNumber, to, message) {
        let response;
        try {
            response = await axios.post(this.url + (originPhoneNumber || this.myPhoneNumber) + '/messages', {
                messaging_product: "whatsapp", recipient_type: "individual", to: to, type: "text", //
                text: {
                    "preview_url": false, "body": message
                }
            }, {
                headers: {
                    Authorization: "Bearer " + this.token
                }, timeout: 5000
            });
        } catch (e) {
            throw new Error(e.response.data.error.message + ": " + e.response.data.error.error_data?.details);
        }
    }

    /**
     *
     * @param {string} to
     * @param {string} message
     * @param {string} fileType  "audio" | "document" | "image" | "video" | "sticker"
     * @param {string} fileURL
     * @param {string} fileName
     */
    async sendFile(to, message, fileType, fileURL, fileName) {
        try {
            let response = await axios.post(this.url + this.myPhoneNumber + '/messages', {
                messaging_product: "whatsapp", recipient_type: "individual", to: to, type: fileType, //
                image: {
                    link: fileURL,
                    caption: message
                }
            }, {
                headers: {
                    Authorization: "Bearer " + this.token
                }, timeout: 5000
            });
        } catch (e) {
            throw new Error(e.response.data.error.message + ": " + e.response.data.error.error_data?.details);
        }
    }

    /**
     *
     * @param {string} to
     * @param {object} interactiveMessage  InteractiveMessage
     */
    async sendInterativeMessage(to, interactiveMessage) {
        let response;
        try {
            response = await axios.post(this.url + this.myPhoneNumber + '/messages', {
                messaging_product: "whatsapp", recipient_type: "individual", to: to, type: "interactive", //
                interactive: interactiveMessage
            }, {
                headers: { Authorization: "Bearer " + this.token }, timeout: 5000
            });
        } catch (e) {
            throw new Error(e.response.data.error.message + ": " + e.response.data.error.error_data?.details);
        }
    }

    /**
     *
     * @param {string} phoneNumberId
     * @param {string} messageId
     */
    async markAsRead(phoneNumberId, messageId) {
        let response;
        try {
            response = await axios.post(this.url + phoneNumberId + '/messages', {
                messaging_product: "whatsapp", status: "read", message_id: messageId
            }, {
                headers: { Authorization: "Bearer " + this.token }, timeout: 5000
            });
        } catch (e) {
            console.log(e.response.data.error);
        }
    }

    /**
     *
     * @param {any} body
     */
    async webhookOnMessage(body) {
        /** webhookMessage[] */
        let messages = [];

        for (const entry of body.entry) {
            let changes = entry.changes.filter((e) => e.field == 'messages');
            for (const change of changes) {
                if (change.value.messages) {
                    for (const message of change.value.messages) {
                        let bodyText;
                        if (message.type == "interactive") {
                            if (message.interactive.type == "list_reply") {
                                bodyText = message.interactive.list_reply.id;
                            }
                        } else {
                            bodyText = message.text?.body;
                        }
                        if (!bodyText) {
                            continue;
                        }
                        messages.push({
                            phoneNumberId: change.value.metadata.phone_number_id,
                            id: message.id,
                            from: message.from,
                            author: message.from,
                            body: bodyText,
                            type: message.type,
                            notifyName: change.value.contacts[0].profile.name
                        });
                    }
                }
            }
        }

        for (const message of messages) {
            const whatsappBotController = require('./whatsapp-bot');

            await whatsappBotController.onMessageGlobal(MetodosEnvio.oficial, message);
            await this.markAsRead(message.phoneNumberId, message.id);
        }

    }

}

export default WhatsappOficialController

/**
interface InteractiveMessage {
    type: "list" | "button";
    header: HeaderObject;
    // 1024 caracteres
    body: { text: string };
    // 60 caracteres
    footer: { text: string };
    action: ActionObject;
}

interface ActionObject {
    // required if type "list"
    button: string;
    // max 10
    sections: SectionObject[];
    // required if type "buttons"
    buttons: any[];

}

interface SectionObject {
    // max 24
    title: string;
    rows: {
        // max 200
        id: string,
        // max 24
        title: string,
        // max 72
        description: string,
    }[];
}

interface HeaderObject {
    type: "text" | "video" | "image" | "document";
    text: string;
    video: any;
    image: any;
    document: any;
}


export interface webhookMessage {
    phoneNumberId: string;
    notifyName: string;
    id: string;
    type: string;
    author: string;
    from: string;
    body: string;
}

 */