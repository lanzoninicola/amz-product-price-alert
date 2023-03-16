import whatsappOficialController from './whatsapp-oficial.mjs'
import whatsappWppConnectController from './whatsapp-wppconnect.mjs';


export const MetodosEnvio = { oficial: "oficial", wppconnect: "wppconnect" }
export const MetodosEnvioArray = ["oficial", "wppconnect"];


export async function test() {
    return '';
}


/**
 *
 * @param {object} metodoEnvio MetodosEnvio
 * @param {string} to
 * @param {string} message
 * @param {string} quotedMsg
 */
export async function sendMessage(metodoEnvio, to, message, quotedMsg) {
    if (!MetodosEnvioArray.includes(metodoEnvio)) {
        throw new Error(`metodoEnvio "${metodoEnvio}" inválido`);
    }

    try {
        if (metodoEnvio == MetodosEnvio.wppconnect) await whatsappWppConnectController.sendMessage(to, message, quotedMsg);
        if (metodoEnvio == MetodosEnvio.oficial) await whatsappOficialController.sendMessage(undefined, to, message);
    } catch (e) {
        throw new Error('falha ao enviar mensagem: ' + e.message);
    }
}

export async function sendFile(metodoEnvio, to, message, base64File, fileName) {
    if (!MetodosEnvioArray.includes(metodoEnvio)) {
        throw new Error(`metodoEnvio "${metodoEnvio}" inválido`);
    }

    try {
        if (metodoEnvio == MetodosEnvio.wppconnect) await whatsappWppConnectController.sendFileFromBase64(to, message, base64File, fileName);
        if (metodoEnvio == MetodosEnvio.oficial) await whatsappOficialController.sendFileFromBase64(to, message, base64File, fileName);
    } catch (e) {
        throw new Error('falha ao enviar mensagem: ' + JSON.stringify(e));
    }
}

export async function sendImage(metodoEnvio, to, message, base64File, fileName, quotedMsg = "") {
    if (!MetodosEnvioArray.includes(metodoEnvio)) {
        throw new Error(`metodoEnvio "${metodoEnvio}" inválido`);
    }

    try {
        if (metodoEnvio == MetodosEnvio.wppconnect) await whatsappWppConnectController.sendImageFromBase64(to, message, base64File, fileName, quotedMsg);
        if (metodoEnvio == MetodosEnvio.oficial) await whatsappOficialController.sendImageFromBase64(to, message, base64File, fileName, quotedMsg);
    } catch (e) {
        throw new Error('falha ao enviar mensagem: ' + JSON.stringify(e));
    }
}

/**
 *
 * @param {object} metodoEnvio  MetodosEnvio
 * @param {object} message webhookMessage | WppConnectMessage
 */
export async function onMessageGlobal(metodoEnvio, message) {
    if (!MetodosEnvioArray.includes(metodoEnvio)) {
        throw new Error(`metodoEnvio "${metodoEnvio}" inválido`);
    }


    console.log(' <--- ' + message.from + ' : ' + message.author + "(" + message.notifyName + ")" + " -> " + message.body);
    try {
        const txt = 'Opa';
        // const txt = await this.processMessage(metodoEnvio, message.body, message.author, message.from, message.notifyName, message.id);
        if (txt) {
            await sendMessage(metodoEnvio, message.from, txt, message.id);
            console.log("---> " + txt + " -> " + message.from + ' : ' + message.author + "(" + message.notifyName + ")");
        }
    } catch (e) {
        console.log(e);
    }
}



