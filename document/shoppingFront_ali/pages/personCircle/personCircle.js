// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {

    // userInfo: {},
    // actionSheetHidden: true,
    // actionSheetItems: ['删除所有圈子', '显示所有圈子', '隐藏所有圈子'],
    // resultData: [
    //   {address: '星河COCO City(民治店)',avatar:'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJPg1KJQEpubKYfnzeyjtA5ib5eOds3nlsaMAWsYyQUcBmrtpk5VxLhxedv5GIlLXNDsefU6uR9Ribw/132',
    //   circleId:'144', comments:[],content:'血净',coverList:['https://ec.asktiptop.com:8443/ec/image/201810040001366038.png'],
    //   createDate:'1538582400000',isFollowed:'1',isSelf:'0',items:[{categoryId:7,circleId:144,content:'血净',cover:'https://ec.asktiptop.com:8443/ec/image/201810040002079237.png',
    //   coverList:['https://ec.asktiptop.com:8443/ec/image/201810040002079237.png'],itemId:137,price:798,title:'血净',userId:'18'
    //   }]}],
    // circleid: '',
    // followUserId: '',
    // currentIndex: 1,
    // pageSize: 10,
    // totalPage: 0,
    // hasMore: true,
    // nickName: '',
    // headpic: '',
    // myself: 0,
    // showMore: false,
    // status: false,
    // interval: ''

    userInfo: {},
    actionSheetHidden: true,
    actionSheetItems: ['删除所有圈子', '显示所有圈子', '隐藏所有圈子'],
    resultData: [], //数据数组
    circleid: '',
    followUserId: '',
    currentIndex: 1,
    pageSize: 10,
    totalPage: 0,
    hasMore: true,
    nickName: '',
    headpic: '',
    myself: 0,
    showMore: false,
    status: false,
    interval: '',

  },

  onLoad: function (options) {

    my.getAuthUserInfo({
      success: (userInfo) => {
        this.setData({
          userInfo: userInfo,
        })
      }
    });

    var that = this;
    that.setData({
      followUserId: options.followUserId
    });
    // if (options.followUserId == wx.getStorageSync('userId')) { //本人进来
    if (options.followUserId == 17) { //本人进来
      that.setData({
        myself: 1,
      })
    }
    //获取圈子列表
    that.getCircleListMessage(1);
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

  getCircleListMessage(showType) {

    var that = this;
    var params = new Object()
    params.pageSize = this.data.pageSize;;
    params.currentIndex = this.data.currentIndex;
    params.userId = that.data.followUserId;
    network.POST({
      contacturl: '/circle/getCircleListByUserId',
      params: (JSON.stringify(params)),
      success: function (res) {
        console.log('圈子列表' + (JSON.stringify(res)));
        //成功后逻辑
        console.log('res.data.totalPage res.data.totalPage ====' + res.data.totalPage);
        // my.setNavigationBarTitle({
        //   title: res.data.data.nickName //页面标题为路由参数
        // })
        if (res.data.data == null) {

          that.setData({
            resultData: [],
            totalPage: res.data.totalPage,
            nickName: res.data.data.nickName,
            headpic: res.data.data.avatar
          });
        } else {

          that.setData({
            resultData: res.data.data.circles,
            totalPage: res.data.totalPage,
            nickName: res.data.data.nickName,
            headpic: res.data.data.avatar
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

  // 展示图片
  previewImage: function (e) {
    var current = e.target.dataset.src
    var count = e.target.dataset.count
    my.previewImage({
      current: current,
      urls: count
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

  //显示某条信息
  bindshow: function (e) {
    let that = this;
    var userId = e.target.dataset.deleuserid;
    var circleId = e.target.dataset.circleid;
    //获取商品
    var params = new Object()
    params.userId = userId;
    params.circleId = circleId;
    network.GET({
      contacturl: '/circle/setCircleShowByCircleId',
      params: params,
      success: function (res) {
        console.log(res)
        //成功后逻辑
        console.log("成功了。。。。")
        that.getCircleListMessage(1);
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  //隐藏某条信息
  bindhide: function (e) {
    let that = this;
    var userId = e.target.dataset.deleuserid;
    var circleId = e.target.dataset.circleid;
    //获取商品
    var params = new Object()
    params.userId = userId;
    params.circleId = circleId;
    network.GET({
      contacturl: '/circle/setCircleHideByCircleId',
      params: params,
      success: function (res) {
        console.log(res)
        //成功后逻辑
        console.log("隐藏成功了。。。。")
        that.getCircleListMessage(1);
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  bindCaoZuo: function (e) { //评论点赞
    let that = this;
    that.setData({
      circleid: e.target.dataset.circleid,
    });
    var params = new Object()
    params.userId = 17;                      // wx.getStorageSync('userId');
    params.circleId = this.data.circleid;
    network.POST({
      contacturl: '/circle/addCirclePraise',
      params: (JSON.stringify(params)),
      success: function (res) {
        console.log(res)
        //成功后逻辑
        that.setData({
          resultData: [],
          currentIndex: 1,
        });
        that.getCircleListMessage(1);
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  //点击事件处理
  bindViewTapTheme: function (e) {
    console.log('哈哈哈哈哈哈哈' + e.currentTarget.dataset.itemid);
    my.navigateTo({
      url: '/pages/goodDetail/goodDetail?itemId=' + e.currentTarget.dataset.itemid,
    })
  },

  goodsmore(event) {
    console.log('sssss');
    const that = this;
    that.setData({
      showMore: !that.data.showMore,
    })
  },

  closeSearch: function () {
    console.log('xxxxxxxx');
    var that = this;
    const items = ['删除所有圈子', '显示所有圈子', '隐藏所有圈子'];
    my.showActionSheet({
      title: '选择',
      cancelButtonText: '取消',
      items,
      success({ index
      }) {
        if (index > -1) {

          console.log('xxxxxxxxx' + index)
          if (index == 0) { //删除本人所有圈子
            var params = new Object()
            params.userId = 17;           //wx.getStorageSync('userId');
            network.GET({
              contacturl: '/circle/deleteAllCircleByUserId',
              params: params,
              success: function (res) {
                console.log(res)
                //成功后逻辑
              },
              fail: function () {
                //失败后逻辑
              }
            })
          } else if (index == 1) { //显示本人所有圈子
            var params = new Object()
            params.userId = 17;               //  wx.getStorageSync('userId');
            network.GET({
              contacturl: '/circle/setUserCircleShowByUserId',
              params: params,
              success: function (res) {
                console.log(res)
                //成功后逻辑

              },
              fail: function () {
                //失败后逻辑
              }
            })
          } else { //隐藏本人所有圈子
            var params = new Object()
            params.userId = 17;             // wx.getStorageSync('userId');
            network.GET({
              contacturl: '/circle/setUserCircleHideByUserId',
              params: params,
              success: function (res) {
                console.log(res)
                //成功后逻辑

              },
              fail: function () {
                //失败后逻辑
              }
            })
          }
          that.getCircleListMessage(1);

        } else {
          my.showToast({
            content: '点击了取消'
          })
        }
      },
    });
  }


});
