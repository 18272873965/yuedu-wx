Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [],
    articles: [],
    idData: 1,
    pageData: 1,
    flag: true,
    scroll: 0
  },


  /**
   * ***********************执行函数
   */
  //点击导航请求新数据
  onList(e){
    const idData = e.detail.id
    this.setData({
      articles: [],
      idData,
      pageData: 1,
      flag: true
    }, function () {
      this.rlist(this.data.idData)
    })
  },

  //回到顶部
  scrollTop(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },


  //点击进入文章详情
  goArticle(e){
    // console.log(e.target.dataset.ids)
    const id = e.target.dataset.ids
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`,
    })
  },

  //请求文章列表
  rlist(id = 1, page = 1){
    if(this.data.flag){
      wx.showLoading({
        title: '请求中'
      })
      wx.request({
        url: `http://localhost:3000/api/articles/${id}/page/${page}`,
        success: (rel) => {
          // console.log(rel.data.res.articles.length)
          if (rel.data.res.articles.length) {
            const articles = this.data.articles.concat(rel.data.res.articles)
            this.setData({
              articles
            }, function () {
              wx.hideLoading()
            })
          } else {
            wx.hideLoading()
            this.setData({
              flag: false
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rlist()
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
    const pageData = this.data.pageData + 1
    this.setData({
      pageData
    })
    this.rlist(this.data.idData, this.data.pageData)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
  * 滚动事件
  */
  onPageScroll(e){
    let scroll = e.scrollTop
    this.setData({
      scroll
    })
  }
})