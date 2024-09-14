import { VariableData, processLine, resetVariableData, variableData } from './main';

/**
 * Valida y procesa el texto ingresado por el usuario al hacer clic en el botón 'validateBtn'.
 * 
 * - Toma el texto de entrada, lo divide en líneas.
 * - Procesa cada línea con la función `processLine`.
 * - Inserta el resultado en el elemento HTML con ID 'result'.
 * 
 * @event click
 */
document.getElementById('validateBtn')?.addEventListener('click', () => {
    const inputText = (document.getElementById('inputText') as HTMLTextAreaElement).value;
    const lines = inputText.split('\n');
    let result = '';

    resetVariableData();

    // Procesa cada línea de texto ingresada
    lines.forEach(line => {
        result += processLine(line.trim());
    });

    // Muestra el resultado del procesamiento
    document.getElementById('result')!.innerHTML = result;
});

/**
 * Filtra y muestra las variables del tipo seleccionado al hacer clic en el botón 'filterBtn'.
 * 
 * - Toma el valor seleccionado en el select de tipo de datos.
 * - Verifica si hay variables del tipo seleccionado y las muestra.
 * - Si no hay variables del tipo especificado, muestra un mensaje de error.
 * 
 * @event click
 */
document.getElementById('filterBtn')?.addEventListener('click', () => {
    const tipoDeDato = (document.getElementById('dataTypeSelect') as HTMLSelectElement).value.toLowerCase();
    const filterResult = document.getElementById('filterResult')!;

    if (tipoDeDato && variableData[tipoDeDato as keyof VariableData]) {
        const variables = variableData[tipoDeDato as keyof VariableData];

        if (variables.length > 0) {
            filterResult.innerHTML = `Variables del tipo ${tipoDeDato}: ${variables.join(', ')}`;
        } else {
            filterResult.innerHTML = `No hay variables del tipo ${tipoDeDato}.`;
        }

    } else {
        filterResult.innerHTML = "Tipo de dato no válido o no existen variables de ese tipo.";
    }

    filterResult.style.display = 'block';
});
