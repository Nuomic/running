var app = getApp();

Page({
  data: {
    // 页面配置
    // winWidth: 0,
    // winHeight: 0,
    // tab切换
    currentTab: 0,
    // 团队信息
    teamObj: [{
        name: 'teamA',
        raceTotal: '5448.06',
        raceList: [{
            name: '张伟强',
            avatar: '../../image/run-logo.png',
            total: '127.30',
            week: '7.30',
            today: '3'
          },
          {
            name: '张伟强',
            avatar: '../../image/run-logo.png',
            total: '127.30',
            week: '7.30',
            today: '3'
          },
          {
            name: '张伟强',
            avatar: '../../image/run-logo.png',
            total: '127.30',
            week: '7.30',
            today: '3'
          },
          {
            name: '张伟强',
            avatar: '../../image/run-logo.png',
            total: '127.30',
            week: '7.30',
            today: '3'
          }
        ]
      },
      {
        name: 'teamB',
        raceTotal: '5448.06',
        raceList: [{
            name: '张伟强',
            avatar: '../../image/run-logo.png',
            total: '127.30',
            week: '7.30',
            today: '3'
          },
          {
            name: '张伟强',
            avatar: '../../image/run-logo.png',
            total: '127.30',
            week: '7.30',
            today: '3'
          },
          {
            name: '张伟强',
            avatar: '../../image/run-logo.png',
            total: '127.30',
            week: '7.30',
            today: '3'
          },
          {
            name: '张伟强',
            avatar: '../../image/run-logo.png',
            total: '127.30',
            week: '7.30',
            today: '3'
          },
        ]
      }
    ],
    cheerObj: [{
        icon: "/image/avater.png",
        name: "李飞",
        value: "加油，运动健儿",
      },
      {
        icon: "/image/avater.png",
        name: "张叶",
        value: "加油，运动健儿",
      },
      {
        icon: "/image/avater.png",
        name: "王小婷",
        value: "加油，运动健儿",
      },
    ]
  },

  onLoad: function() {
    var that = this;
    // 获取系统信息
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       winWidth: res.windowWidth,
    //       winHeight: res.windowHeight
    //     });
    //   }
    // });

    // 获取头像信息
    this.getUserInfo();
  },
  // 滑动切换tab
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  // 点击tab切换
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  getUserInfo: function() {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function(res) {
          that.setData({
            userInfo: res.userInfo
          })
          that.update()
        }
      })
    }
  }
})