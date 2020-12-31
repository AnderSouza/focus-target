Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react/jsx-runtime"),n=require("react"),r=require("immer");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var u=t(n),c=function(){return(c=Object.assign||function(e){for(var n,r=1,t=arguments.length;r<t;r++)for(var u in n=arguments[r])Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u]);return e}).apply(this,arguments)},o=function(e,t){var c=n.useRef(function(e){var n=new Set;return e.forEach((function(e){return n.add(e.name)})),Array.from(n)}(e).map((function(e){return{name:e,ref:u.default.createRef()}}))),o=n.useRef([]),f=n.useRef(""),a=function(e){for(var n=0,r=c.current;n<r.length;n++){var t=r[n];if(t.name===e)return t.ref}},i=function(n){console.clear(),o.current=function(e,n){return r.produce(n,(function(n){!n.includes(e)&&n.push(e)}))}(n.key,o.current);var t=function(e,n,r){for(var t=0,u=e;t<u.length;t++)for(var c=u[t],o=0,f=c.keys;o<f.length;o++){var a=f[o],i=a.length===n.length&&a.reduce((function(e,r){return!!e&&n.includes(r)}),!0),s=c.previous,l=r===c.previous;if(s?l&&i:i)return[!0,c]}return[!1,null]}(e,o.current,f.current),u=t[0],c=t[1];if(u&&c){var i=a(c.name);i&&i.current&&i.current.focus()}},s=function(e){o.current=function(e,n){return r.produce(n,(function(n){return n.filter((function(n){return n!==e}))}))}(e.key,o.current)};return n.useEffect((function(){t&&(window.onkeydown=i,window.onkeyup=s)}),[]),{getRef:a,setRef:function(e){if(e&&e.current){var n=e.current.name;c.current.forEach((function(r,t){r.name===n&&(c.current[t].ref=e)}))}},handleFocus:function(e){o.current=[],f.current=e.target.name},handleKeyDown:i,handleKeyUp:s,focus:function(e){var n=a(e);n&&n.current&&n.current.focus()}}};
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
***************************************************************************** */exports.EventBoundary=function(r){var t=r.targets,u=r.initialFocus,f=r.children,a=r.className,i=r.style,s=o(t,!1),l=s.getRef,d=s.handleKeyDown,p=s.handleKeyUp,v=s.handleFocus,y=s.focus;return n.useEffect((function(){y(u)}),[]),e.jsx("div",c({onKeyDown:d,onKeyUp:p,className:a,style:c({outline:"none"},i),tabIndex:1e3},{children:f.map((function(e){return function(e){switch(e){case"input":case"textarea":return!0;default:return!1}}(e.type)?function(e,r,t){return n.cloneElement(e,{ref:r,onFocus:t})}(e,l(e.props.name),v):e}))}),void 0)},exports.useFocusTarget=o;
//# sourceMappingURL=index.js.map
