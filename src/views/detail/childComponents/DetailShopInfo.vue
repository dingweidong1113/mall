<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter ? '高' : '低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>

  </div>
  
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
  .shop-info{
    padding:20px 10px;
    border-bottom: 5px solid #eee;
  }
  .shop-info .shop-top img{
    width: 60px;
    vertical-align: middle;
    margin-right: 15px;
    border-radius: 10px;
  }
  .shop-info .shop-top .title{
    font-size: 18px;
    font-weight: bold;
    display: inline;
    line-height: 60px;
    vertical-align: top;
  }
  .shop-middle{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .shop-middle-item {
    font-size: 12px;
    color: #333;
    flex: 1;
  }
  .shop-middle-left{
    border-right: 1px solid #eee;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    padding: 5px 0;
  }
  .shop-middle-left .info-sells .sells-count{
    font-size: 16px;
    padding-bottom: 6px;
  }
  .shop-middle-left .info-goods .goods-count{
    font-size: 16px;
    padding-bottom: 6px;
  }

  .shop-middle-right table{
    margin: 0 auto;
  }
  .shop-middle-right table tr{
    line-height: 20px;
  }
  .shop-middle-right table tr .score{
    padding: 0 12px;
    color: rgb(31, 165, 31);
  }
  .shop-middle-right table tr .better span{
    background-color: rgb(31, 165, 31);
    color: white;
    width: 18px;
    padding: 2px;
    line-height: 25px;
  }
  .shop-middle-right table tr .score-better{
    color: red;
  }
  .shop-middle-right table tr .better-more span{
    background-color: red;
  }

  .shop-bottom{
    text-align: center;
  }
  .shop-bottom .enter-shop{
    padding: 8px 50px;
    display: inline-block;
    margin: 0 auto;
    background-color: #f0f5fc;
    border-radius: 16px;
  }
</style>