/**
 * 转发请求
 */

module.exports = {
  post: async (ctx, next) => {
    const { url } = ctx

    try {
      let data = await request.post({
        url: `${target}${url}`,
        body: ctx.request.body,
        json: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      ctx.response.body = data
    } catch (e) {
      console.log(e)
    }
  },
  get: async (ctx, next) => {
    const { url } = ctx
    try {
      let data = await request.get({
        url: `${target}${url}`
      })
      ctx.response.type = 'json'
      ctx.response.body = data
    } catch (e) {
      console.log(e)
    }
  }
}
