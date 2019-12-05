// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {

    checkedAddress: {
      mobile: '',
      isDefault: 0,
      provinceName: '',
      cityName: '',
      areaName: '',
    },

    checkedAddressed: {
      itemId: 0,
      quantity: 0,
    },

    checkedGoodsList: [],
    checkedCoupon: [],
    couponList: [],
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00,    //快递费
    couponPrice: 0.00,     //优惠券的价格
    orderTotalPrice: 0.00,  //订单总价
    actualPrice: 0.00,     //实际需要支付的总价
    shopId: '',
    types: 2,
    state: 1,
    delta: 1,

  },

  onLoad: function (options) {

    console.log('----JSON.parse(options.list) ===' + JSON.parse(options.list))
    let that = this;
    that.setData({
      checkedCoupon: JSON.parse(options.list),
      types: options.types,
    });

    for (var index in that.data.checkedCoupon) {
      if (that.data.checkedCoupon[index].checked) { //默认
        that.data.checkedGoodsList.push(that.data.checkedCoupon[index])
      }
    }
    that.setData({
      checkedGoodsList: that.data.checkedGoodsList,
    });
    that.getTotalMoney(1);
  },

  getTotalMoney(showType) {

    var that = this;
    var checkedGoodsAmount = 0;
    console.log('xxxxx' + (JSON.stringify(that.data.checkedGoodsList)));
    for (var index in that.data.checkedGoodsList) {

      checkedGoodsAmount += that.data.checkedGoodsList[index].quantity * that.data.checkedGoodsList[index].price;
    }
    that.setData({
      goodsTotalPrice: checkedGoodsAmount,
      actualPrice: checkedGoodsAmount,
    });
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

    console.log('delta ==' + this.data.delta);
    console.log('state -----' + this.data.state)
    console.log('this.data.checkedAddress' + this.data.checkedAddress)
    this.setData({
      checkedAddress: this.data.checkedAddress,
    });
    if (this.data.state == 1) { //购物进来
      this.getAddressList(1);
    }
  },

  getAddressList(type) {
    let that = this;
    //获取地址列表
    var params = new Object()
    params.userId = 17;             // wx.getStorageSync('userId');
    network.GET({
      contacturl: '/address/getAddressList',
      params: params,
      success: function (res) {
        console.log(res)
        //成功后逻辑
        for (var index in res.data.data) {

          if (res.data.data[index].isDefault == 1) { //默认
            let address = that.data.checkedAddress;
            address.address = res.data.data[index].province + res.data.data[index].city + res.data.data[index].area + res.data.data[index].street;
            address.name = res.data.data[index].name;
            address.mobile = res.data.data[index].mobile;
            address.isDefault = res.data.data[index].isDefault;

            that.setData({
              checkedAddress: address,
            });
            console.log('-------- +' + that.data.checkedAddress)
          } else {
          }
        }
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  submitOrder: function () {

    console.log('点击了提交订单')
    let that = this;
    for (var index in that.data.checkedGoodsList) {

      let checkedAddressed = that.data.checkedAddressed;
      checkedAddressed.itemId = that.data.checkedGoodsList[index].itemId;
      checkedAddressed.quantity = that.data.checkedGoodsList[index].quantity;

      that.setData({
        couponList: that.data.couponList.concat(checkedAddressed),
        shopId: that.data.checkedGoodsList[index].shopId,
      });
    }

    var params = new Object()
    params.userId = 17;               // wx.getStorageSync('userId');
    params.shopId = that.data.shopId;
    params.totalAmount = that.data.actualPrice;
    params.deductionAmount = 0;
    params.realAmount = that.data.actualPrice;
    params.freight = 0;
    params.reciver = that.data.checkedAddress.name;
    params.mobile = that.data.checkedAddress.mobile;
    params.zipCode = "515500";
    params.address = that.data.checkedAddress.address;
    params.itemList = that.data.couponList;
    params.type = that.data.types;

    console.log('paramsparamsparamsxxxxx' + (JSON.stringify(params)));
    network.POST({
      contacturl: '/order/addOrder',
      params: JSON.stringify(params),
      success: function (res) {
        console.log(res)
        //成功后逻辑
        my.navigateTo({
          url: '/pages/order/order?status=-1'
        })
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  addAddress: function () {

    my.navigateTo({
      url: '/pages/addAddress/addAddress?isFromOrder=' + 1
    })
  },
});
