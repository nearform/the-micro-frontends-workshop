const NextFederationPlugin = require('@module-federation/nextjs-mf')

module.exports = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'nextApp',
        remotes: {
          remote: 'reactApp@http://localhost:8080/remoteEntry.js',
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './nextjs-layout-box': './components/nextjs-layout-box.js',
          './nextjs-table': './components/nextjs-table.js',
        },
        shared: {
          react: {
            requiredVersion: false,
            singleton: true,
          },
        },
        extraOptions: {
          skipSharingNextInternals: true,
        },
      })
    )

    return config
  },
  reactStrictMode: true,
}
