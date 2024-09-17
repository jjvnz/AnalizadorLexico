/**
 * Interfaz que define la estructura de los datos de variables, clasificadas por tipos.
 * 
 * @interface VariableData
 * @property {string[]} entero - Arreglo que almacena variables de tipo entero.
 * @property {string[]} real - Arreglo que almacena variables de tipo real.
 * @property {string[]} cadena - Arreglo que almacena variables de tipo cadena.
 * @property {string[]} logico - Arreglo que almacena variables de tipo lógico.
 * @property {string[]} fecha - Arreglo que almacena variables de tipo fecha.
 */
export interface VariableData {
    entero: string[];
    real: string[];
    cadena: string[];
    logico: string[];
    fecha: string[];
}

/**
 * Objeto que implementa la interfaz `VariableData`, utilizado para almacenar las variables clasificadas por tipo.
 * 
 * @type {VariableData}
 */
export const variableData: VariableData = {
    entero: [],
    real: [],
    cadena: [],
    logico: [],
    fecha: [],
};

/**
 * Expresión regular para validar identificadores de variables.
 * 
 * Un identificador válido debe empezar con una letra o guión bajo, seguido de hasta 14 caracteres alfanuméricos o guiones bajos.
 * 
 * @constant {RegExp}
 */
const identifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/;

/**
 * Expresión regular para validar la sintaxis de una declaración de variables.
 * 
 * La sintaxis válida es `declare <variables> <tipo>;` donde:
 * - `<variables>` es una lista de nombres de variables separados por comas.
 * - `<tipo>` es uno de los tipos soportados: entero, real, cadena, logico, fecha.
 * 
 * @constant {RegExp}
 */
const lineRegex = /^declare\s+(.+)\s+(entero|real|cadena|logico|fecha);$/;

/**
 * Resetea (vacía) todas las listas de variables en el objeto `variableData`.
 * 
 * @function resetVariableData
 * @returns {void}
 */
export function resetVariableData(): void {
    for (const key in variableData) {
        if (Object.prototype.hasOwnProperty.call(variableData, key)) {
            variableData[key as keyof VariableData] = [];
        }
    }
}

/**
 * Procesa una línea de texto que contiene una declaración de variables.
 * 
 * - Verifica la sintaxis de la declaración usando `lineRegex`.
 * - Si la sintaxis es correcta, valida los nombres de variables utilizando `validateVariables`.
 * - Si todas las variables son válidas, verifica que no existan duplicados.
 * - Si no hay duplicados, las añade al objeto `variableData` según su tipo.
 * - Retorna un mensaje indicando si la línea es válida o no, junto con posibles errores.
 * 
 * @function processLine
 * @param {string} line - La línea de texto a procesar.
 * @returns {string} - Un mensaje HTML indicando si la línea es válida o inválida, y el error en caso de ser inválida.
 */
export function processLine(line: string): string {
    const match = lineRegex.exec(line);

    if (match) {
        const [_, variableListStr, tipoDeDato] = match;
        const variableList = variableListStr.split(/\s*,\s*/);

        // Validar si hay comas mal colocadas
        if (variableList.some(variable => variable === "")) {
            return `<p style="color:red;">Inválida: ${line} (Error: lista de variables contiene comas mal colocadas)</p>`;
        }

        // Verificar si hay variables duplicadas en la misma declaración
        const duplicatesInLine = variableList.filter((item, index) => variableList.indexOf(item) !== index);
        if (duplicatesInLine.length > 0) {
            return `<p style="color:red;">Inválida: ${line} (Error: variables duplicadas en la misma declaración: ${duplicatesInLine.join(", ")})</p>`;
        }

        const [validVariables, allValid] = validateVariables(variableList);

        if (allValid) {
            // Verificar duplicados entre declaraciones anteriores
            const duplicatedVariables = validVariables.filter(variable =>
                Object.values(variableData).some(typeArray => typeArray.includes(variable))
            );

            if (duplicatedVariables.length > 0) {
                return `<p style="color:red;">Inválida: ${line} (Error: las variables ${duplicatedVariables.join(", ")} ya fueron declaradas)</p>`;
            }

            // Agregar variables válidas al tipo correspondiente
            (variableData[tipoDeDato as keyof VariableData] as string[]).push(...validVariables);
            return `<p style="color:green;">Válida: ${line}</p>`;
        } else {
            return `<p style="color:red;">Inválida: ${line} (Contiene identificadores inválidos)</p>`;
        }
    } else {
        return `<p style="color:red;">Inválida: ${line} (Error en la sintaxis)</p>`;
    }
}

/**
 * Valida una lista de nombres de variables utilizando `identifierRegex`.
 * 
 * - Verifica si cada variable cumple con las reglas de los identificadores válidos.
 * - Retorna una tupla donde el primer elemento es un arreglo de variables válidas y el segundo elemento es un booleano que indica si todas las variables son válidas.
 * 
 * @function validateVariables
 * @param {string[]} variableList - La lista de nombres de variables a validar.
 * @returns {[string[], boolean]} - Una tupla donde:
 *  - El primer elemento es un arreglo de nombres de variables válidos.
 *  - El segundo elemento es un booleano que indica si todas las variables en la lista son válidas.
 */
export function validateVariables(variableList: string[]): [string[], boolean] {
    const validVariables: string[] = [];
    let allValid = true;

    variableList.forEach(variable => {
        if (identifierRegex.test(variable)) {
            validVariables.push(variable);
        } else {
            allValid = false;
        }
    });

    return [validVariables, allValid];
}
