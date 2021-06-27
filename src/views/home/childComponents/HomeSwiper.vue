<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper'



export default {
  props: {
    banners : {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad(){
      // 判断已经发送一次事件，就不要再次发送了
      if(!this.isLoad){  
        this.$emit('swiperImageLoad')  
        this.isLoad = true
      }   
    }
  }
}
</script>

<style>

</style>