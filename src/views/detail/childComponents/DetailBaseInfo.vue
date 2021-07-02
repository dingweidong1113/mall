<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.realPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount" :style="{background:goods.discountColor}">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
  
<style scoped>
  .base-info{
    /* background-color: pink; */
    padding: 15px 8px;
    border-bottom: 5px solid #eee;
  }
  .info-title{
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4;
    padding-bottom: 10px;
  }
  .info-price{
    padding-bottom: 20px;
  }
  .info-price .n-price{
    color: var(--color-high-text);
    font-size: 25px;
    padding-right: 10px;
  }
  .info-price .o-price{
    color: #b1b1b1;
    font-size: 14px;
    text-decoration-line: line-through;
    padding-right: 10px;
  }
  .info-price .discount{
    color: white;
    font-size: 12px;
    padding: 4px 8px;
    vertical-align: 4px;
    border-radius: 12px;
  }
  .info-other{
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  .info-other span{
    /* flex: 1; */
    color: #b1b1b1;
    font-size: 12px;
  }
  .info-service{
    font-size: 12px;
    color: #000;
    padding-top: 15px;
    /* border-bottom: 5px solid #eee; */
    display: flex;
    justify-content: space-between;
  }
  .info-service .info-service-item img{
    width: 12px;
    vertical-align: -1px;
    margin-right: 1px;
  }
</style>