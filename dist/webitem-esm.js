// webitem.js Library to simplify creating HTML5 Custom Elements
// https://github.com/ahabra/webitem
// Copyright 2021 (C) Abdul Habra. Version 0.4.2.
// Apache License Version 2.0


// src/webitem.js
import { Domer, Objecter, Stringer } from "@techexp/jshelper";
import bind from "@techexp/data-bind";
function defineElement({
  nameWithDash,
  html,
  css,
  display,
  propertyList,
  actionList,
  eventHandlerList
}) {
  if (customElements.get(nameWithDash))
    return false;
  const el = class extends HTMLElement {
    constructor() {
      super();
      const root = this;
      addHtml(this, html, css, display);
      this.wi = {};
      this.wi.properties = bindProperties(this, propertyList);
      this.wi.actions = defineActions(this, actionList);
      addEventListeners(this, eventHandlerList);
      this.wi.addProperty = function(name, value, sel, attr, onChange) {
        const prop = { name, value, sel, attr, onChange };
        addProperty(root.wi.properties, prop, root);
      };
      this.wi.addAction = (name, action) => addAction(root, root.wi.actions, name, action);
      this.wi.addEventListener = (sel, eventName, listener) => addHandler(root, { sel, eventName, listener });
    }
  };
  customElements.define(nameWithDash, el);
  return true;
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
  bind({ obj, prop: prop.name, sel: prop.sel, attr: prop.attr, root: root.shadowRoot, onChange });
  if (prop.value !== void 0) {
    obj[prop.name] = prop.value;
  }
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
    addAction(root, actions, pair.name, pair.action);
  });
  return actions;
}
function addAction(root, actions, name, action) {
  if (!Objecter.isString(name) || !Objecter.isFunction(action))
    return;
  actions[name] = action.bind(root);
}
function addEventListeners(root, eventHandlerList) {
  if (!eventHandlerList)
    return;
  if (!Array.isArray(eventHandlerList)) {
    throw "eventHandlerList must be an array of {sel, eventName, listener} objects";
  }
  eventHandlerList.forEach((h) => addHandler(root, h));
}
function addHandler(root, { sel, eventName, listener }) {
  const elements = Domer.all(sel, root.shadowRoot);
  elements.forEach((el) => {
    el.addEventListener(eventName, (ev) => {
      listener(ev, root);
    });
  });
}
function addHtml(root, html, css, display) {
  html = getHtml(root, html);
  const shadow = root.attachShadow({ mode: "open" });
  const nodes = Domer.createElements(getCss(css, display) + html);
  shadow.append(...nodes);
}
function getHtml(root, html) {
  return Objecter.isFunction(html) ? html(root) : html;
}
function getCss(css, display) {
  return displayStyle(display) + buildCss(css);
}
function buildCss(css) {
  css = Stringer.trim(css);
  if (css.length === 0)
    return "";
  if (!Stringer.startsWith(css, "<style>", false)) {
    css = Domer.tag("style", {}, css);
  }
  return css;
}
function displayStyle(display) {
  display = Stringer.trim(display);
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
