// webitem.js Library to simplify creating HTML5 Custom Elements
// https://github.com/ahabra/webitem
// Copyright 2021 (C) Abdul Habra. Version 0.2.3.
// Apache License Version 2.0


var webitem = (() => {
  var __defProp = Object.defineProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };

  // src/webitem.js
  var webitem_exports = {};
  __export(webitem_exports, {
    defineElement: () => defineElement
  });

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

  // node_modules/@techexp/data-bind/dist/data-bind-module.js
  function bind({obj, prop, sel, attr, root, onChange}) {
    validateArgs(prop);
    obj = obj || {};
    const oldValue = obj.hasOwnProperty(prop) ? obj[prop] : void 0;
    root = root || document;
    const objNotBound = {};
    const descriptor = {
      get: () => getValue({prop, sel, attr, root, objNotBound}),
      set: (value) => setValue({prop, value, root, sel, attr, objNotBound, onChange}),
      configurable: true,
      enumerable: true
    };
    Object.defineProperty(obj, prop, descriptor);
    if (oldValue !== void 0) {
      console.info(`Property '${prop}' already exists in object. Will override previous definition but retain old value of ${oldValue}.`);
      obj[prop] = oldValue;
    }
    return obj;
  }
  var isCheckbox = (el) => el.type === "checkbox";
  var isRadio = (el) => el.type === "radio";
  var isSelect = (el) => el.tagName.toLowerCase() === "select";
  var isInput = (el) => "value" in el;
  var toSet = (v) => new Set(Array.isArray(v) ? v : [v]);
  function setValue({prop, value, root, sel, attr, objNotBound, onChange}) {
    fireChange({prop, value, root, sel, attr, objNotBound, onChange});
    if (sel) {
      setDomVal(root, sel, value, attr);
      return;
    }
    objNotBound[prop] = value;
  }
  function fireChange({prop, value, root, sel, attr, objNotBound, onChange}) {
    if (!onChange)
      return;
    const oldValue = getValue({prop, root, sel, attr, objNotBound});
    if (oldValue === value)
      return;
    onChange(oldValue, value);
  }
  function getValue({prop, root, sel, attr, objNotBound}) {
    if (sel)
      return getDomVal(root, sel, attr);
    return objNotBound[prop];
  }
  function getDomVal(root, sel, attr) {
    const elements = findElements(root, sel);
    if (elements.length === 0)
      return null;
    let el = elements[0];
    if (attr)
      return el.getAttribute(attr);
    if (!isInput(el))
      return el.innerHTML;
    if (isCheckbox(el)) {
      return elements.filter((e) => isCheckbox(e) && e.checked).map((e) => e.value === "on" ? e.name : e.value);
    }
    if (isSelect(el)) {
      const opts = [...el.querySelectorAll("option")];
      return opts.filter((op) => op.selected).map((op) => op.value);
    }
    if (isRadio(el)) {
      el = elements.filter(isRadio).find((e) => e.checked);
    }
    return el.value;
  }
  function setDomVal(root, sel, val, attr) {
    const elements = findElements(root, sel);
    if (elements.length === 0)
      return;
    const el = elements[0];
    if (isCheckbox(el)) {
      const v = toSet(val);
      elements.filter(isCheckbox).forEach((e) => e.checked = v.has(e.value) || v.has(e.name));
      return;
    }
    if (isSelect(el)) {
      const v = toSet(val);
      el.querySelectorAll("option").forEach((op) => op.selected = v.has(op.value));
      return;
    }
    if (isRadio(el)) {
      elements.filter(isRadio).forEach((e) => e.checked = e.value === val);
      return;
    }
    elements.forEach((el2) => setElementValue(el2, val, attr));
  }
  function setElementValue(el, val, attr) {
    if (attr) {
      el.setAttribute(attr, val);
    } else if (isInput(el)) {
      el.value = val;
    } else {
      el.innerHTML = val;
    }
  }
  function findElements(root, sel) {
    const elements = root.querySelectorAll(sel);
    if (elements.length === 0) {
      console.warn(`No elements found matching selector ${sel}`);
    }
    return [...elements];
  }
  function validateArgs(prop) {
    if (typeof prop !== "string" || prop.length === 0) {
      throw `'prop' argument must be a String defining the name a property.`;
    }
  }

  // src/webitem.js
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
        addHtml(this, html, css, display);
        this.properties = bindProperties(this, propertyList);
        this.actions = defineActions(this, actionList);
        addEventListeners(this, eventHandlerList);
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
  return webitem_exports;
})();
