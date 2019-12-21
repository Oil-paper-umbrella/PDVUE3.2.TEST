import axios from '../control/filter/http.js'
/**
 * @namespace getFourModules 向后台请求四大模块数据
 * @param {获取四大模块的时间参数} body 
 */
let getFourModules = async function (body) {
  return await axios.post('/dianye/rest/JsonData/FourModual', body);
}
export default getFourModules;