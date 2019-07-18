Page({
  data: {
    currentTab: 0, // tab切换
    arrLength: 1, // 当前tab数组长度
    motionData: {
      currentMounth: {
        date: '2019年03月',
        totalDistance: '38.66',
        list: [
          {
            map: '../../image/map-route.png',
            date: '29日晚上',
            type: '户外跑',
            distance: '1.68',
            time: '00:03:50',
            pace: '4′51″'
          },
          {
            map: '../../image/map-route.png',
            date: '29日晚上',
            type: '户外跑',
            distance: '1.68',
            time: '00:03:50',
            pace: '4′51″'
          },
          {
            map: '../../image/map-route.png',
            date: '29日晚上',
            type: '户外跑',
            distance: '1.68',
            time: '00:03:50',
            pace: '4′51″'
          },
          {
            map: '../../image/map-route.png',
            date: '29日晚上',
            type: '户外跑',
            distance: '1.68',
            time: '00:03:50',
            pace: '4′51″'
          },
          {
            map: '../../image/map-route.png',
            date: '29日晚上',
            type: '户外跑',
            distance: '1.68',
            time: '00:03:50',
            pace: '4′51″'
          }
        ]
      },
      lastMounth: {
        date: '2019年04月',
        totalDistance: '38.66',
        list: [
          {
            map: '../../image/map-route.png',
            date: '29日晚上',
            type: '户外跑',
            distance: '1.68',
            time: '00:03:50',
            pace: '4′51″'
          },
          {
            map: '../../image/map-route.png',
            date: '29日晚上',
            type: '户外跑',
            distance: '1.68',
            time: '00:03:50',
            pace: '4′51″'
          },
          {
            map: '../../image/map-route.png',
            date: '29日晚上',
            type: '户外跑',
            distance: '1.68',
            time: '00:03:50',
            pace: '4′51″'
          }
        ]
      }
    }
  },
  onLoad:function(options){
    this.setData({
      arrLength: this.data.motionData.currentMounth.list.length
    })
  },
  // 滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var currTab = e.target.dataset.current;
      var motionData = this.data.motionData;
      that.setData({
        currentTab: currTab,
        arrLength: currTab == 0 ? motionData.currentMounth.list.length : motionData.lastMounth.list.length
      })
    }
  }
});
