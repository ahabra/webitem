# webitem.js
A library to make it easy to create HTML5 Custom Elements

## Project Directory Structure

1. The root of the project conatins these files
    1. `.eslintrc`: ES Lint customized rules
    2. `.gitignore`: List of files to be ignored by git
    3. `package.json`, `package-lock.json`: NPM package definition.
    4. `README.md`: This file.
    5. `web-test-runner.config.mjs`: web-test-runner configuration using Puppeteer headless.
2. `scripts/` directory: Contains build scripts.
3. `src/` directory: Contains the application's source, including js, html, css, images, ...
4. `target/` directory: Will be generated after the first build. Contains build-generated files and directories:
    1. `coverage/` directory: Will be generated after the first test run. Contains test coverage report
    2. `out/` directory: Contains the distribution files
5. `dist/` directory: Contains the distribution files:
    1. `webitem-esm.js`: The library packaged as an EcmaScript module. Does not include dependent packages as they should be added by your app's bundler.
    2. `webitem-script.js`: The library packaged inclusion as a browser script. Will add `webitem` variable to the browser `window` object. Includes all required dependencies.
    3. `webitem-script.js`: A minimized version of webitem-script.js


