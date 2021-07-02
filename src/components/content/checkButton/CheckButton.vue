<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button{
    width: 14px;
    height: 14px;
    border-radius: 50%;
    box-sizing: content-box;
    border: 2px solid #ccc;
  }
  .check-button img{
    width: 100%;
  }
  .check{
    border-color: red;
    background-color: red;
  }
</style>