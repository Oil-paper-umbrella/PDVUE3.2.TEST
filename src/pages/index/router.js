import Vue  from 'vue';
import VueRouter from "vue-router";
import store from "../../store/store.js";
import * as types from  "../../store/types.js";


let Login =()=>import("../../pages/login/Login.vue") ;
let Index =()=>import("../../pages/index/view/Index.vue") ;
let IndexHome =()=>import('../../components/IndexHome.vue');
let Raw =()=>import('../../components/subcomponents/data/Raw.vue')
let Cluster =()=>import('../../components/subcomponents/data/Cluster.vue')
let Analysis =()=>import('../../components/subcomponents/data/Analysis.vue')
let Jurisdiction =()=>import('../../components/subcomponents/management/Jurisdiction.vue')
let SetIndex =()=>import('../../components/subcomponents/management/SetIndex.vue') ;
let Port =()=>import('../../components/subcomponents/management/Port.vue')
let Operation =()=>import('../../components/subcomponents/management/Operation.vue');
let DataAnalysis =()=>import('../../components/subcomponents/management/DataAnalysis.vue')
let Forecast =()=>import('../../components/subcomponents/management/Forecast.vue')
let Interface =()=>import('../../components/subcomponents/management/Interface.vue')
let User =()=>import('../../components/subcomponents/management/User.vue')
let Role =()=>import('../../components/subcomponents/management/Role.vue')
let Message =()=>import('../../components/subcomponents/management/Message.vue')



Vue.use(VueRouter);//全局注册路由

let routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: '/index',
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    },
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: IndexHome
      },
      {
        path: '/raw',
        name: '原始数据展示',
        component: Raw
      },
      {
        path: '/cluster',
        name: '聚类数据显示',
        component: Cluster
      },
      {
        path: '/analysis',
        name: '分析结果展示',
        component: Analysis
      },
      {
        path: '/jurisdiction',
        name: '空间管理',
        component: Jurisdiction
      },
      {
        path: '/role',
        name: '角色管理',
        component: Role
      },
      {
        path: '/setindex',
        name: '指标设定',
        component: SetIndex
      },
      {
        path: '/port',
        name: '数据导入、导出',
        component: Port
      },
      {
        path: '/operation',
        name: '数据操作',
        component: Operation
      },
      {
        path: '/dataAnalysis',
        name: '数据分析',
        component: DataAnalysis
      },
      {
        path: '/forecast',
        name: '指标预测',
        component: Forecast
      },
      {
        path: '/interface',
        name: '接口管理',
        component: Interface
      },
      {
        path: '/user',
        name: '用户管理',
        component: User
      },
      {
        path: '/message',
        name: '邮件箱',
        component: Message
      }
    ]
  }
];

// 页面刷新时，重新赋值token
if(window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}


let router = new VueRouter({
  mode: 'history',
  routes: routes
});


router.beforeEach((to,from, next) => {
  if (to.matched.some((r) => r.meta.requireAuth)) {
    // eslint-disable-next-line no-undef
    if (localStorage.token) {   //判断是否已经登录
      next();
    } else {
      next({
        path: '/login',
        // query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
export default router;