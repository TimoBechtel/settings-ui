var e=function(e,n){switch(n){case"number":return parseFloat(e);case"text":return e+""}return e},n=[function(e,n){if("section"===e.type)return r=(t=e).id,u=t.name,(a=document.createElement("b")).innerHTML=u||r,{htmlElements:[a],superType:!0};var t,r,u,a},function(e,n){if(e.values)return function(n,t){var r=e.id,u=e.name,a=e.help,i=e.values,l=e.defaultValue,o=[],c=function(e){return document.createElement(e)},p=c("select");p.id=r,p.title=a||"",i.forEach(function(e){var n=c("option");"object"==typeof e?(n.value=e.value,n.innerHTML=e.name):n.value=n.innerHTML=e,p.appendChild(n)}),(l||0===l)&&(p.value=l),p.addEventListener("input",function(e){return t(e.target.value)});var f=document.createElement("label");return f.htmlFor=r,f.innerHTML=u||r,o.push(f),o.push(p),{htmlElements:o}}(0,n)},function(e,n){return function(n,t){var r=e.id,u=e.name,a=e.type;void 0===a&&(a="text");var i=e.help,l=e.defaultValue,o=e.min,c=e.max,p=e.steps,f=[],d=function(e){return document.createElement(e)},s=d("input");s.type=a,s.id=r,"number"===a?(s.min=o||0,(c||0===c)&&(s.max=c),p&&(s.step=p)):(s.minLength=o||0,c&&(s.maxLength=c)),s.placeholder=i||l||"",(l||0===l)&&(s.value=l),s.addEventListener("input",function(e){return t(e.target.value)});var m=d("label");return m.innerHTML=u||r,m.htmlFor=r,f.push(m),f.push(s),{htmlElements:f}}(0,n)}],t=function(n,r,u,a,i){Object.values(n).forEach(function(n){for(var l=n.id,o=n.type,c=n.defaultValue,p=n.options,f=n.onUpdate,d=0,s=a;d<s.length;d+=1){var m=(0,s[d])(n,function(n){if(0===(n=e(n,o))||n||(n=c||null),"function"==typeof f){var t=f(n,r[l]);r[l]=void 0!==t?t:n}else r[l]=n;i(l,n)});if(m){if(m.superType)return u.push.apply(u,m.htmlElements||[]),r[l]={},void t(p,r[l],u,a,i);r[l]=c||null,u.push.apply(u,m.htmlElements||[]);break}}})};export default function(e){void 0===e&&(e={});var r=e.plugins;void 0===r&&(r=[]);var u=[],a=[];return{bind:function(e,i){return void 0===i&&(i={}),t(e,i,a,n.concat(r),function(e,n){return u.forEach(function(t){return t(e,n)})}),i},addChangeListener:function(e){u.push(e)},removeChangeListener:function(e){u.splice(u.indexOf(e))},render:function(e){void 0===e&&(e="div");var n=document.createElement(e);return n.className="settings-ui-wrapper",a.forEach(function(e){return n.appendChild(e)}),{to:function(e){return e.appendChild(n),n},replace:function(e){return e.parentElement.replaceChild(n,e),n},get:function(){return n}}}}}
//# sourceMappingURL=index.mjs.map
