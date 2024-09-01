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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.variableData = void 0;\nexports.resetVariableData = resetVariableData;\nexports.processLine = processLine;\nexports.validateVariables = validateVariables;\nexports.variableData = {\n    entero: [],\n    real: [],\n    cadena: [],\n    logico: [],\n    fecha: [],\n};\nconst identifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/;\nconst lineRegex = /^declare\\s+(.+)\\s+(entero|real|cadena|logico|fecha);$/;\nfunction resetVariableData() {\n    for (const key in exports.variableData) {\n        if (Object.prototype.hasOwnProperty.call(exports.variableData, key)) {\n            exports.variableData[key] = [];\n        }\n    }\n}\nfunction processLine(line) {\n    const match = lineRegex.exec(line);\n    if (match) {\n        const [_, variableListStr, tipoDeDato] = match;\n        const variableList = variableListStr.split(/\\s*,\\s*/);\n        // Validar si hay comas al final o faltantes\n        if (variableList.some(variable => variable === \"\")) {\n            return `<p style=\"color:red;\">Inválida: ${line} (Error: lista de variables contiene comas mal colocadas)</p>`;\n        }\n        const [validVariables, allValid] = validateVariables(variableList);\n        if (allValid) {\n            exports.variableData[tipoDeDato].push(...validVariables);\n            return `<p style=\"color:green;\">Válida: ${line}</p>`;\n        }\n        else {\n            return `<p style=\"color:red;\">Inválida: ${line} (Contiene identificadores inválidos)</p>`;\n        }\n    }\n    else {\n        return `<p style=\"color:red;\">Inválida: ${line} (Error en la sintaxis)</p>`;\n    }\n}\nfunction validateVariables(variableList) {\n    const validVariables = [];\n    let allValid = true;\n    variableList.forEach(variable => {\n        if (identifierRegex.test(variable)) {\n            validVariables.push(variable);\n        }\n        else {\n            allValid = false;\n        }\n    });\n    return [validVariables, allValid];\n}\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;