// webitem.js Library to simplify creating HTML5 Custom Elements
// https://github.com/ahabra/webitem
// Copyright 2021 (C) Abdul Habra
// Apache License Version 2.0


// src/utils/ObjectUtils.js
function isString(s) {
  return isType(s, "String");
}
function isFunction(f) {
  return isType(f, "Function");
}
function isType(v, type) {
  return Object.prototype.toString.call(v) === `[object ${type}]`;
}
function forEachEntry(object, func) {
  if (!object || !func)
    return;
  if (Array.isArray(object)) {
    object.forEach((v, index) => {
      func(index, v);
    });
    return;
  }
  Object.entries(object).forEach((p) => func(p[0], p[1]));
}

// src/utils/StringUtils.js
function startsWith(st, search, isCaseSensitive) {
  if (isCaseSensitive) {
    return st.startsWith(search);
  }
  const start = st.substring(0, search.length).toLowerCase();
  return search.toLowerCase() === start;
}
function trim(s) {
  if (isEmpty(s))
    return "";
  if (!isString(s)) {
    s = String(s);
  }
  return s.trim(s);
}
function isEmpty(s) {
  return s === void 0 || s === null || s === "";
}

// src/utils/DomUtils.js
function select(selector, root) {
  root = root || document;
  return Array.from(root.querySelectorAll(":scope " + selector));
}
function htmlToNodes(html) {
  if (!html)
    return [];
  html = html.trim();
  if (html.length === 0)
    return [];
  const template = document.createElement("template");
  template.innerHTML = html;
  return Array.prototype.slice.call(template.content.childNodes);
}
function tag({name, attributes, content}) {
  if (!name)
    return null;
  const attArray = [];
  forEachEntry(attributes, (k, v) => {
    attArray.push(`${k}="${v}"`);
  });
  const sep = attArray.length > 0 ? " " : "";
  const atts = attArray.join(" ");
  return `<${name}${sep}${atts}>${content}</${name}>`;
}

// src/webitem.js
import bind from "@ahabra/data-bind";
function defineElement({
  nameWithDash,
  html,
  css,
  display,
  propertyList,
  actionList,
  eventHandlerList
}) {
  const el = class extends HTMLElement {
    constructor() {
      super();
      addHtml(this, html, css, display);
      this.properties = bindProperties(this, propertyList);
      this.actions = defineActions(this, actionList);
      addEventListeners(this, eventHandlerList);
    }
  };
  customElements.define(nameWithDash, el);
}
function bindProperties(root, propertyList) {
  const result = {};
  if (!validatePropertyList(propertyList))
    return result;
  propertyList.forEach((p) => addProperty(result, p, root));
  return result;
}
function addProperty(obj, prop, root) {
  const onChange = createOnChange(prop, root);
  bind({obj, prop: prop.name, sel: prop.sel, attr: prop.attr, root: root.shadowRoot, onChange});
  obj[prop.name] = prop.value;
}
function createOnChange(prop, root) {
  if (!prop.onChange)
    return void 0;
  return (oldValue, newValue) => prop.onChange(root, oldValue, newValue);
}
function validatePropertyList(propertyList) {
  if (!propertyList)
    return false;
  if (!Array.isArray(propertyList)) {
    throw "propertyList must be an array of {name, value, [sel], [attr]} objects";
  }
  return true;
}
function defineActions(root, actionList) {
  const actions = {};
  if (!actionList)
    return actions;
  actionList.forEach((pair) => {
    if (pair.name && pair.action) {
      actions[pair.name] = pair.action.bind(root);
    }
  });
  return actions;
}
function addEventListeners(root, eventHandlerList) {
  if (!eventHandlerList)
    return;
  if (!Array.isArray(eventHandlerList)) {
    throw "eventHandlerList must be an array of {sel, eventName, listener} objects";
  }
  eventHandlerList.forEach((h) => {
    const elements = select(h.sel, root.shadowRoot);
    elements.forEach((el) => {
      el.addEventListener(h.eventName, (ev) => {
        h.listener(ev, root);
      });
    });
  });
}
function addHtml(root, html, css, display) {
  html = getHtml(root, html);
  const shadow = root.attachShadow({mode: "open"});
  const nodes = htmlToNodes(getCss(css, display) + html);
  shadow.append(...nodes);
}
function getHtml(root, html) {
  return isFunction(html) ? html(root) : html;
}
function getCss(css, display) {
  return displayStyle(display) + buildCss(css);
}
function buildCss(css) {
  css = trim(css);
  if (css.length === 0)
    return "";
  if (!startsWith(css, "<style>", false)) {
    css = tag({name: "style", content: css});
  }
  return css;
}
function displayStyle(display) {
  display = trim(display);
  if (display.length === 0)
    return "";
  return `
  <style>
    :host { display: ${display};}
    :host([hidden]) {display: none;}
  </style>
  `;
}
export {
  defineElement
};
