Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    nickName: '',
    avatar: '',
    picUrl: "http://img.weiye.me/zcimgdir/album/file_595471605deb6.png",
    functions: [
      {
        url: '../../images/listPic/0802_4.jpg',
        name: '待付款',
        status: '0'
      },
      {
        url: '../../images/listPic/0802_3.jpg',
        name: '待发货',
        status: '1'
      },
      {
        url: '../../images/listPic/0802_1.jpg',
        name: '已发货',
        status: '2'
      },
      {
        url: '../../images/listPic/0802_2.jpg',
        name: '已收货',
        status: '3'
      },
    ],
    latitude: '',
    longitude: '',
    province: '',
    city: '',
    district: '',
    street: '',
    street_number: ''
  },
  onLoad() {

    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
          success: ({ nickName, avatar }) => {
            this.setData({
              nickName: nickName,
              avatar: avatar
            });
            console.log({ nickName, avatar })
          }
        });
      },
    });
  },

  bindOrderListViewTap: function (e) {
    console.log('哈哈哈哈哈哈哈' + e.currentTarget.dataset.status);
    my.navigateTo({
      url: '/pages/order/order?status=' + e.currentTarget.dataset.status
    })
  },
});
