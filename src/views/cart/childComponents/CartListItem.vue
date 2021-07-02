<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :isChecked="product.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img" @click="jumpDetail">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title" @click="jumpDetail">{{product.title}}</div>
      <div class="item-desc" @click="jumpDetail">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
  name:'CartListItem',
  components: { 
    CheckButton
  },
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    checkClick(){
      this.product.checked = !this.product.checked
    },
    jumpDetail(){
      this.$router.push('/detail/' + this.product.iid)
    }
  }
}
</script>

<style scoped>
  #shop-item{
    width: 100%;
    display: flex;
    background: #fff;
    margin-top: 3px;
    border-radius: 12px;
    box-shadow: 0 3px 8px#ccc;
  }
  .item-selector{
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img{
    padding: 6px 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info{
    width: 70%;
    position: relative;
    overflow: hidden;
    padding: 10px 12px;
  }
  .item-info .item-title{
    font-size: 17px;
    color: #111;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
  }
  .item-info .item-desc{
    font-size: 13px;
    color: #888;
    margin-top: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .item-info .info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 20px;
  }
  .item-info .info-bottom .item-price{
    color: orangered;
    font-size: 18px;
  }
  .item-info .info-bottom .item-count{
    text-align: right;
  }
</style>