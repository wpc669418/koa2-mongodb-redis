import nodeExcel from 'excel-export'
import excelConfig from './config'

function exportExcel ({
  cols = excelConfig.cols,
  rows
}) {
  var conf = {};
  conf.name = "sheet1";
  conf.cols = excelConfig.cols
  conf.rows = rows;
  var result = nodeExcel.execute(conf);
  let data = new Buffer(result, 'binary');
  return data
}

export default exportExcel