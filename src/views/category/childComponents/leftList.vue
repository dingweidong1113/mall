<template>
  <div class="left-list">
    <scroll class="cate-left-content" :probe-type= "3" :pull-up-load= "true" 
            ref="scroll">
      <div class="cate-left-list" v-for="(item,index) in cateData" :key="index">{{item.title}}</div>
    </scroll>
  </div>
</template>

<script>

import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'leftList',
  props: {
    cateData: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    Scroll,
  }
}
</script>

<style scoped>
  .left-list{
    height: 100vh;
    width: 30%;
    border-right: 1px solid #eee;
  }
  .cate-left-content{
    height: calc(100% - 44px - 49px) ;
    position: relative;
    top: 0px;
    bottom: 49px;
    overflow: hidden;
    background: rgb(238, 255, 255);
  }
  .cate-left-list{
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }
  .cate-left-list:last-child{
    border-bottom:none
  }
</style>