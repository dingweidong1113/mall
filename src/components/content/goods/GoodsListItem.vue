<template>
  <div class="goods-item" @click="itemClick">
      <!-- goodsItem.show.img 为商品封面图-->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span> 
      <span class="collect">{{goodsItem.cfav}}</span>
      <!-- goodsItem 为每一个商品对象-->
      <!-- goodsItem.title 为商品标题 -->
      <!-- goodsItem.price 为商品价格-->
      <!-- goodsItem.cfav  为商品收藏数-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem : { 
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {

    // 因为首页和detail中都用了GoodsItem这个组件
    // 所以发送事件监听时，要区分一下是从哪里发出的

      // 1. 图片加载完成时，发送一个 itemImageLoad 事件到事件总线 $bus
        // this.$bus.$emit('itemImageLoad')    
        // $bus在main.js中定义在Vue的原型上


      // 2. 判断路由的方式，发送不同的事件，在不同的页面监听
        if(this.$route.path.indexOf('/home') !== -1){
          this.$bus.$emit('homeItemImageLoad')
        }else if(this.$route.path.indexOf('/detail') !== -1){
          this.$bus.$emit('detailItemImageLoad')
        }

    },
    itemClick() {
      console.log(this.goodsItem.iid);
      console.log(this.goodsItem.item_id);
      console.log(this.$route);
      if(this.$route.path.indexOf('/home') !== -1){
        this.$router.push('/detail/' + this.goodsItem.iid)
        console.log('跳转到详情页');
      }else if(this.$route.path.indexOf('/detail') !== -1){
        this.$router.push('/detail/' + this.goodsItem.item_id)
        console.log('根据接口给的item_id没有给商品数据，跳不过去');
      }

    }
  }
}
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 47%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }

  .goods-info .collect.collect::before{
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>