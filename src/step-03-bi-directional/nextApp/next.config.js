const NextFederationPlugin = require('@module-federation/nextjs-mf')

module.exports = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'nextApp',
        // Place your configuration here
        remotes: {},
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        extraOptions: {
          skipSharingNextInternals: true,
        },
      })
    )
    return config
  },
  // your original next.config.js export
  reactStrictMode: true,
}
