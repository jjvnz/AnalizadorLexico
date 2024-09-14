import { variableData, processLine, resetVariableData } from '../src/main';

describe('VariableData and processLine Functionality with Duplicates Check', () => {

    beforeEach(() => {
        resetVariableData(); // Resetea variableData antes de cada prueba
    });

    test('should not allow duplicate variable names in the same line', () => {
        const line = 'declare v1, v1 real;';
        const result = processLine(line);
        expect(result).toContain('Error: variables duplicadas en la misma declaración');
        expect(variableData.real).not.toContain('v1'); // No debe agregar v1 a 'real'
    });

    test('should add variables to the correct type when the line is valid', () => {
        const line = 'declare a1, b2 entero;';
        processLine(line);
        expect(variableData.entero).toContain('a1');
        expect(variableData.entero).toContain('b2');
    });

    test('should not allow duplicate variable names across types', () => {
        const line1 = 'declare a1, b2 entero;';
        const line2 = 'declare a1 real;'; // a1 es duplicada

        processLine(line1);
        const result = processLine(line2);

        expect(variableData.real).not.toContain('a1'); // No se debe agregar la duplicada
        expect(result).toContain('Error: las variables a1 ya fueron declaradas');
    });

    test('should not add variables if the line is invalid', () => {
        const line = 'declare 1a, b2 entero;';
        const result = processLine(line);
        expect(variableData.entero).toHaveLength(0);
        expect(result).toContain('Inválida');
    });

    test('should handle multiple valid lines correctly', () => {
        const lines = [
            'declare x1 real;',
            'declare y1 cadena;',
            'declare z1 logico;'
        ];

        lines.forEach(line => processLine(line));

        expect(variableData.real).toEqual(['x1']);
        expect(variableData.cadena).toEqual(['y1']);
        expect(variableData.logico).toEqual(['z1']);
    });

    test('should not add variables if there are misplaced commas', () => {
        const line = 'declare a1,, b2 entero;';
        const result = processLine(line);
        expect(variableData.entero).toHaveLength(0);
        expect(result).toContain('Inválida');
    });

    test('should add multiple valid variables of the same type', () => {
        const line = 'declare var1, var2, var3 entero;';
        const result = processLine(line);
        expect(variableData.entero).toEqual(['var1', 'var2', 'var3']);
        expect(result).toContain('Válida');
    });

    test('should return error message for incorrect data type syntax', () => {
        const line = 'declare var1, var2 unknowntype;';
        const result = processLine(line);
        expect(variableData.entero).toHaveLength(0);
        expect(variableData.real).toHaveLength(0);
        expect(variableData.cadena).toHaveLength(0);
        expect(variableData.logico).toHaveLength(0);
        expect(result).toContain('Inválida');
    });

    test('should return error if a variable is declared more than once in different types', () => {
        const line1 = 'declare var1 entero;';
        const line2 = 'declare var1 cadena;'; // Misma variable en diferente tipo

        processLine(line1);
        const result = processLine(line2);

        expect(variableData.cadena).not.toContain('var1'); // No debe agregar var1 a 'cadena'
        expect(result).toContain('Error: las variables var1 ya fueron declaradas');
    });

    test('should not allow redeclaration of the same variable in the same type', () => {
        const line1 = 'declare var1 entero;';
        const line2 = 'declare var1 entero;'; // Misma variable en el mismo tipo

        processLine(line1);
        const result = processLine(line2);

        expect(variableData.entero).toEqual(['var1']); // No se debe agregar dos veces
        expect(result).toContain('Error: las variables var1 ya fueron declaradas');
    });

    test('should correctly reset variableData between tests', () => {
        const line = 'declare a1, b2 entero;';
        processLine(line);
        resetVariableData();
        expect(variableData.entero).toHaveLength(0);
    });

    test('should correctly handle an empty line', () => {
        const line = '';
        const result = processLine(line);
        expect(result).toContain('Inválida');
    });
});
