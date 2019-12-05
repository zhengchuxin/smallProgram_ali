// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {

    // touch_start: 0,
    // touch_end: 0,
    // isEditCart: false,
    // checkedAllStatus: false,
    // editCartList: [],
    // hasLogin: true,
    // checked: false,
    // checkedGoodsAmount: 0,
    // checkedGoodsList: [],
    // cartGoods: [
    //   {
    //     cover: 'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png',
    //     cartId: 23,
    //     checked: false,
    //     itemId: 130,
    //     quantity: 1,
    //     itemName: '一级美国花旗参 楼上1',
    //     price: 12,
    //     shopName: 'Cook',
    //     shopId: 18,
    //     userId: 17
    //   },
    //   {
    //     cover: 'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png',
    //     cartId: 23,
    //     checked: false,
    //     itemId: 130,
    //     quantity: 1,
    //     itemName: '一级美国花旗参 楼上1',
    //     price: 12,
    //     shopName: 'Cook',
    //     shopId: 18,
    //     userId: 17
    //   },
    // ],
    // functions: [
    //   { avatar: 'https://wx.qlogo.cn/mmopen/vi_32/G2SnUkMFEAv1brdm20EteG7GiaxaeONUQeYDib50GCyicOKU5yaTth8KSPbrIeQmP5ScJAia9FKcI5qjSr488OokVw/132', nickName: '小程序定制开发', userId: '1' },
    //   { avatar: 'https://wx.qlogo.cn/mmhead/q2mesTjZ024ib7Wt12GbhcYcFVR4Jx6ZAek57NMbnQN0/132', nickName: '刘玉娟', userId: '1' }
    // ],

    touch_start: 0,
    touch_end: 0,
    cartGoods: [],
    isEditCart: false,
    checkedAllStatus: false,
    editCartList: [],
    hasLogin: true,
    checked: false,
    checkedGoodsAmount: 0,
    checkedGoodsList: [],
    functions: [],

  },

  onLoad: function (options) {

    var that = this;
    that.getCartList(1);
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

    //获取里面推荐关注的用户  
    var that = this;
    var params = new Object()
    params.userId =  17;    //wx.getStorageSync('userId');
    network.GET({
      contacturl: '/userInfo/getRecommendUsers',
      params: params,
      success: function (res) {
        console.log('关注的用户' + (JSON.stringify(res)));
        that.setData({
          functions: res.data.data,
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
    that.getCartList(1);
    that.setData({
      checkedAllStatus: false,
      checkedGoodsAmount: 0,
    })
  },

  getCartList(showType) {

    var that = this;
    var params = new Object()
    params.userId = 17      // wx.getStorageSync('userId');
    network.GET({
      contacturl: '/cart/getShopCartListByUserId',
      params: params,
      success: function (res) {
        //成功后逻辑
        console.log('res cart +' + JSON.stringify(res.data));
        if (res.data.data == null) {
          that.setData({
            cartGoods: [],
          });
        } else {
          that.setData({
            cartGoods: res.data.data,
          });
        }
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  watchClick: function () {
    console.log('点击了关注')
    // my.navigateTo({
    //   url: '/pages/search/search',
    // })

  },

  addNumber: function (event) {
    console.log('点击了增加')
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    console.log('event.target.dataset - ' + cartItem.itemId)
    let quantity = cartItem.quantity + 1;
    cartItem.quantity = quantity;
    var that = this;
    var params = new Object()
    params.cartId = cartItem.cartId;
    params.quantity = cartItem.quantity;
    params.userId = 17;               //  wx.getStorageSync('userId');
    network.POST({
      contacturl: '/cart/updateCartQuantity',
      params: JSON.stringify(params),
      success: function (res) {
        console.log(res)
        //成功后逻辑
        that.setData({
          cartGoods: that.data.cartGoods
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
    that.getTotalMoney(1);
  },

  cutNumber: function (event) {
    console.log('点击了减少')
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    console.log('event.target.dataset + ' + cartItem.itemId)
    let quantity = (cartItem.quantity - 1 > 1) ? cartItem.quantity - 1 : 1;
    cartItem.quantity = quantity;
    var that = this;
    var params = new Object()
    params.cartId = cartItem.cartId;
    params.quantity = cartItem.quantity;
    params.userId = 17;                // wx.getStorageSync('userId');
    network.POST({
      contacturl: '/cart/updateCartQuantity',
      params: JSON.stringify(params),
      success: function (res) {
        //成功后逻辑
        console.log(res);
        that.setData({
          cartGoods: that.data.cartGoods
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
    that.getTotalMoney(1);
  },

  checkedItem: function (event) {
    console.log('点击了勾选选项')
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;
    console.log('====== + ' + itemIndex)
    that.data.cartGoods[itemIndex].checked = !that.data.cartGoods[itemIndex].checked;
    that.setData({
      cartGoods: that.data.cartGoods
    });

    var indexNmuber = 1; //默认全选
    for (var index in that.data.cartGoods) {

      if (that.data.cartGoods[index].checked) { //默认
      } else {
        indexNmuber = 2; //有没有选中的。
      }
    }
    if (indexNmuber == 2) {

      that.setData({
        checkedAllStatus: false,
      })
    } else {
      that.setData({
        checkedAllStatus: true,
      })
    }
    that.getTotalMoney(1);
  },


  checkedAll: function () {
    console.log('点击了全选')
    var that = this;
    var indexNmuber = 1; //默认全选

    for (var index in that.data.cartGoods) {

      if (that.data.cartGoods[index].checked) { //默认
      } else {
        indexNmuber = 2; //有没有选中的。
      }
    }
    if (indexNmuber == 2) {
      for (var index in that.data.cartGoods) {
        that.data.cartGoods[index].checked = true;
      }
      that.setData({
        cartGoods: that.data.cartGoods,
        checkedAllStatus: true,
      });
    } else {
      for (var index in that.data.cartGoods) {
        that.data.cartGoods[index].checked = false;
      }
      that.setData({
        cartGoods: that.data.cartGoods,
        checkedAllStatus: false,
      });
    }
    that.getTotalMoney(1);
  },

  //计算选中商品金额
  getTotalMoney(showType) {
    var that = this;
    var checkedGoodsAmount = 0;
    for (var index in that.data.cartGoods) {
      if (that.data.cartGoods[index].checked) { //默认
        checkedGoodsAmount += that.data.cartGoods[index].quantity * that.data.cartGoods[index].price;
      }
    }
    that.setData({
      checkedGoodsAmount: checkedGoodsAmount,
    });
  },

  checkoutOrder: function () {
    console.log('点击了结算')
    //选择商品
    var that = this;
    var checkedGoodsAmount = 1;
    for (var index in that.data.cartGoods) {
      if (that.data.cartGoods[index].checked) { //默认
        checkedGoodsAmount = 2;
      }
    }
    if (checkedGoodsAmount == 2) {

    } else {
      my.showToast({
        content: '请选择商品'
      });
      return;
    }

        //是否同一商铺
    that.setData({
      checkedGoodsList: that.data.editCartList,
    });
    for (var index in that.data.cartGoods) {
      if (that.data.cartGoods[index].checked) { //默认
        that.data.checkedGoodsList.push(that.data.cartGoods[index])
      }
    }
    that.setData({
      checkedGoodsList: that.data.checkedGoodsList,
    });
    var checkedNumber = 0;
    var shopId = that.data.checkedGoodsList[0].shopId;
    for (var index in that.data.checkedGoodsList) {
      if (that.data.checkedGoodsList[index].shopId == shopId) { //默认
        checkedNumber++;
      }
    }
    if (checkedNumber == that.data.checkedGoodsList.length) {

    } else {
      my.showToast({
        content: '请选择同一商铺'
      });
      return;
    }

    //跳转
    my.navigateTo({
      url: '/pages/writeOrder/writeOrder?list=' + JSON.stringify(that.data.cartGoods) + '&types=' + 2,
    })

  },

  //长按删除
  //按下事件开始  
  mytouchstart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-start')
  },

  //按下事件结束  
  mytouchend: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-end')
  },

  editAddress: function (event) {

    let that = this;
    let itemIndex = event.currentTarget.dataset.cartid;
    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touch_end - that.data.touch_start;
    console.log('XXXXX' + touchTime);
    //如果按下时间大于350为长按  
    if (touchTime < 350) {

      my.confirm({
        title: '温馨提示',
        content: '是否删除该商品',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          if (result.confirm) {
            var params = new Object()
            params.cartId = itemIndex;
            params.userId = 17;      //wx.getStorageSync('userId');
            network.POST({
              contacturl: '/cart/deleteCartByCartId',
              params: JSON.stringify(params),
              success: function (res) {
                console.log(res)
                //成功后逻辑
                that.getCartList(1)
                my.showToast({
                  content: '删除成功'
                });
                that.setData({
                  checkedGoodsAmount: 0,
                  checkedAllStatus: false,
                });
              },
              fail: function () {
                //失败后逻辑
              }
            })
          }
        },
      });
    }
    that.getTotalMoney(1);
  }
});
