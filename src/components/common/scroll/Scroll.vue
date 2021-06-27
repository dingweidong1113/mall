<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll  from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll: null
    }
  },
  mounted() {
    // 1. 实例化 BScroll 对象
    // 这里用ref是为了防止 .wrapper 类名重复导致获取元素不准确
    this.scroll = new BScroll(this.$refs.wrapper,{  
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,  
      observeDOM: true, 
      observeImage: true,
      mouseWheel: {   // 扩展 BetterScroll 鼠标滚轮的能力
        speed: 20,
        invert: false,
        easeTime: 300
      }
      
    })

    // 2. 监听滚动的位置，发送给父组件，父组件再用位置判断是否显示backtop按钮
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll',position) //自定义事件，子传父
    })


    // 3. 监听上拉事件
    this.scroll.on('pullingUp',(position) => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x,y,time=500){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style>

</style>