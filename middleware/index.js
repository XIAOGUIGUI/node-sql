const ip = require('ip')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const log = require('./log')
const httpError = require('./http-error')
const send = require('./send')
const router = require('./router')
const cors = require('koa2-cors')
// 可以自动加载所有的中间件，再去app.js调用
module.exports = app => {
  app.use(cors())
  app.use(httpError())
  app.use(log({
    env: app.env,
    projectName: 'koa2-pwa-notice',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))
  app.use(bodyParser())
  app.use(send())
  app.use(router({
    app,
    path: path.join(__dirname, '../controller')
  }))
}
