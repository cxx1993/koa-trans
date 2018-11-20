/**
 * 菜单请求
 */
const menuService = require('../service/menu.s.js')

module.exports = {
  // 请求
  index: async function(ctx, next) {
    const { routerName } = ctx.request.body
    const token = ctx.cookies.get('JSESSIONID')
    const res = await menuService.check(routerName, token)
    ctx.response.body = res
  }
}
