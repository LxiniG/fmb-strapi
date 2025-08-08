/**
 * mail-controller router
 */

export default {
    routes: [
        {
            method: 'POST',
            path: '/mail-controller/send',
            handler: 'mail-controller.sendMail',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/mail-controller/contact-form',
            handler: 'mail-controller.sendContactForm',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/mail-controller/config',
            handler: 'mail-controller.getEmailConfig',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};