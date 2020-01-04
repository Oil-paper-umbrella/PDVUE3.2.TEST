import axios from '../control/filter/http.js'
/**
 * @namespace getFourModules 向后台请求四大模块数据
 * @param {获取四大模块的时间参数} body 
 */
let getFourModules = async function (body) {
  return new Promise((resolve, reject) => {
    axios.post('/dianye/rest/JsonData/FourModual', body)
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
export default getFourModules;