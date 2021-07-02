import BackTop from 'components/content/backTop/BackTop.vue'


// 混入，将返回顶部抽离出来
export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false,  // 是否展示 回到顶部 箭头按钮
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
  }
}