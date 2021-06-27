<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    
    <scroll class="content" ref="scroll" 
            :probe-type= "3" 
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :pull-up-load= "true">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
                  class="tab-control" 
                  @tabClick='tabChange'></tab-control>
      <goods-list :goods="showGoods"></goods-list>
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
      currentType:'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    this.getHomedata(),
    this.getGoods('pop'),
    this.getGoods('new'),
    this.getGoods('sell')
  },
  methods: {
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
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      this.isShowBackTop = Math.abs(position.y) > 1000
    },
    loadMore(){
      console.log('上拉加载更多');
      this.getGoods(this.currentType)
      this.$refs.scroll.finishPullUp();
    }
  }
}
</script>

<style scoped>  /* scoped可创建作用域，不会影响其他文件中重名的class样式 */

  /* 为了不让顶部导航栏遮住轮播图 */
  #home{  
    padding-top: 44px;   
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;  
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 8;
  }
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>