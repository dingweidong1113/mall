<template>
  <div class="cart-list">
    <scroll class="cart-list-content" ref="scroll">
      <!-- <li v-for="item in cartList" :key="item.id">{{item}}</li> -->
      <cart-list-item 
          v-for="(item,index) in cartList" 
          :key="index" 
          :product="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem.vue'

export default { 
  components: { 
    Scroll,
    CartListItem 
  },
  name:'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  activated(){
    console.log('--');
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list{
    height: 100vh;
  }
  .cart-list-content{
    height: calc(100% - 44px - 49px - 40px);
    position: relative;
    top: 0px;
    bottom: 49px;
    overflow: hidden;
    background: rgb(245, 245, 245);
    padding: 0 3px;
  }
</style>