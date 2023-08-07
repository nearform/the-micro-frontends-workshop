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
      })
    )

    return config
  },
  reactStrictMode: true,
}
