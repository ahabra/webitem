// webitem.js Library to simplify creating HTML5 Custom Elements
// https://github.com/ahabra/webitem
// Copyright 2021 (C) Abdul Habra. Version 0.4.0.
// Apache License Version 2.0


var webitem=(()=>{var ee=Object.defineProperty;var te=(e,t)=>{for(var n in t)ee(e,n,{get:t[n],enumerable:!0})};var tt={};te(tt,{defineElement:()=>Be});var ne=Object.defineProperty,g=(e,t)=>{for(var n in t)ne(e,n,{get:t[n],enumerable:!0})},l={};g(l,{add:()=>be,all:()=>P,classPresentIf:()=>Ae,createElement:()=>pe,createElements:()=>q,first:()=>me,getAttributes:()=>ge,id:()=>de,removeElements:()=>ve,setContent:()=>Se,tag:()=>M});var d={};g(d,{equals:()=>$,forEachEntry:()=>v,has:()=>ue,isDate:()=>S,isFunction:()=>C,isInteger:()=>ie,isNil:()=>re,isNumber:()=>N,isRegExp:()=>T,isString:()=>p});function re(e){return e==null}function p(e){return m(e,"String")}function C(e){return m(e,"Function")}function S(e){return m(e,"Date")}function N(e){return m(e,"Number")?Number.isNaN(e)?!1:Number.isFinite(e):!p(e)||(e=e.trim(),e==="")?!1:!isNaN(e)}function ie(e){return N(e)?Number.isInteger(Number.parseFloat(e)):!1}function T(e){return m(e,"RegExp")}function m(e,t){return Object.prototype.toString.call(e)===`[object ${t}]`}function v(e,t){if(!(!e||!t)){if(Array.isArray(e)){e.forEach((n,r)=>{t(r,n)});return}Object.entries(e).forEach(n=>t(n[0],n[1]))}}function ue(e,t){return!e||!t?!1:Object.prototype.hasOwnProperty.call(e,t)}function $(e,t){return e===t?!0:e===void 0||t===void 0?!1:oe(e,t)}function oe(e,t){return R(e)||R(t)?e===t:se(e,t)}var fe=new Set(["boolean","number","bigint","string","symbol"]);function R(e){return fe.has(typeof e)}function se(e,t){return ae(e,t)?ce(e,t)?!0:le(e,t):!1}function ae(e,t){return j(e)===j(t)}function j(e){return Object.prototype.toString.call(e)}function ce(e,t){return S(e)&&S(t)?e.getTime()===t.getTime():!1}function le(e,t){let n=Object.keys(e);return n.length!==Object.keys(t).length?!1:n.every(r=>$(e[r],t[r]))}function de(e,t=document){return A(t)&&(t=t.shadowRoot),t.getElementById(e)}function P(e,t=document){return A(t)&&(t=t.shadowRoot),Array.from(t.querySelectorAll(e))}function me(e,t=document){if(A(t)&&(t=t.shadowRoot),!e.includes("/"))return t.querySelector(e);let n=e.split("/").map(r=>r.trim()).filter(r=>r.length>0);for(let r of n)if(t=he(r,t),t===null)break;return t}function he(e,t){return e==="shadowRoot"||e==="shadow-root"?t.shadowRoot:t.querySelector(e)}function A(e){return e&&e.shadowRoot&&e.tagName.includes("-")}function ge(e){let t={},n=e.attributes;if(!n||n.length===0)return t;for(let r=0;r<n.length;r++){let i=n[r];t[i.name]=i.value}return t}function q(e=""){if(e=e.trim(),!e)return[];let t=document.createElement("template");return t.innerHTML=e,Array.from(t.content.childNodes)}function pe(e,t={},n=""){let r=M(e,t,n),i=q(r);return i.length===0?null:i[0]}function M(e,t={},n=""){if(!e)return"";let r=ye(t);return`<${e}${r}>${n}</${e}>`}function ye(e){let t=[];return v(e,(r,i)=>{t.push(`${r}="${i}"`)}),(t.length>0?" ":"")+t.join(" ")}var Ee=new Set(["beforebegin","afterbegin","beforeend","afterend"]);function be(e,t,n="beforeend"){return n=n.toLowerCase(),Ee.has(n)?(p(t)?e.insertAdjacentHTML(n,t):we(e,t,n),!0):!1}function we(e,t,n){Array.isArray(t)?t.forEach(r=>e.insertAdjacentElement(n,r)):e.insertAdjacentElement(n,t)}function Se(e,...t){e.innerHTML="",e.append(...t)}function ve(e,t=document){P(e,t).forEach(r=>{r.parentNode.removeChild(r)})}function Ae(e,t,n){if(!e)return;let r=n?"add":"remove";e.classList[r](t)}var h={};g(h,{endsWith:()=>F,indexOf:()=>L,indexOfFirstMatch:()=>Le,indexOfLastMatch:()=>xe,isEmpty:()=>y,removePrefix:()=>W,removeSuffix:()=>D,removeSurrounding:()=>Oe,replaceAll:()=>H,replaceTemplate:()=>Te,startsWith:()=>_,strip:()=>je,stripEnd:()=>Re,stripStart:()=>$e,substringAfter:()=>Ce,substringBefore:()=>Ne,trim:()=>x});function L(e,t,n=0,r=!1){return e?r?e.toLowerCase().indexOf(t.toLowerCase(),n):e.indexOf(t,n):-1}function Le(e,t){return!t||!e?-1:e.split("").findIndex(t)}function xe(e,t){if(!t||!e)return-1;let n=e.split("");for(let r=n.length;r>=0;--r)if(t(n[r],r))return r;return-1}function _(e="",t=void 0,n=!1){if(n){let r=e.substring(0,t.length).toLowerCase();return t.toLowerCase()===r}return e.startsWith(t)}function F(e,t,n=!1){return n?e.toLowerCase().endsWith(t.toLowerCase()):e.endsWith(t)}function W(e,t,n=!1){return _(e,t,n)&&(e=e.substring(t.length)),e}function D(e,t,n=!1){return F(e,t,n)&&(e=e.substring(0,e.length-t.length)),e}function Oe(e,t,n,r=!1){return D(W(e,t,r),n,r)}function Ce(e,t,n=!1){if(!t)return e;let r=L(e,t,0,n);return r<0?"":e.substring(r+t.length)}function Ne(e,t,n=!1){if(!t)return"";let r=L(e,t,0,n);return r<0?e:e.substring(0,r)}function x(e){return y(e)?"":(p(e)||(e=String(e)),e.trim(e))}function y(e){return e==null||e===""}function H(e,t,n){if(C(String.prototype.replaceAll))return e.replaceAll(t,n);if(T(t))return e.replace(t,n);let r=new RegExp(t,"g");return e.replace(r,n)}function Te(e="",t={},n="${",r="}"){return v(t,(i,u)=>{u!==void 0&&(i=n+i+r,e=H(e,i,u))}),e}function $e(e,t=""){return y(e)?"":t?V(e,new Set(Array.from(t))):e}function V(e,t){for(let n=0;n<e.length;n++)if(!t.has(e.charAt(n)))return e.substring(n);return""}function Re(e,t=""){return y(e)?"":t?I(e,new Set(Array.from(t))):e}function I(e,t){for(let n=e.length-1;n>=0;n--)if(!t.has(e.charAt(n)))return e.substring(0,n+1);return""}function je(e,t=""){if(e===void 0||e==="")return"";if(!t)return e;let n=new Set(Array.from(t));return e=V(e,n),e?I(e,n):""}var Pe={};g(Pe,{compareLines:()=>qe});function qe(e,t,{trim:n=!0,skipEmpty:r=!0,caseSensitive:i=!0}={trim:!0,skipEmpty:!0,caseSensitive:!0}){if(e=k(e,{trim:n,skipEmpty:r}),t=k(t,{trim:n,skipEmpty:r}),e.length!==t.length)return`t1 has ${e.length} lines(s) while t2 has ${t.length} line(s).`;for(let u=0;u<e.length;u++){let o=Me(e[u],t[u],u,i);if(o.length>0)return o}return""}function Me(e,t,n,r){let i=r?e:e.toLowerCase(),u=r?t:t.toLowerCase();return i!==u?`Line #${n+1} mismatch.
${e}
${t}`:""}function k(e,{trim:t,skipEmpty:n}){return t&&(e=x(e)),e=e.split(`
`),t&&(e=e.map(r=>x(r))),n&&(e=e.filter(r=>!!r)),e}function O({obj:e={},prop:t,sel:n,attr:r,root:i=document,getter:u,setter:o,onChange:f}){ke(t),Fe(e,t);let s={};return u||(u=()=>We({prop:t,sel:n,attr:r,root:i,objNotBound:s})),o||(o=a=>De({prop:t,value:a,root:i,sel:n,attr:r,objNotBound:s})),_e({obj:e,prop:t,getter:u,setter:o,onChange:f})}function _e({obj:e,prop:t,getter:n,setter:r,onChange:i}){return Object.defineProperty(e,t,{get:()=>n(),set:o=>{if(i){let f=n(t);f!==o&&i(f,o)}r(o)},configurable:!0,enumerable:!0}),e}var E=e=>e.type==="checkbox",b=e=>e.type==="radio",B=e=>e.tagName.toLowerCase()==="select",z=e=>"value"in e,G=e=>new Set(Array.isArray(e)?e:[e]);function Fe(e,t){let n=e[t];return n!==void 0&&(console.info(`Property '${t}' already exists in object. Will override previous definition but retain old value of ${n}.`),e[t]=n),n}function We({prop:e,root:t,sel:n,attr:r,objNotBound:i}){return n?He(t,n,r):i[e]}function De({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:u}){if(r){Ve(n,r,t,i);return}u[e]=t}function He(e,t,n){let r=J(e,t);if(r.length===0)return null;let i=r[0];if(n)return i.getAttribute(n);if(!z(i))return i.innerHTML;if(E(i))return r.filter(u=>E(u)&&u.checked).map(u=>u.value==="on"?u.name:u.value);if(B(i))return[...i.querySelectorAll("option")].filter(o=>o.selected).map(o=>o.value);if(!(b(i)&&(i=r.filter(b).find(u=>u.checked),!i)))return i.value}function Ve(e,t,n,r){let i=J(e,t);if(i.length===0)return;let u=i[0];if(E(u)){let o=G(n);i.filter(E).forEach(f=>f.checked=o.has(f.value)||o.has(f.name));return}if(B(u)){let o=G(n);u.querySelectorAll("option").forEach(f=>f.selected=o.has(f.value));return}if(b(u)){i.filter(b).forEach(o=>o.checked=o.value===n);return}i.forEach(o=>Ie(o,n,r))}function Ie(e,t,n){n?e.setAttribute(n,t):z(e)?e.value=t:e.innerHTML=t}function J(e,t){let n=e.querySelectorAll(t);return n.length===0&&console.warn(`No elements found matching selector ${t}`),[...n]}function ke(e){if(typeof e!="string"||e.length===0)throw"'prop' argument must be a String defining the name a property."}function Be({nameWithDash:e,html:t,css:n,display:r,propertyList:i,actionList:u,eventHandlerList:o}){if(customElements.get(e))return!1;let f=class extends HTMLElement{constructor(){super();let s=this;Ue(this,t,n,r),this.wi={},this.wi.properties=ze(this,i),this.wi.actions=Ke(this,u),Qe(this,o),this.wi.addProperty=function(a,c,w,X,Y){let Z={name:a,value:c,sel:w,attr:X,onChange:Y};K(s.wi.properties,Z,s)},this.wi.addAction=(a,c)=>Q(s,s.wi.actions,a,c),this.wi.addEventListener=(a,c,w)=>U(s,{sel:a,eventName:c,listener:w})}};return customElements.define(e,f),!0}function ze(e,t){let n={};return Je(t)&&t.forEach(r=>K(n,r,e)),n}function K(e,t,n){let r=Ge(t,n);O({obj:e,prop:t.name,sel:t.sel,attr:t.attr,root:n.shadowRoot,onChange:r}),t.value!==void 0&&(e[t.name]=t.value)}function Ge(e,t){if(!!e.onChange)return(n,r)=>e.onChange(t,n,r)}function Je(e){if(!e)return!1;if(!Array.isArray(e))throw"propertyList must be an array of {name, value, [sel], [attr]} objects";return!0}function Ke(e,t){let n={};return t&&t.forEach(r=>{Q(e,n,r.name,r.action)}),n}function Q(e,t,n,r){!d.isString(n)||!d.isFunction(r)||(t[n]=r.bind(e))}function Qe(e,t){if(!!t){if(!Array.isArray(t))throw"eventHandlerList must be an array of {sel, eventName, listener} objects";t.forEach(n=>U(e,n))}}function U(e,{sel:t,eventName:n,listener:r}){l.all(t,e.shadowRoot).forEach(u=>{u.addEventListener(n,o=>{r(o,e)})})}function Ue(e,t,n,r){t=Xe(e,t);let i=e.attachShadow({mode:"open"}),u=l.createElements(Ye(n,r)+t);i.append(...u)}function Xe(e,t){return d.isFunction(t)?t(e):t}function Ye(e,t){return et(t)+Ze(e)}function Ze(e){return e=h.trim(e),e.length===0?"":(h.startsWith(e,"<style>",!1)||(e=l.tag("style",{},e)),e)}function et(e){return e=h.trim(e),e.length===0?"":`
  <style>
    :host { display: ${e};}
    :host([hidden]) {display: none;}
  </style>
  `}return tt;})();
