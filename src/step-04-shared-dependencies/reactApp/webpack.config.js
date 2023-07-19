const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin

module.exports = {
  entry: './src/index',
  entry: {
    app: {
      import: './src/index',
    },
  },
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: 'auto',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'reactApp',
      filename: 'remoteEntry.js',
      remotes: {
        remote:
          'nextApp@http://localhost:8081/_next/static/chunks/remoteEntry.js',
      },
      exposes: {
        './Nav': './src/components/Nav',
        './Title': './src/components/Title',
      },
      shared: {
        react: {
          requiredVersion:
            require('./package.json').dependencies.react,
          singleton: true,
        },
        'react-dom': {
          requiredVersion:
            require('./package.json').dependencies['react-dom'],
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
