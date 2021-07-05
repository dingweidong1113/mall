<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">分类</div>
    </nav-bar>
    <left-list class="left" :cateData="categoryList"></left-list>
    <right-list class="right" :cateData="categoryList"></right-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'


import {getCategoryData} from 'network/category.js'


import leftList from './childComponents/leftList.vue'
import RightList from './childComponents/rightList.vue'

export default {
  name: 'Category',
  components: { 
    leftList,
    NavBar,
    RightList
  },
  data(){
    return {
      categoryList: [],
    }
  },
  created(){
    getCategoryData().then(res => {
      console.log(res);
      this.categoryList = res.data.category.list;

    })
  }
}
</script>




<style scoped>
  #category{
    /* display: flex; */
    height: 100vh;
    position: relative;
  }
  .category-nav{
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;  
  }
  
</style>