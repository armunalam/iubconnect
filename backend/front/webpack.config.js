module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    // mode: 'development',
    // output: {
    //     // points to a webpack-dev-server (WDS), configured below
    //     // it is important that the url points to a WDS, not Django
    //     // I would use the same prefix you'd use in STATIC_URL,
    //     // in my case it is "/static/", but it is not really important
    //     publicPath: 'http://localhost:8000/static/',
    // },
    // // serve assets via webpack-dev-server instead of Django so that HMR can work
    // devServer: {
    //     // for assets not handled by webpack
    //     contentBase: './templates/front',
    //     // port should be different from the one you use to run Django
    //     port: 8000,
    //     headers: {
    //       'Access-Control-Allow-Origin': '*'
    //     },
    //     // gzip everything served by dev server, could speed things up a bit
    //     compress: true,
    //     // HMR
    //     hot: true,
    // },
};