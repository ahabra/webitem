import {Domer, Objecter, Stringer} from '@techexp/jshelper'
import bind from '@techexp/data-bind'

/**
 * Define a custom element
 * @param options An object containing the following fields
 * nameWithDash: Required. String. Name of the custom element.
 * html: Optional. String or Function. The HTML content of the element
 * css: Optional. String. The CSS to apply on the element
 * propertyList: Optional. Array. Objects defining properties of the element. Each property
 * definition consists of {name, value, [sel], [attr], [onChange]}
 * actionList: Optional. Array. Objects defining actions. Each action definition consists of
 * {name, action}, where action is a function definition.
 * eventHandlerList: Optional. Array. Objects defining event handlers of element. Each
 * handler definition consists of {sel, eventName, listener}
 * display: Optional. String. CSS display attribute. One of inline (default), inline-block, block.
 * @returns true if the element was created, false if the element already exists, in which case
 * it will not be re-created.
 */
export function defineElement({nameWithDash, html, css, display,
  propertyList, actionList, eventHandlerList}) {

  if (customElements.get(nameWithDash)) return false

  const el = class extends HTMLElement {
    constructor() {
      super()
      addHtml(this, html, css, display)
      this.properties = bindProperties(this, propertyList)
      this.actions = defineActions(this, actionList)
      addEventListeners(this, eventHandlerList)
    }
  }
  customElements.define(nameWithDash, el)
  return true
}

function bindProperties(root, propertyList) {
  const result = {}
  if (!validatePropertyList(propertyList)) return result

  propertyList.forEach(p => addProperty(result, p, root))
  return result
}

function addProperty(obj, prop, root) {
  const onChange = createOnChange(prop, root)
  bind({obj, prop: prop.name, sel: prop.sel, attr: prop.attr, root: root.shadowRoot, onChange })
  obj[prop.name] = prop.value
}

function createOnChange(prop, root) {
  if (!prop.onChange) return undefined
  return (oldValue, newValue) => prop.onChange(root, oldValue, newValue)
}

function validatePropertyList(propertyList) {
  if (!propertyList) return false
  if (!Array.isArray(propertyList)) {
    throw 'propertyList must be an array of {name, value, [sel], [attr]} objects'
  }
  return true
}

function defineActions(root, actionList) {
  const actions = {}
  if (!actionList) return actions
  actionList.forEach(pair => {
    if (pair.name && pair.action) {
      actions[pair.name] = pair.action.bind(root)
    }
  })
  return actions
}

function addEventListeners(root, eventHandlerList) {
  if (! eventHandlerList) return
  if (!Array.isArray(eventHandlerList)) {
    throw 'eventHandlerList must be an array of {sel, eventName, listener} objects'
  }

  eventHandlerList.forEach(h => {
    const elements = Domer.all(h.sel, root.shadowRoot)
    elements.forEach(el => {
      el.addEventListener(h.eventName, ev => {
        h.listener(ev, root)
      })
    })
  })
}

function addHtml(root, html, css, display) {
  html = getHtml(root, html)

  const shadow = root.attachShadow({mode: 'open'})
  const nodes = Domer.createElements(getCss(css, display) + html)
  shadow.append(...nodes)
}

function getHtml(root, html) {
  return Objecter.isFunction(html) ? html(root) : html
}

function getCss(css, display) {
  return displayStyle(display) + buildCss(css)
}

function buildCss(css) {
  css = Stringer.trim(css)
  if (css.length === 0) return ''

  if (!Stringer.startsWith(css, '<style>', false)) {
    css = Domer.tag('style', {}, css)
  }
  return css
}

function displayStyle(display) {
  display = Stringer.trim(display)
  if (display.length === 0) return ''
  return `
  <style>
    :host { display: ${display};}
    :host([hidden]) {display: none;}
  </style>
  `
}

