// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({

  userInfo: {},
  data: {

    // userInfo: {},
    // resultData: [
    //   {address: '星河COCO City(民治店)',avatar:'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJPg1KJQEpubKYfnzeyjtA5ib5eOds3nlsaMAWsYyQUcBmrtpk5VxLhxedv5GIlLXNDsefU6uR9Ribw/132',
    //   circleId:'144', comments:[],content:'血净',coverList:['https://ec.asktiptop.com:8443/ec/image/201810040001366038.png'],
    //   createDate:'1538582400000',isFollowed:'1',isSelf:'0',items:[{categoryId:7,circleId:144,content:'血净',cover:'https://ec.asktiptop.com:8443/ec/image/201810040002079237.png',
    //   coverList:['https://ec.asktiptop.com:8443/ec/image/201810040002079237.png'],itemId:137,price:798,title:'血净',userId:'18'
    //   }],
    //   views: 0,
    //   praises: 0,
    //   nickName: 'Cook'
    //   }
    // ], //数据数组
    // banner: [],
    // circleid: '',
    // currentIndex: 1,
    // pageSize: 10,
    // totalPage: 0,
    // hasMore: true,
    // showMore: false,
    // status: true,
    // interval: '',

    resultData: [], //数据数组
    banner: [],
    circleid: '',
    currentIndex: 1,
    pageSize: 10,
    totalPage: 0,
    hasMore: true,
    showMore: false,
    status: true,
    interval: '',
  },

  onLoad() {

    my.getAuthUserInfo({
      success: (userInfo) => {
        this.setData({
          userInfo: userInfo,
        })
      }
    });

    var that = this;
    setInterval(function () {
      console.log("interval")
      that.setData({
        status: !that.data.status,
      })
    }, 4000)
  },

  onUnload: function () {
    var that = this;
    console.log("倒计时暂停")
    that.clearTimeInterval(that)
  },

  clearTimeInterval: function (that) {
    var interval = that.data.interval;
    clearInterval(interval)
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

    var that = this;
    //获取圈子列表
    that.getCircleListMessage(1);
  },

  getCircleListMessage(showType) {
    var that = this;
    var params = new Object()
    params.pageSize = this.data.pageSize;;
    params.currentIndex = this.data.currentIndex;
    params.userId = 17;               //wx.getStorageSync('userId');
    network.POST({
      contacturl: '/circle/getCircleList',
      params: (JSON.stringify(params)),
      success: function (res) {

        console.log('圈子列表' + (JSON.stringify(res)));
        //成功后逻辑
        if (res.data.data == null) {

          that.setData({
            orderList: [],
            totalPage: res.data.totalPage,
          });
        } else {

          that.setData({
            resultData: res.data.data,
            totalPage: res.data.totalPage,
          });
        }

        if (that.data.totalPage > that.data.currentIndex) {

          that.setData({
            hasMore: true,
          });
        } else {
          that.setData({
            hasMore: false,
          });
        }
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },


  bindCaoZuo: function (e) { //评论点赞
    let that = this;
    that.setData({
      circleid: e.target.dataset.circleid
    });
    var params = new Object()
    params.userId = 17;                 // wx.getStorageSync('userId');
    params.circleId = this.data.circleid;
    network.POST({
      contacturl: '/circle/addCirclePraise',
      params: (JSON.stringify(params)),
      success: function (res) {
        console.log(res)
        //成功后逻辑
        my.showToast({
          content: '点赞成功！'
        })
        that.getCircleListMessage(1);
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },


  watchClcik: function (e) {
    console.log('点击了关注');

    var that = this;
    var params = new Object()
    params.userId = 17;                     // wx.getStorageSync('userId');
    params.followUserId = e.currentTarget.dataset.userid;
    network.POST({
      contacturl: '/circle/addFollow',
      params: (JSON.stringify(params)),
      success: function (res) {
        //成功后逻辑
        console.log(res)
        my.showToast({
          content: '关注成功'
        })
        that.getCircleListMessage(1);
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  //本人删除某一条数据
  bindDele: function (e) {
    let that = this;
    var userId = e.target.dataset.deleuserid;
    var circleId = e.target.dataset.circleid;
    //获取商品
    var params = new Object()
    params.userId = userId;
    params.circleId = circleId;
    network.GET({
      contacturl: '/circle/deleteCircleByCircleId',
      params: params,
      success: function (res) {
        console.log(res)
        //成功后逻辑
        that.getCircleListMessage(1);
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  bindViewTapTheme: function () {
    console.log('进入商品详情');
    my.navigateTo({
      url: '/pages/goodDetail/goodDetail',
    })
  },

  // 展示图片
  previewImage: function (e) {
    var current = e.target.dataset.src
    var count = e.target.dataset.count
    my.previewImage({
      current: current,
      urls: count
    })
  },

  //进入自己大头像的圈子
  addmyself: function (e) {
    my.navigateTo({
      // url: '/pages/personCircle/personCircle?followUserId=' + wx.getStorageSync('userId')
      url: '/pages/personCircle/personCircle?followUserId=' + 17
    })
  },

  //进入列表头像的圈子
  clickhead: function (e) {
    console.log('进入个人');
    my.navigateTo({
      url: '/pages/personCircle/personCircle?followUserId=' + e.currentTarget.dataset.userid
    })
  },

  goodsmore(event) {
    console.log('sssss');
    const that = this;
    that.setData({
      showMore: !that.data.showMore,
    })
  }

});
