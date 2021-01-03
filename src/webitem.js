import * as ObjectUtils from './utils/ObjectUtils.js'
import * as StringUtils from './utils/StringUtils.js'
import * as DomUtils from './utils/DomUtils.js'
import bind from '@ahabra/data-bind'

// TODO Elaborate on the docs
// TODO apply suggestions from https://developers.google.com/web/fundamentals/web-components/best-practices
/**
 * Define a custom element
 * @param options An object containing the following fields
 * nameWithDash: Required. String. Name of the custom element.
 * html: Optional. String or Function. The HTML content of the element
 * css: Optional. String. The CSS to apply on the element
 * propertyList: Optional. Array. Objects defining properties of the element. Each property
 * definition consists of {name, value, [sel], [attr]}
 * eventHandlerList: Optional. Array. Objects defining event handlers of element. Each
 * handler definition consists of {sel, eventName, listener}
 * display: Optional. String. CSS display attribute. One of inline (default), inline-block, block.
 */
export function defineElement({nameWithDash, html, css, display,
  propertyList, eventHandlerList}) {

  const el = class extends HTMLElement {
    constructor() {
      super()
      addHtml(this, html, css, display)
      this.properties = bindProperties(this, propertyList)
      addEventListeners(this, eventHandlerList)
    }
  }

  customElements.define(nameWithDash, el)
}

export function defineProperty(name, value, sel, attr) {
  return {name, value, sel, attr}
}

function bindProperties(root, propertyList) {
  const result = {}
  if (!validatePropertyList(propertyList)) return result

  propertyList.forEach(p => {
    if (p.sel) {
      bind({obj: result, prop: p.name, sel: p.sel, attr: p.attr, root: root.shadowRoot})
    }
    result[p.name] = p.value
  })
  return result
}

function validatePropertyList(propertyList) {
  if (!propertyList) return false
  if (!Array.isArray(propertyList)) {
    throw 'propertyList must be an array of {name, value, [sel], [attr]} objects'
  }
  return true
}

function addEventListeners(root, eventHandlerList) {
  if (! eventHandlerList) return
  if (!Array.isArray(eventHandlerList)) {
    throw 'eventHandlerList must be an array of {sel, eventName, listener} objects'
  }

  eventHandlerList.forEach(h => {
    const elements = DomUtils.select(h.sel, root.shadowRoot)
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
  const nodes = DomUtils.htmlToNodes(getCss(css, display) + html)
  shadow.append(...nodes)
}

function getHtml(root, html) {
  return ObjectUtils.isFunction(html) ? html(root) : html
}

function getCss(css, display) {
  return displayStyle(display) + buildCss(css)
}

function buildCss(css) {
  css = StringUtils.trim(css)
  if (css.length === 0) return ''

  if (!StringUtils.startsWith(css, '<style>', false)) {
    css = DomUtils.tag({name: 'style', content: css})
  }
  return css
}

function displayStyle(display) {
  display = StringUtils.trim(display)
  if (display.length === 0) return ''
  return `
  <style>
    :host { display: ${display};}
    :host([hidden]) {display: none;}
  </style>
  `
}

