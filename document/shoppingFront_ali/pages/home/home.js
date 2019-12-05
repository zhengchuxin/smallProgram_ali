// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {
    action: "",
    address: '',
    keyword: '',
    tipmessage: '好消息 😊',
    index: 0,
    locationId: 1,

    banner: [
      // 'https://ec.asktiptop.com:8443/ec/image/ad1.png', 'https://ec.asktiptop.com:8443/ec/image/ad1.png'
    ],
    categoryId: [
      //   { categoryName: '钟表', cover: 'https://ec.asktiptop.com:8443/ec/categorys/category001.jpg' }, { categoryName: '珠宝首饰', cover: 'https://ec.asktiptop.com:8443/ec/categorys/category002.jpg' },
      // { categoryName: '钟表', cover: 'https://ec.asktiptop.com:8443/ec/categorys/category001.jpg' }, { categoryName: '面部护理', cover: 'https://ec.asktiptop.com:8443/ec/categorys/category002.jpg' },
      // { categoryName: '钟表', cover: 'https://ec.asktiptop.com:8443/ec/categorys/category001.jpg' }, { categoryName: '手机数码', cover: 'https://ec.asktiptop.com:8443/ec/categorys/category006.jpg' },
      // { categoryName: '钟表', cover: 'https://ec.asktiptop.com:8443/ec/categorys/category001.jpg' }, { categoryName: '婴儿用品', cover: 'https://ec.asktiptop.com:8443/ec/categorys/category008.jpg' }
      // 
    ],
    hotgoods: [
      //   { content: 'Dr jart 面膜', cover: 'https://ec.asktiptop.com:8443/ec/image/201810032350305075.png', price: '98', locationName: '中国香港', title: 'Dr jart 面膜' },
      // { content: '安儿宝A+三段', cover: 'https://ec.asktiptop.com:8443/ec/image/201810032323551119.png', price: '248', locationName: '中国香港', title: '安儿宝A+三段' },
      // { content: '秘贴 自生精华套装', cover: 'https://ec.asktiptop.com:8443/ec/image/201809231342531062.png', price: '98', locationName: '中国香港', title: '去疤啫喱' },
      // { content: 'Dr jart 面膜', cover: 'https://ec.asktiptop.com:8443/ec/image/201810032350305075.png', price: '98', locationName: '中国香港', title: 'Dr jart 面膜' }
    ],
    areaArray: [
      // { locationId: 0, name: '中国香港' }, { locationId: 1, name: '中国澳门' }, { locationId: 2, name: '澳大利亚' }, { locationId: 3, name: '加拿大' }
    ],
    adList: [
      
    ],
    indicatorDots: true,
    autoplay: true,
    vertical: true,
    interval: 2000,
    circular: true,
  },
  onLoad() {

    // 获取代购地区地址
    var that = this;
    var parmas = new Object()
    network.GET({
      contacturl: '/public/getPuachaseLocation',
      parmas: parmas,
      success: function (res) {
        // 成功后逻辑处理
        console.log('代购地址为+' + (JSON.stringify(res)));
        that.setData({
          areaArray: res.data.data
        })

      },
      fail: function () {
        // 失败逻辑处理
      }
    })


    //广告通知
    var paramad = new Object()
    network.GET({
      contacturl: '/public/getHomeNotices',
      params: paramad,
      success: function (res) {
        console.log(res)
        //成功后逻辑
        that.setData({
          adList: res.data.data
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })

    //轮播图
    var that = this;
    var params = new Object()
    params.type = 1;
    network.GET({
      contacturl: '/public/getAdByType',
      params: params,
      success: function (res) {
        //成功后逻辑
        console.log("轮播图" + (JSON.stringify(res)));
        that.setData({
          banner: res.data.data
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
    //获取商品
    that.getHotMessage(1);
  },

  getHotMessage(showType) {
    var that = this;
    var params = new Object()
    params.locationId = that.data.locationId;
    network.GET({
      contacturl: '/public/getHomeLayout',
      params: params,
      success: function (res) {

        //成功后逻辑
        console.log(JSON.stringify(res));
        that.setData({
          categoryId: res.data.data.categorys,
          hotgoods: res.data.data.hot,
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (!((e.detail.value) >= 0)) {
      return;
    };
    this.setData({
      index: e.detail.value,
    })
    var areaid = this.data.areaArray[e.detail.value].locationId;
    this.setData({
      locationId: areaid,
    })
    console.log('222222 + ' + areaid)
    this.setData({
      hotgoods: '',
    });
    //获取商品
    this.getHotMessage(1);
  },

  btn_change1: function () {
    console.log('picker发送选择改变')
    my.navigateTo({
      url: '/pages/search/search',
    })
  },

  btn_change2: function (e) {

    console.log('哈哈哈哈哈哈哈 进入商品详情' + e.currentTarget.dataset.itemid);
    my.navigateTo({
      url: '../goodDetail/goodDetail?itemId=' + e.currentTarget.dataset.itemid,
    })
  },

  fucClick: function (e) {
    console.log('进入商品列表')
    console.log('ssssssss   ' + e.currentTarget.dataset.categoryid)
    my.navigateTo({
      url: '/pages/themeList/themeList?themeId=' + e.currentTarget.dataset.categoryid
    })
  }

});