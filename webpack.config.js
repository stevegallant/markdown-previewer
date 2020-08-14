// idenifies which npm script is called from package.json
const currentTask = process.env.npm_lifecycle_event;

// loads path plugin from node
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// all PostCSS plugins
const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
];

// define plugin for CSS load from javascript and PostCSS
let cssConfig = {
  test: /\.css$/i,
  use: ['css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
};

// Define plugin for build task to rename html files without chunkHash portion
let pages = fse.readdirSync('./app')
  .filter(file => {
    return file.endsWith('.html');
  })
  .map(page => {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`
    });
  });

// Copy the image files to dist during build task
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', () => {
      fse.copySync('./app/assets/img', './docs/assets/img');
    })
  };
}

// create generic webpack config object
let config = {
  entry: './app/assets/scripts/App.js',
  plugins: pages,
  module: {
    rules: [
      cssConfig,
      // This next object property will use babel plugins to make js backward-compat
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  }
}

// modify config object for dev task
if (currentTask == 'dev') {
  config.mode = 'development';
  config.devServer = {
    before: (app, server) => {
      server._watch('./app/**/*.html');
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3000,
    host:'0.0.0.0'
  };
  cssConfig.use.unshift('style-loader');
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app'),
  };


}

// modify config object for build task
if (currentTask == 'build') {
  config.mode = 'production';
  // optimizes user downloads by breaking out vendor-provided code like plugins, etc
  config.optimization = {
    splitChunks: {chunks: 'all'}
  }

  // output the final "chunk" files with their hash included in filename
  // to notify browser something has changed
  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs')
  };

  config.plugins.push(
    // clean up dist before outputting new copies of chunk files
    new CleanWebpackPlugin(),
    // break out css from bundle
    new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),

    new RunAfterCompile()
  );

  cssConfig.use.unshift(MiniCssExtractPlugin.loader);

  // minify the CSS
  postCSSPlugins.push(require('cssnano'));

}

// export final config object
module.exports = config;
