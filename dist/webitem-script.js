// webitem.js Library to simplify creating HTML5 Custom Elements
// https://github.com/ahabra/webitem
// Copyright 2021 (C) Abdul Habra
// Apache License Version 2.0
// Build Time: Sat Dec 26 2020 00:02:57 GMT-0500 (Eastern Standard Time)


var webitem = (() => {
  var __defProp = Object.defineProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };

  // src/index.js
  var src_exports = {};
  __export(src_exports, {
    defineElement: () => defineElement,
    defineProperty: () => defineProperty
  });

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

  // node_modules/@ahabra/data-bind/dist/data-bind-module.js
  function bind({obj, prop, sel, attr, root}) {
    validateArgs({prop, sel});
    obj = obj || {};
    const oldValue = obj.hasOwnProperty(prop) ? obj[prop] : void 0;
    root = root || document;
    const descriptor = {
      get: () => getVal(root, sel, attr),
      set: (v) => setVal(root, sel, v, attr),
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
  function getVal(root, sel, attr) {
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
  function setVal(root, sel, val, attr) {
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
  function validateArgs({prop, sel}) {
    if (typeof prop !== "string" || prop.length === 0) {
      throw `'prop' argument must be a String defining the name a property.`;
    }
    if (typeof sel !== "string" || sel.length === 0) {
      throw `'sel' argument must be a String defining a selector.`;
    }
  }

  // src/index.js
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
  return src_exports;
})();
