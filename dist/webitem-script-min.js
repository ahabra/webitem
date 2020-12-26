// webitem.js Library to simplify creating HTML5 Custom Elements
// https://github.com/ahabra/webitem
// Copyright 2021 (C) Abdul Habra
// Apache License Version 2.0
// Build Time: Fri Dec 25 2020 23:50:06 GMT-0500 (Eastern Standard Time)


var webitem=(()=>{var f=Object.defineProperty,S=t=>f(t,"__esModule",{value:!0}),w=(t,e)=>{S(t);for(var n in e)f(t,n,{get:e[n],enumerable:!0})},N={};w(N,{defineElement:()=>E,defineProperty:()=>x});function d(t){return v(t,"Function")}function v(t,e){return Object.prototype.toString.call(t)===`[object ${e}]`}function m(t,e,n){if(n)return t.startsWith(e);let r=t.substring(0,e.length).toLowerCase();return e.toLowerCase()===r}function h(t,e){return e=e||document,Array.from(e.querySelectorAll(":scope "+t))}function g(t){if(!t)return[];if(t=t.trim(),t.length===0)return[];let e=document.createElement("template");return e.innerHTML=t,Array.prototype.slice.call(e.content.childNodes)}function l({obj:t,prop:e,sel:n,attr:r,root:i}){L({prop:e,sel:n}),t=t||{};let o=t.hasOwnProperty(e)?t[e]:void 0;i=i||document;let s={get:()=>U(i,n,r),set:u=>O(i,n,u,r),configurable:!0,enumerable:!0};return Object.defineProperty(t,e,s),o!==void 0&&(console.info(`Property '${e}' already exists in object. Will override previous definition but retain old value of ${o}.`),t[e]=o),t}var a=t=>t.type==="checkbox",c=t=>t.type==="radio",p=t=>t.tagName.toLowerCase()==="select",y=t=>"value"in t,b=t=>new Set(Array.isArray(t)?t:[t]);function U(t,e,n){let r=A(t,e);if(r.length===0)return null;let i=r[0];if(n)return i.getAttribute(n);if(!y(i))return i.innerHTML;if(a(i))return r.filter(o=>a(o)&&o.checked).map(o=>o.value==="on"?o.name:o.value);if(p(i)){let o=[...i.querySelectorAll("option")];return o.filter(s=>s.selected).map(s=>s.value)}return c(i)&&(i=r.filter(c).find(o=>o.checked)),i.value}function O(t,e,n,r){let i=A(t,e);if(i.length===0)return;let o=i[0];if(a(o)){let s=b(n);i.filter(a).forEach(u=>u.checked=s.has(u.value)||s.has(u.name));return}if(p(o)){let s=b(n);o.querySelectorAll("option").forEach(u=>u.selected=s.has(u.value));return}if(c(o)){i.filter(c).forEach(s=>s.checked=s.value===n);return}i.forEach(s=>j(s,n,r))}function j(t,e,n){n?t.setAttribute(n,e):y(t)?t.value=e:t.innerHTML=e}function A(t,e){let n=t.querySelectorAll(e);return n.length===0&&console.warn(`No elements found matching selector ${e}`),[...n]}function L({prop:t,sel:e}){if(typeof t!="string"||t.length===0)throw"'prop' argument must be a String defining the name a property.";if(typeof e!="string"||e.length===0)throw"'sel' argument must be a String defining a selector."}function E({nameWithDash:t,html:e,css:n,propertyList:r,eventHandlerList:i}){let o=class extends HTMLElement{constructor(){super();k(this,e,n),this.properties=P(this,r),T(this,i)}};customElements.define(t,o)}function x(t,e,n,r){return{name:t,value:e,sel:n,attr:r}}function P(t,e){let n={};return C(e)&&e.forEach(r=>{r.sel&&l({obj:n,prop:r.name,sel:r.sel,attr:r.attr,root:t.shadowRoot}),n[r.name]=r.value}),n}function C(t){if(!t)return!1;if(!Array.isArray(t))throw"propertyList must be an array of {name, value, [sel], [attr]} objects";return!0}function T(t,e){if(!e)return;if(!Array.isArray(e))throw"eventHandlerList must be an array of {sel, eventName, listener} objects";e.forEach(n=>{let r=h(n.sel,t.shadowRoot);r.forEach(i=>{i.addEventListener(n.eventName,o=>{n.listener(o,t)})})})}function k(t,e,n){e=H(t,e);let r=t.attachShadow({mode:"open"}),i=g($(n)+e);r.append(...i)}function H(t,e){return d(e)?e(t):e}function $(t){return t?(t=t.trim(),t.length===0?"":m(t,"<style>",!1)?t:`<style>${t}</style>`):""}return N;})();
