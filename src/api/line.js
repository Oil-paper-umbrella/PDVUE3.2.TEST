import axios from '../control/filter/http.js'
/**
 * @namespace getLineChart
 * @param {获取折线图的指标参数}} body 
 */
let getLineChart = async function (body) {
  return await axios.post('/dianye/rest/JsonData/LineChart', body);
}
export default getLineChart;