'use strict';

const AccessToken = require('twilio').jwt.AccessToken;
const SyncGrant = AccessToken.SyncGrant;
const cfg = require('../config');

module.exports = function(phoneNumber) {
  // Create a unique ID for the client on their current device
  const endpointId = 'CommsQuest-' + phoneNumber;

  // Create a "grant" which enables a client to use Sync as a given user,
  // on a given device
  const syncGrant = new SyncGrant({
    serviceSid: cfg.twilioSyncServiceSid,
    endpointId: endpointId,
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    cfg.twilioAccountSid,
    cfg.twilioApiKey,
    cfg.twilioApiSecret
  );

  token.addGrant(syncGrant);
  token.identity = phoneNumber;

  return {
    identity: phoneNumber,
    token: token.toJwt(),
  };
};
