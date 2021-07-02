<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type:String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data(){
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message,duration=3000){
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    line-height: 24px;
    text-align: center;
    transform: translate(-50%,-50%);
    padding: 6px 10px;
    color: white;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .7);
  }
</style>