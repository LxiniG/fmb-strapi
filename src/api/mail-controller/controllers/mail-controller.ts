/**
 * A set of functions called "actions" for `mail-controller`
 */

export default {
  async sendMail(ctx: any) {
    try {
      // Get data from request body
      const { to, subject, text, html, from, cc, bcc, replyTo } = ctx.request.body;

      // Validate required fields
      if (!to || !subject || (!text && !html)) {
        return ctx.badRequest('Missing required fields: to, subject, and either text or html');
      }

      // Send email using Strapi's built-in email service
      await strapi.plugins['email'].services.email.send({
        to: to,
        from: from || process.env.DEFAULT_FROM_EMAIL,
        cc: cc,
        bcc: bcc,
        replyTo: replyTo,
        subject: subject,
        text: text,
        html: html || text, // Fallback to text if no HTML provided
      });

      ctx.send({
        message: 'Email sent successfully',
        data: {
          to,
          subject,
          sentAt: new Date().toISOString()
        }
      });
    } catch (error) {
      strapi.log.error('Email sending failed:', error);
      ctx.internalServerError('Failed to send email');
    }
  },

  async getEmailConfig(ctx: any) {
    try {
      const emailConfig = strapi.config.get('plugins.email') as any;
      const defaultFrom = emailConfig?.config?.settings?.defaultFrom || 'Not configured';
      const provider = emailConfig?.config?.provider || 'Not configured';

      ctx.send({
        message: 'Email configuration info',
        data: {
          provider: provider,
          defaultFrom: defaultFrom,
          environment: process.env.NODE_ENV || 'development',
          // Don't expose sensitive data like passwords/keys
        }
      });
    } catch (error) {
      strapi.log.error('Failed to get email config:', error);
      ctx.internalServerError('Failed to get email configuration');
    }
  },
};
