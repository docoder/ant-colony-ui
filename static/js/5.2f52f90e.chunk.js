webpackJsonp([5],{130:function(e,t,l){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0});var i=l(44),u=l.n(i),c=l(390),b=l(216),f=function(){function e(e,t){for(var l=0;l<t.length;l++){var n=t[l];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,l,n){return l&&e(t.prototype,l),n&&e(t,n),t}}(),p=o(["\n    background: white;\n    min-height: 360px;\n    padding: 24px;\n"],["\n    background: white;\n    min-height: 360px;\n    padding: 24px;\n"]),d=o(["\n    margin-top: 20px;\n"],["\n    margin-top: 20px;\n"]),s=[{key:"field1",label:"\u5b57\u6bb51",required:!0},{key:"field2",label:"\u5b57\u6bb52",required:!0,type:"select",meta:{data:[{value:"a",label:"A"},{value:"b",label:"B"},{value:"c",label:"C"},{value:"d",label:"D"}],showSearch:!0}},{key:"field3",label:"\u5b57\u6bb53",required:!0,type:"select",meta:{ref:"field2",data:function(e){return{a:[{value:"a0",label:"A0"},{value:"a1",label:"A1"},{value:"a2",label:"A2"}],b:[{value:"b0",label:"B0"},{value:"b1",label:"B1"},{value:"b2",label:"B2"}],c:[{value:"c0",label:"C0"},{value:"c1",label:"C1"},{value:"c2",label:"C2"}],d:[{value:"d0",label:"D0"},{value:"d1",label:"D1"},{value:"d2",label:"D2"}]}[e]},showSearch:!0}},{key:"field4",label:"\u5b57\u6bb54",type:"textArea"},{key:"field5",label:"\u5b57\u6bb55"},{key:"field6",label:"\u5b57\u6bb56",required:!0,reg:{pattern:/^([1-9]+(\.\d+)?|0\.\d+)$/,message:"\u8bf7\u8f93\u6b63\u7684\u6570\u5b57\u5141\u8bb8\u5c0f\u6570"}},{key:"field7",label:"\u5b57\u6bb57"}],y=b.a.div(p),v=Object(b.a)(c.c)(d),h=function(e){function t(){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),f(t,[{key:"render",value:function(){return u.a.createElement(y,null,u.a.createElement(v,{forms:s,collapse:!0,onSubmit:function(e){console.log("====>",e)},actionDirection:"right"}))}}]),t}(u.a.Component);t.default=h}});
//# sourceMappingURL=5.2f52f90e.chunk.js.map