const path = require('path');

module.exports = {
    entry: {
        main: './src/scripts/main.ts',          // Punto de entrada para el archivo main.ts
        domHandler: './src/scripts/domHandler.ts', // Punto de entrada para el archivo domHandler.ts
    },
    output: {
        filename: '[name].js', // Genera main.js y domHandler.js usando los nombres de entrada
        path: path.resolve(__dirname, 'dist'), // Directorio de salida para los archivos compilados
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,          // Aplica ts-loader a archivos .ts y .tsx
                use: 'ts-loader',
                exclude: /node_modules/,  // Excluye la carpeta node_modules
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // Permite importar archivos con estas extensiones sin especificarlas
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', 
    // Usa 'production' cuando estés desplegando, y 'development' cuando estés desarrollando
};
