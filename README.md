# CommsQuest IV

![Node CI](https://github.com/jonedavis/twilio-commsquest/workflows/Node%20CI/badge.svg)

<img  src="https://twilio-cms-prod.s3.amazonaws.com/images/commsquest4_logo.width-808.png"  alt="CommsQuest IV"  width="808"  />

## About

A web based maze game built with Twilio and Three.js. CommsQuest IV uses your mobile phone and its accelerometer as a controller. Your mission is to escape a unique world filled with crazy passages and secret chambers!

This project was built off the [Twilio Code Exchange Node.JS GitHub template](https://github.com/twilio-labs/sample-template-nodejs/) for creating other Twilio sample/template apps. It contains a variety of features that should ideally be included in every Twilio sample app. You can use [GitHub's repository template](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) functionality to create a copy of this.

**This project was made during a hackathon, and is not meant to be used in a production environment.**

### How it works

After running the application. Enter your phone number into the webpage. You will receive a text message with a link. Click the link to sync your mobile phone with your desktop browser to control a ball to escape the labrynth.

This application is only a barebones Node.js application using Express.js. Whenever, possible we should be using this. However, if you are using a framework like React.js, Angular or similar that comes with their own standardized application structure, you should try to merge these by using the same `README` structure and test coverage, configuration etc. as this project.

## Features

- Node.js web server using [Express.js](https://npm.im/express)
- Basic web user interface using [Handlebars](https://npm.im/express-handlebars) for templating and Bootstrap for UI
- User interface to create reminders.
- Unit tests using [`mocha`](https://npm.im/mocha) and [`chai`](https://npm.im/chai)
- End to End UI testing using [Cypress](https://www.cypress.io/)
- [Automated CI testing using GitHub Actions](/.github/workflows/nodejs.yml)
- Linting and formatting using [ESLint](https://npm.im/eslint) and [Prettier](https://npm.im/prettier)
- Interactive configuration of environment variables upon running `npm run setup` using [`configure-env`](https://npm.im/configure-env)
- Project specific environment variables using `.env` files and [`dotenv-safe`](https://npm.im/dotenv-safe) by comparing `.env.example` and `.env`.
- One click deploy buttons for Heroku, Glitch and now.sh

## Set up

### Requirements

- [Node.js](https://nodejs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Twilio Account Settings

This application should give you a ready-made starting point for writing your
own appointment reminder application. Before we begin, we need to collect
all the config values we need to run the application:

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| Auth&nbsp;Token   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| Phone&nbsp;number | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |
| Sync Service Sid  | The Twilio Sync Service used to update ball movement and game state - you can [get one here](https://www.twilio.com/console/sync/services)                   |
| API Key           | Used to create an Access Token - you can [get one here](https://www.twilio.com/console/sync/project/api-keys)                                                |
| API Secret        | Part of the API Key. Used to create an Access Token - you can [get one here](https://www.twilio.com/console/sync/project/api-keys)                           |

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone git@github.com:jonedavis/twilio-commsquest.git
cd twilio-commsquest
```

2. Install dependencies

```bash
npm install
```

3. Run ngrok

```bash
ngrok http 3000
```

4. Copy the ngrok URL for next step (evironment variables)

5. Set your environment variables

```bash
npm run setup
```

See [Twilio Account Settings](#twilio-account-settings) to locate the necessary environment variables.

6. Run the application

```bash
npm start
```

Alternatively, you can use this command to start the server in development mode. It will reload whenever you change any files.

```bash
npm run dev
```

5. Navigate to [http://localhost:3000](http://localhost:3000) or your ngrok url

That's it!

### Tests

You can run the tests locally by typing:

```bash
npm test
```

### Cloud deployment

Additionally to trying out this application locally, you can deploy it to a variety of host services. Here is a small selection of them.

Please be aware that some of these might charge you for the usage or might make the source code for this application visible to the public. When in doubt research the respective hosting service first.

| Service                           |                                                                                                                                                                                                                    |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Heroku](https://www.heroku.com/) | [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)                                                                                                                                |
| [Glitch](https://glitch.com)      | [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/clone-from-repo?REPO_URL=https://github.com/jonedavis/twilio-commsquest.git) |
| [Zeit](https://zeit.co/)          | [![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/jonedavis/twilio-commsquest/tree/master)                                                                 |

## Resources

- [GitHub's repository template](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) functionality

## Contributing

This template is open source and welcomes contributions. All contributions are subject to our [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md).

[Visit the project on GitHub](https://github.com/twilio-labs/sample-template-nodejs)

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

A note on the code quality. This application was made during an allday hackathon. The quality of code may not meet your code standards. Feel free to contribute to or create issues where necessary. This project is not production ready.

No warranty expressed or implied. Software is as is.

[twilio]: https://www.twilio.com
