// pages/music/music.js
Page({
  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },


  data: {

    song: [{
        musicid: 1,
        poster: '../../image/callmemaybe.png',
        name: 'Call_Me_Maybe',
        author: 'Carly_Rae_Jepsen',
        src: 'http://47.103.10.123/myWorkspace/music/Call_Me_Maybe.mp3',
      },

      {
        musicid: 2,
        poster: '../../image/goodtime.png',
        name: 'Good_Time',
        author: 'Carly_Rae_Jepsen',
        src: 'http://47.103.10.123/myWorkspace/music/Good_Time.mp3',
      },

      {
        musicid: 3,
        poster: '../../image/maps.png',
        name: 'Maps',
        author: 'Marron 5',
        src: 'http://47.103.10.123/myWorkspace/music/Maps.mp3',
      },
    ],

    count: 1,
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,

  },
  audioPlay: function() {
    this.audioCtx.play()
  },
  audioPause: function() {
    this.audioCtx.pause()
  },
  audioStart: function() {
    this.audioCtx.seek(0)

  },

  NextMusic: function(e) {
    this.setData({
      count: this.data.count + 1
    })
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },

})