const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin')
const packageJsonDependencies = require('./package.json').dependencies

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'nextApp',
          remotes: {
            remote: 'reactApp@http://localhost:8080/remoteEntry.js',
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './nextjs-layout-box':
              './components/nextjs-layout-box.js',
            './nextjs-table': './components/nextjs-table.js',
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
          extraOptions: {
            skipSharingNextInternals: true,
          },
        })
      )
    }
    return config
  },
  reactStrictMode: true,
}
