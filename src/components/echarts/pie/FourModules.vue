<template>
  <div class="pie-chart" v-bind:style="{height:clientHeight}">
    <div class="index-menu">
      <span class="menu-name">季度：</span>
      <el-cascader v-model="checkedVal" :options="allTimes" size="small"></el-cascader>
    </div>
    <div id="four-modules-container"></div>
  </div>
</template>

<script>
import optionPublicFun from "../../../utils/optionPublic.js";
import optionPieFun from "./optionPie.js";
import dataPublicFun from "../../../utils/dataPublic";
import getFourModual from "../../../api/modules.js";
import requestCommonData from "../../../api/common.js";
const colors = ["#FCD85A", "#0084C8", "#D8514B", "#9CCB63"];
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
  name: "pie-chart",
  data() {
    return {
      clientHeight: "100%",
      myChart: {},
      flag: false, // 切换legend样式
      pieLgendStyle: {
        // legend 样式
        weight: "bold",
        size: 14,
        legendRight: "13%"
      },
      allTimes: [],
      checkedVal: 1
    };
  },
  created() {
    // 向后台发送数据请求
    this.requestAllTimes();
    this.requestFourModualData(this.checkedVal);
  },
  methods: {
    /**
     * @namespace requestFourModualData 向后台发起请求
     * @param timeid 季度
     */
    requestFourModualData(timeid) {
      getFourModual({ timeid: timeid }).then(data => {
        this.$nextTick(() => {
          this.setLegendStyle(this.flag);
          this.fourModulesPieCharts(data.data.data);
        });
      });
    },
    // 请求所有季度
    requestAllTimes() {
      requestCommonData.getAllTimes().then(data => {
        this.allTimes = new dataPublicFun(data.data.data).getAllTimes();
        console.log(this.allTimes);
      });
    },
    setLegendStyle(flag) {
      // 设置 legend 样式参数
      if (flag) {
        this.pieLgendStyle.weight = "normal";
        this.pieLgendStyle.size = 9;
        this.pieLgendStyle.legendRight = "-5";
      }
    },
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      console.log(clientHeight);
      this.clientHeight = clientHeight - 125 + "px";
    },
    // pie 数据渲染
    fourModulesPieCharts(data) {
      let pieObj = this.pieLgendStyle;
      let opPieFnc = new optionPieFun(data);
      this.myChart = new optionPublicFun().init("four-modules-container");
      this.myChart.setOption({
        tooltip: opPieFnc.firstPieTooltip(pieObj.weight, pieObj.size, "first"),
        legend: opPieFnc.firstPieLegend(
          pieObj.weight,
          pieObj.size,
          pieObj.legendRight
        ),
        color: colors,
        label: opPieFnc.pieLabel(this.pieLgendStyle.size),
        series: opPieFnc.firstPieSeries("first")
      });
      // 饼图 级联
      this.myChart.on("click", params => {
        let status = {
          着力电网发展质量提升: "1",
          着力公司管理效率提升: "2",
          着力创新创效能力提升: "3",
          基础保障力提升: "4"
        };
        console.log(status[params.name]);
        if (!this.flag) {
          this.$router.push({
            path: "/whole/subpie/" + this.checkedVal + "/" + status[params.name]
          });
        }
        // console.log(params);
      });
    }
  },
  mounted() {
    let nowPath = this.$route.path;
    if (nowPath == "/whole/pie") {
      this.setClient();
    } else if (nowPath == "/whole") {
      this.flag = true;
    }
  },
  watch: {
    checkedVal: {
      handler: function(val) {
        this.requestFourModualData(val[0]);
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
    .el-input {
      width: 85%;
    }
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
  #four-modules-container {
    width: 100%;
    height: 96%;
  }
}
</style>