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
