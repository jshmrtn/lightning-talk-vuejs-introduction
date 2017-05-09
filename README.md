# Lightning Talk: VueJS Introduction (10.05.2017)

## Getting started

Clone the repo & run `yarn install` from the project root

## Available commands

```shell
yarn start
```

Runs the Webpack module-bundler, starts watching for changes & launches the BrowserSync server to [http://localhost:3000](http://localhost:3000).

**Note!** Webpack handles all the reloading stuff while BrowserSync just proxies the default webpack-port, giving the possibility to connect to dev-server from multiple devices.

---

```shell
yarn test
```

Runs all tests. This includes linting of JavaScript files an all unit and integration tests.
See [Testing](#Testing) for more information on tests.

---

```shell
yarn run build
```

Runs the webpack module-bundler with production-settings (compress etc.) and builds the project to the `/dist` directory.
