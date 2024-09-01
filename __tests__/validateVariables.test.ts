import { variableData, processLine, resetVariableData, validateVariables } from '../src/main';

describe('VariableData and processLine Functionality', () => {

    beforeEach(() => {
        resetVariableData(); // Resetea variableData antes de cada prueba
    });

    test('should add variables to the correct type when the line is valid', () => {
        const line = 'declare a1, b2 entero;';
        processLine(line);
        expect(variableData.entero).toContain('a1');
        expect(variableData.entero).toContain('b2');
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

    test('should not add invalid variables with incorrect syntax', () => {
        const line = 'declare var1, var2, entero';
        const result = processLine(line);
        expect(variableData.entero).toHaveLength(0);
        expect(result).toContain('Inválida');
    });

    test('should correctly reset variableData between tests', () => {
        const line = 'declare a1, b2 entero;';
        processLine(line);
        resetVariableData();
        expect(variableData.entero).toHaveLength(0);
    });

    test('should return valid variables and boolean correctly from validateVariables', () => {
        const variables = ['var1', 'var_2', '1var'];
        const [validVars, allValid] = validateVariables(variables);
        expect(validVars).toEqual(['var1', 'var_2']);
        expect(allValid).toBe(false);
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

    test('should correctly handle an empty line', () => {
        const line = '';
        const result = processLine(line);
        expect(result).toContain('Inválida');
    });

    test('should not add variables if the line has an incorrect type keyword', () => {
        const line = 'declare var1, var2 number;';
        const result = processLine(line);
        expect(variableData.entero).toHaveLength(0);
        expect(variableData.real).toHaveLength(0);
        expect(variableData.cadena).toHaveLength(0);
        expect(variableData.logico).toHaveLength(0);
        expect(variableData.fecha).toHaveLength(0);
        expect(result).toContain('Inválida');
    });
});
