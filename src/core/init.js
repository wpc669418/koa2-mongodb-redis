
import errors from './http-exception'
import successInfo from './successInfo'
import { log } from '../utils/log'

class InitManager {

  static init_global () {
    global.log = log
    global.errs = errors
    global.success = successInfo
  }
}

export {
  InitManager
}