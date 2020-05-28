module.exports = function sendMessage(to) {
  const cfg = require('../config');
  const client = require('twilio')(cfg.accountSid, cfg.authToken);

  const sms = {
    body: 'Tap the link to begin your quest!\n' + cfg.domain + '/game/' + to,
    to,
    from: cfg.twilioPhoneNumber,
  };

  client.messages.create(sms, function(err, message) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent: ${message.sid}`);
    }
  });
};
