const path = require('path');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest')
const OfflinePlugin = require('offline-plugin');

const PUBLIC_URL = 'http://localhost:8000/';

// Need to resolve to the **directory** of `src`.
const resolveSrc = (mod) => {
  return path.join( path.dirname(require.resolve(mod + "/package.json")), "src");
};

// Need to babel process both `victory-core` and `victory-chart` and alias.
const victoryCoreSrc = resolveSrc("victory-core");
const victoryChartSrc = resolveSrc("victory-chart");
const victoryPieSrc = resolveSrc("victory-pie");

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, '../src/static'),
    build: path.join(__dirname, '../src/static_dist')
};

const VENDOR = [
    'babel-polyfill',
    'history',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-mixin',
    'react-tap-event-plugin',
    'material-ui',
    'classnames',
    'redux',
    'react-router-redux',
    'victory-pie',
    'victory-core',
    'victory-chart'
];

const basePath = path.resolve(__dirname, '../src/static/');

const common = {
    context: basePath,
    entry: {
        vendor: VENDOR,
        app: PATHS.app
    },
    output: {
        filename: '[name].[hash].js',
        path: PATHS.build,
        publicPath: '/static'
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.scss', '.css'],
        modules: ['node_modules'],
        alias: {
          "victory-chart": victoryChartSrc,
          "victory-core": victoryCoreSrc,
          "victory-pie": victoryPieSrc
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [
                  basePath,
                  victoryCoreSrc,
                  victoryChartSrc,
                  victoryPieSrc
                ],
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loader: 'file-loader?name=/images/[name].[ext]?[hash]'
            },
            {
                test: /\.woff(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
            },
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?.*)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]'
            },
            {
                test: /\.otf(\?.*)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.json(\?.*)?$/,
                loader: 'file-loader?name=/files/[name].[ext]'
            }
        ]
    },
    plugins: [
        // extract all common modules to vendor so we can load multiple apps in one page
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.[hash].js'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        new webpack.DefinePlugin({
          'process.env': { NODE_ENV: TARGET === 'dev' ? '"development"' : '"production"' },
          '__DEVELOPMENT__': TARGET === 'dev'
        }),
        new LodashModuleReplacementPlugin({
          "currying": true,
          "flattening": true,
          "paths": true,
          "placeholders": true,
          "shorthands": true
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            options: {
                postcss: [
                    autoprefixer({ browsers: ['last 2 versions'] })
                ],
                sassLoader: {
                    data: `@import "${__dirname}/../src/static/styles/config/_variables.scss";`
                }
            }
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.css$/,
            options: {
                postcss: [
                    autoprefixer({ browsers: ['last 2 versions'] })
                ]
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/static/index.html'),
            hash: true,
            filename: 'src.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin([PATHS.build], {
            root: process.cwd()
        }),
        new WebpackPwaManifest({
           name: 'SnakTrak',
           short_name: 'SnakTrak',
           start_url: '/',
           description: 'easy nutrition tracking',
           background_color: '#EEEEEE',
           theme_color: '#00bcd4',
           icons: [
               {
                   src: path.resolve('src/static/images/favicon.png'),
                   sizes: [96, 128, 192, 512] // multiple sizes
               }
           ]
       }),
       new OfflinePlugin({
         excludes: ['**/.*', '**/*.map'],
         externals: [PUBLIC_URL]
       }),
       new webpack.optimize.CommonsChunkPlugin({
         name: "vendor"
       }),
    ],
};

switch (TARGET) {
    case 'dev':
        module.exports = merge(require('./dev.config'), common);
        break;
    case 'prod':
        module.exports = merge(require('./prod.config'), common);
        break;
    default:
        console.log('Target configuration not found. Valid targets: "dev" or "prod".');
}
