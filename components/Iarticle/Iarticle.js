// components/Iarticle/Iarticle.js
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
    article: [],
    id: 0
  },

  /**
   * 组件钩子函数
   */
  lifetimes: {
    //页面加载
    created() {
      this.getRequest();
    }

  },


  /**
   * 组件的方法列表
   */
  methods: {
    //请求文章
    getRequest(id) {
      id = id ? id : Math.floor(Math.random() * 1025) +1
      this.setData({ id })
      wx.request({
        url: `http://localhost:3000/api/article/${id}`,
        success: (rel) => {
          // console.log(rel.data.res)
          if(rel.data.res){
            this.setData({
              article: rel.data.res
            }, function () {
              wx.hideLoading()
            })
          } else{
            wx.showToast({
              title: '跳到第一页',
              icon: 'success',
              duration: 2000
            })
            this.setData({
              id: 1
            })
            this.getRequest(this.data.id)
          }
         
        }
      })
    },
    //上一篇
    previou() {
      this.setData({
        id: this.data.id -1
      })
      this.getRequest(this.data.id)
    },
    //下一篇
    next(){
      this.setData({
        id: this.data.id +1
      })
      this.getRequest(this.data.id)
    }
  }
})