<template>
  <div id="detail" class="goods-detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detail_nav"></detail-nav-bar>
    <scroll class="detail-content"
            :probe-type= "3" :pull-up-load= "true" 
            ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends" class="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar.vue'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import DetailParamInfo from './childComponents/DetailParamInfo.vue'
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
import DetailBottomBar from './childComponents/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
// import Toast from 'components/common/toast/Toast.vue'


import {getDetail,getRecommend,GoodsInfo,ShopInfo,GoodsParam} from 'network/detail.js'
import {debounce} from 'common/utils.js'
import {backTopMixin} from 'common/mixin.js'


export default {
  name: "Detail",
  components: { 
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  mixins: [backTopMixin],  // 混入
  data() {
    return {
      iid: null,
      topImages: [],
      // 整合数据，再发送给子组件
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [
        // 第一个参数一定是0（默认顶部）
        // 参数部分的顶部距离offsetTop
        // 评论部分的顶部距离offsetTop
        // 推荐部分的顶部距离offsetTop
      ],
      getThemeTopY: null,
      currentIndex : 0,
      // message: '',
      // show: false
    }
  },
  
  created() {
    
    // 1. 保存传入的 iid
    // console.log(this.$route);
    this.iid = this.$route.params.iid

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result
      // 1. 获取顶部轮播图
      this.topImages = res.result.itemInfo.topImages
      // 2. 获取商品其他全部商品数据
      this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      // 3. 获取店铺信息
      this.shop = new ShopInfo(data.shopInfo)
      // 4. 获取商品详情
      this.detailInfo = data.detailInfo
      // 5. 获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6. 获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }


/*       // 1. 第一次获取主题顶部距离
      // 值不对的原因： this.$refs.param.$el还没渲染
        this.themeTopYs = [];  //
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);

      // 2. 第二次获取主题顶部距离
      // 值不对的原因：在数据渲染完DOM之后，但是图片没加载完
      this.$nextTick(() => {  // $nextTick() :在数据渲染完DOM之后，执行该函数
        this.themeTopYs = [];  //
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
      }) 
*/
    }),
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted() {
  // 监听 GoodsListItem 中图片加载完成  ( 新版better-scroll 已经用 observeImage 解决了这个问题)

  // 推荐部分的商品列表图片防抖
    const newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.$bus.$on('detailItemImageLoad', () => {   // 监听事件总线中的 detailItemImageLoad 事件
      newRefresh();
      // 推荐部分的商品列表图片防抖完成后再进行详情图片的防抖
    })
  // 3. 第三次获取主题顶部距离
    // 等待详情图片加载完成且做了防抖操作后，再赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];  //
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);  // 为了后面对比高度来切换currentIndex
      console.log(this.themeTopYs);
    },1000)
    this.$bus.$on('goodsInfoImageLoad', () => {   // 监听事件总线中的 goodsInfoImageLoad 事件
      this.getThemeTopY();
    })
  },
  
  methods: {
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
    },
    contentScroll(position){

      // 判断是否展示回到顶部按钮
      this.isShowBackTop = Math.abs(position.y) > 1000

      
      // console.log(position);
      // 1. 获取y值
      const positionY= -position.y

      // 2. positionY 和 主题的位置进行对比
      // positionY 在 0 和 参数部分的顶部距离之间，index=0
      // positionY 在 参数部分 和 评论部分 的顶部距离之间，index=1
      // positionY 在 评论部分 和 推荐部分 的顶部距离之间，index=2
      // positionY 在 推荐部分 顶部距离之后，index=3
      let length = this.themeTopYs.length;
      // for(let i = 0; i < length; i++){
      //   if(this.currentIndex !== i && ((i < length - 1 && 
      //     positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || 
      //     (i === length - 1 && positionY >= this.themeTopYs[i]))){

      //     //  this.currentIndex !== i 防止赋值过于频繁
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.detail_nav.currentIndex = this.currentIndex
      //   }
      // }
      for(let i = 0 ; i < length - 1; i ++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.detail_nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart(){
      // console.log('点击了添加到购物车');
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]  
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2. 将商品添加到购物车
      // this.$store.cartList.push(product) 不能直接添加，要通过moutations提交
      // this.$store.commit('addCart',product)  // 为了mutations 功能单一，这里要用 actions 处理
        this.$store.dispatch('addCart',product).then(res => {
          // console.log(res);
          // this.show = true
          // this.message = res
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // },1500)
          this.$toast.show(res,2000)
        })
    }
  }
}
</script>

<style scoped>
  .goods-detail{
    /* position: relative; */
    /* z-index: 10; */
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{ 
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  .detail-content{

    overflow: hidden; 
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .recommends{
    padding: 10px 0;
  }
</style>