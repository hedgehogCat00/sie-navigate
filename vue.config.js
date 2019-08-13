module.exports = {
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
}
