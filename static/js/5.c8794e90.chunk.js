webpackJsonp([5],{131:function(e,n,t){"use strict";function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function r(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}function i(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}Object.defineProperty(n,"__esModule",{value:!0});var c=t(44),l=t.n(c),d=t(391),u=t(217),s=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),f=i(["\n    background: white;\n    min-height: 360px;\n    padding: 24px;\n"],["\n    background: white;\n    min-height: 360px;\n    padding: 24px;\n"]),p=i(["\n    margin-top: 20px;\n"],["\n    margin-top: 20px;\n"]),b=[{key:"0",name:"Edward King 0",age:"32",address:"London, Park Lane no. 0"},{key:"1",name:"Edward King 1",age:"32",address:"London, Park Lane no. 1"},{key:"2",name:"Edward King 1",age:"32",address:"London, Park Lane no. 1"},{key:"3",name:"Edward King 1",age:"32",address:"London, Park Lane no. 1"},{key:"4",name:"Edward King 1",age:"32",address:"London, Park Lane no. 1"}],g=[{title:"name",dataIndex:"name",width:"30%",editable:!0},{title:"age",dataIndex:"age"},{title:"address",dataIndex:"address"},{title:"operation",dataIndex:"operation",actions:[{label:"\u67e5\u770b",callback:function(e,n,t){console.log("callback\u7f16\u8f91>>>>",e,n,t)},show:function(e,n,t){return!0}},{label:"\u7f16\u8f91",show:function(e,n,t){return!0}},{label:"\u5220\u9664",callback:function(e,n,t){console.log("callback\u5220\u9664>>>>",e,n,t)},confirm:!0,confirmLabel:"\u786e\u5b9a\u5220\u9664\uff1f",show:function(e,n,t){return!0}}]}],h=u.a.div(f),y=Object(u.a)(d.h)(p),m=function(e){function n(){return a(this,n),o(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return r(n,e),s(n,[{key:"render",value:function(){return l.a.createElement(h,null,l.a.createElement(y,{columns:g,dataSource:b,onCellChange:function(e){console.log("----\x3e",e)}}))}}]),n}(l.a.Component);n.default=m}});
//# sourceMappingURL=5.c8794e90.chunk.js.map