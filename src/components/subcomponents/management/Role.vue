<template>
  <div class="role">
    <el-row>
      <h1>角色管理</h1>
    </el-row>
    <el-row class="role-process">
      <el-button type="danger" icon="el-icon-delete" @click="batchDel">批量删除</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="updateDialog = true">添加角色</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="roleTable"
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
        <el-table-column prop="roleName" label="角色名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roleDescription" label="角色描述" show-overflow-tooltip></el-table-column>
        <el-table-column prop="email" label="角色对应权限" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <i class="el-icon-alishouquan icon-control" @click="addRole(scope)"></i>
            <i class="el-icon-edit icon-control" @click="editrole(scope)"></i>
            <i class="el-icon-delete icon-control" @click="delRole(scope.row.id)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog
      title="添加角色"
      :visible.sync="updateDialog"
      width="30%"
      v-dialogDrag
      :before-close="cancel"
    >
      <el-form ref="editMsg" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名" prop="rolename">
          <el-input v-model="editMsg.rolename"></el-input>
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
      title="添加权限"
      :visible.sync="addDialog"
      width="30%"
      v-dialogDrag
      :before-close="cancel"
    >
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名" prop="rolename">
          <el-input v-model="roleMsg.rolename"></el-input>
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
// import requestrole from "../../../api/role.js";
import manageConfirm from "../../../utils/confirm.js";
export default {
  data() {
    return {
      roleTable: [],
      roleTale: [],
      editMsg: {
        rolename: "",
        password: "",
        phone: "",
        email: "",
        name: "",
        id: ""
      },
      roleMsg: {
        rolename: "",
        roleid: "",
        roles: []
      },
      indexs: 1,
      multipleSelection: "",
      updateDialog: false,
      addDialog: false
    };
  },
  created() {
    this.getAllRole();
  },
  methods: {
    /**
     * @namespace 将editMsg对象内的所有数据清空
     */
    initEditMsg() {
      // this.editMsg.rolename = "";
      // this.editMsg.password = "";
      // this.editMsg.phone = "";
      // this.editMsg.email = "";
      // this.editMsg.name = "";
      // this.editMsg.role = "";
    },
    /**
     * @namespace 将roleMsg对象内的所有数据清空
     */
    initRoleMsg() {
      // this.roleMsg.rolename = "";
      // this.roleMsg.roleid = "";
      // this.roleMsg.roles = "";
    },
    /**
     * @namespace requestMsg
     * @param {后台返回的数据} data
     * @param {操作成功时返回的数据} responseData
     */
    requestMsg() {
      // if (data === responseData) {
      //   this.indexs++;
      //   this.$message.success("操作成功!");
      // } else {
      //   this.$message.error("操作失败!");
      // }
    },

    /**
     * @namespace getAllrole  从后台请求所有角色信息
     */
    getAllRole() {
      this.axios
        .post(
          "http://211.69.26.108:8080/dianye/crudServlet?methodName=getJsonAllUserAndRole"
        )
        .then(data => {
          console.log(data);
          this.roleTable = data.data.ALLRole;
        });
    },
    /**
     * @namespace addrole 向后台发起请求，添加角色
     * @param {角色信息} roleInfo
     */
    addrole() {
      // requestrole.addrole(roleInfo).then(data => {
      //   this.requestMsg(data.data.msg, "角色添加成功!");
      //   this.initEditMsg();
      // });
    },
    /**
     * @namespace requestR 通过角色 id 向后台发起请求，删除角色
     * @param {角色id} id
     */
    requestR() {
      // requestrole.delrole({ role_id: id }).then(data => {
      //   this.requestMsg(data.data.msg, "删除成功");
      // });
    },
    /**
     * @namespace
     * @param {roleInfo} 修改后的角色信息
     */
    updaterole() {
      // requestrole.updaterole(roleInfo).then(data => {
      //   this.requestMsg(data.data.msg, "修改角色成功!");
      //   this.initEditMsg();
      // });
    },
    requestAddRole() {
      // requestrole.addRolesTorole(roleRole).then(data => {
      //   this.requestMsg(data.data, "角色设置权限成功!");
      //   this.initRoleMsg();
      // });
    },

    /**
     * @namespace 弹出dialog 取消操作
     */
    cancel() {
      // this.initRoleMsg();
      // this.initEditMsg();
      // this.updateDialog = false;
      // this.addDialog = false;
    },
    /**
     * @namespace addRole 给角色添加角色
     * @param {scope} 当前要添加角色的角色信息
     */
    addRole() {
      // this.roleMsg.rolename = scope.row.rolename;
      // this.roleMsg.roleid = scope.row.id;
      // this.addDialog = true;
    },
    /**
     * @namespace checkRole 确认给该角色添加角色
     */
    checkRole() {
      // console.log(this.roleMsg);
      // this.requestAddRole(this.roleMsg);
      // this.editMsg.rolename = "";
      // this.addDialog = false;
    },

    /**
     * @namespace editrole 修改角色信息
     * @param {当前需要修改的角色信息} scope
     */
    editrole() {
      // this.editMsg.rolename = scope.row.rolename;
      // this.editMsg.password = scope.row.password;
      // this.editMsg.email = scope.row.email;
      // this.editMsg.phone = scope.row.phone;
      // this.editMsg.name = scope.row.name;
      // this.editMsg.id = scope.row.id;
      // this.updateDialog = true;
    },
    /**
     * @namespace addChecked  弹出dialog,确认添加角色
     */
    addChecked() {
      // let role_flag = false;
      // for (let i = 0; i < this.roleTable.length; i++) {
      //   if (this.roleTable[i].id == this.editMsg.id) {
      //     this.updaterole(this.editMsg);
      //     role_flag = true;
      //     break;
      //   }
      // }
      // if (!role_flag) {
      //   this.addrole(this.editMsg);
      // }
      // this.updateDialog = false;
    },

    /**
     * @namespace delrole 弹出dialog,确认是否删除角色
     * @param {角色id} id
     */
    delRole(id) {
      console.log(id);
      manageConfirm
        .confirm(this, "此操作将永久删除该角色, 是否继续?")
        .then(() => {
          // this.requestDelrole(id);
          // this.axios.post()
          
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },

    /**
     * @namespace batchDel 批量删除
     */
    batchDel() {
      // console.log(this.$refs.multipleTable);
      // manageConfirm
      //   .confirm(this, "此操作将永久删除这些角色, 是否继续?")
      //   .then(() => {
      //     this.$message.success("删除成功!");
      //   })
      //   .catch(() => {
      //     this.$message("已取消删除");
      //   });
    },
    handleSelectionChange() {
      // console.log("select change");
      // console.log(val);
      // let roleId = [];
      // for(let i=0; i<val.length; i++){
      //   console.log(i);
      //   console.log(val[i].id);
      //   roleId.push(val[i].id);
      // }
      // console.log("final");
      // console.log(roleId);
    }
  },
  watch: {
    indexs: {
      handler: function(val) {
        console.log(val);
        this.getAllrole();
      }
    }
  }
};
</script>
<style lang="scss">
.role {
  .role-process {
    margin-bottom: 10px;
  }
}
</style>