<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
    <!-- <sport-ball ref="ball" class="sport-ball"></sport-ball> -->
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart(){
      // console.log('点击了添加到购物车');
      this.$emit('addCart',)
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 55px;
    background:#fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
    box-shadow: 0 -4px 10px rgba(100,100,100,0.2);
  }
  .bar-item{
    flex: 1;
    display: flex;
  }
  .bar-item div{
    flex: 1;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png")  0 0/100% no-repeat;
  }
  .bar-left .service{
    background-position: 0 -52px;
  }
  .bar-left .shop{
    background-position: 0 -98px;
  }
  .bar-left .text{
    font-size: 13px;
  }
  .bar-right{
    font-size: 15px;
    line-height: 55px;
    color: #333;
  }
  .bar-right .cart{
    background-color: #ffe817;
  }
  .bar-right .buy{
    background-color: #f69;
    color: white;
  }


</style>