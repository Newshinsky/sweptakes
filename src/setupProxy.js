const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
    app.use(
        createProxyMiddleware('1',
            {
                target: '1',
                changeOrigin: false
            }
        )
    )
    app.use(
        createProxyMiddleware('1',
            {
                target: '1',
                changeOrigin: false
            }
        )
    )
 }