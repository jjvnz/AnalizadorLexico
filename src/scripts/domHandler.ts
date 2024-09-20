import { VariableData, processLine, resetVariableData, variableData } from './main';

// Función para actualizar los números de línea
function updateLineNumbers(inputText: HTMLTextAreaElement, lineNumbers: HTMLElement): void {
    const lines = inputText.value.split('\n').length;
    let lineNumbersContent = '';
    for (let i = 1; i <= lines; i++) {
        lineNumbersContent += `<div>${i}</div>`;
    }
    lineNumbers.innerHTML = lineNumbersContent;
}

// Manejo del evento 'click' para validar el texto ingresado
document.getElementById('validateBtn')?.addEventListener('click', () => {
    const inputText = (document.getElementById('inputText') as HTMLTextAreaElement);
    const lines = inputText.value.split('\n');
    let result = '';

    resetVariableData();

    // Procesa cada línea de texto ingresada
    lines.forEach(line => {
        result += processLine(line.trim());
    });

    // Muestra el resultado del procesamiento
    document.getElementById('result')!.innerHTML = result;
});

// Manejo del evento 'click' para filtrar las variables
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

// Inicialización de la sincronización y actualización de números de línea
document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText') as HTMLTextAreaElement;
    const lineNumbers = document.getElementById('lineNumbers') as HTMLElement;

    // Sincronizar el scroll del textarea con el contenedor de números de línea
    inputText.addEventListener('scroll', () => {
        lineNumbers.scrollTop = inputText.scrollTop;
    });

    // Actualizar los números de línea cuando el usuario escribe o edita el texto
    inputText.addEventListener('input', () => updateLineNumbers(inputText, lineNumbers));

    // Inicializar los números de línea al cargar la página
    updateLineNumbers(inputText, lineNumbers);
});
