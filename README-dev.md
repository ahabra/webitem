# webitem.js Developer's Info
A library to make it easy to create HTML5 Custom Elements.
This file contains info to help the developer of the library.


## Project Directory Structure

1. The root of the project conatins these files
    1. `.ackrc`: Config for [Ack](https://beyondgrep.com/) grep tool
    2. `.editorconfig`: Config for [EditorConfig](https://editorconfig.org/)
    3. `.eslintrc`: ES Lint customized rules
    4. `.gitignore`: List of files to be ignored by git
    5. `.npmrc`: Configuration for npm.
    6. `LICENSE`: License file, usaing Apache v 2.0
    7. `package.json`, `package-lock.json`: NPM package definition.
    8. `README.md`: Info about using the library.
    9. `README-dev.md`: This file.
    10. `web-test-runner.config.mjs`: web-test-runner configuration using Puppeteer headless.
2. `scripts/` directory: Contains build scripts.
3. `src/` directory: Contains the application's source, including js, html, css, images, ...
4. `target/` directory: Will be generated after the first build. Contains build-generated files and directories:
    1. `coverage/` directory: Will be generated after the first test run. Contains test coverage report
    2. `out/` directory: Contains the output of the build
5. `dist/` directory: Contains the distribution files:
    1. `webitem-esm.js`: The library packaged as an EcmaScript module. Does not include dependent packages as they should be added by your app's bundler.
    2. `webitem-script.js`: The library packaged inclusion as a browser script. Will add `webitem` variable to the browser `window` object. Includes all required dependencies.
    3. `webitem-script.js`: A minimized version of webitem-script.js


## Running From The Command Line

Please look at `package.json` scripts section for a quick look at the supported commands.

### Setup
After you clone this repo to your local machine:

```bash
cd esbuild-project-starter
npm ci
```

The above will download the `node_modules` dependencies of this project without modifying `package-lock.json`.

### Building

Remove build artifacts. Will remove the `target/` and `dist` directories.
```bash
npm run clean
```

Create bundle in `target/out/` and copy distibution files to `dist/`
```bash
npm run build
```

### Run a local dev web server
```bash
npm run server
```

The root directory of the server will be the `target/` directory. It will recreate the bundle for every `*.html` file request. Note that `esbuild` is a very fast bundler, so re-bundling should not slow down you page requests.

### Run Tests
Test files names should follow the pattern `*.test.js`. Look at `src/utils/test/` for examples.

Run all test. Will generate a coverage report in `target/coverage/lcov-report/index.html`
```bash
npm run test
```

Run test watcher:
```bash
npm run test:watch
```

### Run Linter
```bash
npm run lint
```


## Dependencies
* esbuild: https://esbuild.github.io/
* Web Test Runner: https://modern-web.dev/docs/test-runner/overview/
* Chai: https://www.chaijs.com/api/bdd/
* ESLint: https://eslint.org/docs/rules/
* serve: https://www.npmjs.com/package/serve
