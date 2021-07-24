const { environment } = require('@rails/webpacker')
const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')

const resolveFromRoot = (dir) => path.resolve(__dirname, '..', '..', dir)

environment.config.merge({
  resolve: {
    alias: {
      'api': resolveFromRoot('app/assets/javascripts/packs/api'),
      'components': resolveFromRoot('app/assets/javascripts/packs/components'),
      'configs': resolveFromRoot('app/assets/javascripts/packs/configs'),
      'context': resolveFromRoot('app/assets/javascripts/packs/context'),
      'images': resolveFromRoot('app/assets/images'),
      'locales': resolveFromRoot('config/locales'),
      'models': resolveFromRoot('app/assets/javascripts/packs/models'),
      'pages': resolveFromRoot('app/assets/javascripts/packs/pages'),
      'stores': resolveFromRoot('app/assets/javascripts/packs/stores'),
      'utils': resolveFromRoot('app/assets/javascripts/packs/utils'),
    },
    extensions: ['.js', '.jsx']
  }
})

environment.loaders.append('yaml', {
  test: /\.yml$/,
  loader: 'js-yaml-loader'
})

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env'
]

dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true })
})

environment.plugins.insert(
  "Environment",
  new webpack.EnvironmentPlugin(process.env)
)

environment.config.set('output.filename', '[name]-[chunkhash].js')

module.exports = environment
