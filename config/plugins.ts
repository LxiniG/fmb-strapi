export default ({ env }) => ({
    upload: {
        config: {
            sizeLimit: 2147483648, // Default 2GB for video uploads
            breakpoints: {
                xlarge: 1920,
                large: 1000,
                medium: 750,
                small: 500,
                xsmall: 64
            },
        },
    },
    email: {
        config: {
            provider: 'sendmail', // For production, use 'smtp', 'sendgrid', or other providers
            providerOptions: {
                dkim: {
                    privateKey: env('DKIM_PRIVATE_KEY'),
                    keySelector: env('DKIM_KEY_SELECTOR'),
                },
            },
            settings: {
                defaultFrom: env('DEFAULT_FROM_EMAIL', 'no-reply@strapi.com'),
            },
        },
    },
    // Uncomment and configure for SMTP (production)
    // email: {
    //   config: {
    //     provider: 'smtp',
    //     providerOptions: {
    //       host: env('SMTP_HOST', 'localhost'),
    //       port: env('SMTP_PORT', 587),
    //       auth: {
    //         user: env('SMTP_USERNAME'),
    //         pass: env('SMTP_PASSWORD'),
    //       },
    //       // secure: false, // true for 465, false for other ports
    //     },
    //     settings: {
    //       defaultFrom: env('DEFAULT_FROM_EMAIL'),
    //       defaultReplyTo: env('DEFAULT_REPLY_TO_EMAIL'),
    //     },
    //   },
    // },
});
