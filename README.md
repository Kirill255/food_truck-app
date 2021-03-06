> food_truck-app

## Start

```bash
// local
npm run dev

// when the project is deployed on the server
npm start

```

## How the project was created

### At first

* create project with `npx express-generator --no-view`
* create in project new folder `src`
* move all folders and files to src folder, except `package.json`
* renamed the `www` file in `src/bin` directory to `index.js`, because pm2 didn't work with www
* install dependencies
* create or copy from old projects `.editorconfig .gitignore README.md`

### Add babel

* add babel https://babeljs.io/docs/en/usage
* `npm install --save-dev @babel/core @babel/cli @babel/preset-env`
* create `touch babel.config.js` and add settings
* add `prestart` script to package.json `"prestart": "npm run -s build"`
* add `start` script to package.json `"start": "NODE_ENV=production & pm2 start dist/bin"`
* add `build` script to package.json `"build": "./node_modules/.bin/babel src -d dist -s -D --presets=@babel/env --delete-dir-on-start"`
* add `dev` script to package.json `"dev": "SET DEBUG=food_truck-app:* & nodemon ./src/bin/index.js"`
* add `main` section to package.json `"main": "./dist/bin/index.js"`
* `npm i -D nodemon`

### Add eslint

* add eslint https://eslint.org/docs/user-guide/getting-started
* `npm install eslint babel-eslint --save-dev`
* create `.eslintrc.js` with settings `./node_modules/.bin/eslint --init`, note: add `"root": true` and `"parser": "babel-eslint",` sections to `.eslintrc.js`
* add `lint` script to package.json `"lint": "./node_modules/.bin/eslint ./src/ *.js --fix"`


### Add middlewares

* `npm install helmet cors --save`
* add cors and helmet middlewares to app.js
* add error handler to app.js, since express-generator with flag `--no-view` doesn't create it

### Add mongoose

* `npm i mongoose -S`
* add mongoose configurations

### Add authentication

* `npm i express-jwt jsonwebtoken passport passport-local passport-local-mongoose -S`

### Deploy

[How to deploy](https://www.sitepoint.com/premium/courses/deploying-a-node-js-app-to-digitalocean-2982)
