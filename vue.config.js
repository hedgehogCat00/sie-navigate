module.exports = {
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8090',
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        performance: {
            hints: 'warning',
            maxEntrypointSize: 5000000,
            maxAssetSize: 3000000
        }
    }
}
