// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {

    orderNum: '',
    catrgoryArray: [],
    index: 0,
    logisticCompany: '',
    logisticsNumber: '',
    title: '',

  },

  onLoad: function (options) {
    this.setData({
      orderNum: options.orderNum,
    });
    let that = this;
    var params = new Object()
    network.GET({
      contacturl: '/public/getLogistics',
      params: params,
      success: function (res) {
        //成功后逻辑
        console.log(res);
        that.setData({
          catrgoryArray: res.data.data,
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送分类选择改变，携带值为', e.detail.value)
    if (!((e.detail.value) >= 0)) {
      return;
    }
    this.setData({
      index: e.detail.value,
    })
    var logisticCompany = this.data.catrgoryArray[e.detail.value].name;
    this.setData({
      logisticCompany: logisticCompany,
    })
  },


  formSubmitBottom: function(e) {

    let that = this;
    if (that.data.logisticCompany == '') {
      my.showToast({
        content: '请选择快递'
      })
      return;
    }
    if (that.data.title == '') {
      my.showToast({
        content: '请输入快递号'
      })
      return;
    }
    console.log('logisticCompany' + that.data.logisticCompany + that.data.logisticsNumber)
    var params = new Object()
    params.orderNum = that.data.orderNum;
    params.logisticCompany = that.data.logisticCompany;
    params.logisticsNumber = that.data.title;
    // params.userId = wx.getStorageSync('userId');
    network.POST({
      contacturl: '/order/ConfirmDelivery',
      params: (JSON.stringify(params)),
      success: function(res) {
        console.log(res)
        //成功后逻辑
        my.switchTab({
          url: "/pages/member/member"
        })
      },
      fail: function() {
        //失败后逻辑
      }
    })
  },


    //监听输入标题 
  titlechanged: function(e) {
    this.setData({
      title: e.detail.value
    })
  },


  


});
