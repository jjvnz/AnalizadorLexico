/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domHandler.ts":
/*!***************************!*\
  !*** ./src/domHandler.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar _a, _b;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst main_1 = __webpack_require__(/*! ./main */ \"./src/main.ts\");\n(_a = document.getElementById('validateBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {\n    const inputText = document.getElementById('inputText').value;\n    const lines = inputText.split('\\n');\n    let result = '';\n    (0, main_1.resetVariableData)();\n    lines.forEach(line => {\n        result += (0, main_1.processLine)(line.trim());\n    });\n    document.getElementById('result').innerHTML = result;\n});\n(_b = document.getElementById('filterBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {\n    const tipoDeDato = document.getElementById('dataTypeSelect').value.toLowerCase();\n    const filterResult = document.getElementById('filterResult');\n    if (tipoDeDato && main_1.variableData[tipoDeDato]) {\n        const variables = main_1.variableData[tipoDeDato];\n        if (variables.length > 0) {\n            filterResult.innerHTML = `Variables del tipo ${tipoDeDato}: ${variables.join(', ')}`;\n            filterResult.style.display = 'block'; // Mostrar el resultado\n        }\n        else {\n            filterResult.innerHTML = `No hay variables del tipo ${tipoDeDato}.`;\n            filterResult.style.display = 'block'; // Mostrar el resultado\n        }\n    }\n    else {\n        filterResult.innerHTML = \"Tipo de dato no válido o no existen variables de ese tipo.\";\n        filterResult.style.display = 'block'; // Mostrar el resultado\n    }\n});\n\n\n//# sourceURL=webpack:///./src/domHandler.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.variableData = void 0;\nexports.resetVariableData = resetVariableData;\nexports.processLine = processLine;\nexports.validateVariables = validateVariables;\nexports.variableData = {\n    entero: [],\n    real: [],\n    cadena: [],\n    logico: [],\n    fecha: [],\n};\nconst identifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/;\nconst lineRegex = /^declare\\s+(.+)\\s+(entero|real|cadena|logico|fecha);$/;\nfunction resetVariableData() {\n    for (const key in exports.variableData) {\n        if (Object.prototype.hasOwnProperty.call(exports.variableData, key)) {\n            exports.variableData[key] = [];\n        }\n    }\n}\nfunction processLine(line) {\n    const match = lineRegex.exec(line);\n    if (match) {\n        const [_, variableListStr, tipoDeDato] = match;\n        const variableList = variableListStr.split(/\\s*,\\s*/);\n        // Validar si hay comas al final o faltantes\n        if (variableList.some(variable => variable === \"\")) {\n            return `<p style=\"color:red;\">Inválida: ${line} (Error: lista de variables contiene comas mal colocadas)</p>`;\n        }\n        const [validVariables, allValid] = validateVariables(variableList);\n        if (allValid) {\n            exports.variableData[tipoDeDato].push(...validVariables);\n            return `<p style=\"color:green;\">Válida: ${line}</p>`;\n        }\n        else {\n            return `<p style=\"color:red;\">Inválida: ${line} (Contiene identificadores inválidos)</p>`;\n        }\n    }\n    else {\n        return `<p style=\"color:red;\">Inválida: ${line} (Error en la sintaxis)</p>`;\n    }\n}\nfunction validateVariables(variableList) {\n    const validVariables = [];\n    let allValid = true;\n    variableList.forEach(variable => {\n        if (identifierRegex.test(variable)) {\n            validVariables.push(variable);\n        }\n        else {\n            allValid = false;\n        }\n    });\n    return [validVariables, allValid];\n}\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/domHandler.ts");
/******/ 	
/******/ })()
;