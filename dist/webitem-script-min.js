// webitem.js Library to simplify creating HTML5 Custom Elements
// https://github.com/ahabra/webitem
// Copyright 2021 (C) Abdul Habra
// Apache License Version 2.0


var webitem=(()=>{var d=Object.defineProperty;var v=t=>d(t,"__esModule",{value:!0});var D=(t,e)=>{v(t);for(var n in e)d(t,n,{get:e[n],enumerable:!0})};var H={};D(H,{defineElement:()=>w});function h(t){return m(t,"String")}function g(t){return m(t,"Function")}function m(t,e){return Object.prototype.toString.call(t)===`[object ${e}]`}function y(t,e){if(!(!t||!e)){if(Array.isArray(t)){t.forEach((n,r)=>{e(r,n)});return}Object.entries(t).forEach(n=>e(n[0],n[1]))}}function p(t,e,n){if(n)return t.startsWith(e);let r=t.substring(0,e.length).toLowerCase();return e.toLowerCase()===r}function f(t){return L(t)?"":(h(t)||(t=String(t)),t.trim(t))}function L(t){return t==null||t===""}function b(t,e){return e=e||document,Array.from(e.querySelectorAll(":scope "+t))}function E(t){if(!t)return[];if(t=t.trim(),t.length===0)return[];let e=document.createElement("template");return e.innerHTML=t,Array.prototype.slice.call(e.content.childNodes)}function A({name:t,attributes:e,content:n}){if(!t)return null;let r=[];y(e,(s,u)=>{r.push(`${s}="${u}"`)});let i=r.length>0?" ":"",o=r.join(" ");return`<${t}${i}${o}>${n}</${t}>`}function a({obj:t,prop:e,sel:n,attr:r,root:i,onChange:o}){P(e),t=t||{};let s=t.hasOwnProperty(e)?t[e]:void 0;i=i||document;let u={};return Object.defineProperty(t,e,{get:()=>x({prop:e,sel:n,attr:r,root:i,objNotBound:u}),set:$=>N({prop:e,value:$,root:i,sel:n,attr:r,objNotBound:u,onChange:o}),configurable:!0,enumerable:!0}),s!==void 0&&(console.info(`Property '${e}' already exists in object. Will override previous definition but retain old value of ${s}.`),t[e]=s),t}var c=t=>t.type==="checkbox",l=t=>t.type==="radio",S=t=>t.tagName.toLowerCase()==="select",U=t=>"value"in t,O=t=>new Set(Array.isArray(t)?t:[t]);function N({prop:t,value:e,root:n,sel:r,attr:i,objNotBound:o,onChange:s}){if(T({prop:t,value:e,root:n,sel:r,attr:i,objNotBound:o,onChange:s}),r){V(n,r,e,i);return}o[t]=e}function T({prop:t,value:e,root:n,sel:r,attr:i,objNotBound:o,onChange:s}){if(!s)return;let u=x({prop:t,root:n,sel:r,attr:i,objNotBound:o});u!==e&&s(u,e)}function x({prop:t,root:e,sel:n,attr:r,objNotBound:i}){return n?k(e,n,r):i[t]}function k(t,e,n){let r=j(t,e);if(r.length===0)return null;let i=r[0];return n?i.getAttribute(n):U(i)?c(i)?r.filter(o=>c(o)&&o.checked).map(o=>o.value==="on"?o.name:o.value):S(i)?[...i.querySelectorAll("option")].filter(s=>s.selected).map(s=>s.value):(l(i)&&(i=r.filter(l).find(o=>o.checked)),i.value):i.innerHTML}function V(t,e,n,r){let i=j(t,e);if(i.length===0)return;let o=i[0];if(c(o)){let s=O(n);i.filter(c).forEach(u=>u.checked=s.has(u.value)||s.has(u.name));return}if(S(o)){let s=O(n);o.querySelectorAll("option").forEach(u=>u.selected=s.has(u.value));return}if(l(o)){i.filter(l).forEach(s=>s.checked=s.value===n);return}i.forEach(s=>C(s,n,r))}function C(t,e,n){n?t.setAttribute(n,e):U(t)?t.value=e:t.innerHTML=e}function j(t,e){let n=t.querySelectorAll(e);return n.length===0&&console.warn(`No elements found matching selector ${e}`),[...n]}function P(t){if(typeof t!="string"||t.length===0)throw"'prop' argument must be a String defining the name a property."}function w({nameWithDash:t,html:e,css:n,display:r,propertyList:i,actionList:o,eventHandlerList:s}){let u=class extends HTMLElement{constructor(){super();F(this,e,n,r),this.properties=q(this,i),this.actions=M(this,o),W(this,s)}};customElements.define(t,u)}function q(t,e){let n={};return R(e)&&e.forEach(r=>I(n,r,t)),n}function I(t,e,n){e.sel&&a({obj:t,prop:e.name,sel:e.sel,attr:e.attr,root:n.shadowRoot}),t[e.name]=e.value}function R(t){if(!t)return!1;if(!Array.isArray(t))throw"propertyList must be an array of {name, value, [sel], [attr]} objects";return!0}function M(t,e){let n={};return e&&e.forEach(r=>{r.name&&r.action&&(n[r.name]=r.action.bind(t))}),n}function W(t,e){if(!!e){if(!Array.isArray(e))throw"eventHandlerList must be an array of {sel, eventName, listener} objects";e.forEach(n=>{b(n.sel,t.shadowRoot).forEach(i=>{i.addEventListener(n.eventName,o=>{n.listener(o,t)})})})}}function F(t,e,n,r){e=B(t,e);let i=t.attachShadow({mode:"open"}),o=E(z(n,r)+e);i.append(...o)}function B(t,e){return g(e)?e(t):e}function z(t,e){return J(e)+G(t)}function G(t){return t=f(t),t.length===0?"":(p(t,"<style>",!1)||(t=A({name:"style",content:t})),t)}function J(t){return t=f(t),t.length===0?"":`
  <style>
    :host { display: ${t};}
    :host([hidden]) {display: none;}
  </style>
  `}return H;})();
