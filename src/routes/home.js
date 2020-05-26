'use strict';

const express = require('express');
const isCallerMobile = require('../libs/mobileDetection');
const sendMessage = require('../libs/sendMessage');
const getToken = require('../libs/accessToken');

/* eslint-disable new-cap */
const router = express.Router();

// GET: /
router.get('/', (req, res, next) => {
  const isMobile = isCallerMobile(req);

  if (!isMobile) {
    res.render('index', {
      title: 'CommsQuest IV',
      scripts: [
        'js/libs/jquery.keyframes.min.js',
        'js/libs/Box2dWeb.min.js',
        'js/sync.client.js',
        'js/desktop.utils.js',
        'js/desktop.validation.js',
        'js/desktop.maze.js',
        'js/desktop.js',
      ],
    });
  } else {
    res.render('layouts/mobile', {
      title: 'CommsQuest IV',
    });
  }
});

// GET: /token
router.get('/token/:phoneNumber', (req, res, next) => {
  sendMessage(req.params.phoneNumber);
  // Serialize the token to a JWT string and include it in a JSON response
  res.send(getToken(req.params.phoneNumber));
});

// GET: /token-mobile
router.get('/token-mobile/:phoneNumber', (req, res, next) => {
  // Serialize the token to a JWT string and include it in a JSON response
  res.send(getToken(req.params.phoneNumber + '-mobile'));
});

// GET: /game
router.get('/game/:phoneNumber', (req, res, next) => {
  res.render('layouts/controller', {
    title: 'CommsQuest IV - Controller',
    phoneNumber: req.params.phoneNumber,
    scripts: [
      '../js/libs/gyro.js',
      '../js/libs/simpleWebAudioPlayer.js',
      '../js/sync.client.js',
      '../js/mobile.js',
    ],
  });
});

module.exports = router;
