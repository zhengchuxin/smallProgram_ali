// 导入js
var network = require("/util/util.js")
const app = getApp()

Page({
  data: {
    // 提交的图片数组
    picUrls: [],
    picString: [],
    actionText: "拍照/相册",
    addressData: '',
    addRessName: '',
    flag: true,
    continueflag: true,
    title: '',
    price: '', //商品价格
    address: '', //商品地址
    shopDescribe: '', //商品描述
    picUrlsBottom: [],
    picStringBottom: [],
    selectCategory: '',
    selectTime: '',
    catrgoryArray: [],
    timeArray: [],
    index: 0,
    indexarea: 0,
    items: [],
    itemsDic: {
      covers: '',
      content: '',
      categoryId: '',
      locationId: '',
      title: '',
      price: ''
    },
    show: false,
    dateInfo: {
      dateStr: '',
    },
    areaArray: [],
    totalcount: 0,
  },
  onLoad() {

  },

  bindCamera: function () {
    let that = this;
    my.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {

        console.log('开始 +' + JSON.stringify(res))
        const path = res.apFilePaths[0];
        my.uploadFile({
          url: app.globalData.URL + '/upload/uploadImage', // 开发者服务器地址
          filePath: path, // 要上传文件资源的本地定位符
          fileName: 'file', // 文件名，即对应的 key, 开发者在服务器端通过这个 key 可以获取到文件二进制内容
          fileType: 'image', // 文件类型，image / video / audio
          success: (res) => {

            console.log('最后 +' + JSON.stringify(res))
          },
        });

        // let tfps = res.tempFilePaths;
        // let _picUrls = this.data.picUrls;
        // for (let item of tfps) {
        //   _picUrls.push(item);
        //   this.setData({
        //     picUrls: _picUrls,
        //     actionText: "+"
        //   });
        // };

        // my.uploadFile({
        //   url: app.globalData.URL + '/upload/uploadImage', //仅为示例，非真实的接口地址
        //   filePath: tfps[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success: function (res) {
        //     var arr = that.data.picString;
        //     arr.push(res.data);
        //     console.log('tou xian + ' + arr[0])
        //     that.setData({
        //       picString: arr,
        //     });
        //   }
        // })
      }
    })
  },

  bindAddress: function () {
    console.log('点击了地址')
    let that = this;
    // 取消选择地理位置后获取当前人经纬度调用后台接口接收当前地理位置

    // my.openLocation({
    //   longitude: '113.469697',
    //   latitude: '22.527250',
    //   name: '深圳',
    //   address: '深圳大学',
    // });

    my.chooseLocation({
      type: 'gcj02',
      success(res) {
        my.hideLoading();
        console.log(res)
        my.alert(JSON.stringify(res));
        that.setData({
          // hasLocation: true,
          // location: formatLocation(res.longitude, res.latitude)
        })
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    })
  }
});
