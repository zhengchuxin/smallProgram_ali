Page({
  data: {
    keyword: '',
    searchStatus: false,
    list: [
      {
        categoryId: '4',
        circleId: '114',
        content: '振辰享 雪滋养液及乳液套装',
        covers: 'https://ec.asktiptop.com:8443/ec/image/201809211452187702.png',
        itemId: '95',
        locationName: '中国香港',
        price: '80',
        title: '振辰享 雪滋养液及乳液套装'
      },
      {
        categoryId: '4',
        circleId: '114',
        content: '振辰享 雪滋养液及乳液套装',
        covers: 'https://ec.asktiptop.com:8443/ec/image/201809211452187702.png',
        itemId: '95',
        locationName: '中国香港',
        price: '80',
        title: '振辰享 雪滋养液及乳液套装'
      },
      {
        categoryId: '4',
        circleId: '114',
        content: '振辰享 雪滋养液及乳液套装',
        covers: 'https://ec.asktiptop.com:8443/ec/image/201809211452187702.png',
        itemId: '95',
        locationName: '中国香港',
        price: '80',
        title: '振辰享 雪滋养液及乳液套装'
      }
    ],
    defaultKeyword: '商品',
  },
  onLoad() {

  },

  closeSearch: function (e) {
    console.log('点击了搜索');
  },

  bindViewTapTheme: function (e) {
    console.log('进入商品详情')
    my.navigateTo({
      url: '/pages/goodDetail/goodDetail',
    })
  }

});
