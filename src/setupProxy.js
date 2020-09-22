const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('log proxy..', typeof proxy);
module.exports = function (app) {
    //api 代表代理路径
    //target 代表目标服务器的地址
    app.use(createProxyMiddleware('/api',{
        target: 'http:localhost:3010',
        changeOrigin: false,
        ws: true,
        pathRewrite: {
            '^/api': '/'
        }
    })
    );
};
