# Mondial Pronos

## Development

The project contains:

*   A development server (watching files)
*   jest to run unit tests (watching files)
*   eslint to run linter
*   storybook (watching files)

The development server is available at `127.0.0.1:3000`.
The storybook interface is available at `127.0.0.1:9009`.

In order to develop you can use docker-compose (you need both docker and docker-ompose):

```
docker-compose run dev npm install  # Dependencies installation
docker-compose up dev test storybook
```

Or if you have nodejs installed on your computer, you can use npm:

```
npm install
npm dev
npm test
npm run lint
npm run storybook
```

### firebase

A firebase functions development env is available.

Before to use it you need to generate a login file:

```
docker-compose -v ~/.config/configstore/:/root/.config/configstore/ run firebase sh -c "firebase login --no-localhost"
mkdir -p ~/.config/configstore/@google-cloud/functions-emulator
echo '{"bindHost": "0.0.0.0"}' > ~/.config/configstore/@google-cloud/functions-emulator/config.json
```

Then you can use the service: `docker-compose up firebase`.

The api is available at `http://localhost:5000/mondial-pronos/us-central1/api/graphql`.

The web ui (graphiql) is available at `http://localhost:5000/mondial-pronos/us-central1/api/graphiql`.
