const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const middleware = require('./middleware')
middleware(app)
app.listen(3001, () => {
  console.log('server is running at http://localhost:3001')
})
