import * as ObjectUtils from './ObjectUtils.js'

export function elById(id) {
  return document.getElementById(id)
}

/** Returns an array of elements matching selector */
export function select(selector, root) {
  root = root || document
  // Adding :scope makes selector applies to root's children only
  // However, if the root is a web component, :scope does not work on
  // Safari or Firefox, but does work on Chrome. 2021-02-18
  return Array.from(root.querySelectorAll(selector))
}

/** Get or set an attribute's value */
export function attr(el, name, value) {
  if (value === undefined) {
    return el.getAttribute(name)
  }
  el.setAttribute(name, value)
  return value
}

export function getAttributes(el) {
  const result = {}
  const atts = el.attributes
  if (!atts || !atts.length) return result

  for (let i = 0; i < atts.length; i++) {
    const a = atts[i]
    result[a.name] = a.value
  }
  return result
}

/** Return an array of nodes */
export function htmlToNodes(html) {
  if (!html) return []
  html = html.trim()
  if (html.length === 0) return []

  const template = document.createElement('template')
  template.innerHTML = html
  return Array.prototype.slice.call(template.content.childNodes)
}

export function createElement({name, attributes, content}) {
  const html = tag({name, attributes, content})
  if (html === null) return null
  const nodes = htmlToNodes(html)
  if (nodes.length === 0) return null
  return nodes[0]
}

export function tag({name, attributes, content}) {
  if (!name) return null
  const attArray = []
  ObjectUtils.forEachEntry(attributes, (k, v) => {
    attArray.push(`${k}="${v}"`)
  })
  const sep = attArray.length > 0 ? ' ' : ''
  const atts = attArray.join(' ')

  return `<${name}${sep}${atts}>${content}</${name}>`
}