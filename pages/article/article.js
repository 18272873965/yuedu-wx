// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: [],
    id: 0
  },


  /**
   * 执行函数
   */
  // 请求文章数据函数
  getRequest(id) {
    this.setData({ id })
    wx.request({
      url: `http://localhost:3000/api/article/${id}`,
      success: (rel) => {
        if (rel.data.res){
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
      id: this.data.id - 1
    })
    this.getRequest(this.data.id)
  },
  //下一篇
  next() {
    this.setData({
      id: this.data.id + 1
    })
    this.getRequest(this.data.id)
  },

  //监听数据变化
  observers: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  //请求文章数据
  onLoad: function (options) {
    this.setData({ id: parseInt(options.id) })
    // 调用请求文章数据函数
    this.getRequest(this.data.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})