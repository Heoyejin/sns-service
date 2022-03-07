const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withImages = require('next-images');

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    ];
 
    return {
      ...config,
      loader:  {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader',
      },
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-sorce-map' : 'eval',
      plugins,
    }
  }
});

module.exports = withImages();