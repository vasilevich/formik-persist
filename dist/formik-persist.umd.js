!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("react"),require("formik")):"function"==typeof define&&define.amd?define(["exports","react","formik"],e):e(t.FormikPersist={},t.React,t.formik)}(this,function(t,e,r){"use strict";var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};function v(){return y.Date.now()}var o="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},i=NaN,f="[object Symbol]",u=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,c=/^0o[0-7]+$/i,p=parseInt,l="object"==typeof o&&o&&o.Object===Object&&o,o="object"==typeof self&&self&&self.Object===Object&&self,y=l||o||Function("return this")(),m=Object.prototype.toString,h=Math.max,O=Math.min;function w(t){var e=typeof t;return t&&("object"==e||"function"==e)}function j(t){if("number"==typeof t)return t;if("symbol"==typeof(e=t)||!!(r=e)&&"object"==typeof r&&m.call(e)==f)return i;var e,r;if("string"!=typeof(t=w(t)?w(n="function"==typeof t.valueOf?t.valueOf():t)?n+"":n:t))return 0===t?t:+t;t=t.replace(u,"");var n=a.test(t);return n||c.test(t)?p(t.slice(2),n?2:8):s.test(t)?i:+t}var d=function(n,r,t){var o,i,f,u,s,a,c=0,p=!1,l=!1,e=!0;if("function"!=typeof n)throw new TypeError("Expected a function");function y(t){var e=o,r=i;return o=i=void 0,c=t,u=n.apply(r,e)}function m(t){var e=t-a;return void 0===a||r<=e||e<0||l&&f<=t-c}function d(){var t,e=v();if(m(e))return b(e);s=setTimeout(d,(e=r-((t=e)-a),l?O(e,f-(t-c)):e))}function b(t){return s=void 0,e&&o?y(t):(o=i=void 0,u)}function g(){var t=v(),e=m(t);if(o=arguments,i=this,a=t,e){if(void 0===s)return c=e=a,s=setTimeout(d,r),p?y(e):u;if(l)return s=setTimeout(d,r),y(a)}return void 0===s&&(s=setTimeout(d,r)),u}return r=j(r)||0,w(t)&&(p=!!t.leading,l="maxWait"in t,f=l?h(j(t.maxWait)||0,r):f,e="trailing"in t?!!t.trailing:e),g.cancel=function(){void 0!==s&&clearTimeout(s),o=a=i=s=void(c=0)},g.flush=function(){return void 0===s?u:b(v())},g},b=Array.isArray,g=Object.keys,S=Object.prototype.hasOwnProperty,x="undefined"!=typeof Element;function k(t,e){try{return function t(e,r){if(e===r)return!0;if(e&&r&&"object"==typeof e&&"object"==typeof r){var n,o,i=b(e),f=b(r);if(i&&f){if((u=e.length)!=r.length)return!1;for(n=u;0!=n--;)if(!t(e[n],r[n]))return!1;return!0}if(i!=f)return!1;if(i=e instanceof Date,f=r instanceof Date,i!=f)return!1;if(i&&f)return e.getTime()==r.getTime();if(i=e instanceof RegExp,f=r instanceof RegExp,i!=f)return!1;if(i&&f)return e.toString()==r.toString();var u,s=g(e);if((u=s.length)!==g(r).length)return!1;for(n=u;0!=n--;)if(!S.call(r,s[n]))return!1;if(x&&e instanceof Element&&r instanceof Element)return e===r;for(n=u;0!=n--;)if(!("_owner"===(o=s[n])&&e.$$typeof||t(e[o],r[o])))return!1;return!0}return e!=e&&r!=r}(t,e)}catch(t){if(t.message&&t.message.match(/stack|recursion/i)||-2146828260===t.number)return console.warn("Warning: react-fast-compare does not handle circular references.",t.name,t.message),0;throw t}}var _,P,E,e=(_=e.Component,n(P=F,E=_),P.prototype=null===E?Object.create(E):(T.prototype=E.prototype,new T),F.prototype.componentDidUpdate=function(t){k(t.formik,this.props.formik)||this.saveForm(this.props.formik)},F.prototype.componentDidMount=function(){var t=(this.props.isSessionStorage?window.sessionStorage:window.localStorage).getItem(this.props.name);t&&null!==t&&this.props.formik.setFormikState(JSON.parse(t))},F.prototype.render=function(){return null},F.defaultProps={debounce:300,persistFilter:function(t){t.isSubmitting;return function(t,e){var r={};for(o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(r[o]=t[o]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,o=Object.getOwnPropertySymbols(t);n<o.length;n++)e.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(t,o[n])&&(r[o[n]]=t[o[n]]);return r}(t,["isSubmitting"])}},F);function T(){this.constructor=P}function F(){var e=null!==_&&_.apply(this,arguments)||this;return e.saveForm=d(function(t){t=e.props.persistFilter(t);(e.props.isSessionStorage?window.sessionStorage:window.localStorage).setItem(e.props.name,JSON.stringify(t))},e.props.debounce),e}e=r.connect(e);t.Persist=e,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=formik-persist.umd.js.map
