const Path = require("path")
const fs = require('fs')
const router = require('koa-router')()
const method = 'get'
module.exports = (options) => {
  return async function(ctx, next) {
    let { app, path = ''} = options
    if (!app) {
      throw new Error('router: the app params is necessary!')
    }
    if (path === '') {
      throw new Error('router: the path params is necessary!')
    }
    fs.readdirSync(path).forEach(filename => {
      let extname = Path.extname(filename)
      if (extname === '.js') {
        let name = Path.basename(filename, extname)
        let exportFuncs = require(Path.join(path, filename))
        let config = {
          __name__: name,
          __prefix__: ''
        }
        for (let ctrlname in exportFuncs) {
          if (!exportFuncs.hasOwnProperty(ctrlname)) {
            continue
          }
          if (ctrlname == 'controllerConfig') {
            config = Object.assign(config, exportFuncs[ctrlname])
            continue
          }
          let result = {
            ctrl: exportFuncs[ctrlname],
            method: exportFuncs[ctrlname].__method__ || method
          }
          let path = getRouterPath(exportFuncs[ctrlname], config, ctrlname)
          router[result.method](path, result.ctrl)
        }
      }
    })
    app.use(router.routes())
      .use(router.allowedMethods())
    await next()
  }
}
function getRouterPath(data, config, ctrlname) {
  let path =  '/' + config.__name__
  if (config.__prefix__ !== ''){
    path = config.__prefix__ + path
  }
  if (typeof data.__name__ == "string") {
    path = path + data.__name__
  } else if (ctrlname === 'index') {
    path = path + '/'
  } else {
    path = path + '/' + ctrlname
  }
  if (data.__regular__){
    path = path + data.__regular__
  }
  return path
}
