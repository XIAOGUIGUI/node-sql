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
  let data = ctx.request.body
  let result = await userService.allUser(data).catch(err => {
    ctx.log.error(err.message);
    ctx.throw(500, '服务器内部错误')
  })
  ctx.response.body = result
}
exports.list.__method__ = 'post'

exports.info = async(ctx) => {
  let { id } = ctx.request.body
  let result = await userService.userInfo(id).catch(err => {
    ctx.log.error(err.message);
    ctx.throw(500, '服务器内部错误')
  })
  ctx.response.body = result
}
exports.info.__method__ = 'post'

exports.update = async(ctx) => {
  let data = ctx.request.body
  let result = await userService.updateUser(data).catch(err => {
    ctx.log.error(err.message);
    ctx.throw(500, '服务器内部错误')
  })
  ctx.response.body = result
}
exports.update.__method__ = 'post'
