// webitem.js Library to simplify creating HTML5 Custom Elements
// https://github.com/ahabra/webitem
// Copyright 2021 (C) Abdul Habra. Version 0.4.0.
// Apache License Version 2.0


var webitem=(()=>{var ee=Object.defineProperty;var te=(e,t)=>{for(var n in t)ee(e,n,{get:t[n],enumerable:!0})};var He={};te(He,{defineElement:()=>U});var ne=Object.defineProperty,g=(e,t)=>{for(var n in t)ne(e,n,{get:t[n],enumerable:!0})},l={};g(l,{add:()=>se,all:()=>O,classPresentIf:()=>ce,createElement:()=>oe,createElements:()=>x,first:()=>ie,getAttributes:()=>ue,id:()=>re,removeElements:()=>ae,setContent:()=>fe,tag:()=>N});var d={};g(d,{equals:()=>P,forEachEntry:()=>v,has:()=>me,isDate:()=>b,isFunction:()=>T,isInteger:()=>de,isNil:()=>le,isNumber:()=>$,isRegExp:()=>R,isString:()=>p});function le(e){return e==null}function p(e){return m(e,"String")}function T(e){return m(e,"Function")}function b(e){return m(e,"Date")}function $(e){return m(e,"Number")?Number.isNaN(e)?!1:Number.isFinite(e):!p(e)||(e=e.trim(),e==="")?!1:!isNaN(e)}function de(e){return $(e)?Number.isInteger(Number.parseFloat(e)):!1}function R(e){return m(e,"RegExp")}function m(e,t){return Object.prototype.toString.call(e)===`[object ${t}]`}function v(e,t){if(!(!e||!t)){if(Array.isArray(e)){e.forEach((n,r)=>{t(r,n)});return}Object.entries(e).forEach(n=>t(n[0],n[1]))}}function me(e,t){return!e||!t?!1:Object.prototype.hasOwnProperty.call(e,t)}function P(e,t){return e===t?!0:e===void 0||t===void 0?!1:he(e,t)}function he(e,t){return q(e)||q(t)?e===t:ge(e,t)}var pe=new Set(["boolean","number","bigint","string","symbol"]);function q(e){return pe.has(typeof e)}function ge(e,t){return ye(e,t)?Ee(e,t)?!0:we(e,t):!1}function ye(e,t){return j(e)===j(t)}function j(e){return Object.prototype.toString.call(e)}function Ee(e,t){return b(e)&&b(t)?e.getTime()===t.getTime():!1}function we(e,t){let n=Object.keys(e);return n.length!==Object.keys(t).length?!1:n.every(r=>P(e[r],t[r]))}function re(e,t=document){return S(t)&&(t=t.shadowRoot),t.getElementById(e)}function O(e,t=document){return S(t)&&(t=t.shadowRoot),Array.from(t.querySelectorAll(e))}function ie(e,t=document){if(S(t)&&(t=t.shadowRoot),!e.includes("/"))return t.querySelector(e);let n=e.split("/").map(r=>r.trim()).filter(r=>r.length>0);for(let r of n)if(t=be(r,t),t===null)break;return t}function be(e,t){return e==="shadowRoot"||e==="shadow-root"?t.shadowRoot:t.querySelector(e)}function S(e){return e&&e.shadowRoot&&e.tagName.includes("-")}function ue(e){let t={},n=e.attributes;if(!n||n.length===0)return t;for(let r=0;r<n.length;r++){let i=n[r];t[i.name]=i.value}return t}function x(e=""){if(e=e.trim(),!e)return[];let t=document.createElement("template");return t.innerHTML=e,Array.from(t.content.childNodes)}function oe(e,t={},n=""){let r=N(e,t,n),i=x(r);return i.length===0?null:i[0]}function N(e,t={},n=""){if(!e)return"";let r=ve(t);return`<${e}${r}>${n}</${e}>`}function ve(e){let t=[];return v(e,(r,i)=>{t.push(`${r}="${i}"`)}),(t.length>0?" ":"")+t.join(" ")}var Se=new Set(["beforebegin","afterbegin","beforeend","afterend"]);function se(e,t,n="beforeend"){return n=n.toLowerCase(),Se.has(n)?(p(t)?e.insertAdjacentHTML(n,t):Ae(e,t,n),!0):!1}function Ae(e,t,n){Array.isArray(t)?t.forEach(r=>e.insertAdjacentElement(n,r)):e.insertAdjacentElement(n,t)}function fe(e,...t){e.innerHTML="",e.append(...t)}function ae(e,t=document){O(e,t).forEach(r=>{r.parentNode.removeChild(r)})}function ce(e,t,n){if(!e)return;let r=n?"add":"remove";e.classList[r](t)}var h={};g(h,{endsWith:()=>F,indexOf:()=>A,indexOfFirstMatch:()=>Le,indexOfLastMatch:()=>Ce,isEmpty:()=>H,removePrefix:()=>W,removeSuffix:()=>D,removeSurrounding:()=>Oe,replaceAll:()=>_,replaceTemplate:()=>Te,startsWith:()=>M,substringAfter:()=>xe,substringBefore:()=>Ne,trim:()=>L});function A(e,t,n=0,r=!1){return e?r?e.toLowerCase().indexOf(t.toLowerCase(),n):e.indexOf(t,n):-1}function Le(e,t){return!t||!e?-1:e.split("").findIndex(t)}function Ce(e,t){if(!t||!e)return-1;let n=e.split("");for(let r=n.length;r>=0;--r)if(t(n[r],r))return r;return-1}function M(e="",t=void 0,n=!1){if(n){let r=e.substring(0,t.length).toLowerCase();return t.toLowerCase()===r}return e.startsWith(t)}function F(e,t,n=!1){return n?e.toLowerCase().endsWith(t.toLowerCase()):e.endsWith(t)}function W(e,t,n=!1){return M(e,t,n)&&(e=e.substring(t.length)),e}function D(e,t,n=!1){return F(e,t,n)&&(e=e.substring(0,e.length-t.length)),e}function Oe(e,t,n,r=!1){return D(W(e,t,r),n,r)}function xe(e,t,n=!1){if(!t)return e;let r=A(e,t,0,n);return r<0?"":e.substring(r+t.length)}function Ne(e,t,n=!1){if(!t)return"";let r=A(e,t,0,n);return r<0?e:e.substring(0,r)}function L(e){return H(e)?"":(p(e)||(e=String(e)),e.trim(e))}function H(e){return e==null||e===""}function _(e,t,n){if(T(String.prototype.replaceAll))return e.replaceAll(t,n);if(R(t))return e.replace(t,n);let r=new RegExp(t,"g");return e.replace(r,n)}function Te(e="",t={},n="${",r="}"){return v(t,(i,u)=>{u!==void 0&&(i=n+i+r,e=_(e,i,u))}),e}var $e={};g($e,{compareLines:()=>Re});function Re(e,t,{trim:n=!0,skipEmpty:r=!0,caseSensitive:i=!0}={trim:!0,skipEmpty:!0,caseSensitive:!0}){if(e=V(e,{trim:n,skipEmpty:r}),t=V(t,{trim:n,skipEmpty:r}),e.length!==t.length)return`t1 has ${e.length} lines(s) while t2 has ${t.length} line(s).`;for(let u=0;u<e.length;u++){let o=Pe(e[u],t[u],u,i);if(o.length>0)return o}return""}function Pe(e,t,n,r){let i=r?e:e.toLowerCase(),u=r?t:t.toLowerCase();return i!==u?`Line #${n+1} mismatch.
${e}
${t}`:""}function V(e,{trim:t,skipEmpty:n}){return t&&(e=L(e)),e=e.split(`
`),t&&(e=e.map(r=>L(r))),n&&(e=e.filter(r=>!!r)),e}function C({obj:e,prop:t,sel:n,attr:r,root:i,onChange:u}){je(t),e=e||{};let o=e.hasOwnProperty(t)?e[t]:void 0;i=i||document;let s={};return Object.defineProperty(e,t,{get:()=>I({prop:t,sel:n,attr:r,root:i,objNotBound:s}),set:f=>qe({prop:t,value:f,root:i,sel:n,attr:r,objNotBound:s,onChange:u}),configurable:!0,enumerable:!0}),o!==void 0&&(console.info(`Property '${t}' already exists in object. Will override previous definition but retain old value of ${o}.`),e[t]=o),e}var y=e=>e.type==="checkbox",E=e=>e.type==="radio",k=e=>e.tagName.toLowerCase()==="select",B=e=>"value"in e,z=e=>new Set(Array.isArray(e)?e:[e]);function qe({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:u,onChange:o}){if(Me({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:u,onChange:o}),r){Fe(n,r,t,i);return}u[e]=t}function Me({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:u,onChange:o}){if(!o)return;let s=I({prop:e,root:n,sel:r,attr:i,objNotBound:u});s!==t&&o(s,t)}function I({prop:e,root:t,sel:n,attr:r,objNotBound:i}){return n?We(t,n,r):i[e]}function We(e,t,n){let r=G(e,t);if(r.length===0)return null;let i=r[0];if(n)return i.getAttribute(n);if(!B(i))return i.innerHTML;if(y(i))return r.filter(u=>y(u)&&u.checked).map(u=>u.value==="on"?u.name:u.value);if(k(i))return[...i.querySelectorAll("option")].filter(o=>o.selected).map(o=>o.value);if(!(E(i)&&(i=r.filter(E).find(u=>u.checked),!i)))return i.value}function Fe(e,t,n,r){let i=G(e,t);if(i.length===0)return;let u=i[0];if(y(u)){let o=z(n);i.filter(y).forEach(s=>s.checked=o.has(s.value)||o.has(s.name));return}if(k(u)){let o=z(n);u.querySelectorAll("option").forEach(s=>s.selected=o.has(s.value));return}if(E(u)){i.filter(E).forEach(o=>o.checked=o.value===n);return}i.forEach(o=>De(o,n,r))}function De(e,t,n){n?e.setAttribute(n,t):B(e)?e.value=t:e.innerHTML=t}function G(e,t){let n=e.querySelectorAll(t);return n.length===0&&console.warn(`No elements found matching selector ${t}`),[...n]}function je(e){if(typeof e!="string"||e.length===0)throw"'prop' argument must be a String defining the name a property."}function U({nameWithDash:e,html:t,css:n,display:r,propertyList:i,actionList:u,eventHandlerList:o}){if(customElements.get(e))return!1;let s=class extends HTMLElement{constructor(){super();let a=this;ke(this,t,n,r),this.wi={},this.wi.properties=_e(this,i),this.wi.actions=Ve(this,u),Ie(this,o),this.wi.addProperty=function(f,c,w,X,Y){let Z={name:f,value:c,sel:w,attr:X,onChange:Y};J(a.wi.properties,Z,a)},this.wi.addAction=(f,c)=>K(a,a.wi.actions,f,c),this.wi.addEventListener=(f,c,w)=>Q(a,{sel:f,eventName:c,listener:w})}};return customElements.define(e,s),!0}function _e(e,t){let n={};return Be(t)&&t.forEach(r=>J(n,r,e)),n}function J(e,t,n){let r=ze(t,n);C({obj:e,prop:t.name,sel:t.sel,attr:t.attr,root:n.shadowRoot,onChange:r}),t.value!==void 0&&(e[t.name]=t.value)}function ze(e,t){if(!!e.onChange)return(n,r)=>e.onChange(t,n,r)}function Be(e){if(!e)return!1;if(!Array.isArray(e))throw"propertyList must be an array of {name, value, [sel], [attr]} objects";return!0}function Ve(e,t){let n={};return t&&t.forEach(r=>{K(e,n,r.name,r.action)}),n}function K(e,t,n,r){!d.isString(n)||!d.isFunction(r)||(t[n]=r.bind(e))}function Ie(e,t){if(!!t){if(!Array.isArray(t))throw"eventHandlerList must be an array of {sel, eventName, listener} objects";t.forEach(n=>Q(e,n))}}function Q(e,{sel:t,eventName:n,listener:r}){l.all(t,e.shadowRoot).forEach(u=>{u.addEventListener(n,o=>{r(o,e)})})}function ke(e,t,n,r){t=Ge(e,t);let i=e.attachShadow({mode:"open"}),u=l.createElements(Je(n,r)+t);i.append(...u)}function Ge(e,t){return d.isFunction(t)?t(e):t}function Je(e,t){return Qe(t)+Ke(e)}function Ke(e){return e=h.trim(e),e.length===0?"":(h.startsWith(e,"<style>",!1)||(e=l.tag("style",{},e)),e)}function Qe(e){return e=h.trim(e),e.length===0?"":`
  <style>
    :host { display: ${e};}
    :host([hidden]) {display: none;}
  </style>
  `}return He;})();
