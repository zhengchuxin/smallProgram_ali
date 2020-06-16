// pages/order/order.js
Page({

  /**
  * 页面的初始数据
  */
  data: {
    active: 0,
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this
    var index = options.index
    that.setData({
      active: index,
    })
    switch (parseInt(index)) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.waitSendShow()
        break
      case 3:
        that.waitReceiveShow()
        break
      case 4:
        that.waitFinishShow()
        break
    }
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
  },

  onClick(event) {
    let that = this
    switch (event.detail.index) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.waitSendShow()
        break
      case 3:
        that.waitReceiveShow()
        break
      case 4:
        that.waitFinishShow()
        break
    }
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  alreadyShow: function () {
    var that = this;
    that.setData({
      alreadyOrder: [
        {
          order: '32421412452151512351515',
          name: "苹果",
          state: "交易成功",
          time: "2018-09-30 14:00",
          status: "已结束",
          url: "http://img5.imgtn.bdimg.com/it/u=4255353727,3702750206&fm=26&gp=0.jpg",
          money: "132",
          desc: "酸甜清脆"
        },
        {
          order: '32421412452151512351515',
          name: "香蕉",
          state: "交易成功",
          time: "2018-10-12 18:00",
          status: "未开始",
          url: "http://img4.imgtn.bdimg.com/it/u=3362676920,3258681174&fm=26&gp=0.jpg",
          money: "205",
          desc: "酸甜清脆"
        }]
    })
  },

  waitPayShow: function () {
    var that = this;
    that.setData({
      waitPayOrder:
        [
          {
            order: '32421412452151512351515',
            name: "苹果",
            state: "待付款",
            time: "2018-10-14 14:00",
            status: "未开始",
            url: "http://img4.cache.netease.com/baby/2015/5/12/201505121608297c298_550.png",
            money: "186",
            desc: "酸甜清脆"
          }
        ],
    })
  },

  waitSendShow: function () {
    var that = this;
    that.setData({
      waitSendOrder: [
        {
          order: '32421412452151512351515',
          name: "苹果",
          state: "待配送",
          time: "2018-10-4 10:00",
          status: "未开始",
          url: "http://img4.imgtn.bdimg.com/it/u=3362676920,3258681174&fm=26&gp=0.jpg",
          money: "122",
          desc: "酸甜清脆，养生"
        }
      ],
    })
  },

  waitReceiveShow: function () {
    var that = this;
    that.setData({
      waitReceiveOrder: [
        {
          order: '32421412452151512351515',
          name: "苹果",
          state: "待收货",
          time: "2018-10-4 10:00",
          status: "未开始",
          url: "http://img4.imgtn.bdimg.com/it/u=3362676920,3258681174&fm=26&gp=0.jpg",
          money: "122",
          desc: "酸甜清脆，养生"
        }
      ],
    })
  },

  waitFinishShow: function () {
    var that = this;
    that.setData({
      waitFinishOrder: [
        {
          order: '32421412452151512351515',
          name: "苹果",
          state: "已完成",
          time: "2018-10-4 10:00",
          status: "未开始",
          url: "http://img4.imgtn.bdimg.com/it/u=3362676920,3258681174&fm=26&gp=0.jpg",
          money: "122",
          desc: "酸甜清脆，养生"
        }
      ],
    })
  },

  toOrderdetail: function() {
    wx.navigateTo({
      url: "/pages/my/orderdetail/index"
    })
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