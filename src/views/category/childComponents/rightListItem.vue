<template>
  <div class="right-list-item">
    <!-- <img :src="cateItemData.acm" alt=""> -->
    <img src="~assets/img/common/placeholder.png" alt="">
    <span>{{cateItemData.title}}</span>
  </div>
</template>

<script>
export default {
  name: 'rightListItem',
  props: {
    cateItemData: {
      type: Object,
      default(){
        return {}
      }
    }
  },
}
</script>

<style scoped>
  .right-list-item{
    height: 100px;
    padding: 10px;
    float: left;
    width: 33%;
    text-align: center;
  }
  .right-list-item img{
    width: 100%;
    height: 70px;
  }

  .right-list-item span{
    font-size: 12px;
  }
</style>