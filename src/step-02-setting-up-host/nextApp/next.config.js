const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config) {    
      config.plugins.push(
        // Place your NextFederationPlugin config here
      )
    return config
  },
  reactStrictMode: true,
}
