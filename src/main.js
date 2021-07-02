import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'


import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// 自己封装的插件
import toast from 'components/common/toast/index'


Vue.config.productionTip = false


// 添加事件总线对象： 给 $bus 创建一个Vue实例，作为事件总线
Vue.prototype.$bus = new Vue()    

// 安装 toast 插件，会自动执行install操作
Vue.use(toast)  // 所以此会执行/toast/index.js 中的 install 方法

// 解决移动端 300ms 延迟
FastClick.attach(document.body)

// 使用懒加载插件 vue-lazyload
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
