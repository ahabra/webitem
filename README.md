# WEBITEM.JS
A library to simplify creating HTML5 Web Components (Custom Elements).

## Introduction
In modern HTML, you can create web components using
[customElements.define()](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
This API is powerfull, but can be verbose and complicated. The _webitem.js_ library provides a wrapper
around that API in an attempt to make it simple for the application's programmer.

## Install
You can use this library as either an EcmaScript module, or the old way as a script which you include in your html file.

### Install as NPM EcmaScript Module
If you plan to use this package as an NPM module:

```bash
    npm install @techexp/webitem
```

### Install as a Script
If you plan to use this package as a JS script library

```html
    <script src="https://raw.githubusercontent.com/ahabra/webitem/master/dist/webitem-script-min.js"></script>
```

Alternatively, you can download the file
`https://raw.githubusercontent.com/ahabra/webitem/master/dist/webitem-script-min.js`
and use directly. Note that there is a non-minified version at the same location.

## Usage
If you installed as an EcmaScript module
```js
import * as webitem from '@techexp/webitem'
```

If you installed as a Script, the library is available at `window.webitem`

### Quick Code Demo
This example shows how to create a bare-bone web item, it creates a Web Component named `bare-bone`
which you can use in the html code.

```js
import * as webitem from '@techexp/webitem'
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
This library consists of a single function `defineElement(object)`. It accepts a single argument
object with the following keys:

1. `nameWithDash`: Required, String. Name of the web component. Must contain the dash/hyphen '`-`' character
   within the name. This is required by the browser's API.
2. `html`: Optional, String or Function. The HTML content of the web component.
    1. When `html` is a string, it is the literal html of the compnent.
    2. When `html` is a function, the function will have this signature:
    `(webitem) => string`. Look down for an example.
3. `css`: Optional, String. The CSS to apply on the web component. This CSS will be name-spaced
   within the component, and is not visible outside it.
4. `propertyList`: Optional, Array of objects. Objects defining properties of the component. Each property
   definition consists of `{name, value, [sel], [attr]}`.
    1. `name`: Name of the property.
    2. `value`: Initial value of the property.
    3. `sel`: Optional, String. A CSS selector that binds the property to a DOM element in the component.
    4. `attr`: Optional, String. An attribute on the DOM element to bind its value.
    5. `onChange`: Optional. Function. A function to be called when the property's value change through
       an API call. The function can take three arguments `(webitem, oldValue, newValue)`
5. `eventHandlerList`: Optional, Array of objects. Objects define event handlers of the component.
    Each event handler definition consists of `{sel, eventName, listener}`.
    1. `sel`: A CSS selector of an element in the component.
    2. `eventName`: Name of the event to bind to, e.g. `click`.
    3. `listener`: A function to be called when the event occures. The function accepts two arguments,
       an [event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object, and `webitem` which is the web component.
6. `actionList`: Optional, Array of objects. Objects define actions that can be defined on the component.
    Each action definition consists of `{name, action}`.
    1. `name`: Name of the action.
    2. `action`: a function definition. If you declare this function as a _classic_ (not arrow) function, using
        `this` inside the function will refer to the component.
7. `display`: Optional, String. A CSS display attribute. A possible value can be
   `inline` (default if missing), `inline-block`, or `block`. This controls how the component is displayed
   inside its container.

The `defineElement()` function returns true if the element was created, false if the element
already exists, in which case it will not be re-created.

The `defineElement()` function defines a standard _Custom Element_/_Web Component_ with all the
standard properties. It also adds an extra property `wi` that contains extra properties and
functions supported bby this library as follows:

1.  `wi.properties`: An object with key/value as defined in the `propertyList` during element
    definition.
2.  `wi.actions`: an object whose keys are the actions names and value is the functions
    as defined in the `actionList` during element definition.
3.  `wi.addProperty(name, value, sel, attr, onChange)`: A function to add a new property
    on the webitem. Note: The properties defined in the `propertyList` during element
    definition are available to all instances of the web item. The properties added using
    `wi.addProperty()` are available only to the particular instance of the web item in
    the DOM.
4.  `wi.addAction(name, action)`: A function to add a new action on the webitem. Note: The actions
    defined in the `actionList` during element definition are available to all
    instances of the web item. The actions added using `wi.addAction()` are available
    only to the particular instance of the web item in the DOM.
5.  `wi.addEventListener = (sel, eventName, listener)`:
    A function to add a new event handler on the webitem. Note: The event handlers
    defined in the `eventHandlerList` during element definition are available to all
    instances of the web item. The event handler added using `wi.addEventListener()`
    are available only to the particular instance of the web item in the DOM.

#### Note About Using Common CSS Files
CSS applied to a web component (_through shadow DOM_) is scoped to the component, it does not interact
with CSS outside the component.

If you need to use a common CSS file within the component, a possible solution is to use
the `<link>` tag in the component's html, for exmaple, add the next line at the top of your component's html:

```html
<link rel="stylesheet" href="css/common.css">
```

## Examples
There is a full set of examples in the repo's `src/` directory in both `index.html` and `test/webitem.test.js`.
Next we will show some as well.

### Provide html as a function
This example shows how to provide the html content of the component as a function. The function takes
the comonent itself as an argument and returns a string representing the html of the component.

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
One of the distinct features of this library is the ability to bind properties to DOM elements within the component.
Consider this example:

```js
webitem.defineElement({
  nameWithDash: 'wi-t5',
  html: `
    <h3>wi-t5 - Bound Properties</h3>
    In the browser's console, inspect $('wi-t5').wi.properties
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

_Note: The `$()` function listed above with the browser console is NOT a jQuery function, it is an alias
for `document.querySelector()` that most browsers support at the console._

The `propertyList` array defines three properties that are bound to three elements in the html of the component:
1. `country` property has an initial value of `Syria` and is bound to the input element with CSS selector `#country`.
2. `capital` property has an initial value of `Damascus` and is bound to the input element with CSS selector `#capital`.
3. `style` property has an initial value of `color:green` and is bound to the `style` attribute of
   the element with CSS selector `h3`.

To use these properties:
```js
$('#bounded').wi.properties.country = 'USA'
$('#bounded').wi.properties.capital = 'DC'
$('#bounded').wi.properties.style = 'color.blue'

console.log($('#bounded').wi.properties.country) // prints USA
```

The binding is _bi-directional_, changing the property's value will change the view, and changing the
value in the view will change the property's value.

Binding properties to DOM elements is optional, you can choose to define a proiperty without `sel` value.

For more details about bound properties, check [Data Bind](https://www.npmjs.com/package/@techexp/data-bind)
NPM package which is used by this library.


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
        const counter = parseInt(el.wi.properties.counter, 10)
        el.wi.properties.counter = counter + 1
      }
    }
  ]
})
```

Here we define a property `counter` which is bound to the span with `id="counter"`.

We also define a listener for the `click` event on `button`. The listener takes two arguments,
the [event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object and the web component element.

### Actions
You can define actions (functions) that can execute with the web item context. Consider this example:

```js
webitem.defineElement({
  nameWithDash: 'wi-t8',
  html: `<h3>wi-t8 - Actions</h3>
    <button>Click Me</button>`,
  propertyList: [
    {name: 'color', value: 'green', sel:'button', attr: 'style'}
  ],
  eventHandlerList: [
    {
      sel: 'button',
      eventName: 'click',
      listener: (ev, el) => el.wi.actions.updateColor(el)
    }
  ],
  actionList: [
    {name: 'updateColor', action: function(el) {
      if (el !== this) {
        console.warn(`Warning: 'this' should be equal to 'el'`)
      }
      el.wi.properties.color = `background-color:${getRandomColor()}`
    }}
  ]
})
```

```html
<wi-t8></wi-t8>
```

The `actionList` is an array which contains objects with two keys:
1. `name`: The name of the action (function)
2. `action`: The definition of the action/function. **Note:** If you declare the action as a _classic_ function
   (as opposed to an arrow '`=>`' function) then its `this` variable will point to the web item itself.

You can access actions through the `wi.actions` property, so for the above example, you can:

```js
$('wi-t8').wi.actions.updateColor()
```

### Property's Change Callback
When you define a property, you can provide a callback function to be called whenever the property's
value is changed (through an API call). The function expects two arguments, oldValue and newValue.
Consider this example:

```js
webitem.defineElement({
  nameWithDash: 'wi-t9',
  html: `
    <h3>wi-t9 - onChange</h3>
    <button>Click Me</button>
    oldValue: <span id="oldValue"></span>,
    newValue: <span id="newValue"></span>
  `,
  propertyList: [
    {name: 'color', value: 'green',
      onChange: (el, oldValue, newValue) => {
        el.shadowRoot.querySelector('button').style = `background-color:${newValue}`

        function showColor(selector, color) {
          const span = el.shadowRoot.querySelector(selector)
          span.innerText = color
          span.style = `background-color:${color}`
        }
        showColor('#oldValue', oldValue)
        showColor('#newValue', newValue)
      }}
  ],
  eventHandlerList: [
    {
      sel: 'button',
      eventName: 'click',
      listener: (ev, el) => {
        // getRandomColor() returns names of random colors
        el.wi.properties.color = getRandomColor()
      }
    }
  ]
})
```

```html
<wi-t9></wi-t9>
```

In the above example, we change the `color` property in the click listener, which will invoke the `onChange`
callback on the property.

## Change Log
* 2021-03-29:
  1. Move all custom properties and function to be inside a single object `wi`. This can
     break code using version <= 0.3.6
  2. Add new functions: `addProperty()`, `addAction()`, `addEventListener()`

## TODO
This is my wishlist for this library:

1. 2021-03-10: Allow easy API for attribute change callbacks
