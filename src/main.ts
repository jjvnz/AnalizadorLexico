export interface VariableData {
    entero: string[];
    real: string[];
    cadena: string[];
    logico: string[];
    fecha: string[];
}

export const variableData: VariableData = {
    entero: [],
    real: [],
    cadena: [],
    logico: [],
    fecha: [],
};

const identifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/;
const lineRegex = /^declare\s+(.+)\s+(entero|real|cadena|logico|fecha);$/;

export function resetVariableData(): void {
    for (const key in variableData) {
        if (Object.prototype.hasOwnProperty.call(variableData, key)) {
            variableData[key as keyof VariableData] = [];
        }
    }
}

export function processLine(line: string): string {
    const match = lineRegex.exec(line);

    if (match) {
        const [_, variableListStr, tipoDeDato] = match;
        const variableList = variableListStr.split(/\s*,\s*/);

        // Validar si hay comas al final o faltantes
        if (variableList.some(variable => variable === "")) {
            return `<p style="color:red;">Inválida: ${line} (Error: lista de variables contiene comas mal colocadas)</p>`;
        }

        const [validVariables, allValid] = validateVariables(variableList);

        if (allValid) {
            (variableData[tipoDeDato as keyof VariableData] as string[]).push(...validVariables);
            return `<p style="color:green;">Válida: ${line}</p>`;
        } else {
            return `<p style="color:red;">Inválida: ${line} (Contiene identificadores inválidos)</p>`;
        }
    } else {
        return `<p style="color:red;">Inválida: ${line} (Error en la sintaxis)</p>`;
    }
}

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
