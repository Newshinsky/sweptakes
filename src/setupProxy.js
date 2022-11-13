const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
    app.use(
        createProxyMiddleware('/api/v1/user',
            {
                target: 'http://api.cup2022.ir',
                changeOrigin: true
            }
        )
    )
    app.use(
        createProxyMiddleware('/api/v1/match',
            {
                target: 'http://api.cup2022.ir',
                changeOrigin: true
            }
        )
    )
}