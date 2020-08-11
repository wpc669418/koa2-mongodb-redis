import koa from 'koa'
import path from 'path'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose'
import compress from 'koa-compress'
import './util/redis'
import { log } from './util/log'
import { systemConfig } from './config'

const app = new koa()

const isDevMode = process.env.NODE_ENV === 'production' ? false : true

// 全局异常捕捉 洋葱模型的最外层 捕获内部的错误
app.use(async (ctx, netx) => {
  try {
    await netx()
  } catch (error) {
    ctx.body = {
      msg: error,
      code: 500
    }
  }
})

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
])

if (!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(systemConfig.serverPort, () => {
  log.info(`server is running in ${systemConfig.serverPort}`)
})
