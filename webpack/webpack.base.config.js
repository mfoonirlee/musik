var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var STATIC_SRC = require("../f2eci")["static-src"];
var DIST_PATH = require("../f2eci").dist;
var HTML_PATH = require("../f2eci").output;
var relativeToRootPath = "..";
const env = require("../f2eci").env;
const WebpackShellPlugin = require("webpack-shell-plugin");
const PUBLIC_PATH = "/" + STATIC_SRC + "/";

const polyfills = [require.resolve("./polyfills/promise.js")];

module.exports = {
    entry: {
        index: ["./src/pages/index/boot-loader.es6"],
        common: [...polyfills] //将经常用的库js包打到commons.js中,此js中的内容不会经常变动
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, relativeToRootPath, DIST_PATH, STATIC_SRC),
        publicPath: PUBLIC_PATH,
        //publicPath:'/op-task/dist/static/',
        chunkFilename: "[name].[chunkhash].js",
        sourceMapFilename: "[name].map"
    },
    cache: true,
    devtool: "source-map",
    resolve: {
        alias: {
            "@lib": path.resolve(__dirname, relativeToRootPath, "./src/lib"),
            "@assets": path.resolve(
                __dirname,
                relativeToRootPath,
                "./src/assets"
            )
        },
        modulesDirectories: ["web_modules", "node_modules", "cortex_modules"],
        extensions: [".js", ".es6", ".json", ".jsx", ""]
    },
    module: {
        loaders: [
            {
                test: /\.(es6)$/,
                loader: "babel",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "stage-0"],
                    plugins: ["transform-runtime"]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "css-loader?-restructuring!postcss"
                ) //为什么要在开发环境中使用inline方式？因为dev环境下publicPath为一个相对路径，此时css中如果有一个相对路径的图片要单独输出的时候，inline方式没问题，而单独输出css文件的时候路径会错乱
            },
            {
                test: /\.css\.module/,
                loader: ExtractTextPlugin.extract(
                    "css-loader?-restructuring&modules&localIdentName=[local]___[hash:base64:5]!postcss"
                )
                // },{
                //     test: /\.svg$/,
                //     loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.woff|ttf|woff2|eot$/,
                loader: "url?limit=100000"
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("css-loader!postcss!less")
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.less\.module/,
                loader: ExtractTextPlugin.extract(
                    "css-loader?modules&localIdentName=[local]___[hash:base64:5]!postcss!less"
                )
                // }, {
                //     test: /\.(png|jpg)$/,
                //     loader: 'url?limit=25000'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ["url?limit=25000"]
                // loaders: env=="dev"?["url?limit=25000"]:[
                //     'url?limit=25000',
                //     'image-webpack?progressive&optimizationLevel=3&interlaced=false'
                // ]
            }
        ]
    },
    postcss: function() {
        //处理css兼容性代码，无须再写-webkit之类的浏览器前缀
        return [
            require("postcss-initial")({
                reset: "all" // reset only inherited rules
            }),
            require("autoprefixer")({
                browsers: ["> 5%"]
            })
        ];
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: Infinity //当项目中引用次数超过2次的包自动打入commons.js中,可自行根据需要进行调整优化
        }),
        new ExtractTextPlugin("[name].css", {
            // disable: env=="dev",
            allChunks: true
        }),
        new WebpackShellPlugin({ onBuildStart: ["gulp"] })
    ],
    devServer: {
        contentBase: HTML_PATH,
        historyApiFallback: false,
        disableHostCheck: true,
        hot: true,
        port: 8089,
        publicPath: PUBLIC_PATH,
        noInfo: false
    }
};
