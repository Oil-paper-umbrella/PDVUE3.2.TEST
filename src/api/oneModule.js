import axios from '../control/filter/http.js'
/**
 * @namespace getOneModule
 * @param {获取饼图的时间参数和模块参数} body 
 */
let getOneModule = async function (body) {
  return await axios.post('/dianye/rest/JsonData/OneModual', body);
}
export default getOneModule;