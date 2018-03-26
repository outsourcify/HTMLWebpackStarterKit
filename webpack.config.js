var webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
    entry: ["./src/js/index.js", "./src/scss/main.scss"],
    output: {
        filename: "js/index.js",
        path: path.join(__dirname, "./build/")
    },
    devServer: {
        contentBase: "./build"
    },
    module: {
        rules: [{
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '../'
                    }
                }]
            },
            {
                test: /\.(svg|png|jpe?g)/i,
                use: [{
                        loader: "url-loader",
                        options: {
                            name: "./images/[name].[ext]",
                            limit: 5000
                        }
                    },
                    {
                        loader: "img-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            }
            /*,
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }*/
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new HtmlWebPackPlugin({
            template: "./src/contact.html",
            filename: "./contact.html"
        }),
        new ExtractTextPlugin({
            filename: "css/main.css"
        }),
        new CopyWebpackPlugin([{
            from: 'src/images',
            to: 'images'
        }]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};