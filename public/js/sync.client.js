/**
 * DISCLAIMER
 * This file was created during a hackathon in the span and may not meet any standards.
 * @requires twilio-sync
 */

(function() {
  /**
   * Create Sync Client
   *
   * @param  {obj} tokenUrl Endpoint to fetch token
   * @return {Promise} Returns initialized Sync client
   * @public
   */
  Twilio.Sync.CreateClient = function(tokenUrl) {
    let syncClient;

    return new Promise(function(resolve, reject) {
      fetchAccessToken(initializeSync, resolve, reject);
    });

    /**
     * fetchAccessToken
     *
     * @param  {func} successFn On success of Promise
     * @param  {func} resolve On success callback
     * @param  {func} reject On error callback
     * @private
     */
    function fetchAccessToken(successFn, resolve, reject) {
      $.getJSON(tokenUrl || '/token', function(tokenResponse) {
        successFn(tokenResponse.token, resolve);
      }).fail(reject);
    }

    /**
     * initializeSync
     *
     * @param  {obj} token On success of Promise
     * @param  {func} resolve On success callback
     * @private
     */
    function initializeSync(token, resolve) {
      syncClient = new Twilio.Sync.Client(token);
      syncClient.on('tokenExpired', refreshToken);
      resolve(syncClient);
    }

    /**
     * refreshToken
     * Fetch new access token
     * @private
     */
    function refreshToken() {
      fetchAccessToken(setNewToken, null, function() {
        window.console.error('Could not refresh expired Sync token.');
      });
    }

    /**
     * setNewToken
     * @param  {obj} token
     * @private
     */
    function setNewToken(token) {
      syncClient.updateToken(token);
    }
  };
})();
