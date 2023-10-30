import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.less';
import Common from './common/common';


import router from "./router/index"; // 路由
//访问接口api封装
import Api from './api';

import { Dialog } from 'vant';
import { Toast } from 'vant';
 
Vue.config.productionTip = false
Vue.prototype.$api = Api;
Vue.prototype.$dialog = Dialog;
Vue.prototype.$toast = Toast;
Vue.prototype.$common = Common;

Vue.use(Vant);

 
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
