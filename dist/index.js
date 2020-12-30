Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react/jsx-runtime"),n=require("react"),r=require("immer");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var u=t(n),o=function(){return(o=Object.assign||function(e){for(var n,r=1,t=arguments.length;r<t;r++)for(var u in n=arguments[r])Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u]);return e}).apply(this,arguments)},c=function(e,t){var o=n.useRef(function(e){var n=new Set;return e.forEach((function(e){return n.add(e.name)})),Array.from(n)}(e).map((function(e){return{name:e,ref:u.default.createRef()}}))),c=n.useRef([]),f=n.useRef(""),a=function(e){for(var n=0,r=o.current;n<r.length;n++){var t=r[n];if(t.name===e)return t.ref}return null},i=function(n){c.current=function(e,n){return r.produce(n,(function(n){!n.includes(e)&&n.push(e)}))}(n.key,c.current);var t=function(e,n,r){for(var t=0,u=e;t<u.length;t++)for(var o=u[t],c=0,f=o.keys;c<f.length;c++){var a=f[c],i=a.length===n.length&&a.reduce((function(e,r){return!!e&&n.includes(r)}),!0),s=o.previous,l=r===o.previous;if(s?l&&i:i)return[!0,o]}return[!1,null]}(e,c.current,f.current),u=t[0],o=t[1];if(u&&o){var i=a(o.name);i&&i.current&&i.current.focus()}},s=function(e){c.current=function(e,n){return r.produce(n,(function(n){return n.filter((function(n){return n!==e}))}))}(e.key,c.current)};return n.useEffect((function(){t&&(window.onkeydown=i,window.onkeyup=s)}),[]),{getRef:a,handleFocus:function(e){f.current=e.target.name},handleKeyDown:i,handleKeyUp:s,focus:function(e){var n=a(e);n&&n.current&&n.current.focus()}}};
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
***************************************************************************** */exports.EventBoundary=function(r){var t=r.targets,u=r.initialFocus,f=r.children,a=r.className,i=r.style,s=c(t,!1),l=s.getRef,d=s.handleKeyDown,p=s.handleKeyUp,v=s.handleFocus,y=s.focus;return n.useEffect((function(){y(u)}),[]),e.jsx("div",o({onKeyDown:d,onKeyUp:p,className:a,style:o({outline:"none"},i),tabIndex:1e3},{children:f.map((function(e){return function(e){switch(e){case"input":case"textarea":return!0;default:return!1}}(e.type)?function(e,r,t){return n.cloneElement(e,{ref:r,onFocus:t})}(e,l(e.props.name),v):e}))}),void 0)},exports.useFocusTarget=c;
//# sourceMappingURL=index.js.map
