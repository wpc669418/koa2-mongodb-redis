const log4js = require("log4js");
//方案一：记录在文件里
// log4js.configure({
//   appenders: { cheese: { type: "file", filename: "cheese.log" } },
//   categories: { default: { appenders: ["cheese"], level: "trace" } }
// });
// const log = log4js.getLogger("cheese");

// 方案二：控制台输出
const log = log4js.getLogger();
log.level = "trace";

export {
  log
} 