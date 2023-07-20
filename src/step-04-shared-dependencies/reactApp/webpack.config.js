const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin
const packageJsonDependencies = require('./package.json').dependencies

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
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
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
          requiredVersion: packageJsonDependencies.react,
          singleton: true,
        },
        'react-dom': {
          requiredVersion: packageJsonDependencies['react-dom'],
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
