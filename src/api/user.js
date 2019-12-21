import axios from '../control/filter/http.js'
/**
 * @namespace getUser 获取用户及其角色
 * @author he
 * create in 2019-12-15
 */
let getUser = async function () {
  return await axios
  .post(
    "http://211.69.26.108:8080/dianye/crudServlet?methodName=getJsonAllUserAndRole"
  )
}

/**
 * @namespace addUser 新增用户
 * @param {新增用户信息} body 
 */
let addUser = async function (body) {
  return await axios
  .post(
    "http://211.69.26.108:8080/dianye/crudServlet?methodName=addUser",body
  )
}

/**
 * @namespace delUser 删除单个用户
 * @param {要删除的用户id} body 
 */
let delUser = async function (body) {
  return await axios
  .post(
    "http://211.69.26.108:8080/dianye/crudServlet?methodName=delUserById",body
  )
}

/**
 * @namespace updateUser 修个单个用户信息
 * @param {修改后的用户信息} body 
 */
let updateUser = async function (body) {
  return await axios
  .post(
    "http://211.69.26.108:8080/dianye/crudServlet?methodName=updateUser",body
  )
}

/**
 * @namespace getRole 获取所有角色
 */
let getRole = async function () {
  return await axios
  .post(
    "http://211.69.26.108:8080//dianye/crudServlet?methodName=getAllRoles"
  )
}

/**
 * @namespace addRolesToUser
 * @param {需要添加角色的用户id跟角色id} body 
 */
let addRolesToUser = async function (body) {
  return await axios
  .post(
    "http://211.69.26.108:8080/dianye/crudServlet?methodName=setUserRoles",body
  )
}


let requestUser = {
  getUser,
  addUser,
  delUser,
  updateUser,
  getRole,
  addRolesToUser
}
export default requestUser;