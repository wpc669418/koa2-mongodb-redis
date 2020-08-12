// 成功信息
class info {
  constructor({
    msg = "操作成功", code = 1, data
  }) {
    this.msg = msg
    this.code = code
    this.data = data
  }
}

module.exports = {
  info
}