(()=>{"use strict";var e={674:(e,a)=>{Object.defineProperty(a,"__esModule",{value:!0}),a.variableData=void 0,a.resetVariableData=function(){for(const e in a.variableData)Object.prototype.hasOwnProperty.call(a.variableData,e)&&(a.variableData[e]=[])},a.processLine=function(e){const t=r.exec(e);if(t){const[r,l,i]=t,o=l.split(/\s*,\s*/);if(o.some((e=>""===e)))return`<p style="color:red;">Inválida: ${e} (Error: lista de variables contiene comas mal colocadas)</p>`;const s=o.filter(((e,a)=>o.indexOf(e)!==a));if(s.length>0)return`<p style="color:red;">Inválida: ${e} (Error: variables duplicadas en la misma declaración: ${s.join(", ")})</p>`;const[c,d]=n(o);if(d){const t=c.filter((e=>Object.values(a.variableData).some((a=>a.includes(e)))));return t.length>0?`<p style="color:red;">Inválida: ${e} (Error: las variables ${t.join(", ")} ya fueron declaradas)</p>`:(a.variableData[i].push(...c),`<p style="color:green;">Válida: ${e}</p>`)}return`<p style="color:red;">Inválida: ${e} (Contiene identificadores inválidos)</p>`}return`<p style="color:red;">Inválida: ${e} (Error en la sintaxis)</p>`},a.validateVariables=n,a.variableData={entero:[],real:[],cadena:[],logico:[],fecha:[]};const t=/^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/,r=/^declare\s+(.+)\s+(entero|real|cadena|logico|fecha);$/;function n(e){const a=[];let r=!0;return e.forEach((e=>{t.test(e)?a.push(e):r=!1})),[a,r]}}},a={};function t(r){var n=a[r];if(void 0!==n)return n.exports;var l=a[r]={exports:{}};return e[r](l,l.exports,t),l.exports}(()=>{var e,a;const r=t(674);null===(e=document.getElementById("validateBtn"))||void 0===e||e.addEventListener("click",(()=>{const e=document.getElementById("inputText").value.split("\n");let a="";(0,r.resetVariableData)(),e.forEach((e=>{a+=(0,r.processLine)(e.trim())})),document.getElementById("result").innerHTML=a})),null===(a=document.getElementById("filterBtn"))||void 0===a||a.addEventListener("click",(()=>{const e=document.getElementById("dataTypeSelect").value.toLowerCase(),a=document.getElementById("filterResult");if(e&&r.variableData[e]){const t=r.variableData[e];t.length>0?a.innerHTML=`Variables del tipo ${e}: ${t.join(", ")}`:a.innerHTML=`No hay variables del tipo ${e}.`}else a.innerHTML="Tipo de dato no válido o no existen variables de ese tipo.";a.style.display="block"}))})()})();