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
This example shows how to create a bare-bone web item, it creates a Web Component named `bare-bone` which you can use in the html code.

```js
import * as webitem from '@ahabra/webitem'
// or use window.webitem if you are using the script.

webitem.defineElement({
  nameWithDash: 'bare-bone',
  html: `
    <div style="background-color:green">
      <h3>Bare-Bone Web Item</h3>
    </div>
  `
})
```

```html
<!-- Put this in your .html file>
<bare-bone></bare-bone>
```

### API
This library consists of a single function `defineElement(object)`. It accepts a single argument object with the following keys:

1. `nameWithDash`: Required, String. Name of the web component. Must contain the dash '`-`' character within the name.
2. `html`: Optional, String or Function. The HTML content of the web component.
    1. When `html` is a string, it is the literal html of the compnent.
    2. When `html` is a function, the function will have this signature:
    `(webitem) => string`. Look down for an example ????
3. `css`: Optional, String. The CSS to apply on the web component. This CSS will be name-spaced within the component, and is not visible outside it.
4. `propertyList`: Optional, Array of objects. Objects defining properties of the component. Each property definition consists of `{name, value, [sel], [attr]}`.
    1. `name`: Name of the property
    2. `value`: Initial value of the property
    3. `sel`: Optional, String. A CSS selector that binds the property to a DOM element in the component
    4. `attr`: Optional, String. An attribute on the DOM element to bind its value.
5. `eventHandlerList`: Optional, Array of objects. Objects define event handlers of the component. Each event handler definition consists of `{sel, eventName, listener}`.
    1. `sel`: A CSS selector of an element in the component
    2. `eventName`: Name of the event to bind to.
    3. `listener`: A function to be called when the event occure. The function accepts two arguments, `event` which is an event object, and `webitem` which is the web component.
6. `display`: Optional, String. A CSS display attribute. A possible value can be  `inline` (default if missing), `inline-block`, `block`. This controls how the component will be displayed inside its container.

### Examples
TODO???

