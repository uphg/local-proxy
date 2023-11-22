const chalk = require('chalk')
const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const connect = require('connect')
const serveStatic = require('serve-static')

// const rawArgv = process.argv.slice(2)
// const args = rawArgv.join(' ')

const base = '/'
const port = 9526
const apiPrefix = '/api'
const proxy = {
  target: 'http://10.0.5.20:8080/',
  changeOrigin: true,
  pathRewrite: {
    ['^' + apiPrefix]: ''
  },
}

const app = connect()

app.use(history({
  index: `${base}index.html`
}))

app.use(
  base,
  serveStatic('./dist', {
    index: ['index.html', '/']
  })
)

// proxy
app.use(
  apiPrefix,
  createProxyMiddleware(proxy)
)

app.listen(port, function () {
  console.log(chalk.green(`> Preview at http://localhost:${port}${base}`))
})
