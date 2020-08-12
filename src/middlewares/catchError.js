import { HttpException } from '../core/http-exception'
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 已知异常
    const isHttpException = error instanceof HttpException
    // 开发环境
    // const isDev = global.config.environment === 'dev'
    // // 在控制台显示未知异常信息：开发环境 不是HttpException 抛出异常
    // if (isDev && !isHttpException) {
    //   throw error
    // }

    /**
     * 是已知错误，还是未知错误
     * 返回：
     *      msg 错误信息
     *      error_code 错误码
     *      request 请求的接口路径
     */
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }
    else {
      ctx.body = {
        msg: '服务器出现了未知异常',
        code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

export default catchError