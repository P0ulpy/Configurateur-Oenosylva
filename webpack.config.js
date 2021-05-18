const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const srcPath =  path.join(__dirname, '/src');
const outPath = path.join(__dirname, '/calculator');

module.exports = {
    watch: true,
    devtool: 'eval-source-map',
    entry: `${srcPath}/Code/Oenosylva/CalculatorMain.ts`,
    output: {
        filename: `Calculator.js`,
        path: outPath,
        libraryTarget: 'var',
        library: 'Calculator'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                // Les fichiers / dossiers qui doivent êtres copier dans le repertoire de sortie
                // patern : { from :"chemin total ou copier", to :"chemin total ou coller"}
                
                { from: `${srcPath}/images`, to: `${outPath}/images` },
                { from: `${srcPath}/vendors`, to: `${outPath}/vendors` },
                { from: `${srcPath}/data`, to: `${outPath}/data` },
                { from: `${srcPath}/calculator.html`, to: `${outPath}/index.html` }
            ],
        }),
    ],
    module: {
        // import Bundles rules
        rules: [
            // typescript
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: path.join(__dirname, "/tsconfig.json")
                    }
                }],
                exclude: /node_modules/,
            },
            // stylesheet
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            // images
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            // fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    }
};