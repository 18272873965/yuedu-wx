// components/ydMusice/ydMusice.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 0,
    time: '00:00',
    plays: false
  },

  /**
   * 组件的方法列表
   */
  lifetimes:{
    created(){
      app.globalData.audio && app.globalData.audio.destroy() 
      const audio = wx.createInnerAudioContext()
      //app.globalData.audio获取全局的audio
      app.globalData.audio = audio
      audio.onTimeUpdate(() => {
        //获取当前播放进度audio.currentTime
        //获取总时长audio.duration
        const width = audio.currentTime / audio.duration * 100
        this.setData({
          width
        })
        this.formatTimes(audio.currentTime, audio.duration)
      })
    }
  },

  //监听数据变化
  observers:{
    url(vul){
      app.globalData.audio.src = vul
      this.setData({
        width: 0,
        time: '00:00',
        plays: false
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setplay(){
      this.setData({
        plays: !this.data.plays
      })
      // console.log(this.data.plays)
      // app.globalData.audio.play()播放   app.globalData.audio.pause()暂停
      this.data.plays ? app.globalData.audio.play() : app.globalData.audio.pause()
    },
    formatTimes(currentTime, duration){
      const time = duration - currentTime
      let min = Math.floor(time / 60)
      let sec = Math.floor(time % 60)
      min = min < 10 ? "0" + min : min
      sec = sec < 10 ? "0" + sec : sec
      this.setData({
        time : min + ":" + sec
      })
    }
  }
})
