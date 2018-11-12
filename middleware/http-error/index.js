module.exports = () => {
  return async (ctx, next) => {
    try {
       await next();
       /**
        * 如果没有更改过 response 的 status，则 koa 默认的 status 是 404
        */
       if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
    } catch (e) {
      /*此处进行错误处理，下面会讲解具体实现*/
      let status = parseInt(e.status)
      // 默认错误信息为 error 对象上携带的 message
      let message = e.message
      if (status === 401) {
        ctx.response.status = 200
        ctx.send({
          code: 50014,
          msg: '登录超时'
        })
      } else {
        ctx.send({
          code: status,
          msg: message
        })
      }
    }
  }
}
