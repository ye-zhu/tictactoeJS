module.exports = {
  entry: "./snake/view.js",
  output: {
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
