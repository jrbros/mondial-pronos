# Mondial Pronos

## Development

The project contains multiple development services:

*   a development server (watching files)
*   jest to run unit tests (watching files)
*   eslint to run linter
*   storybook (watching files)
*   a firebase development server

You can launch these services with docker-compose, but you can also use directly npm (if you have the good npm versions).

**With docker-compose**

First of all you need to install `node_modules`:
`docker-compose run dev npm install`

Then you can launch the services: `docker-compose up` (or `docker-compose up dev test lint storybook firebase`)

**With npm**

First of all you need to install `node_modules`: `npm install`

Then you can launch the npm scripts:

````
npm start
npm test
npm run lint
npm run storybook
```

### development

You can launch the development server like that `docker-compose up dev` or `npm start`.

The webapp is available at `127.0.0.1:3000` and watch files in `src/` folder.

### storybook

You can launch the storybook server like that `docker-compose up storybook` or `npm run storybook`.

The storybook interface is available at `127.0.0.1:9009`.

Stories are written in `src/__stories__/`.

### test

You can launch the unit tests (using jest) like that `docker-compose up test` or `npm test`.

The tests used snapshots and watch files.

Tests are written in `src/__tests__/`.

If you need to rebuild snapshots, use `npm run dev` then press `u`.


### firebase

A firebase functions development env is available.

Before to use it you need to generate a login file:

```
docker-compose run -v ~/.config/configstore/:/root/.config/configstore/ firebase sh -c "npm i -g firebase-tools && firebase login --no-localhost"
mkdir -p ~/.config/configstore/@google-cloud/functions-emulator
echo '{"bindHost": "0.0.0.0"}' > ~/.config/configstore/@google-cloud/functions-emulator/config.json
```

Then you can use the service: `docker-compose up firebase`.

The api is available at `http://localhost:5000/mondial-pronos/us-central1/api/graphql`.

The web ui (graphiql) is available at `http://localhost:5000/mondial-pronos/us-central1/api/graphiql`.
````
