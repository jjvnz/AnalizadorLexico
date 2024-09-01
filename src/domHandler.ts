import { VariableData, processLine, resetVariableData, variableData } from './main';

document.getElementById('validateBtn')?.addEventListener('click', () => {
    const inputText = (document.getElementById('inputText') as HTMLTextAreaElement).value;
    const lines = inputText.split('\n');
    let result = '';

    resetVariableData();

    lines.forEach(line => {
        result += processLine(line.trim());
    });

    document.getElementById('result')!.innerHTML = result;
});

document.getElementById('filterBtn')?.addEventListener('click', () => {
    const tipoDeDato = (document.getElementById('dataTypeSelect') as HTMLSelectElement).value.toLowerCase();
    const filterResult = document.getElementById('filterResult')!;

    if (tipoDeDato && variableData[tipoDeDato as keyof VariableData]) {
        const variables = variableData[tipoDeDato as keyof VariableData];
        if (variables.length > 0) {
            filterResult.innerHTML = `Variables del tipo ${tipoDeDato}: ${variables.join(', ')}`;
            filterResult.style.display = 'block'; // Mostrar el resultado
        } else {
            filterResult.innerHTML = `No hay variables del tipo ${tipoDeDato}.`;
            filterResult.style.display = 'block'; // Mostrar el resultado
        }
    } else {
        filterResult.innerHTML = "Tipo de dato no válido o no existen variables de ese tipo.";
        filterResult.style.display = 'block'; // Mostrar el resultado
    }
});
