const path = require('path');
const mode = process.env.NODE_ENV || 'production';

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    resolve: {
        extensions: [".mjs", ".js", ".svelte"]
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, '../assets')
    },
    watchOptions: {
        ignored: /(site|node_modules)/
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['import-glob-keyed']
        }, {
            test: /\.svelte$/,
            exclude: /node_modules/,
            use: [{
                loader: 'svelte-loader',
                options: {
                    hydratable: true
                }
            }]
        }, {
            test: /\.html$/i,
            loader: 'html-loader',
        }]
    },
    mode,
    devtool: mode === 'production' ? false : 'source-map'
};