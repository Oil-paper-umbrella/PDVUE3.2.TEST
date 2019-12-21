<template>
  <div class="space">
    <el-row>
      <h1>空间管理</h1>
    </el-row>
    <el-row style="margin-bottom: 10px;">
      <el-button type="danger" icon="el-icon-delete" @click="delBacch">批量删除</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addRole">添加空间</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="ID" width="120">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="name" label="空间名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="describe" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <i class="el-icon-edit icon-control" @click="editOperation(scope)"></i>
            <i
              class="el-icon-delete icon-control"
              @click="delOperation(scope.$index,scope.row.name)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 操作确认框 -->
    <el-dialog title="提示" :visible.sync="delDialog" width="30%" v-dialogDrag>
      <span>空间删除需谨慎，确认要删除-{{ operationName }}-这个空间么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog=false">取 消</el-button>
        <el-button type="primary" @click="delTable">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加空间" :visible.sync="editDialog" width="30%" v-dialogDrag>
      <el-form
      ref="editMsg" label-width="100px" class="demo-ruleForm"
    >
      <el-form-item label="空间名称" prop="name">
        <el-input v-model="editMsg.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input v-model="editMsg.describe"></el-input>
      </el-form-item>
      <el-row style="text-align: center;">
        <el-button type="success" size="small" @click="editTable">确定</el-button>
        <el-button type="primary" size="small" @click="editDialog = false">取消</el-button>
      </el-row>
    </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "数据查看",
          describe: "对指标数据有查看的空间"
        },
        {
          name: "数据添加",
          describe: "对指标数据有添加的空间"
        },
        {
          name: "数据删除",
          describe: "对指标数据有删除的空间"
        },
        {
          name: "数据修改",
          describe: "对指标数据有修改的空间"
        }
      ],
      delDialog: false,
      operationIndex: 0,
      operationName: "",
      editDialog: false,

      editMsg: {
        name: "",
        describe: ""
      }
    };
  },
  methods: {
    delOperation(index, name) {
      this.operationIndex = index;
      this.operationName = name;
      this.delDialog = true;
    },
    editOperation(scope) {
      window.console.log(scope);
      this.editDialog = true;
    },
    delTable() {
      if (this.operationName == "超级管理员") {
        this.$message.error("哎呀，手滑了！超级管理员不可删除哟~");
        this.delDialog = false;
        return;
      }
      this.tableData.splice(this.operationIndex, 1);
      this.delDialog = false;
    },
    editTable() {
      this.editMsg.describe="";
      this.editMsg.identity="";
      this.editMsg.name="";
      this.editDialog = false;
    },
    delBacch(){
      window.console.log("00");
    },
    addRole(){
      this.editDialog = true;
    }
  }
};
</script>
<style lang="scss">

</style>