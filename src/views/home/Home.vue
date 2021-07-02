<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                  class="tab-control" 
                  @tabClick='tabChange'
                  ref="tabControl1"
                  v-show="isTabFixed"></tab-control>
    <scroll class="home-content" ref="scroll" 
            :probe-type= "3" 
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :pull-up-load= "true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
                  @tabClick='tabChange'
                  ref="tabControl2"
                  class="tab-control"></tab-control>
      <keep-alive exclude="Detail">
        <goods-list :goods="showGoods"></goods-list>
      </keep-alive>
    </scroll>

    <!-- 组件不能直接监听点击事件，加一个 .native修饰符: 监听组件根元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 子组件导入
import HomeSwiper from './childComponents/HomeSwiper.vue'
import RecommendView from './childComponents/RecommendView.vue'
import FeatureView from './childComponents/FeatureView.vue'

// 公共组件导入
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


// 特殊方法导入
import {getHomeMultidata,getHomeGoods} from 'network/home.js'





export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data(){
    return {
      banners: [],
      recommends: [],
      goods:{  // 创建一个变量goods，存放商品数据
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',    // 当前数据属于哪个类型（流行、新款、精选）
      isShowBackTop: false,  // 是否展示 回到顶部 箭头按钮
      tabOffsetTop: 0,      // tabControl 距离顶部距离
      isTabFixed: false,    // tabControl 是否固定
      saveY: 0              // 离开首页时保存当前位置
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log("home-destroyed");   // 首页被销毁
  },
  activated(){  // 被keep-alive包裹组件在活跃状态时
    // console.log("activated");
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,0)     // 滚动到保存的位置 Y  
    this.$refs.scroll.scroll.startY = this.saveY   // 或者用：startY  ，better-scroll自带属性：纵轴方向初始化位置
  },
  deactivated(){ // 被keep-alive包裹组件在失去活跃状态时
    // console.log("deactivated");
    this.saveY = this.$refs.scroll.getScrollY();    //保存离开时的位置 Y  
  },
  created(){
    // 1. 请求多个数据
    this.getHomedata(),
  
    // 2. 请求商品数据
    this.getGoods('pop'),
    this.getGoods('new'),
    this.getGoods('sell')
    


  },
  mounted() {
    // 把refresh包一层防抖函数
    const newRefresh = this.debounce(this.$refs.scroll.refresh,100);

    // 3. 监听 GoodsListItem 中图片加载完成  ( 新版better-scroll 已经用 observeImage 解决了这个问题)
    this.$bus.$on('homeItemImageLoad', () => {   // 监听事件总线中的 homeItemImageLoad 事件
      // console.log("---");   // 会打印30次（因为一次获取30件商品，有30章图片）
      newRefresh()   
    })


    // 获取 tabControl 的 offsetTop
    // 所有组件都有一个属性 $el
    // console.log(this.$refs.tabControl2.$el.offsetTop);
    // 此时打印的offsetTop不对，因为mounted挂载完时，图片不一定加载完，拿到的值会很小
    // 所以用 swiperImageLoad 方法进行获取
  },
  methods: {
  // 防抖函数
    debounce(func,delay){
      let timer = null;
      return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this,args)
        },delay)
      }
    },

  // 网络请求相关
    getHomedata(){
      // 1. 请求多个数据，再包一层，created中尽量简单
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getGoods(type){  // 2. 请求商品数据，需要传一个类型
      const page = this.goods[type].page + 1;  // 取出当前的page，复用时，每次都请求下一页
      getHomeGoods(type,page).then(res => {
        // console.log(res);
        // 1. for of遍历的方法把数据存到goods中
        // for(let n of res.data.list){
        //   this.goods[type].list.push(n);
        // }
        // 2. ...展开语法的方法把数据存到goods中
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1; // 请求完数据后要把goods里的page加1
      })
    },
  // 事件监听相关
    tabChange(index){
      // console.log(index);
      switch(index){
        case 0: this.currentType = 'pop' 
          break
        case 1: this.currentType = 'new' 
          break
        case 2: this.currentType = 'sell' 
          break
      }
      // 两个tabControl互相绑定
      this.$refs.tabControl1.currentIndex = index  
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // 1. 判断 BackTop 按钮是否展示
      this.isShowBackTop = Math.abs(position.y) > 1000

      // 2. 决定tabControl 是否吸顶
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    loadMore(){
      console.log('上拉加载更多');
      this.getGoods(this.currentType)
      this.$refs.scroll.finishPullUp();
    },
    swiperImageLoad(){
      // 获取 tabControl 的 offsetTop
      // 所有组件都有一个属性 $el
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
  }
}
</script>

<style scoped>  /* scoped可创建作用域，不会影响其他文件中重名的class样式 */

  /* 为了不让顶部导航栏遮住轮播图 */
  #home{  
    /* padding-top: 44px;    */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;  
    /* z-index: 9; */
    /* 在使用浏览器原生滚动时 */
    /* position: fixed; */
    /* left: 0;
    top: 0;
    right: 0;
     */
  }
  .tab-control{
    background-color: #fff;
    z-index: 8;
    position: relative;
  }

  .home-content{
    /* height: calc(100vh - 93px); */
    overflow: hidden; 
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>