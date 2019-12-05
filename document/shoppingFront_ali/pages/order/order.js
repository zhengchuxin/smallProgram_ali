// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {

    // orderList: [
    //   {
    //     address: '天津市市辖区河东区13213',
    //     totalAmount: '180',
    //     realAmount: '150',
    //     status: 0,
    //     orderNum: '12345O5876cbfeef4f4001853ff3d4de',
    //     itemList: [
    //       {
    //         cover: 'https://ec.asktiptop.com:8443/ec/image/201810032327176344.png',
    //         description: '楼上 美国花旗参',
    //         name: '一级美国花旗参 楼上',
    //         orderNum: '12345O5876cbfeef4f4001853ff3d4de',
    //         price: 150,
    //         quantity: 1
    //       }
    //     ]
    //   }
    // ],
    // showType: 0,
    // currentIndex: 1,
    // pageSize: 10,
    // totalPage: 0,
    // showSave: 0,
    // hasMore: true,
    // selectIndex: 0,

    orderList: [
    ],
    showType: 0,
    currentIndex: 1,
    pageSize: 10,
    totalPage: 0,
    showSave: 0,
    hasMore: true,
    selectIndex: 0,

  },

  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
    console.log('status == + ' + options.status);
    if (options.status == -1) {
      this.setData({
        showType: 0
      });
      this.getOrderList();
    } else if (options.status == 0) {
      this.setData({
        showType: 1
      });
      this.getOrderList(0);
    } else if (options.status == 1) {
      this.setData({
        showType: 2
      });
      this.getOrderList(1);
    } else if (options.status == 2) {
      this.setData({
        showType: 3
      });
      this.getOrderList(2);
    } else if (options.status == 3) {
      this.setData({
        showType: 4
      });
      this.getOrderList(3);
    }
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

    if (this.data.showType == 0) {
      this.getOrderList();

    } else if (this.data.showType == 1) {
      this.getOrderList(0);

    } else if (this.data.showType == 2) {
      this.getOrderList(1);

    } else if (this.data.showType == 3) {
      this.getOrderList(2);

    } else if (this.data.showType == 4) {
      this.getOrderList(3);
    }
  },


  switchTab: function (event) {
    console.log('点击了切换');

    let showType = event.currentTarget.dataset.index;
    console.log('showType +' + showType)
    this.setData({
      showType: showType,
      currentIndex: 1,
    });

    if (showType == 0) {
      this.getOrderList();

    } else if (showType == 1) {
      this.getOrderList(0);

    } else if (showType == 2) {
      this.getOrderList(1);

    } else if (showType == 3) {
      this.getOrderList(2);

    } else if (showType == 4) {
      this.getOrderList(3);
    }
  },

  getOrderList(showType) {

    var that = this;
    if ((showType) >= 0) {
      that.setData({ //保存当前点击的位置
        showSave: showType
      });
    }

    var params = new Object()
    params.pageSize = that.data.pageSize;
    params.currentIndex = this.data.currentIndex;
    params.userId = 17;               // wx.getStorageSync('userId');
    params.status = showType;
    network.POST({
      contacturl: '/order/getOrderListByStatus',
      params: (JSON.stringify(params)),
      success: function (res) {
        console.log(res)
        //成功后逻辑
        console.log('res.data.totalPage res.data.totalPage ====' + res.data.totalPage);
        if (res.data.data == null) {

          that.setData({
            orderList: [],
            totalPage: res.data.totalPage,
          });
        } else {

          that.setData({
            orderList: res.data.data,
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

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
   onPullDownRefresh: function (event) {

    console.log('xxxxccccc')

    my.stopPullDownRefresh()

    // var that = this;
    // that.setData({
    //   orderList: [],
    //   currentIndex: 1,
    // });
    // that.getOrderList(that.data.showSave);
  },

   onReachBottom: function (event) {

   },

  goToCircle: function () {

    this.setData({
      selectIndex: 1
    })
    my.switchTab({
      url: "/pages/home/home"
    })
  }

});
