var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        publicPath: '/'
      },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.css']

    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            },
            
            { test: /\.css$/, loader: "style-loader!css-loader" }       
        ],
       
       
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        allowedHosts: [
            '.elasticbeanstalk.com'
        ],
        host: '0.0.0.0',
        proxy: {
            '/api': {
                //target: 'http://localhost:8080/'
                target: 'http://acra-webserver-dev.us-east-1.elasticbeanstalk.com/'
            }
        }
    }
}