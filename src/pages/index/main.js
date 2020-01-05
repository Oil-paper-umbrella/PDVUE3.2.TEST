import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '../../store'
import axios from '../../control/filter/http.js'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
import '../../assets/css/iconfont.css'
import '../../control/directives.js'
Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';
import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Button,
  ButtonGroup,
  Tooltip,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Badge,
  Container,
  Header,
  Aside,
  Main,
  MessageBox,
  Message,
  Notification,
  Collapse,
  CollapseItem,
  Table,
  TableColumn,
  Option,
  OptionGroup,
  Pagination
} from 'element-ui';

Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Pagination);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
let bugs ="/*\n" +
    "        quu..__\n" +
    "         $$$b  `---.__\n" +
    "          \"$$b        `--.                          ___.---uuudP\n" +
    "           `$$b           `.__.------.__     __.---'      $$$$\"              .\n" +
    "             \"$b          -'            `-.-'            $$$\"              .'|\n" +
    "               \".                                       d$\"             _.'  |\n" +
    "                 `.   /                              ...\"             .'     |\n" +
    "                   `./                           ..::-'            _.'       |\n" +
    "                    /                         .:::-'            .-'         .'\n" +
    "                   :                          ::''\\          _.'            |\n" +
    "                  .' .-.             .-.           `.      .'               |\n" +
    "                  : /'$$|           .@\"$\\           `.   .'              _.-'\n" +
    "                 .'|$u$$|          |$$,$$|           |  <            _.-'\n" +
    "                 | `:$$:'          :$$$$$:           `.  `.       .-'\n" +
    "                 :                  `\"--'             |    `-.     \\\n" +
    "                :##.       ==             .###.       `.      `.    `\\\n" +
    "                |##:                      :###:        |        >     >\n" +
    "                |#'     `..'`..'          `###'        x:      /     /\n" +
    "                 \\                                   xXX|     /    ./\n" +
    "                  \\                                xXXX'|    /   ./\n" +
    "                  /`-.                                  `.  /   /\n" +
    "                 :    `-  ...........,                   | /  .'\n" +
    "                 |         ``:::::::'       .            |<    `.\n" +
    "                 |             ```          |           x| \\ `.:``.\n" +
    "                 |                         .'    /'   xXX|  `:`M`M':.\n" +
    "                 |    |                    ;    /:' xXXX'|  -'MMMMM:'\n" +
    "                 `.  .'                   :    /:'       |-'MMMM.-'\n" +
    "                  |  |                   .'   /'        .'MMM.-'\n" +
    "                  `'`'                   :  ,'          |MMM<\n" +
    "                    |                     `'            |tbap\\\n" +
    "                     \\                                  :MM.-'\n" +
    "                      \\                 |              .''\n" +
    "                       \\.               `.            /\n" +
    "                        /     .:::::::.. :           /\n" +
    "                       |     .:::::::::::`.         /\n" +
    "                       |   .:::------------\\       /\n" +
    "                      /   .''               >::'  /\n" +
    "                      `',:                 :    .'\n" +
    "                                           `:.:'\n" +
    "\n" +
    "         \n" +
    "        */";
console.log(bugs)
// import moment from 'moment'
import moment from 'moment'
Vue.filter('filterDate', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
  // 如果直接调用得到的是当前的时间，可以通过传递值，来获取对应的时间
  return moment(dataStr).format(pattern);
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')