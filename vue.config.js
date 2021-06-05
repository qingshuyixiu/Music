module.exports = {
    publicPath: './', //网站路径
    // outputDir: './', //打包路径
    devServer: {
        port: 8000,
        open: true, //自动打开
        // proxy: { //代理配置
        //     "/search": {
        //         target: 'http://musicapi.leanapp.cn/', //代理服务器地址
        //         changeOrigin: true //允许跨域
        //     }
        // }
    }
}