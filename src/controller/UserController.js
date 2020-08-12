import svgCaptcha from 'svg-captcha';
import * as redis from '../utils/redis'

class ErrorModel {
  constructor(text) {
    this.msg = text
    this.code = 0
  }
}
class UserController {
  constructor() {
  }

  async getCaptcha (ctx) {
    const { key } = ctx.request.query
    if (key === (void 0)) {
      ctx.body = {
        msg: '参数缺失',
        code: 0
      }
      return
    }
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: Math.floor(Math.random() * 5), // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      width: 150,
      height: 40
    })
    const res = await redis.setValue(key, captcha.text)
    if (res) {
      await redis.client(key, 60)
      redis.getVaule(key).then(res => {
        console.log('UserController -> getCaptcha -> res', res)
      })
      // {data: '<svg.../svg>', text: 'abcd'}
      ctx.body = {
        data: captcha.data,
        msg: '获取成功',
        code: 1
      }
    }
  }
}

// export default new UserController()
const userController = new UserController()
export {
  userController
}