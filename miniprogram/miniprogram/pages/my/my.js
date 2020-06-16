const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: undefined,
    shopCartCount: 0,
    needPay: undefined,
    neeSend: undefined
  },

  onLookMyMessage() {
    wx.navigateTo({
      url: "/pages/my/personinfo/index",
    })
  },


  onUnPxay() {
    wx.showToast({
      title: '该模块测试开发中',
      icon: 'none'
    })
  },
  onLookShopCart() {
    wx.switchTab({
      url: "/pages/cart/cart",
    })
  },

  onBack() {
    wx.navigateTo({
      url: "/pages/my/aftersale/index",
    })
    return;
    wx.showModal({
      title: '提示',
      content: '暂不支持在线退款,如有需要请联系商家',
      cancelText: '拨打电话',
      cancelColor: '#0755-88665566',
      confirmText: '复制微信',
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: '微信id',
          })
        } else if (res.cancel) {
          wx.makePhoneCall({
            phoneNumber: '13755566666',
          })
        }
      }
    })
  },

  onUnPay() {
    wx.navigateTo({
      url: "/pages/my/order/index?index=" + 1
    })
  },

  onUnConfirm() {
    wx.navigateTo({
      url: "/pages/my/order/index?index=" + 3
    })
  },

  onCommont() {

    wx.navigateTo({
      url: "/pages/my/order/index?index=" + 4
    })
    // wx.showToast({
    //   title: '评价系统暂未开放',
    //   icon: 'none'
    // })
  },

  onUnSend() {
    wx.navigateTo({
      url: "/pages/my/order/index?index=" + 2
    })
  },

  onLookMyOrder() {
    wx.navigateTo({
      url: "/pages/my/order/index?index=" + 0
    })
  },


  bindGetUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
  },

  onLookMyAddress() {
    wx.navigateTo({
      url: "/pages/pay/address/index",
    })
  },
  onLoad: function (options) {
    var that = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  getCount() {
    var that = this
    // wx.cloud.callFunction({
    //   name: 'login',
    // }).then(res => {
    //   const db = wx.cloud.database()
    //   db.collection('shopOrder').where({
    //     _openid: res.result.openid,
    //     isTake: false,
    //     status: 1
    //   }).count().then(res => {
    //     if (res.total > 0)
    //       that.setData({
    //         neeSend: res.total
    //       })
    //   })
    //   db.collection('shopOrder').where({
    //     _openid: res.result.openid,
    //     status: 0
    //   }).count().then(res => {
    //     if (res.total > 0)
    //       that.setData({
    //         needPay: res.total
    //       })
    //   })
    // })
  },
  onShow: function () {
    this.getCount()
  },

})