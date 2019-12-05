// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {

    list: [
      // { cover: 'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png', introduce: '楼上 美国花旗参', name: '一级美国花旗参 楼上', itemId: '12', userId: '24' },
      // { cover: 'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png', introduce: '楼上 美国花旗参', name: '一级美国花旗参 楼上', itemId: '12', userId: '24' },
      // { cover: 'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png', introduce: '楼上 美国花旗参', name: '一级美国花旗参 楼上', itemId: '12', userId: '24' },
      // { cover: 'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png', introduce: '楼上 美国花旗参', name: '一级美国花旗参 楼上', itemId: '12', userId: '24' },
      // { cover: 'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png', introduce: '楼上 美国花旗参', name: '一级美国花旗参 楼上', itemId: '12', userId: '24' }
    ],

  },
  onLoad() {

    var that = this;
    var params = new Object()
    params.type = 1;
    params.userId = 17;         //wx.getStorageSync('userId');
    network.GET({
      contacturl: '/userInfo/getCollectList',
      params: params,
      success: function (res) {
        console.log(res)
        //成功后逻辑
        that.setData({
          list: res.data.data,
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })

  },


  pushGoodsClick: function (e) {
    console.log('进入商品详情')
    my.navigateTo({
      url: '/pages/goodDetail/goodDetail?itemId=' + e.currentTarget.dataset.itemid
    })
  },

});
