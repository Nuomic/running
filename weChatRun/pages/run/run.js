var countTooGetLocation = 0;
var total_micro_second = 0;
var starRun = 0;
var oriMeters = 0.0;
/* 毫秒级倒计时 */
function count_down(that) {

    if (starRun == 0) {
      return;
    }

    if (countTooGetLocation >= 100) {
      var time = date_format(total_micro_second);
      that.updateTime(time);
    }

  	if (countTooGetLocation >= 5000) { //1000为1s
        that.getLocation();
        countTooGetLocation = 0;
  	}

  	setTimeout(function(){
		countTooGetLocation += 10;
    total_micro_second += 10;
		count_down(that);
    }
    ,10
    )
}


// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  	// 秒数
  	var second = Math.floor(micro_second / 1000);
  	// 小时位
  	var hr = Math.floor(second / 3600);
  	// 分钟位
  	var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  	// 秒位
	var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;


	return hr + ":" + min + ":" + sec + " ";
}

// 配速，每公里所需要的时间
// 时间除以路程，一般时间单位用分，路程单位用千米。比如20分钟跑了3千米，那配速就是20/3=6.66，也就是6分40秒每公里，一般说成640的配速。
function speed_format(distance, min) {
  if (distance == 0) {
    return "0'00'' ";
  }
  var speed = min / distance;
  var speed_min = Math.floor(speed);
  var speed_min_decimal = speed-speed_min;
  var speed_sec = Math.floor(speed_min_decimal*60);
  return speed_min + "'" + speed_sec + "''" + " ";
}


function getDistance(lat1, lng1, lat2, lng2) {
    var dis = 0;
    var radLat1 = toRadians(lat1);
    var radLat2 = toRadians(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRadians(lng1) - toRadians(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;

    function toRadians(d) {  return d * Math.PI / 180;}
}

function fill_zero_prefix(num) {
	return num < 10 ? "0" + num : num
}


Page({
  data: {
    optState: 0, //{0: 开始按钮， 1：暂停按钮， 2：暂停后}
    clock: '',
    isLocation:false,
    latitude: 0,
    longitude: 0,
    markers: [],
    covers: [],
    meters: 0.00,
    speed: "0'00''",
    time: "0:00:00"
  },
  //****************************
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getLocation()
    console.log("onLoad")
    count_down(this);
  },
  startFn: function() {// 开始按钮
    this.starRun();
    this.setData({optState: 1});
  },
  pauseFn: function() {// 暂停按钮
    this.pauseRun();
    this.setData({optState: 2});
  },
  continueFn: function() {// 继续按钮
    this.starRun();
    this.setData({optState: 1});
  },
  finishFn: function() {// 结束按钮
    this.StopRun();
    this.setData({optState: 0});
  },
  //****************************
  openLocation:function (){
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
          wx.openLocation({
            latitude: res.latitude, // 纬度，范围为-90~90，负数表示南纬
            longitude: res.longitude, // 经度，范围为-180~180，负数表示西经
            scale:13// 缩放比例
          })
      },
    })
  },
   //****************************
  music: function () {
    wx.navigateTo({//  目标页调用wx.navigationBack会返回
      url: '../music/music',
      success: function () {
        console.log('跳转成功！')
      },
      fail: function () {
        console.log('跳转失败！')
      },
      //接口调用结束的回调函数（调用成功、失败都会执行）
      complete: function () {
        console.log('跳转结束！')
      }
    })
  },


//****************************
  starRun :function () {
    if (starRun == 1) {
      return;
    }
    starRun = 1;
    count_down(this);
    this.getLocation();
  },


 //****************************
  pauseRun:function () {
    starRun = 0;
    count_down(this);
  },


//****************************
 StopRun:function () {
   starRun = 0;
   total_micro_second = 0;
   oriMeters = 0.0;
 },


//****************************
  updateTime:function (time) {

    var data = this.data;
    data.time = time;
    this.data = data;
    this.setData ({
      time : time
    })

  },

// ****************************
  getLocation:function () {
    var that = this
    wx.getLocation({

      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        console.log("res----------")
        console.log(res)

        //make datas
        var newCover = {
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '/resources/redPoint.png',
          };
        var oriCovers = that.data.covers;

        console.log("oriMeters----------")
        console.log(oriMeters);
        var len = oriCovers.length;
        var lastCover;
        if (len == 0) {
          oriCovers.push(newCover);
        }
        len = oriCovers.length;
        var lastCover = oriCovers[len-1];

        console.log("oriCovers----------")
        console.log(oriCovers,len);

        var newMeters = getDistance(lastCover.latitude,lastCover.longitude,res.latitude,res.longitude)/1000;

        if (newMeters < 0.0015){
            newMeters = 0.0;
        }

        oriMeters = oriMeters + newMeters;
        console.log("newMeters----------")
        console.log(newMeters);


        var meters = new Number(oriMeters);
        var showMeters = meters.toFixed(2);

        oriCovers.push(newCover);

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [],
          covers: oriCovers,
          meters:showMeters,
          speed: speed_format(showMeters, total_micro_second/1000/60)
        });

        console.log("speed----------")
        console.log(speed_format(+showMeters, total_micro_second/60000), +showMeters, total_micro_second);
      },
    })
  }
});
