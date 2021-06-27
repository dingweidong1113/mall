<template>
  <div id="app">
    <main-tab-bar class="mainTabBar"></main-tab-bar>
    <router-view></router-view>
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
