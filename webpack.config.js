const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rulesForStyles = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}

const rulesForJavascript = {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {runtime: 'automatic'}
            ]
        ]
    }
}

const rules = [rulesForJavascript, rulesForStyles]

module.exports = (env, argv) => {
    const { mode } = argv
    const isProduction = mode === 'production';
    return {
        entry: './src/index.js',
        stats: {
            children: true,
        },
        output: {
            filename: isProduction
            ? '[name].[contenthash].js'
            : 'main.js',
            path: path.resolve(__dirname, 'build')
        },
        plugins: [
            new HtmlWebpackPlugin({ template: 'build/index.html' })
        ],
        module: {
            rules: rules
        },
        devServer: {
            open: true,
            port: 3000,
        },
        devtool: 'source-map'
    }
}