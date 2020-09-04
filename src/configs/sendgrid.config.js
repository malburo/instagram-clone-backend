const sgMail = require('@sendgrid/mail');

function config() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

module.exports = { config };
