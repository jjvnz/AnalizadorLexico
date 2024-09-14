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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.variableData = void 0;\nexports.resetVariableData = resetVariableData;\nexports.processLine = processLine;\nexports.validateVariables = validateVariables;\n/**\n * Objeto que implementa la interfaz `VariableData`, utilizado para almacenar las variables clasificadas por tipo.\n *\n * @type {VariableData}\n */\nexports.variableData = {\n    entero: [],\n    real: [],\n    cadena: [],\n    logico: [],\n    fecha: [],\n};\n/**\n * Expresión regular para validar identificadores de variables.\n *\n * Un identificador válido debe empezar con una letra o guión bajo, seguido de hasta 14 caracteres alfanuméricos o guiones bajos.\n *\n * @constant {RegExp}\n */\nconst identifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/;\n/**\n * Expresión regular para validar la sintaxis de una declaración de variables.\n *\n * La sintaxis válida es `declare <variables> <tipo>;` donde:\n * - `<variables>` es una lista de nombres de variables separados por comas.\n * - `<tipo>` es uno de los tipos soportados: entero, real, cadena, logico, fecha.\n *\n * @constant {RegExp}\n */\nconst lineRegex = /^declare\\s+(.+)\\s+(entero|real|cadena|logico|fecha);$/;\n/**\n * Resetea (vacía) todas las listas de variables en el objeto `variableData`.\n *\n * @function resetVariableData\n * @returns {void}\n */\nfunction resetVariableData() {\n    for (const key in exports.variableData) {\n        if (Object.prototype.hasOwnProperty.call(exports.variableData, key)) {\n            exports.variableData[key] = [];\n        }\n    }\n}\n/**\n * Procesa una línea de texto que contiene una declaración de variables.\n *\n * - Verifica la sintaxis de la declaración usando `lineRegex`.\n * - Si la sintaxis es correcta, valida los nombres de variables utilizando `validateVariables`.\n * - Si todas las variables son válidas, verifica que no existan duplicados.\n * - Si no hay duplicados, las añade al objeto `variableData` según su tipo.\n * - Retorna un mensaje indicando si la línea es válida o no, junto con posibles errores.\n *\n * @function processLine\n * @param {string} line - La línea de texto a procesar.\n * @returns {string} - Un mensaje HTML indicando si la línea es válida o inválida, y el error en caso de ser inválida.\n */\nfunction processLine(line) {\n    const match = lineRegex.exec(line);\n    if (match) {\n        const [_, variableListStr, tipoDeDato] = match;\n        const variableList = variableListStr.split(/\\s*,\\s*/);\n        // Validar si hay comas mal colocadas\n        if (variableList.some(variable => variable === \"\")) {\n            return `<p style=\"color:red;\">Inválida: ${line} (Error: lista de variables contiene comas mal colocadas)</p>`;\n        }\n        // Verificar si hay variables duplicadas en la misma declaración\n        const duplicatesInLine = variableList.filter((item, index) => variableList.indexOf(item) !== index);\n        if (duplicatesInLine.length > 0) {\n            return `<p style=\"color:red;\">Inválida: ${line} (Error: variables duplicadas en la misma declaración: ${duplicatesInLine.join(\", \")})</p>`;\n        }\n        const [validVariables, allValid] = validateVariables(variableList);\n        if (allValid) {\n            // Verificar duplicados entre declaraciones anteriores\n            const duplicatedVariables = validVariables.filter(variable => Object.values(exports.variableData).some(typeArray => typeArray.includes(variable)));\n            if (duplicatedVariables.length > 0) {\n                return `<p style=\"color:red;\">Inválida: ${line} (Error: las variables ${duplicatedVariables.join(\", \")} ya fueron declaradas)</p>`;\n            }\n            // Agregar variables válidas al tipo correspondiente\n            exports.variableData[tipoDeDato].push(...validVariables);\n            return `<p style=\"color:green;\">Válida: ${line}</p>`;\n        }\n        else {\n            return `<p style=\"color:red;\">Inválida: ${line} (Contiene identificadores inválidos)</p>`;\n        }\n    }\n    else {\n        return `<p style=\"color:red;\">Inválida: ${line} (Error en la sintaxis)</p>`;\n    }\n}\n/**\n * Valida una lista de nombres de variables utilizando `identifierRegex`.\n *\n * - Verifica si cada variable cumple con las reglas de los identificadores válidos.\n * - Retorna una tupla donde el primer elemento es un arreglo de variables válidas y el segundo elemento es un booleano que indica si todas las variables son válidas.\n *\n * @function validateVariables\n * @param {string[]} variableList - La lista de nombres de variables a validar.\n * @returns {[string[], boolean]} - Una tupla donde:\n *  - El primer elemento es un arreglo de nombres de variables válidos.\n *  - El segundo elemento es un booleano que indica si todas las variables en la lista son válidas.\n */\nfunction validateVariables(variableList) {\n    const validVariables = [];\n    let allValid = true;\n    variableList.forEach(variable => {\n        if (identifierRegex.test(variable)) {\n            validVariables.push(variable);\n        }\n        else {\n            allValid = false;\n        }\n    });\n    return [validVariables, allValid];\n}\n\n\n//# sourceURL=webpack:///./src/main.ts?");

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