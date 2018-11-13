const projectService = require('../service/project')
exports.list = async(ctx) => {
  let data = ctx.request.body
  let result = await userService.allProjects(data).catch(err => {
    ctx.log.error(err.message);
    ctx.throw(500, '服务器内部错误')
  })
  ctx.response.body = result
}
exports.list.__method__ = 'post'
