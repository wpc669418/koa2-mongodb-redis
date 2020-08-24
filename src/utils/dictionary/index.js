import { find } from '../mysql'

// 查询整个字典表并放入内存中
const getDic = async (key = '') => {
  const res = await find({
    tableName: 'dic',
    where: {
      key
    }
  })
  const data = res.data
  let obj = {}
  data.forEach(item => {
    if (!(obj[item.key] instanceof Array)) {
      obj[item.key] = []
    }
    obj[item.key].push(item)
  })
  global.dicObj = obj
}

const getText = (key, value) => {
  const curArr = global.dicObj[key]
  let result = ''
  curArr.forEach(item => {
    if (item.code == value) {
      result = item.text
    }
  })
  return result
}

const getTextList = (obj, arr) => {
  if (!(arr instanceof Array)) {
    throw new error('格式错误')
  }
  arr.forEach(item => {
    obj[item] = getText(item, obj[item])
  })
  return obj
}

export { getDic, getText, getTextList }  