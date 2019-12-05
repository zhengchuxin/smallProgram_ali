// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {
    // goods: {
    //   name: '一级美国花旗参 楼上',
    //   describe: '楼上 美国花旗参',
    //   checkedSpecPrice: 150,
    //   goodsBrief: '楼上 美国花旗参',
    //   service: [
    //     // '随时退', '过期退', '七天包换'
    //   ],
    //   photo: [
    //     'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png'
    //   ],
    //   selled: '1',
    // },
    // collectBackImage: '../../images/static/images/icon_collect.png',
    // hasCollectImage: '../../images/static/images/icon_collect_checked.png',
    // noCollectImage: '../../images/static/images/icon_collect.png',
    // homeImage: '../../images/bottomNav/home.png',
    // isCollect: false,
    // itemId: 1,
    // openAttr: false,
    // number: 1,
    // cartGoods: [],
    // goodMessage: {
    // },
    // newsUrl: "https://www.jianshu.com/p/ef39203eae18",
    goods: {
      name: '',
      describe: '',
      checkedSpecPrice: 0,
      goodsBrief: '',
      service: [
        // '随时退', '过期退', '七天包换'
      ],
      photo: [
      ],
      selled: 0,
    },
    collectBackImage: '../../images/static/images/icon_collect.png',
    hasCollectImage: '../../images/static/images/icon_collect_checked.png',
    noCollectImage: '../../images/static/images/icon_collect.png',
    homeImage: '../../images/bottomNav/home.png',
    isCollect: false,
    itemId: 1,
    openAttr: false,
    number: 1,
    cartGoods: [],
    goodMessage: {
    },
    newsUrl: "https://www.jianshu.com/p/ef39203eae18",
  },
  onLoad: function (options) {

    console.log('itemid ==' + options.itemId)
    var that = this;
    that.setData({
      itemId: options.itemId,
    });
    that.getShopDetail(options.itemId);
  },

  getShopDetail(showType) {

    var that = this;
    var params = new Object()
    params.itemId = showType;
    params.userId = 4;             //wx.getStorageSync('userId');
    network.GET({
      contacturl: '/item/getItemDetail',
      params: params,
      success: function (res) {
        //成功后逻辑
        console.log(res);
        let goods = that.data.goods;
        goods.name = res.data.data.title;
        goods.describe = res.data.data.content;
        // goods.selled = res.data.data.stock;
        goods.selled = '1';
        goods.checkedSpecPrice = res.data.data.price;
        goods.goodsBrief = res.data.data.content;
        goods.photo = res.data.data.coverList;

        let goodMessage = that.data.goodMessage;
        goodMessage.itemName = res.data.data.title;
        goodMessage.quantity = 1;
        goodMessage.price = res.data.data.price;
        goodMessage.checked = true;
        goodMessage.cover = res.data.data.coverList[0];

        that.setData({
          goods: goods,
          goodMessage: goodMessage,
        });
        if (res.data.data.isCollect) {
          that.setData({
            collectBackImage: that.data.hasCollectImage,
            isCollect: res.data.data.isCollect,
          });
        } else {
          that.setData({
            collectBackImage: that.data.noCollectImage,
            isCollect: res.data.data.isCollect,
          });
        }
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  //去商品列表
  goodListTouch: function () {
    console.log('点击了去首页')
    my.switchTab({
      url: "/pages/home/home"
    })
  },

  addFast: function () {
    console.log('点击了立即购买')
    var that = this;
    let goodMessage = that.data.goodMessage;
    goodMessage.quantity = that.data.number;
    goodMessage.itemId = that.data.itemId;
    that.setData({ //先清空数据，防止重复加载
      cartGoods: [],
    });

    that.setData({
      goodMessage: goodMessage,
      cartGoods: that.data.cartGoods.concat(goodMessage),
    });
    console.log('------- + ' + JSON.stringify(that.data.cartGoods));
    my.navigateTo({
      url: '/pages/writeOrder/writeOrder?list=' + JSON.stringify(that.data.cartGoods) + '&types=' + 1,
    })
    
  },

  openCartPage: function () {
    console.log('点击了加入购物车')
    my.switchTab({
      url: '/pages/cart/cart',
    })
  },

  addToCart: function () {
    console.log('点击了加入购物车')
    var that = this;
    var params = new Object()
    params.userId = 17;          //wx.getStorageSync('userId');
    params.quantity = '1';
    params.itemId = that.data.itemId;
    network.POST({
      contacturl: '/cart/addCart',
      params: JSON.stringify(params),
      success: function (res) {
        //成功后逻辑
        console.log(res);
        my.showToast({
          content: '添加成功'
        });

      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  closeAttrOrCollect: function () {

    var that = this;
    if (that.data.isCollect) {  //取消收藏

      console.log('点击了取消')
      var that = this;
      var params = new Object()
      params.itemId = that.data.itemId;
      params.userId = 4;               //wx.getStorageSync('userId');
      network.GET({
        contacturl: '/userInfo/itemCancelCollect',
        params: params,
        success: function (res) {
          console.log(res)
          //成功后逻辑
          that.getShopDetail(that.data.itemId);
        },
        fail: function () {
          //失败后逻辑
        }
      })
    } else { //加入收藏

      console.log('点击了收藏');
      var that = this;
      var params = new Object()
      params.userId = 4;            // wx.getStorageSync('userId');
      params.itemId = that.data.itemId;
      network.POST({
        contacturl: '/userInfo/itemCollect',
        params: JSON.stringify(params),
        success: function (res) {
          //成功后逻辑
          console.log(res);
          that.getShopDetail(that.data.itemId);
        },
        fail: function () {
          //失败后逻辑
        }
      })
    }
  }
});
