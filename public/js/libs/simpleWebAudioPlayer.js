// Updated efforts by William Malone
// http://www.williammalone.com/posts/ios-9-web-audio-api-safari-mobile-issue/
// Create audio context

var webAudioPlayer = {};
if (typeof AudioContext !== 'undefined') {
  webAudioPlayer.ctx = new AudioContext();
} else if (typeof webkitAudioContext !== 'undefined') {
  webAudioPlayer.ctx = new webkitAudioContext();
}

var simpleWebAudioPlayer = function() {
  const player = {};
  const sounds = [];
  let masterGain = undefined;

  player.load = function(files) {
    const requests = [];
    for (let i = 0; i < files.length; i++) {
      const sound = files[i];
      sounds[sound.name] = sound;
      // Load the sound
      const req = new window.XMLHttpRequest();
      req.desc = sound.name;
      req.open('GET', sound.src, true);
      req.responseType = 'arraybuffer';
      onLoad(req);
      req.send();
    }

    function onLoad(req) {
      req.onload = function() {
        webAudioPlayer.ctx.decodeAudioData(req.response, function(buffer) {
          sounds[req.desc].buffer = buffer;
          if (sounds[req.desc].callback) {
            sounds[req.desc].callback();
          }
        });
      };
    }
  };

  player.play = function(name) {
    const inst = {};
    if (sounds[name]) {
      inst.source = webAudioPlayer.ctx.createBufferSource();
      inst.source.buffer = sounds[name].buffer;
      inst.source.connect(masterGain);
      inst.source.start(0);
    }
  };

  masterGain =
    typeof webAudioPlayer.ctx.createGain === 'undefined'
      ? webAudioPlayer.ctx.createGainNode()
      : webAudioPlayer.ctx.createGain();
  masterGain.gain.value = 1;
  masterGain.connect(webAudioPlayer.ctx.destination);

  return player;
};
