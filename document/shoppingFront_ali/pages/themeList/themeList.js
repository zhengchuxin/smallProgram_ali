// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {

    list: [
      // {categoryId:'7',circleId:'144',content:'黄道益',cover:'https://ec.asktiptop.com:8443/ec/image/201809231351341130.png',locationName:'中国香港',price:'71.9',title:'黄道益'},
      // {categoryId:'7',circleId:'144',content:'黄道益',cover:'https://ec.asktiptop.com:8443/ec/image/201809231351341130.png',locationName:'中国香港',price:'71.9',title:'黄道益'},
      // {categoryId:'7',circleId:'144',content:'黄道益',cover:'https://ec.asktiptop.com:8443/ec/image/201809231351341130.png',locationName:'中国香港',price:'71.9',title:'黄道益'}
    ],
    hidden: false,
    currentIndex: 1,
    pageSize: 10,
    hasMore: false,
    screenHeight: 500,
    totalPage: 1,
    categoryId: '',

  },
  onLoad: function (options) {

    var that = this;
    // my.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       screenHeight: res.windowHeight,
    //     });
    //   }
    // })

    that.setData({
      categoryId: options.themeId,
    });

    var params = new Object()
    params.categoryId = options.themeId;
    params.pageSize = 10;
    params.currentIndex = 1;
    network.POST({
      contacturl: '/item/getItemListByCategoryId',
      params: JSON.stringify(params),
      success: function (res) {
        // 成功后逻辑处理
        console.log('目录数据为+' + (JSON.stringify(res)));
        that.setData({
          list: res.data.data,
          // hidden: true,
          // totalPage: res.data.totalPage
        });
        // if (that.data.totalPage > that.data.currentIndex) {

        //   that.setData({
        //     hasMore: true,
        //   });
        // } else {
        //   that.setData({
        //     hasMore: false,
        //   });
        // }
      },
      fail: function (err) {
        // 失败逻辑处理
        console.log('错误为+' + (JSON.stringify(err)));
      }
    })

  },

  bindViewTapTheme: function (e) {
    console.log('点击了进商品详情');
    my.navigateTo({
      url: '/pages/goodDetail/goodDetail?itemId=' + e.currentTarget.dataset.itemid,
    })
  }
});
