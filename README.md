# WEBITEM.JS
A library to simplify creating HTML5 Web Components (Custom Elements).

## Introduction
In modern HTML, you can create web components using [customElements.define()](https://developer.mozilla.org/en-US/docs/Web/Web_Components). This API is powerfull, but can be verbose and complicated. The _webitem.js_ library provides a wrapper around that API in an attempt to make it simple for the application's programmer.

The size of this library, minified and zipped is about 2KB.

## Install
You can use this library as either an EcmaScript module, or the old way as a script which you include in your html file.

### Install as NPM EcmaScript Module
If you plan to use this package as an NPM module:

```bash
    npm install @ahabra/webitem
```

### Install as a Script
If you plan to use this package as a JS script library

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
<!-- Put this in your .html file -->
<bare-bone></bare-bone>
```

### API
This library consists of a single function `defineElement(object)`. It accepts a single argument object with the following keys:

1. `nameWithDash`: Required, String. Name of the web component. Must contain the dash/hyphen '`-`' character within the name. This is required by the browser's API.
2. `html`: Optional, String or Function. The HTML content of the web component.
    1. When `html` is a string, it is the literal html of the compnent.
    2. When `html` is a function, the function will have this signature:
    `(webitem) => string`. Look down for an example.
3. `css`: Optional, String. The CSS to apply on the web component. This CSS will be name-spaced within the component, and is not visible outside it.
4. `propertyList`: Optional, Array of objects. Objects defining properties of the component. Each property definition consists of `{name, value, [sel], [attr]}`.
    1. `name`: Name of the property.
    2. `value`: Initial value of the property.
    3. `sel`: Optional, String. A CSS selector that binds the property to a DOM element in the component.
    4. `attr`: Optional, String. An attribute on the DOM element to bind its value.
5. `eventHandlerList`: Optional, Array of objects. Objects define event handlers of the component. Each event handler definition consists of `{sel, eventName, listener}`.
    1. `sel`: A CSS selector of an element in the component.
    2. `eventName`: Name of the event to bind to, e.g. `click`.
    3. `listener`: A function to be called when the event occures. The function accepts two arguments, an [event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object, and `webitem` which is the web component.
6. `display`: Optional, String. A CSS display attribute. A possible value can be  `inline` (default if missing), `inline-block`, `block`. This controls how the component will be displayed inside its container.

## Examples
There is a full set of examples in the repo's `src/` directory in both `index.html` and `test/webitem.test.js`. Next we will show some as well.

### Provide html as a function
This example shows how to provide the html content of the component as a function. The function takes the comonent itself as an argument and returns a string representing the html of the component.

This approach allows you to introspect the definition of the element as given on the page.

```js
webitem.defineElement({
  nameWithDash: 'wi-t3',
  html: el => {
    // el references the instance of the web component
    const h = el.innerHTML   // Hello
    const attr = el.getAttribute('at1') // world
    return `
      <div style="background-color:green">
        <h3>${h}</h3>
        at1: ${attr}
      </div>
    `
  }
})
```

```html
<wi-t3 at1="world">Hello<wi-t3>
```

Notice how you can access the data in the component's instance.

### Bound Properties
One of the distinct features of this library is the ability to bind properties to DOM elements within the component. Consider this example:

```js
webitem.defineElement({
  nameWithDash: 'wi-t5',
  html: `
    <h3>wi-t5 - Bound Properties</h3>
    In the browser's console, inspect $('wi-t5').properties
    <p>Country: <input id="country" type="text"></p>
    <p>Capital: <input id="capital" type="text"></p>
  `,
  propertyList: [
    {name: 'country', value:'Syria', sel: '#country'},
    {name: 'capital', value:'Damascus', sel:'#capital'},
    {name: 'style', value:'color:green', sel:'h3', attr:'style'}
  ]
})
```

```html
<wi-t5 id="bounded"></wi-t5>
```

_Note: The `$()` function listed above with the browser console is NOT a jQuery function, it is an alias for `document.querySelector()` that most browsers support at the console._

The `propertyList` array defines three properties that are bound to three elements in the html of the component:
1. `country` property has an initial value of `Syria` and is bound to the input element with CSS selector `#country`.
2. `capital` property has an initial value of `Damascus` and is bound to the input element with CSS selector `#capital`.
3. `style` property has an initial value of `color:green` and is bound to the `style` attribute of the element with CSS selector `h3`.

To use these properties:
```js
$('#bounded').properties.country = 'USA'
$('#bounded').properties.capital = 'DC'
$('#bounded').properties.style = 'color.blue'

console.log($('#bounded').properties.country) // prints USA
```

The binding is _bi-directional_, changing the property's value will change the view, and changing the value in the view will change the property's value.

Binding properties to DOM elements is optional, you can choose to define a proiperty without `sel` value.

For more details about bound properties, check [Data Bind](https://www.npmjs.com/package/@ahabra/data-bind) NPM package which is used by this library.


### Event Handler
You can define a function to be invoked when a certain DOM event happens.

```js
webitem.defineElement({
  nameWithDash: 'wi-t6',
  html: `
    <button>Click Me</button>
    <span id="counter">0<span>
    `,
  propertyList: [
    {name: 'counter', value: '0', sel: '#counter'}
  ],
  eventHandlerList: [
    {
      sel: 'button',
      eventName: 'click',
      listener: (ev, el) => {
        const counter = parseInt(el.properties.counter, 10)
        el.properties.counter = counter + 1
      }
    }
  ]
})
```

Here we define a property `counter` which is bound to the span with `id="counter"`.

We also define a listener for the `click` event on `button`. The listener takes two arguments, the [event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object and the web component element.

