const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
    return {
        entry: ['./src/index.js', './src/polyfills.ts', './src/main.ts'],
        output: {
            path: __dirname + '/dist',
            filename: 'app.js'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                { test: /\.ts$/, loaders: ['@ngtools/webpack'] },
                { test: /\.css$/, loader: 'raw-loader' },
                { test: /\.html$/, loader: 'raw-loader' },
                {
                    test: /\.(scss)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader', // translates CSS into CommonJS modules
                            }, {
                                loader: 'postcss-loader', // Run post css actions
                                options: {
                                    plugins() {
                                        // post css plugins, can be exported to postcss.config.js
                                        return [
                                            precss,
                                            autoprefixer
                                        ];
                                    }
                                }
                            }, {
                                loader: 'sass-loader' // compiles SASS to CSS
                            }
                        ]
                    })
                },
                {
                    test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(["dist"]),
            new CopyWebpackPlugin([
                { from: 'src/assets', to: 'assets' }
            ]),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
            }),
            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html',
                output: __dirname + '/dist',
                inject: 'head'
            }),
            new ScriptExtPlugin({
                defaultAttribute: 'defer'
            }),
            new AngularCompilerPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: './src/app/app.module#AppModule',
                sourceMap: true
            }),
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    dead_code: true
                }
            })
        ]
    };
}