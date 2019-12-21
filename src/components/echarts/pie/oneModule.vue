<template>
  <div class="pie-chart" v-bind:style="{height:clientHeight}">
    <div class="index-menu">
      <span class="menu-name">指标：</span>
      <el-cascader v-model="checkedVal" :options="allIndexs" size="small"></el-cascader>
    </div>
    <div id="one-module-container"></div>
  </div>
</template>

<script>
import optionPublicFun from "../../../utils/optionPublic.js";
import optionPieFun from "./optionPie.js";
import getOneModual from "../../../api/oneModule.js";
import requestCommonData from "../../../api/common.js";
import dataPublicFun from "../../../utils/dataPublic";
// import router from '../../../pages/index/router';
const colors = ["#FCD85A", "#0084C8", "#D8514B", "#9CCB63"];
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
  name: "echarts",
  data() {
    return {
      clientHeight: "100%",
      myChart: {},
      allIndexs: [],
      allTimes: [],
      checkedVal: [1, 1]
    };
  },
  created() {
    // 向后台发送数据请求
    this.requestAllIndexs();
    this.requestAllTimes();
    this.checkedVal[0] = this.$route.params.module;
    this.checkedVal[1] = this.$route.params.time;
    this.requestOneModuleData(this.checkedVal[1], this.checkedVal[0]);
  },
  methods: {
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      console.log(clientHeight);
      this.clientHeight = clientHeight - 125 + "px";
    },
    requestOneModuleData(timeid, indexid) {
      getOneModual({
        timeid: timeid,
        moduleid: indexid
      }).then(data => {
        console.log(data);
        this.$nextTick(() => {
          this.oneModulePieCharts(data.data.data);
        });
      });
    },
    // 请求所有指标
    requestAllIndexs() {
      requestCommonData.getAllIndexs().then(data => {
        this.allIndexs = new dataPublicFun(data.data.data).getAllIndexs(
          "bar",
          this.allTimes
        );
      });
    },
    // 请求所有季度
    requestAllTimes() {
      requestCommonData.getAllTimes().then(data => {
        this.allTimes = new dataPublicFun(data.data.data).getAllTimes();
      });
    },
    oneModulePieCharts(data) {
      this.myChart = new optionPublicFun().init("one-module-container");
      let opPieFnc = new optionPieFun(data);
      this.myChart.setOption({
        color: colors,
        tooltip: opPieFnc.firstPieTooltip("bold", 14, "second"),
        legend: opPieFnc.firstPieLegend("bold", 14, "13%"),
        series: opPieFnc.firstPieSeries("second")
      });
    }
  },
  mounted() {
    this.setClient();
  },
  watch: {
    checkedVal: {
      handler: function(val) {
        console.log(val);
        this.requestOneModuleData(val[1], val[0]);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pie-chart {
  width: 100%;
  height: 100%;
  .index-menu,
  .index-menu:hover {
    display: inline-block;
    margin: 0 10px;
    .el-input__inner {
      background-color: #111739;
      border: 1px solid #60c1de;
      color: #fff;
    }
    .el-input__inner:hover {
      border: 1px solid #60c1de;
    }
    .menu-name {
      font-size: 13px;
      color: #60c1de;
    }
  }
  #one-module-container {
    width: 100%;
    height: 100%;
  }
}
</style>