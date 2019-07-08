var webpack = require("webpack");

// include the js minification plugin
const TerserPlugin = require('terser-webpack-plugin');

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// include the js minification plugin
const HtmlWebPackPlugin = require("html-webpack-plugin");
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
        rules: [
            // perform js babelization on all .js files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
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
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
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
        new MiniCssExtractPlugin({
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
    optimization: {
        minimizer: [
            // enable the js minification plugin
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            // enable the css minification plugin
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};