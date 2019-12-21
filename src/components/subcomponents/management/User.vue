<template>
  <div class="user">
    <el-row>
      <h1>用户管理</h1>
    </el-row>
    <el-row class="user-process">
      <el-button type="danger" icon="el-icon-delete" @click="batchDel">批量删除</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="updateDialog = true">添加用户</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="userTable"
        style="width: 100%;"
        border
        ref="multipleSelection"
        max-height="500"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="ID" width="120">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="真实姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rolesString" label="角色" width="120"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <i class="el-icon-alishouquan icon-control" @click="addRole(scope)"></i>
            <i class="el-icon-edit icon-control" @click="editUser(scope)"></i>
            <i class="el-icon-delete icon-control" @click="delUser(scope.row.id)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog
      title="添加用户"
      :visible.sync="updateDialog"
      width="30%"
      v-dialogDrag
      :before-close="cancel"
    >
      <el-form ref="editMsg" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editMsg.username"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="editMsg.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editMsg.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editMsg.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editMsg.email" placeholder="@"></el-input>
        </el-form-item>
        <el-row style="text-align: center;">
          <el-button type="success" size="small" @click="addChecked">确定</el-button>
          <el-button type="primary" size="small" @click="cancel">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="添加角色"
      :visible.sync="addDialog"
      width="30%"
      v-dialogDrag
      :before-close="cancel"
    >
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="roleMsg.username"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="roleMsg.roles" multiple placeholder="请选择角色">
            <el-option
              v-for="(item,i) in roleTale"
              :label="item.roleName"
              :value="item.roleId"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row style="text-align: center;">
          <el-button type="success" size="small" @click="checkRole">确定</el-button>
          <el-button type="primary" size="small" @click="cancel">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import requestUser from "../../../api/user.js";
