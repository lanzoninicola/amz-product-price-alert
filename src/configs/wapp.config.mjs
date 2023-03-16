

const wapp = new WhatsappOficialController({
    token: process.env?.WAPP_TOKEN,
    url: process.env?.WAPP_URL,
    myPhoneNumber: process.env?.WAPP_MY_PHONE_NUMBER
})

export default wapp