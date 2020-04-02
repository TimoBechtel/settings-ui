function e(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var n=function(e,n){switch(n){case"number":return parseFloat(e);case"text":return e+""}return e},t=function(e,n){var t=e.id,r=e.name,u=e.type,a=void 0===u?"text":u,i=e.help,o=e.defaultValue,l=e.min,c=e.max,p=e.steps,m=[],f=function(e){return document.createElement(e)},d=f("input");d.type=a,d.id=t,"number"===a?("number"==typeof l&&(d.min=l),"number"==typeof c&&(d.max=c),"number"==typeof p&&(d.steps=p)):("number"==typeof l&&(d.minLength=l),"number"==typeof c&&(d.maxLength=c)),d.placeholder=i||o||"",(o||0===o)&&(d.value=o),d.addEventListener("input",function(e){return n(e.target.value)});var s=f("label");return s.innerHTML=r||t,s.htmlFor=t,m.push(s),m.push(d),{htmlElements:m}},r=function(e,n){var t=e.id,r=e.name,u=e.help,a=e.values,i=e.defaultValue,o=[],l=function(e){return document.createElement(e)},c=l("select");c.id=t,c.title=u||"",a.forEach(function(e){var n=l("option");"object"==typeof e?(n.value=e.value,n.innerHTML=e.name):n.value=n.innerHTML=e,c.appendChild(n)}),(i||0===i)&&(c.value=i),c.addEventListener("input",function(e){return n(e.target.value)});var p=document.createElement("label");return p.htmlFor=t,p.innerHTML=r||t,o.push(p),o.push(c),{htmlElements:o}},u=function(e,n){var t=e.id,r=e.defaultValue,u=e.help,a=[];return e.values.forEach(function(e){var i=document.createElement("input");i.type="radio",i.name=t,i.title=u||"";var o=document.createElement("label");"object"==typeof e?(i.value=e.value,i.id=t+"_"+e.value,o.innerHTML=e.name):(i.value=o.innerHTML=e,i.id=t+"_"+e),r+""==i.value+""&&(i.checked=!0),i.addEventListener("click",function(e){return n(e.target.value)}),o.htmlFor=i.id,a.push(i),a.push(o)}),{htmlElements:a}},a=[function(e,n){if("input"===e.inputType)return t(e,n)},function(e,n){if("section"===e.type)return r=(t=e).id,u=t.name,(a=document.createElement("b")).innerHTML=u||r,{htmlElements:[a],superType:!0};var t,r,u,a},function(e,n){if("boolean"===e.type)return function(e,n){var t=e.id,r=e.name,u=e.help,a=e.defaultValue,i=[],o=function(e){return document.createElement(e)},l=o("input");l.type="checkbox",l.id=t,l.title=u||"","boolean"==typeof a&&(l.checked=a),l.addEventListener("input",function(e){return n(e.target.checked)});var c=o("label");return c.innerHTML=r||t,c.htmlFor=t,i.push(l),i.push(c),{htmlElements:i}}(e,n)},function(e,n){if(e.values)return"radio"===e.inputType?u(e,n):"selection"===e.inputType?r(e,n):e.values.length<5?u(e,n):r(e,n)},function(e,n){if("number"===e.type&&!e.values&&"number"==typeof e.min&&"number"==typeof e.max&&(!e.steps||e.steps>=(e.min+e.max)/1e3))return function(e,n){var t=e.id,r=e.name,u=e.help,a=e.defaultValue,i=e.min,o=e.max,l=e.steps,c=[],p=function(e){return document.createElement(e)},m=p("input");m.type="range",m.id=t,m.min=i||0,(o||0===o)&&(m.max=o),l&&(m.step=l),m.placeholder=u||a||"",(a||0===a)&&(m.value=a);var f=p("label");f.innerHTML=r||t,f.htmlFor=t;var d=p("output");return d.innerHTML=m.value,m.addEventListener("input",function(e){d.innerHTML=e.target.value,n(e.target.value)}),c.push(f),c.push(m),c.push(d),{htmlElements:c}}(e,n)},function(e,n){return t(e,n)}];export default function(t){var r=(void 0===t?{}:t).plugins,u=void 0===r?[]:r,i=[],o=[];return{bind:function(t,r){return void 0===r&&(r={}),function t(r,u,a,i,o){Object.values(r).forEach(function(r){for(var l,c=r.id,p=r.type,m=r.defaultValue,f=r.options,d=r.onUpdate,s=function(n){var t=0;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=function(n,t){if(n){if("string"==typeof n)return e(n,void 0);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(n,void 0):void 0}}(n)))return function(){return t>=n.length?{done:!0}:{done:!1,value:n[t++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(t=n[Symbol.iterator]()).next.bind(t)}(i);!(l=s()).done;){var v=(0,l.value)(r,function(e){if(0===(e=n(e,p))||!1===e||e||(e=m||null),"function"==typeof d){var t=d(e,u[c]);u[c]=void 0!==t?t:e}else u[c]=e;o(c,e)});if(v){if(v.superType)return a.push.apply(a,v.htmlElements||[]),u[c]={},void t(f,u[c],a,i,o);u[c]=m||null,a.push.apply(a,v.htmlElements||[]);break}}})}(t,r,o,[].concat(a,u),function(e,n){return i.forEach(function(t){return t(e,n)})}),r},addChangeListener:function(e){i.push(e)},removeChangeListener:function(e){i.splice(i.indexOf(e))},render:function(e){void 0===e&&(e="div");var n=document.createElement(e);return n.className="settings-ui-wrapper",o.forEach(function(e){return n.appendChild(e)}),{to:function(e){return e.appendChild(n),n},replace:function(e){return e.parentElement.replaceChild(n,e),n},get:function(){return n}}}}}
//# sourceMappingURL=index.mjs.map
