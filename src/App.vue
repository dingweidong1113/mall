<template>
  <div id="app">
    <main-tab-bar class="mainTabBar" v-if="$route.meta.footShow"></main-tab-bar>
    <keep-alive exclude="Detail">   <!-- 去除Detail，是为了点击其他商品时，不保留上一个产品的数据 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabBar/MainTabBar.vue';

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
  .mainTabBar{
    z-index: 10;
  }
</style>
