// components/yuNav/ydNav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    nav: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //请求导航列表
    rnav() {
      wx.request({
        url: 'http://localhost:3000/api/types',
        success: (rel) => {
          this.setData({
            nav: rel.data.res
          })
        }
      })
    },

    //点击导航请求新数据
    toList(e) {
      const id = e.target.dataset.id
      this.triggerEvent('getData', {id:id})
    }
  },


  /**
   * 生命周期函数
   */
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this.rnav()
    }
  }
})
