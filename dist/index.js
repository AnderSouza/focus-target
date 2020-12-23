Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react/jsx-runtime"),n=require("react"),r=require("immer");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var u=t(n),o=function(){return(o=Object.assign||function(e){for(var n,r=1,t=arguments.length;r<t;r++)for(var u in n=arguments[r])Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u]);return e}).apply(this,arguments)},c=function(e){var n=new Set;return e.forEach((function(e){return n.add(e.name)})),Array.from(n)},a=[],i="",f={current:[]},l=function(e,n){var t=function(e){for(var n=0,r=f.current;n<r.length;n++){var t=r[n];if(t.name===e)return t.ref}return null},o=function(n){a=function(e,n){return r.produce(n,(function(n){!n.includes(e)&&n.push(e)}))}(n.key,a);var u=function(e,n,r){for(var t=0,u=e;t<u.length;t++)for(var o=u[t],c=0,a=o.keys;c<a.length;c++){var i=a[c],f=i.length===n.length&&i.reduce((function(e,r){return!!e&&n.includes(r)}),!0),l=o.previous,s=r===o.previous;if(l?s&&f:f)return[!0,o]}return[!1,null]}(e,a,i),o=u[0],c=u[1];if(o&&c){var f=t(c.name);f&&f.current&&f.current.focus()}},l=function(e){a=function(e,n){return r.produce(n,(function(n){return n.filter((function(n){return n!==e}))}))}(e.key,a)};return f.current.length||(f={current:c(e).map((function(e){return{name:e,ref:u.default.createRef()}}))},n&&(window.onkeydown=o,window.onkeyup=l)),{getRef:t,handleFocus:function(e){i=e.target.name},handleKeyDown:o,handleKeyUp:l,focus:function(e){var n=t(e);n&&n.current&&n.current.focus()}}};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */exports.EventBoundary=function(r){var t=r.targets,u=r.initialFocus,c=r.children,a=r.className,i=r.style,f=l(t,!1),s=f.getRef,d=f.handleKeyDown,p=f.handleKeyUp,v=f.handleFocus,y=f.focus;return n.useEffect((function(){y(u)}),[]),e.jsx("div",o({onKeyDown:d,onKeyUp:p,className:a,style:o({outline:"none"},i),tabIndex:1e3},{children:c.map((function(e){return function(e){switch(e){case"input":case"textarea":return!0;default:return!1}}(e.type)?function(e,r,t){return n.cloneElement(e,{ref:r,onFocus:t})}(e,s(e.props.name),v):e}))}),void 0)},exports.FocusTarget=l;
//# sourceMappingURL=index.js.map
