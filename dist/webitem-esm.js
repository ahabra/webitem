// webitem.js Library to simplify creating HTML5 Custom Elements
// https://github.com/ahabra/webitem
// Copyright 2021 (C) Abdul Habra
// Apache License Version 2.0
// Build Time: Fri Dec 25 2020 23:50:06 GMT-0500 (Eastern Standard Time)


// src/utils/ObjectUtils.js
function isFunction(f) {
  return isType(f, "Function");
}
function isType(v, type) {
  return Object.prototype.toString.call(v) === `[object ${type}]`;
}

// src/utils/StringUtils.js
function startsWith(st, search, isCaseSensitive) {
  if (isCaseSensitive) {
    return st.startsWith(search);
  }
  const start = st.substring(0, search.length).toLowerCase();
  return search.toLowerCase() === start;
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

// src/index.js
import bind from "@ahabra/data-bind";
function defineElement({nameWithDash, html, css, propertyList, eventHandlerList}) {
  const el = class extends HTMLElement {
    constructor() {
      super();
      addHtml(this, html, css);
      this.properties = bindProperties(this, propertyList);
      addEventListeners(this, eventHandlerList);
    }
  };
  customElements.define(nameWithDash, el);
}
function defineProperty(name, value, sel, attr) {
  return {name, value, sel, attr};
}
function bindProperties(root, propertyList) {
  const result = {};
  if (!validatePropertyList(propertyList))
    return result;
  propertyList.forEach((p) => {
    if (p.sel) {
      bind({obj: result, prop: p.name, sel: p.sel, attr: p.attr, root: root.shadowRoot});
    }
    result[p.name] = p.value;
  });
  return result;
}
function validatePropertyList(propertyList) {
  if (!propertyList)
    return false;
  if (!Array.isArray(propertyList)) {
    throw "propertyList must be an array of {name, value, [sel], [attr]} objects";
  }
  return true;
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
function addHtml(root, html, css) {
  html = getHtml(root, html);
  const shadow = root.attachShadow({mode: "open"});
  const nodes = htmlToNodes(getCss(css) + html);
  shadow.append(...nodes);
}
function getHtml(root, html) {
  return isFunction(html) ? html(root) : html;
}
function getCss(css) {
  if (!css)
    return "";
  css = css.trim();
  if (css.length === 0)
    return "";
  if (startsWith(css, "<style>", false))
    return css;
  return `<style>${css}</style>`;
}
export {
  defineElement,
  defineProperty
};
