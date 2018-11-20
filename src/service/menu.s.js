/**
 * 菜单权限校验/请求
 */

const menuAccessList = require('../../config/menuAccessList')
const { constants, env } = require('../../config/config')
const request = require('../../utils/request')

module.exports = {
  check: async function(routerName, token) {
    if (!token) {
      return {
        status: 500,
        body: {
          code: '-1',
          msg: 'token不存在'
        }
      }
    }

    // 无菜单权限时，出现了routerName为null的情况
    if (!routerName) {
      return {
        status: 403,
        body: {
          code: '-1',
          msg: 'routerName不存在'
        }
      }
    }

    const proxyTarget = constants.proxyTarget[env]

    if (!proxyTarget) {
      // this.ctx.logger.error('proxyTarget代理接口未配置')
      return {
        status: 500,
        body: {
          code: '-1',
          msg: 'proxyTarget代理接口未配置'
        }
      }
    }

    try {
      // 请求menuList
      const res = await request.get({
        url: `${proxyTarget}/console/common/getMenu`
      })
      // this.ctx.logger.info(res);
      
      if (!res) {
        // this.ctx.logger.error('网关返回数据为空');
        return ({
          status,
          data: {
            code: '-1',
            msg: '网关返回数据为空',
          },
        });
      }
      const { code, msg, result } = data;
      // console.log("1")
      const req = {
        data: {
          code,
          msg,
        },
        status,
      };
      // console.log("2")
      if (result && Array.isArray(result.menuList)) {
        // console.log("3")
      
        const menuIdList = result.menuList.map(m => m.menuId);
        // this.ctx.logger.info(menuIdList);
        const currentRoutes = menuAccessList.find(item => item.routerNames.includes(routerName));
        if (!currentRoutes) {
          req.data = {
            code: '-1',
            msg: '菜单配置问题',
          };
        } else {
          // this.ctx.logger.info('currentRoutes.menuId => ', currentRoutes.menuId.toLowerCase());
          const currentMenu = menuIdList.find(current => current.toLowerCase().indexOf(currentRoutes.menuId.toLowerCase()) > -1);
          // this.ctx.logger.info('currentMenu => ', currentMenu);
          if (!currentMenu) {
            req.data = {
              code: '-100002',
              msg: '菜单无权限访问,请重新登陆',
            };
          }
        }
      }
      // this.ctx.logger.info(req);
      return req;
    } catch (err) {
      // this.ctx.logger.error(
      //   `请求《${proxyTarget}/console/common/getMenu》出错：`,
      //   err.message
      // )
      return {
        status: err.status || 500,
        body: {
          code: '-1',
          msg: '接口请求错误'
        }
      }
    }
  }
}
