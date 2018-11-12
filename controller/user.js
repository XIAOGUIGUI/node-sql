const userService = require('../service/user')
exports.register = async(ctx) => {
  let { username } = ctx.request.body
  let result = await userService.addUser(username).catch(err => {
    ctx.log.error(err.message);
    ctx.throw(500, '服务器内部错误')
  })
  ctx.response.body = result
}
exports.register.__method__ = 'post'

exports.list = async(ctx) => {
  let result = await userService.allUser().catch(err => {
    ctx.log.error(err.message);
    ctx.throw(500, '服务器内部错误')
  })
  ctx.response.body = result
}

exports.update = async(ctx) => {
  let data = ctx.request.body
  let result = await userService.updateUser(data).catch(err => {
    ctx.log.error(err.message);
    ctx.throw(500, '服务器内部错误')
  })
  ctx.response.body = result
}
exports.update.__method__ = 'post'
