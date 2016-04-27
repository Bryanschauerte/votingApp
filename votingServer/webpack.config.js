var path = require("path");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  entry:[
        'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    "./app/app.js"
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/build/",
    filename: "bundle.js"
  },
  resolve:{
    extensions: ['','.js', '.jsx']
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  debug: true,
devtool: "#eval-source-map",
  module:{
    loaders:[{
      test: /\.js?$/,
      exclude:/node_modules/,
      loaders:['react-hot','babel']
    }
    ,
{
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader', 'postcss-loader']
}
  ]
},
  postcss: function(){
    return [autoprefixer, precss];
  }

};
// live updates at http://localhost:8080/build/
//It is also important to specify the output.publicPath that matches the output.path from the view of the index.html page.
// new webpack.HotModuleReplacementPlug(),//enables hot module replacement
// new webpack.NoErrorsPlugin()// skips the emitting phase when encounting errors
//loader order matters
// style-loader and css-loader allow us to load css file in our React components.
// Whereas, postcss-loader is a loader to process our CSS with plugins.
// In our case we’ll only use autoprefixer and precss.

//each component will have its own scss file, a common scss file will hold all variables used acrosss every component
