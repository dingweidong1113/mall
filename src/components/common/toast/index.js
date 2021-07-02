import Toast from './Toast.vue'

const obj = {}


obj.install = function(Vue) {   // install函数在执行时，默认传参Vue
  // console.log('执行了obj的install函数',Vue);

  // 1. 创建组件构造器
    const toastConstructor = Vue.extend(Toast)
  // 2. new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastConstructor()
  // 3. 将组件对象，手动挂载某一个元素上
  toast.$mount(document.createElement('div'))
  // 4. toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj