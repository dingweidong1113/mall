<template>
  <div class="right-list">
    <scroll class="cate-right-content" :probe-type= "3" :pull-up-load= "true" 
            ref="scroll">
      <right-list-item v-for="(item,index) in cateData" 
            :key="index" :cateItemData="item">
      </right-list-item>
    </scroll>
  </div>
</template>

<script>

import Scroll from 'components/common/scroll/Scroll'

import RightListItem from './rightListItem.vue'

export default {
  name: 'rightList',
  components: {
    Scroll,
    RightListItem,
  },
  props: {
    cateData: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .right-list{
    height: 100vh;
    width: 70%;
  }
  .cate-right-content{
    height: calc(100% - 44px - 49px) ;
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    background: rgb(255, 245, 231);
  }
 




</style>