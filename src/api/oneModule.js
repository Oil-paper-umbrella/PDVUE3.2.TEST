import axios from '../control/filter/http.js'
/**
 * @namespace getOneModule
 * @param {获取饼图的时间参数和模块参数} body 
 */
let getOneModule = async function (body) {
  return new Promise((resolve, reject) => {
    axios.post('/dianye/rest/JsonData/OneModual', body)
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
export default getOneModule;