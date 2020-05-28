/**
 * DISCLAIMER
 * This file was created during a hackathon in the span and may not meet any standards.
 */

(function() {
  // audio player for Android & iOS
  // TODO: Dated we don't need to use simpleWebAudioPlayer anymore.
  // eslint-disable-next-line
  const audioPlayer = new simpleWebAudioPlayer();
  let isGamePaused = false;
  let timeInterval = undefined;

  audioPlayer.load([
    {
      name: 'collision',
      src: '/audio/collision.mp3',
    },
    {
      name: 'positive',
      src: '/audio/positive.mp3',
    },
    {
      name: 'win',
      src: '/audio/win.mp3',
    },
  ]);

  /**
   * Kick the game UI off.
   * @param {string} a joke.
   * @return {void}
   */
  function startGame() {
    audioPlayer.play('positive');
    $('#controller-tips').hide();
    $('#controller-controls').show();
    // 3:00 countdown
    startTimer(3 * 60);
  }

  /**
   * Show end of game screen.
   * @return {void}
   */
  function showEndOfGameControls() {
    // Stop the timer
    clearTimeout(timeInterval);
    // Play winning sound
    audioPlayer.play('win');
    // Toggle UI Controls
    $time.hide();
    $twilioLogo.show();
    $btnLearnAbout.show();
    $pauseButton.hide();
  }

  /**
   * Start countdown timer.
   * @param {number} duration number of seconds for timer
   * @return {void}
   */
  function startTimer(duration) {
    let timer = duration;
    let minutes = undefined;
    let seconds = undefined;
    timeInterval = setInterval(function() {
      if (!isGamePaused) {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        $time.text(minutes + ':' + seconds);
        timer--;

        if (timer < 10 && !$time.hasClass('redish')) {
          // Add some danger
          $time.addClass('redish');
        }

        if (timer < 0) {
          clearTimeout(timeInterval);
          isGamePaused = true;
          // Pause game at end of timer
          showEndOfGameControls();
        }
      }
    }, 1000);
  }

  /**
   * Trigger vibration
   * Only works on Chrome
   * @param {number|number[]} value
   */
  function triggerVibration(value) {
    if ('vibrate' in window.navigator) {
      window.navigator.vibrate(value);
    }
  }

  /**
   * Check if android. We inverse coordinate system for android device
   * @return {void}
   */
  function isAndroidDevice() {
    let isAndroid = false;
    if (navigator != undefined && navigator.userAgent != undefined) {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('android') > -1) {
        isAndroid = true;
      }
    }
    return isAndroid;
  }

  $(function() {
    let syncClient;
    let gameStateDoc;
    let controllerStateDoc;
    const gyroData = { x: 0, y: 0 };
    // Flip coordinate system if android device
    const coordinateSystem = isAndroidDevice() ? -1 : 1;
    $pauseButton = $('#btnPause');
    // const pauseState = 'PAUSE_STATE';
    // Server url to request for an auth token
    const url = '/token-mobile/' + phoneNumber;
    $('#controller-controls').hide();
    $time = $('#time');
    $twilioLogo = $('#twilio-logo');
    $btnLearnAbout = $('#btnLearnAbout').hide();

    // Setup button click event
    $('#btnReady').on('click', function() {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // iOS 13+
        DeviceMotionEvent.requestPermission()
          .then(response => {
            if (response == 'granted') {
              window.addEventListener('devicemotion', e => {
                // do something with e
              });
            }
          })
          .catch(console.error);

        DeviceOrientationEvent.requestPermission()
          .then(response => {
            if (response == 'granted') {
              window.addEventListener('deviceorientation', e => {
                // do something
              });
            }
          })
          .catch(console.error);
      } else {
        // non iOS 13+
      }

      startGame();
    });

    // Setup pause button events
    $pauseButton.on('click', function() {
      togglePauseState();
      const text = isGamePaused ? '(UNPAUSE)' : '(PAUSE)';
      $pauseButton.text(text);
      setPauseState();
    });

    /**
     * Set gyro data
     *
     * @param {obj} data gyro data from accelerometer
     * @return {void}
     */
    function setGyro(data) {
      gyroData.x = coordinateSystem * data.x;
      gyroData.y = coordinateSystem * data.y;
    }

    /**
     * Toggle Pause State
     * @return {void}
     */
    function togglePauseState() {
      isGamePaused = !isGamePaused;
    }

    /**
     * Send pause state top Sync
     * @return {void}
     */
    function setPauseState() {
      // Send it to the Desktop
      gyroData.isGamePaused = isGamePaused;
      controllerStateDoc.set(gyroData);
    }

    // Get a Sync client (with auth token from provided url)
    // eslint-disable-next-line
    Twilio.Sync.CreateClient(url).then(function(client) {
      syncClient = client;

      // Setup the game state document
      syncClient.document('game-state-' + phoneNumber).then(function(doc) {
        gameStateDoc = doc;

        // Listen for changes in the game state to update the mobile UI
        gameStateDoc.on('updated', function(data) {
          // Check if game is over
          if (data.value.isGameOver) {
            showEndOfGameControls();
          }
        });

        // Setup the controller state document
        syncClient
          .document('controller-state-' + phoneNumber)
          .then(function(ctrlDoc) {
            let beta = 0;
            let gamma = 0;
            controllerStateDoc = ctrlDoc;
            // Set frequency of updates to 100ms
            gyro.frequency = 100;
            // Fire up the gyro tracking
            gyro.startTracking(function(axis) {
              // Don't send gryo data to Sync if paused
              if (!isGamePaused) {
                // Return if gyroscope is steady
                beta = Math.floor(Math.abs(axis.beta));
                gamma = Math.floor(Math.abs(axis.gamma));
                if (beta === 0 && gamma === 0) return;

                setGyro(axis);

                // Send only what we use of the gyro data to Sync
                controllerStateDoc.set(gyroData);
              }
            });
          });

        // Wall collisions from game
        syncClient
          .list('wall-collision-list-' + phoneNumber)
          .then(function(wallCollisionList) {
            wallCollisionList.on('itemAdded', function(collisionItem) {
              const collisionImpulse = collisionItem.value.impulse;

              // These ranges can be tweaked
              if (collisionImpulse >= 1.2 && collisionImpulse < 1.5) {
                triggerVibration(100);
              } else if (collisionImpulse >= 1.5 && collisionImpulse < 1.9) {
                triggerVibration(200);
              } else if (collisionImpulse >= 2.0) {
                triggerVibration(300);
              }

              // Trigger the sound
              audioPlayer.play('collision');

              wallCollisionList.remove(collisionItem.index);
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    });
  });
})();
