// pages/home/index/index.js
Page({
  data: {
    userInfo: undefined,
    showAddShopCart: false,
    topImgList: ['../../image/shop1.jpg', '../../image/shop2.jpg', '../../image/shop0.jpg'],
    //热门推荐
    shopDataList: [
    ],
    //人气饮品
    shopDataListThree: [
    ],
    //单个商品
    shopData: undefined,
    buyCount: 1,
    desc: "",
    notice: "",
    speedValue: "20",
  },
  onChangBuyCount(e) {
    this.setData({
      buyCount: e.detail
    })
  },

  tiss(e) {
    wx.navigateTo({
      url: '/pages/admin/index',
    })
  },

  /** 
 * 预览图片
 */
  previewImage: function (e) {
    return;
    var that = this;
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: that.data.topImgList // 需要预览的图片http链接列表
    })
  },

  onShowAddShopCart(e) {
    var that = this
    if (this.data.showAddShopCart) {
      that.setData({
        showAddShopCart: false
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      const db = wx.cloud.database()
      db.collection('shopData').doc(e.currentTarget.dataset.id).get().then(res => {
        that.setData({
          shopData: res.data,
          showAddShopCart: !this.data.showAddShopCart
        })
        wx.hideLoading()
      })
    }
  },

  //选择商品参数
  showShopSelect(e) {
    var indexF = e.currentTarget.dataset.indexf
    var index = e.currentTarget.dataset.index
    var data = this.data.shopData.selectBox[indexF].select
    for (var i = 0; i < data.length; i++) {
      if (i === index) {
        data[i].isSelect = true
      } else {
        data[i].isSelect = false
      }
    }
    this.data.shopData.selectBox[indexF].select = data
    this.setData({
      shopData: this.data.shopData,
    })
  },

  toPay() {
    var that = this
    var data = that.data.shopData
    var desc = ''
    if (data.selectBox) {
      for (var i = 0; i < data.selectBox.length; i++) {
        for (var j = 0; j < data.selectBox[i].select.length; j++) {
          if (data.selectBox[i].select[j].isSelect) {
            desc += data.selectBox[i].select[j].type + " "
          }
        }
      }
    }
    var len = desc.split(" ").length
    if (data.selectBox && (desc === "" || len <= data.selectBox.length)) {
      wx.showToast({
        title: '请选择商品参数',
        icon: 'none'
      })
    } else {
      var desc = desc
      var buyCount = that.data.buyCount
      var shopids = that.data.shopData._id
      that.setData({
        showAddShopCart: false
      })
      wx.navigateTo({
        url: "/pages/pay/index?shopid=" + shopids + "&buyCount=" + buyCount + "&desc=" + desc
      })
    }
  },

  // 加入购物车
  addShopCart(e) {
    var that = this
    var data = that.data.shopData
    var desc = ''
    if (data.selectBox) {
      for (var i = 0; i < data.selectBox.length; i++) {
        for (var j = 0; j < data.selectBox[i].select.length; j++) {
          if (data.selectBox[i].select[j].isSelect) {
            desc += data.selectBox[i].select[j].type + " "
          }
        }
      }
    }
    var len = desc.split(" ").length
    if (data.selectBox && (desc === "" || len <= data.selectBox.length)) {
      wx.showToast({
        title: '请选择商品参数',
        icon: 'none'
      })
    } else {
      var data = that.data.shopData
      const db = wx.cloud.database()
      db.collection('shopCart').add({
        data: {
          avatarUrl: that.data.userInfo.avatarUrl,
          nickName: that.data.userInfo.nickName,
          isPay: false,
          desc: desc,
          shopData: data,
          buyCount: that.data.buyCount
        },
        success: res => {
          if (res.errMsg === 'collection.add:ok') {
            wx.showToast({
              title: '添加至购物车成功',
              icon: 'none',
              duration: 3000
            })
            that.setData({
              showAddShopCart: false
            })
          }

        },
        fail: err => { }
      })
    }
  },

  lookDetail(e) {
    // console.log(e.currentTarget.dataset.shopid)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../cart/detail/detail?shopId=' + id
    })
  },

  inDa(d, type) {
    const db = wx.cloud.database()
    db.collection('shopData').add({
      data: {
        shopId: d,
        price: 9999,
        sellCount: 0,
        fee: 0, //配送费
        lessCount: 9999,
        type: type,
        title: '测试商品2',
        img: '../../../images/shop1.jpg',
        detailImg: ['../../../images/shop0.jpg', '../../../images/shop0.jpg', '../../../images/shop1.jpg'],
        detailInfo: ['../../../images/d1.jpg', '../../../images/d2.jpg'],
        selectBox: [{
          name: '温度',
          select: [{
            type: "冰",
            isSelect: false
          }, {
            type: "去冰",
            isSelect: false
          },]
        }, {
          name: '大小',
          select: [{
            type: "大",
            isSelect: false
          }, {
            type: "中",
            isSelect: false
          }, {
            type: "小",
            isSelect: false
          },]
        },],

      },
      success: res => {
        console.log(res)

      },
      fail: err => {
        console.log(err)
      }
    })
  },

  // 热门推荐，人气饮品
  getShopData(type, dataList) {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    const db = wx.cloud.database()
    db.collection('shopData').where({
      type: type,
      isOnline: true
    }).get().then(res => {
      if (res.errMsg === 'collection.get:ok') {
        if (dataList === 'shopDataList') {
          console.log(res.data)
          that.setData({
            shopDataList: res.data
          })
        } else {
          that.setData({
            shopDataListThree: res.data
          })
        }
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      } else {
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 2000
        })
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      }
    })
  },

  // 广告条
  getNotice() {
    var that = this
    const db = wx.cloud.database()
    db.collection('staticData').doc("4e4b1a80-9315-4c42-9cd2-f92fb1578497").get().then(res => {
      that.setData({
        notice: res.data.notice
      })
    })
  },

  onLoad: function (options) {
    var that = this
    this.getShopData('热门推荐', 'shopDataList')
    this.getShopData('人气饮品', 'shopDataListThree')
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


  onReady: function () {

  },

  onShow: function () {
    var that = this
    that.getNotice()
    wx.cloud.callFunction({
      name: 'getAllShopData'
    }).then(res => {
      that.setData({
        shopData: res.result.data
      })
    })
  },


  onHide: function () {

  },

  onUnload: function () {

  },


  onPullDownRefresh: function () {
    this.getShopData('热门推荐', 'shopDataList')
    this.getShopData('人气饮品', 'shopDataListThree')
  },

  bindGetUserInfo(e) {
    var that = this
    console.log(e.detail.errMsg)
    if (e.detail.errMsg === 'getUserInfo:ok') {
      this.setData({
        userInfo: e.detail.userInfo
      })
      if (e.currentTarget.dataset.type === "1") {
        that.toPay()
      } else {
        that.addShopCart()

      }
    } else {
      wx.showToast({
        title: '加入购物车失败，未授权',
        icon: 'none'
      })
    }
  },
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})