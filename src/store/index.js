import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

// 1. 安装插件
Vue.use(Vuex)


// 2. 创建store对象
const store = new Vuex.Store({
  getters,
  state: {
    cartList: [] // 放购物车数据 
  },
  actions: {
    addCart(context,payload) {// payload: 新添加的商品数据
      return new Promise((resolve,reject) => {  // 返回一个Promise，给详情页点击添加购物车时的吐司判断使用
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid ) // 若item.iid等于payload.iid，将item返回给oldProduct
        if(oldProduct) {     // oldProduct 若有值（即出现相同产品），提交给 mutations 的 addCounter（增加数量）
          context.commit('addCounter',oldProduct)
          resolve('该商品已存在，已为您将商品数量+1')
        }else{
          payload.count = 1  // oldProduct 若还是null，说明新来的商品没有重复，将新商品的count赋值为1 
          context.commit('addToCart',payload)  // 然后提交给 mutations 的 addToCart（增加商品）
          resolve('添加购物车成功')
        }
      })
    }
  },
  mutations: {
    // mutations 唯一的目的就是修改 state 中的状态
    // mutations 中的每个方法，尽可能完成的事件比较单一（这里要区分 数量加1 和 商品加1）

    // addCart(state,payload) {// payload: 新添加的商品数据

    // 1. for of 循环的方式
        // let oldProduct = null;  // oldProduct 为临时变量，记录相同的商品，初始为null
        // for (const item of state.cartList) {
        //   if(item.iid === payload.iid){   // 新添加的商品payload 若与 购物车cartList 中商品重复（iid相同）
        //     oldProduct = item   // 将 oldProduct 赋值为购物车中该商品
        //   }
        // }
        // if(oldProduct) {     // oldProduct 若有值（即出现相同产品），给其添加属性 count 并 +1 （等同于cartList中该商品也 count+1
        //   oldProduct.count += 1
        // }else{
        //   payload.count = 1  // oldProduct 若还是null，说明新来的商品没有重复，将新商品push到 购物车cartList
        //   state.cartList.push(payload)
        // }

    // 2. find
        // 查找数组中是否有该商品
        // let oldProduct = state.cartList.find(item => item.iid === payload.iid ) // 若item.iid等于payload.iid，将item返回给oldProduct
              
        // if(oldProduct) {     // oldProduct 若有值（即出现相同产品），给其添加属性 count 并 +1 （等同于cartList中该商品也 count+1
        //   oldProduct.count += 1
        // }else{
        //   payload.count = 1  // oldProduct 若还是null，说明新来的商品没有重复，将新商品push到 购物车cartList
        //   state.cartList.push(payload)
        // }
    // }


    // 经过 actios 处理，可以分为两个 mutations （addCounter增加数量）和 （addToCart增加商品）
    addCounter(state,payload){
      payload.count ++
    },
    addToCart(state,payload){
      payload.checked = true;   // 给新加进购物车的商品加一个状态 checked：true 默认选中
      state.cartList.push(payload)
    }
  }
})

// 3. 挂载到Vue实例上
export default store