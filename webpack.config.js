const path = require('path');

module.exports = {
    entry: {
        main: './src/main.ts',
        domHandler: './src/domHandler.ts', // Añadir esta línea para el segundo archivo
    },
    output: {
        filename: '[name].js', // Esto generará main.js y domHandler.js
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: 'development', // Usa 'production' para el despliegue
};
