<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-header clear-fix">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <img class="arrow-right" src="~assets/img/detail/arrow-right.svg" alt="">
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs" v-if="commentInfo.images">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils.js'

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value){
      // 1. 将时间戳转成Date对象
      const date = new Date(value * 1000)

      // 2. 将date格式化
      // return formatDate(date,'yyyy-MM-dd')
      // return formatDate(date,'yyyy/MM/dd')
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
  .comment-info{
    padding: 0 10px 20px 10px;
    line-height: 1.4;
    font-size: 14px;
    border-bottom: 5px solid #eee;
  }
  .info-header{
    line-height: 50px;
    border-bottom: 2px solid #eee;
  }
  .header-title{
    float: left;
    font-size: 16px;
    font-weight: bold;
  }
  .header-more{
    float: right;
    font-size: 14px;
  }
  .arrow-right{
    width: 10px;
  }
  .info-user{
    display: table-cell;
    padding: 10px 0;
  }
  .info-user img{
    width: 50px;
    vertical-align: middle;
    border-radius: 50%;
  }
  .info-user span{
    line-height: 50px;
    padding-left: 10px;
    font-size: 15px;
    color: #000;
  }
  .info-detail p{
    color: #888;
  }
  .info-other{
    display: flex;
    justify-content: space-between;
    color: #b1b1b1;
    padding: 8px 0;
  }
  /* .info-imgs{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
  }
  .info-imgs::after{
    content: "";
    width: 31%;
    border: 1px solid transparent;
  }
  .info-imgs img{
    width: 31%;
    height: 100px;
    border-radius: 5px;
    flex: 0 0 31%;
  } */
  
  .info-imgs img{
    width: calc(33.33% - 5px);
    margin-right: 5px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
  }
  .info-imgs:nth-child(n+3){
    margin-right: 0;
  }
</style>