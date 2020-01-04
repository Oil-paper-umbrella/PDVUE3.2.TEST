import axios from '../control/filter/http.js'
/**
 * @namespace getLineChart
 * @param {获取折线图的指标参数}} body 
 */
let getLineChart = async function (body) {
  return new Promise((resolve, reject) => {
    axios.post('/dianye/rest/JsonData/LineChart', body)
      .then(data => {
        console.log(data.status)
        if (data.status === 200) {
          //处理状态
          resolve(data.data);
        } else {
          reject(data.status)
        }
      })
  })
}
export default getLineChart;