// 导入js
var network = require("/util/util.js")
const app = getApp()


Page({
  data: {

    // status: 0,
    // orderNum: '12345O5876cbfeef4f4001853ff3d4de',
    // createDate: 1550073600000,
    // freight: 0,
    // mobile: '13751545454',
    // address: '天津市市辖区河东区13213',
    // reciver: "zcx",
    // totalAmount: '150',

    // appId: '',
    // timeStamp: '',
    // nonceStr: '',
    // package: '',
    // signType: '',
    // paySign: '',

    // orderGoods: [
    //   {
    //     cover: 'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png', description: '楼上 美国花旗参',
    //     name: '一级美国花旗参 楼上', orderNum: '12345O5876cbfeef4f4001853ff3d4de', price: 150, quantity: 1
    //   }
    // ]
    status: 0,
    orderNum: '',
    createDate: '',
    freight: '',
    mobile: '',
    address: '',
    reciver: "",
    totalAmount: "",

    appId: '',
    timeStamp: '',
    nonceStr: '',
    package: '',
    signType: '',
    paySign: '',

    orderInfo: {
    },
    orderGoods: [
    ]
  },
  onLoad: function (options) {

    console.log("shopid.orderNum ++  " + options.orderNum)
    this.getOrderDetail(options.orderNum);
  },

  //订单详情
  getOrderDetail(showType) {

    let that = this;
    var params = new Object()
    params.orderNum = showType;
    network.GET({
      contacturl: '/order/getOrderDetail',
      params: params,
      success: function (res) {
        //成功后逻辑
        var date = new Date(res.data.data.createDate)
        console.log(res);
        that.setData({

          status: res.data.data.status,
          orderNum: res.data.data.orderNum,
          orderGoods: res.data.data.itemList,
          orderNum: res.data.data.orderNum,
          createDate: date,
          freight: res.data.data.freight,
          mobile: res.data.data.mobile,
          address: res.data.data.address,
          reciver: res.data.data.reciver,
          totalAmount: res.data.data.totalAmount,
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  //发货
  sendGoods: function () {

    let that = this;
    my.navigateTo({
      url: '/pages/sendGoods/sendGoods?orderNum=' + that.data.orderNum
    })
  },

  //取消订单
  cancelOrder: function () {

    let that = this;
    var params = new Object()
    params.orderNum = that.data.orderNum;
    params.userId = 17;       //  wx.getStorageSync('userId');
    network.POST({
      contacturl: '/order/cancelOrder',
      params: params,
      success: function (res) {
        //成功后逻辑
        console.log(res);
        that.getOrderDetail(that.data.orderNum);
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

});
