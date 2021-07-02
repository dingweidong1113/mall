<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 商品汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'


import CartList from './childComponents/CartList.vue'
import CartBottomBar from './childComponents/CartBottomBar.vue'


// mapGetters辅助函数，将store中的getter映射到局部计算属性
import { mapGetters } from 'vuex'   


export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
    
  },
  computed: {
    // 普通方法
      // cartLength() {
      //   return this.$store.state.cartList.length
      // },

  // mapGetters语法：
    // 语法1： ...mapGetters(['getters中的方法','getters中的方法','getters中的方法'])
      // ...mapGetters(['cartLength']), 
    // 语法2： ...mapGetters({别名:'getters中的方法',别名:'getters中的方法',别名:'getters中的方法'})
    ...mapGetters({
      length: 'cartLength',
      // 别名: 'getter方法'
    }) 
    // 在模板中，可以使用{{ 方法/别名 }} 来使用
  }
}
</script>

<style scoped>

  .cart-nav{
    background-color: var(--color-tint);
    color: #fff;  
  }
</style>