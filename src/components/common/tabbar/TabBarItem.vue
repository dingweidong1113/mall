<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">  <!-- 动态绑定样式 -->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String, // 路径由父组件传过来
    activeColor: { // 颜色由父组件传递过来
      type: String,
      default: 'red'  // 不传颜色的时候，默认是红色
    }
  },
  data(){
    return{
      // isActive: false
    }
  },
  computed:{
    isActive(){
      // 判断当前活跃的组件路径中，是否含有当前文件中的path（父组件传过来的），  indexOf == -1 时表示没找到
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){  // 样式根据是否活跃，动态决定颜色
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      // console.log('点击');
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
  
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;  /* 常用49px */
    /* font-size: 14px; */
    font-size: 13px;
  }
  
  .tab-bar-item img{
    width: 22px;
    height: 22px;
    margin-top: 5px;
    vertical-align: middle;
    margin-bottom: 4px;
  }
  /* .active{
    color: red;
  } */
</style>