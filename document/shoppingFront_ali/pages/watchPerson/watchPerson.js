// 导入js
var network = require("/util/util.js")
const app = getApp()


Page({
  data: {
    // functions: [
    //   { avatar: 'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJPg1KJQEpubKYfnzeyjtA5ib5eOds3nlsaMAWsYyQUcBmrtpk5VxLhxedv5GIlLXNDsefU6uR9Ribw/132', nickName: 'Cook', isActive: 1, followId: 56 },
    //   { avatar: 'https://wx.qlogo.cn/mmopen/vi_32/XlRjSWgtUONFoqsaPuAKAV0Rd7uCAhGdSRXgE0tnxj1rYBvAcA1icYGXk5MeQDSawjxHpNuJSBrCo4NN8vpSHkw/132', nickName: '刘玉娟', isActive: 1, followId: 17 },
    //   { avatar: 'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJPg1KJQEpubKYfnzeyjtA5ib5eOds3nlsaMAWsYyQUcBmrtpk5VxLhxedv5GIlLXNDsefU6uR9Ribw/132', nickName: 'Cook', isActive: 1, followId: 56 },
    //   { avatar: 'https://wx.qlogo.cn/mmopen/vi_32/XlRjSWgtUONFoqsaPuAKAV0Rd7uCAhGdSRXgE0tnxj1rYBvAcA1icYGXk5MeQDSawjxHpNuJSBrCo4NN8vpSHkw/132', nickName: '刘玉娟', isActive: 1, followId: 17 },
    //   { avatar: 'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJPg1KJQEpubKYfnzeyjtA5ib5eOds3nlsaMAWsYyQUcBmrtpk5VxLhxedv5GIlLXNDsefU6uR9Ribw/132', nickName: 'Cook', isActive: 1, followId: 56 },
    //   { avatar: 'https://wx.qlogo.cn/mmopen/vi_32/XlRjSWgtUONFoqsaPuAKAV0Rd7uCAhGdSRXgE0tnxj1rYBvAcA1icYGXk5MeQDSawjxHpNuJSBrCo4NN8vpSHkw/132', nickName: '刘玉娟', isActive: 1, followId: 17 },
    // ]

    functions: [

    ]
  },
  onLoad: function (options) {
    var that = this;
    that.getwatchListMessage(1);
  },

  getwatchListMessage: function (e) {

    //获取里面推荐关注的用户  
    var that = this;
    var params = new Object()
    params.userId =  17;       // wx.getStorageSync('userId');
    network.GET({
      contacturl: '/userInfo/getFollowUsers',
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
  },

  cancelwatchClick: function (e) {
    console.log('点击了取消关注')
    let that = this;
    var params = new Object()
    params.userId = 17;        // wx.getStorageSync('userId');
    params.followUserId = e.currentTarget.dataset.followuserid;
    network.GET({
      contacturl: '/circle/deleteFollow',
      params: params,
      success: function (res) {
        //成功后逻辑
        my.showToast({
          content: '取消关注成功'
        })
        that.getwatchListMessage(1);
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  pushCircleClick: function (e) {
    console.log('圈子' + e.currentTarget.dataset.followuserid);
    my.navigateTo({
      url: '/pages/personCircle/personCircle?followUserId=' + e.currentTarget.dataset.followuserid
    })
  }
});
