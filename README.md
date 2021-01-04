# WEBITEM.JS
A library to simplify creating HTML5 Web Components (Custom Elements).

## Introduction
In modern HTML, you can create web components using [customElements.define()](https://developer.mozilla.org/en-US/docs/Web/Web_Components). This API is powerfull, but can be verbose and complicated. The _webitem.js_ library provides a wrapper around that API in an attempt to make it simple for the application's programmer.

## Install
You can use this library as either an EcmaScript module, or the old way as a script that you include in your html file.

### Install as NPM EcmaScript Module
If you plan to use this package as an NPM module:

```bash
    npm install @ahabra/webitem
```

### Install as a Script
If you plan to use this package as JS script linrary

```html
    <script src="https://raw.githubusercontent.com/ahabra/webitem/master/dist/webitem-script-min.js"></script>
```

Alternatively, you can download the file `https://raw.githubusercontent.com/ahabra/webitem/master/dist/webitem-script-min.js` and use directly. Note that there is a non-minified version at the same location.

## Usage
If you installed as an EcmaScript module
```js
import * as webitem from '@ahabra/webitem'
```

If you installed as a Script, the library is available at `window.webitem`

### Quick Code Demo

