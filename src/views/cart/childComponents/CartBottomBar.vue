<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
              class="check-button" 
              :isChecked="isSelectAll"
              @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total">
      合计:￥<span class="total-price">{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  name: 'CartBottomBar',
  components: { 
    CheckButton 
  },
  computed: {
    totalPrice(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return item.price * item.count + preValue
      },0).toFixed(2)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll(){
      // 1. 使用 filter
      //如果被选中的取反即未选中的商品有长度，说明未全选，此时返回真，此时取反，返回假 isSelectAll为false
      // if(this.$store.state.cartList.length === 0) return false
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)

      // 2. 使用find
      // if(this.$store.state.cartList.length === 0) return false
      // return !this.$store.state.cartList.find(item => !item.checked)


      // 3. every  所有都被选中才为真
      if(this.$store.state.cartList.length === 0) return false
      return this.$store.state.cartList.every(item => item.checked)
    }
  },
  methods: {
    checkClick(){
      // 判断
        // 如果原来都是选中的，点击： 全部不选中
        // 原来有未选中的，点击，全部选中
        if(this.isSelectAll){  // 如果 isSelectAll 为真，即商品全部是选中状态，点击时，取消所有商品的选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else{ // 如果 isSelectAll 为假，即部分或全部商品处于未选中状态，点击时，将所有商品选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
    },
    calcClick(){
      if(this.$store.state.cartList.length == 0){
        this.$toast.show('您的购物车是空的，请添加商品',2000)
      }else if(!this.checkLength){  // checkLength取反，表示所有商品都未选中
        this.$toast.show('请选择您要购买的商品',2000)
      }else{
        this.$toast.show('不卖给你，滚',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: rgb(255, 255, 233);
    position: relative;
    bottom: 133px;
    display: flex;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .check-button{
    line-height: 20px;
    margin-right: 5px;
  }
  .total{
    margin-left: 20px;
    flex: 1;
  }
  .total-price{
    color: orangered;
    font-size: 16px;
    font-weight: bold;
  }
  .calculate{
    padding: 0 10px;
    font-size: 16px;
    color: #fff;
    background-color: orangered;
  }
</style>