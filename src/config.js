const path = require('path');

if (!process.env.CI) {
  require('dotenv-safe').config({
    path:
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '../.env.example')
        : undefined,
  });
}

const cfg = {};
// Set this domain to either a ngrok url or public url.
// You will receive this url in a text message to open on your phone.
cfg.domain = process.env.PUBLIC_DOMAIN || '';

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.twilioAccountSid =
  process.env.TWILIO_ACCOUNT_SID || 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
cfg.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || '1234567890abc';
cfg.twilioSyncServiceSid =
  process.env.SYNC_SERVICE_SID || 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
// A Twilio number you control - choose one from:
// Specify in E.164 format, e.g. "+16519998877"
cfg.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+15555555555';
// Twilio Api Key
// Use API Keys to sign Access Tokens, which are used by Twilio's Real-Time Communications SDKs. Access Tokens are short-lived credentials that can be distributed safely to client-side applications.
// https://www.twilio.com/console/sync/project/api-keys
cfg.twilioApiKey =
  process.env.TWILIO_API_KEY || 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
cfg.twilioApiSecret =
  process.env.TWILIO_API_SECRET || 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
// Export configuration object
module.exports = cfg;
