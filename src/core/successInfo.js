// 成功信息
class info {
  constructor(msg = '1', data = {}) {
    this.msg = msg
    this.code = 200
    this.data = data
  }
}

module.exports = {
  info
}