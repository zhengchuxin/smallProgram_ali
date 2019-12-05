// 导入js
var network = require("/util/util.js")
const app = getApp()


Page({
  data: {
    // addressList: [
    //   { addressId: 40, area: '河东区', city: '市辖区', isDefault: 0, mobile: '13750528777', name: 'zcx', province: '天津市', status: 1, street: '12313', userId: '17', zipCode: '10' }
    // ],
    // isFromOrder: 1,
    // checkedAddress: {
    //   mobile: '',
    //   isDefault: 0,
    //   provinceName: '',
    //   cityName: '',
    //   areaName: '',
    addressList: [],
    isFromOrder: 1,
    checkedAddress: {
      mobile: '',
      isDefault: 0,
      provinceName: '',
      cityName: '',
      areaName: '',
    },
  },

  onLoad: function (options) {

    let that = this;
    that.setData({
      isFromOrder: options.isFromOrder,
    }),
      that.getAddressList();
  },

  getAddressList() {

    //获取地址列表
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
        that.setData({
          addressList: res.data.data,
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

    let that = this;
    //获取地址列表
    var params = new Object()
    params.userId = 17;        // wx.getStorageSync('userId');
    network.GET({
      contacturl: '/address/getAddressList',
      params: params,
      success: function (res) {
        console.log(res)
        //成功后逻辑
        that.setData({
          addressList: res.data.data,
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  addressAdd(event) {

    console.log('isDefault =====' + event.currentTarget.dataset.isDefault)
    my.navigateTo({
      url: '../goAddAddress/goAddAddress'
    })
  },

  addressAddOrUpdate(event) {

    let that = this;
    if (that.data.isFromOrder == 1) { //订单进来

      let address = that.data.checkedAddress;
      address.address = event.currentTarget.dataset.province + event.currentTarget.dataset.city + event.currentTarget.dataset.area + event.currentTarget.dataset.street;
      address.name = event.currentTarget.dataset.name;
      address.mobile = event.currentTarget.dataset.mobile;
      address.isDefault = 1;

      that.setData({
        checkedAddress: address,
      });

      let pages = getCurrentPages();//当前页面    （pages就是获取的当前页面的JS里面所有pages的信息）
      let prevPage = pages[pages.length - 2];//上一页面（prevPage 就是获取的上一个页面的JS里面所有pages的信息）
      prevPage.setData({
        checkedAddress: that.data.checkedAddress,
        state: 2, //判断地址返回填写订单
      })

      my.navigateBack({
        delta: 1,
      });

    } else {   //地址管理进来
      let isdefault = event.currentTarget.dataset.isdefault;
      console.log('event.target =====' + JSON.stringify(event.target))
      console.log('isDefault =====' + isdefault)
      my.navigateTo({
        url: '/pages/goAddAddress/goAddAddress?area=' + event.currentTarget.dataset.area + '&city=' + event.currentTarget.dataset.city + '&province=' + event.currentTarget.dataset.province + '&mobile=' + event.currentTarget.dataset.mobile + '&street=' + event.currentTarget.dataset.street + '&name=' + event.currentTarget.dataset.name + '&isDefault=' + event.currentTarget.dataset.isdefault + '&id=' + 1 + '&addressId=' + event.currentTarget.dataset.addressId
      })
    }
  },

  deleteAddress: function (event) {
    console.log('点击了删除' + JSON.stringify(event.target.targetDataset.addressId))
    my.confirm({
      title: '温馨提示',
      content: '确定要删除地址',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {

          let that = this;
          let addressId = event.target.targetDataset.addressId;
          console.log('addressId  == ' + addressId);
          var params = new Object()
          params.addressId = addressId;
          params.userId = 17;            // wx.getStorageSync('userId');
          network.GET({
            contacturl: '/address/deleteAddress',
            params: params,
            success: function (res) {
              console.log(res);
              that.getAddressList();
              console.log('用户点击确定')
              my.showToast({
                content: '删除地址成功'
              })
            },
            fail: function () {
              //失败后逻辑
            }
          })
        }
      },
    });
  }
})
