module.exports = {
    entry: "./src/es6/main.js",
    output: {
        path: __dirname,
        filename: "public/dist/bundle.js"
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/,  loader: 'babel'},
            { test: /\.html$/, loader: 'html' }
        ]
    },
    devtool: 'source-map'

};
