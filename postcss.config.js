module.exports = {
  plugins: {
    autoprefixer: {},
    // "postcss-px-to-viewport": {
    //   viewportWidth:375,  // 视窗的宽度，对应的是设计稿的宽度
    //   viewportHeight:667, // 视窗的高度，对应的是设计稿的高度，（也可以不设置）
    //   unitPrecision:5,    // 指定'px'转换成为视窗单位值得小数位数（很多时候无法整除）
    //   viewportUnit:'vw',  // 指定需要转换成的视窗单位(vw/vh)，建议使用vw
    //   // selectorBlackList:['ignore','tab-bar','tab-bar-item'], // 指定不需要转换的类（css的类）
    //   // 找各种类名太麻烦，直接在不需要转化的元素上，加一个类名’ignore'，这样就不会转化了
    //   minPixelValue: 1,   // 小于或等于'1px' 不转换为视窗单位
    //   mediaQuery: false,  // 是否允许在媒体查询中转换'px'
    //   // exclude:[/TabBar/]  // 指定不需要转换的文件（可以是文件名，也可以是正则）
    // },
    // "postcss-pxtorem": {
    //   rootValue: 16, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
    //   propList: ["*"], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
    //   unitPrecision: 5, //保留rem小数点多少位
    //   //selectorBlackList: ['.radius'],  //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
    //   replace: true, //这个真不知到干嘛用的。有知道的告诉我一下
    //   mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
    //   minPixelValue: 1, //px小于1px的不会被转换
    // },
  }
}