import manageConfirm from "../../../utils/confirm.js";
export default {
  data() {
    return {
      userTable: [
        // {
        //   username: "zs",
        //   password: "123",
        //   phone: "150",
        //   email: "254862",
        //   name: "zas",
        //   id: "1",
        //   rolesString: ["超级管理员"]
        // },
        // {
        //   username: "ls",
        //   password: "183",
        //   phone: "110",
        //   email: "48ssc62",
        //   name: "lsd",
        //   id: "2",
        //   rolesString: ["管理员"]
        // },
        // {
        //   username: "ww",
        //   password: "qwe",
        //   phone: "134",
        //   email: "sfvfg",
        //   name: "wwa",
        //   id: "3",
        //   rolesString: ["管理员"]
        // }
      ],
      roleTale: [],
      editMsg: {
        username: "",
        password: "",
        phone: "",
        email: "",
        name: "",
        id: ""
      },
      roleMsg: {
        username: "",
        userid: "",
        roles: []
      },
      // indexs: 1,
      multipleSelection: "",
      updateDialog: false,
      addDialog: false
      // operationIndex: 0,
      // operationName: "",
      // delDialog: false,
    };
  },
  created() {
    this.getAllUser();
    this.getAllRole();
  },
  methods: {
    /**
     * @namespace 将editMsg对象内的所有数据清空
     */
    initEditMsg() {
      this.editMsg.username = "";
      this.editMsg.password = "";
      this.editMsg.phone = "";
      this.editMsg.email = "";
      this.editMsg.name = "";
      this.editMsg.role = "";
    },
    /**
     * @namespace 将roleMsg对象内的所有数据清空
     */
    initRoleMsg() {
      this.roleMsg.username = "";
      this.roleMsg.userid = "";
      this.roleMsg.roles = "";
    },
    /**
     * @namespace requestMsg
     * @param {后台返回的数据} data
     * @param {操作成功时返回的数据} responseData
     */
    requestMsg(data, responseData) {
      if (data === responseData) {
        this.getAllUser();
        this.$message.success("操作成功!");
      } else {
        this.$message.error("操作失败!");
      }
    },

    /**
     * @namespace getAllUser  从后台请求所有用户信息
     */
    getAllUser() {
      requestUser.getUser().then(data => {
        this.userTable = data.data.AllUser;
      });
    },
    /**
     * @namespace getAllRole 获取所有角色
     */
    getAllRole() {
      requestUser.getRole().then(data => {
        this.roleTale = data.data.ALLRole;
      });
    },
    /**
     * @namespace addUser 向后台发起请求，添加用户
     * @param {用户信息} userInfo
     */
    addUser(userInfo) {
      requestUser.addUser(userInfo).then(data => {
        this.requestMsg(data.data.msg, "用户添加成功!");
        this.initEditMsg();
      });
    },
    /**
     * @namespace requestDelUser 通过用户 id 向后台发起请求，删除用户
     * @param {用户id} id
     */
    requestDelUser(id) {
      requestUser.delUser({ user_id: id }).then(data => {
        this.requestMsg(data.data.msg, "删除成功");
      });
    },
    /**
     * @namespace
     * @param {userInfo} 修改后的用户信息
     */
    updateUser(userInfo) {
      requestUser.updateUser(userInfo).then(data => {
        this.requestMsg(data.data.msg, "修改用户成功!");
        this.initEditMsg();
      });
    },
    requestAddRole(userRole) {
      requestUser.addRolesToUser(userRole).then(data => {
        this.requestMsg(data.data, "用户设置权限成功!");
        this.initRoleMsg();
      });
    },

    /**
     * @namespace 弹出dialog 取消操作
     */
    cancel() {
      this.initRoleMsg();
      this.initEditMsg();
      this.updateDialog = false;
      this.addDialog = false;
    },
    /**
     * @namespace addRole 给用户添加角色
     * @param {scope} 当前要添加角色的用户信息
     */
    addRole(scope) {
      this.roleMsg.username = scope.row.username;
      this.roleMsg.userid = scope.row.id;
      this.addDialog = true;
    },
    /**
     * @namespace checkRole 确认给该用户添加角色
     */
    checkRole() {
      console.log(this.roleMsg);
      this.requestAddRole(this.roleMsg);
      this.editMsg.username = "";
      this.addDialog = false;
    },

    /**
     * @namespace editUser 修改用户信息
     * @param {当前需要修改的用户信息} scope
     */
    editUser(scope) {
      this.editMsg.username = scope.row.username;
      this.editMsg.password = scope.row.password;
      this.editMsg.email = scope.row.email;
      this.editMsg.phone = scope.row.phone;
      this.editMsg.name = scope.row.name;
      this.editMsg.id = scope.row.id;
      this.updateDialog = true;
    },
    /**
     * @namespace addChecked  弹出dialog,确认添加用户
     */
    addChecked() {
      let user_flag = false;
      for (let i = 0; i < this.userTable.length; i++) {
        if (this.userTable[i].id == this.editMsg.id) {
          this.updateUser(this.editMsg);
          user_flag = true;
          break;
        }
      }
      if (!user_flag) {
        this.addUser(this.editMsg);
      }
      this.updateDialog = false;
      // this.initEditMsg();
    },

    /**
     * @namespace delUser 弹出dialog,确认是否删除用户
     * @param {用户id} id
     */
    delUser(id) {
      manageConfirm
        .confirm(this, "此操作将永久删除该用户, 是否继续?")
        .then(() => {
          this.requestDelUser(id);
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },

    /**
     * @namespace batchDel 批量删除
     */
    batchDel() {
      console.log(this.$refs.multipleTable);
      manageConfirm
        .confirm(this, "此操作将永久删除这些用户, 是否继续?")
        .then(() => {
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    handleSelectionChange(val){
      console.log("select change");
      console.log(val);
      let userId = [];
      for(let i=0; i<val.length; i++){
        console.log(i);
        console.log(val[i].id);
        userId.push(val[i].id);
      }
      console.log("final");
      console.log(userId);
    }
  },
  // watch: {
  //   indexs: {
  //     handler: function(val) {
  //       console.log(val);
  //       this.getAllUser();
  //     }
  //   }
  // }
};
</script>
<style lang="scss">
.user {
  .user-process {
    margin-bottom: 10px;
  }
}
</style>