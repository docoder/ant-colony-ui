webpackJsonp([6],{129:function(e,l,a){"use strict";function t(e){if(Array.isArray(e)){for(var l=0,a=Array(e.length);l<e.length;l++)a[l]=e[l];return a}return Array.from(e)}function n(e,l){if(!(e instanceof l))throw new TypeError("Cannot call a class as a function")}function r(e,l){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!l||"object"!==typeof l&&"function"!==typeof l?e:l}function o(e,l){if("function"!==typeof l&&null!==l)throw new TypeError("Super expression must either be null or a function, not "+typeof l);e.prototype=Object.create(l&&l.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),l&&(Object.setPrototypeOf?Object.setPrototypeOf(e,l):e.__proto__=l)}function i(e,l){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(l)}}))}Object.defineProperty(l,"__esModule",{value:!0});var u=a(44),c=a.n(u),d=a(393),f=a(218),b=function(){function e(e,l){for(var a=0;a<l.length;a++){var t=l[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(l,a,t){return a&&e(l.prototype,a),t&&e(l,t),l}}(),p=i(["\n    background: white;\n    min-height: 360px;\n    padding: 24px;\n"],["\n    background: white;\n    min-height: 360px;\n    padding: 24px;\n"]),s=i(["\n    margin-top: 20px;\n"],["\n    margin-top: 20px;\n"]),y=f.a.div(p),h=Object(f.a)(d.c)(s),v=function(e){function l(e){var a,o;n(this,l);var i=r(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,e));i.renderAccessoryComponent=function(){return c.a.createElement(d.d,{url:"url"})},i.forms=[{key:"header1",type:"header",label:"\u6807\u98981"},{key:"field1",label:"\u5b57\u6bb51",onChange:function(e){console.log("input onChange>>>",e.target.value)},required:!0,placeholder:"\u8fd9\u662f\u6807\u9898"},{key:"field2",label:"\u5b57\u6bb52",required:!0,type:"select",onChange:function(e){console.log("select onChange>>>",e)},meta:{data:[{value:"a",label:"A"},{value:"b",label:"B"},{value:"c",label:"C"},{value:"d",label:"D"}],showSearch:!0}},{key:"field3",label:"\u5b57\u6bb53",required:!0,type:"select",meta:{ref:"field2",data:function(e){return{a:[{value:"a0",label:"A0"},{value:"a1",label:"A1"},{value:"a2",label:"A2"}],b:[{value:"b0",label:"B0"},{value:"b1",label:"B1"},{value:"b2",label:"B2"}],c:[{value:"c0",label:"C0"},{value:"c1",label:"C1"},{value:"c2",label:"C2"}],d:[{value:"d0",label:"D0"},{value:"d1",label:"D1"},{value:"d2",label:"D2"}]}[e]},showSearch:!0}},{key:"field4",label:"\u5b57\u6bb54",type:"textArea",onChange:function(e){console.log("textarea onChange>>>",e.target.value)}},{key:"field5",label:"\u5b57\u6bb55"},{key:"field6",label:"\u5b57\u6bb56",required:!0,reg:{pattern:/^([1-9]+(\.\d+)?|0\.\d+)$/,message:"\u8bf7\u8f93\u6b63\u7684\u6570\u5b57\u5141\u8bb8\u5c0f\u6570"}},{key:"header2",type:"header",label:"\u6807\u98982"},{key:"field7",label:"\u5b57\u6bb57",value:0,type:"select",meta:{data:[{value:"aa",label:"AA"},{value:0,label:"BB"},{value:"cc",label:"CC"},{value:"dd",label:"DD"}],showSearch:!0}},{key:"field8",label:"\u5b57\u6bb58"},{key:"add2",type:"add",addKeys:["field7","field8"]},{key:"header3",type:"header",label:"\u6807\u98983"},{key:"field9",label:"\u5b57\u6bb59"},{key:"field10",label:"\u5b57\u6bb510",value:"text10"},{key:"field11",label:"\u5b57\u6bb511"},{key:"field12",label:"\u5b57\u6bb512"},{key:"field13",label:"\u5b57\u6bb513"},{key:"field14",label:"\u5b57\u6bb514"},{key:"field15",label:"\u5b57\u6bb515"},{key:"field16",label:"\u5b57\u6bb516",disabled:!0}],i.rowColCounts=[2,4,2,1,3,4];var u=i.forms.findIndex(function(e){return"add2"===e.key}),f=[{key:"field7_3",label:"\u5b57\u6bb57",canDelete:!0,value:"field7_3"},{key:"field8_3",label:"\u5b57\u6bb58",canDelete:!0,appendDeleteButton:!0,rowIndex:3},{key:"field7_4",label:"\u5b57\u6bb57",canDelete:!0},{key:"field8_4",label:"\u5b57\u6bb58",canDelete:!0,appendDeleteButton:!0,rowIndex:4,value:"field8_4"}];(a=i.forms).splice.apply(a,[u,0].concat(f));var b=i.rowColCounts[2],p=Math.floor(f.length/b);return(o=i.rowColCounts).splice.apply(o,[3,0].concat(t(Array(p).fill(b)))),i}return o(l,e),b(l,[{key:"render",value:function(){return c.a.createElement(y,null,c.a.createElement(h,{forms:this.forms,collapse:!1,onSubmit:function(e,l){l()},actionDirection:"center",unCollapseCount:13,rowColCounts:this.rowColCounts,labelPostion:"top",addLabel:"\u65b0\u589e",accessoryComponent:this.renderAccessoryComponent,allDisabled:!1}))}}]),l}(c.a.Component);l.default=v}});
//# sourceMappingURL=6.6a1b242f.chunk.js.map