const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // IMPORTANT: use service name (Docker DNS), not localhost
      target: 'http://website_backend:5002',
      changeOrigin: true,
    })
  );
};
