const gitlabService = require('../service/gitlab')
const projectService = require('../service/project')

exports.sync = async(ctx) => {
  let { token } = ctx.request.body
  console.log(token)
  let projects = await gitlabService.projects(token).catch(err => {
    ctx.log.error(err.message);
    ctx.throw(500, '服务器内部错误')
  })
  let addState = await projectService.init(projects).catch(err => {
    ctx.log.error(err.message);
    ctx.throw(500, '服务器内部错误')
  })
  ctx.response.body = addState
}
exports.sync.__method__ = 'post'
