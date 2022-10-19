const { run } = require('runjs')
const chalk = require('chalk')
const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const connect = require('connect')
const serveStatic = require('serve-static')

const rawArgv = process.argv.slice(2)
// const args = rawArgv.join(' ')
const port = 9526
const publicPath = "/"
const apiPrefix = '/prod-api'
const proxyTarget = 'http://10.0.5.20:8080/'

const app = connect()

build()

app.use(history({
  index: '/index.html'
}))

app.use(
  publicPath,
  serveStatic('./dist', {
    index: ['index.html', '/']
  })
)

// proxy
app.use(
  apiPrefix,
  createProxyMiddleware({
    target: proxyTarget,
    changeOrigin: true,
    pathRewrite: {
      ['^' + apiPrefix]: ''
    },
  })
)

app.listen(port, function () {
  console.log(chalk.green(`> Preview at http://localhost:${port}${publicPath}`))
})

function build() {
  // run(`vue-cli-service build ${args}`)
}