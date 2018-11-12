const Koa = require('koa')
const ip = require('ip')
const log = require('../index')
const app = new Koa()
app.use(log({
  env: app.env,  // koa 提供的环境变量
  projectName: 'koa2-pwa-notice',
  appLogLevel: 'debug',
  dir: 'logs',
  serverIp: ip.address()
}))
app.use(async (ctx, next)=>{
  await next()
  ctx.log.error('错误的日志')
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>Hello World</h1>'  
})
module.exports = app