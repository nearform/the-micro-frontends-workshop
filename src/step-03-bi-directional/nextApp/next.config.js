const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'nextApp',
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
