module.exports = {
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '192.168.123.10',
        port: 8081,
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}