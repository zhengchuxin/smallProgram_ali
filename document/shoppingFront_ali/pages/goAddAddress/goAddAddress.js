// 导入js
var network = require("/util/util.js")
const app = getApp()


Page({
  data: {

    // address: {
    //   address: '',
    //   name: '',
    //   mobile: '',
    //   isDefault: 0,
    //   provinceName: '',
    //   cityName: '',
    //   areaName: '',
    // },
    // provinceId: "", //选择省
    // cityId: "",     //选择市
    // areaId: "",     //选择区
    // countNumber: 0,
    // openSelectRegion: false, //是否弹出
    // selectRegionList: [
    //   { id: 0, name: '省市区', pid: 0, type: 1 },
    //   // { id: 0, name: '城市', pid: 0, type: 2 },
    //   // { id: 0, name: '区县', pid: 0, type: 3 }
    // ],
    // regionList: [],  //省市区数组
    // isNewBuild: false, //修改 true， 新建false
    // addressId: '',  //修改地址

    address: {
      address: '',
      name: '',
      mobile: '',
      isDefault: 0,
      provinceName: '',
      cityName: '',
      areaName: '',
    },
    provinceId: "", //选择省
    cityId: "",     //选择市
    areaId: "",     //选择区
    countNumber: 0,
    openSelectRegion: false, //是否弹出
    selectRegionList: [
      { id: 0, name: '省市区', pid: 0, type: 1 },
      // { id: 0, name: '城市', pid: 0, type: 2 },
      // { id: 0, name: '区县', pid: 0, type: 3 }
    ],
    regionList: [],  //省市区数组
    isNewBuild: false, //修改 true， 新建false
    addressId: '',  //修改地址
  },

  bindinputMobile(event) {
    let address = this.data.address;
    address.mobile = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputName(event) {
    let address = this.data.address;
    address.name = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputAddress(event) {
    let address = this.data.address;
    address.address = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault() {
    let address = this.data.address;
    address.isDefault = !address.isDefault;
    console.log('address.isDefault  ====  ' + address.isDefault)
    this.setData({
      address: address
    });
  },

  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
    console.log("options.id ++  " + options.id)
    console.log("99999999999 ++  " + options.province)
    console.log("99999999999 ++  " + options.city)
    console.log("99999999999 ++  " + options.area)
    console.log("99999999999 ++  " + options.street)
    console.log("99999999999 ++  " + options.name)
    console.log("99999999999 ++  " + options.mobile)
    console.log("99999999999 ++  " + options.isDefault)
    console.log("addressId ++  " + options.addressId)

    if (options.id != 1) {

      console.log("新建 ++  ")
      this.setData({
        isNewBuild: true,  //新建
        address: {
          address: '',
          name: '',
          mobile: '',
          isDefault: 0,
          provinceName: '',
          cityName: '',
          areaName: '',
        },
      });

    } else {

      console.log("99999999999 ++  ")
      let address = this.data.address;
      address.provinceName = options.province;
      address.cityName = options.city;
      address.areaName = options.area;
      address.address = options.street;
      address.name = options.name;
      address.mobile = options.mobile;
      address.isDefault = options.isDefault;
      this.setData({
        address: address,
        isNewBuild: false,  //修改
        addressId: options.addressId,
      });
    }
  },

  //点击省份
  selectRegionType() {

    var that = this;
    // 获得区域省市区列表
    var params = new Object()
    params.pid = 0;
    network.GET({
      contacturl: '/address/getRegionListByPid',
      params: params,
      success: function (res) {
        console.log(res)
        //成功后逻辑
        console.log(res.data)
        that.setData({
          regionList: res.data.data,
          countNumber: 1,
          provinceId: "",
          cityId: "",
          areaId: "",
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  //弹出省进行选择
  chooseRegion() {

    this.setData({
      openSelectRegion: !this.data.openSelectRegion
    });
    var that = this;
    // 获得区域省市区列表
    var params = new Object()
    params.pid = 0;
    network.GET({
      contacturl: '/address/getRegionListByPid',
      params: params,
      success: function (res) {

        //成功后逻辑
        console.log(res.data)
        that.setData({
          regionList: res.data.data,
          countNumber: 1,
          provinceId: "",
          cityId: "",
          areaId: "",
        });
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },


  //确定按钮
  doneSelectRegion() {

    var that = this;
    console.log('1111111')
    if (that.data.countNumber == 1) {

      my.showToast({
        content: '请选择省市区',
      })

    } else if (that.data.countNumber == 2) {

      my.showToast({
        content: '请选择市区',
      })

    } else if (that.data.countNumber == 3) {

      my.showToast({
        content: '请选择区',
      })

    } else if (that.data.countNumber == 4) { //省市区都已经选择
      let address = that.data.address;
      address.provinceName = that.data.provinceId;
      address.cityName = that.data.cityId;
      address.areaName = that.data.areaId;
      this.setData({
        address: address
      });
      this.setData({
        openSelectRegion: !this.data.openSelectRegion
      });
    }
  },

  //选择省市区
  selectRegion(event) {

    console.log('regionIndex  === ' + event.target.dataset.regionid)
    console.log('regionIndex  === ' + event.target.dataset.name)
    var that = this;
    if (that.data.countNumber == 3 || that.data.countNumber == 4) { //点击了区或则确定
      that.setData({
        areaId: event.target.dataset.name,
        countNumber: 4
      });
      return;
    }
    // 获得区域省市区列表
    var params = new Object()
    params.pid = event.target.dataset.regionid;
    params.type = 1;
    network.GET({
      contacturl: '/address/getRegionListByPid',
      params: params,
      success: function (res) {
        console.log(res)
        //成功后逻辑
        console.log(res.data)
        that.setData({
          regionList: res.data.data
        });
        if (that.data.countNumber == 1) { //获取市
          that.setData({
            provinceId: event.target.dataset.name,
            countNumber: 2,
          });
          console.log('countNumber ======2')
        } else if (that.data.countNumber == 2) { //获取区
          that.setData({
            cityId: event.target.dataset.name,
            countNumber: 3,
          });
          console.log('countNumber ======3')
        }
      },
      fail: function () {
        //失败后逻辑
      }
    })
  },

  //点击背景取消弹框
  cancelSelectRegion() {
    this.setData({
      openSelectRegion: !this.data.openSelectRegion
    });
  },

  cancelAddress() {
    my.navigateBack();
  },

  //保存地址
  saveAddress() {
    console.log(this.data.address)
    let address = this.data.address;

    if (address.name == "") {
      my.showToast({
        content: '姓名不能为空!',
      })
      return false
    }

    if (address.mobile == "") {
      my.showToast({
        content: '手机不能为空!',
      })
      return false
    }

    if (address.cityName == "") {
      my.showToast({
        content: '省市区不能为空!',
      })
      return false
    }

    if (address.address == "") {
      my.showToast({
        content: '详细地址不能为空!',
      })
      return false
    }


    if (address.isDefault) {
      address.isDefault = 1;
    } else {
      address.isDefault = 0;
    }


    console.log('111213xxxxxxxxxxx88888888');
    if (this.data.isNewBuild) {
      console.log('111213xxxxxxxxxxx');
      //新建添加地址请求
      var params = new Object()
      params.userId = 17;          // wx.getStorageSync('userId');
      params.name = address.name;
      params.mobile = address.mobile;
      params.area = address.areaName;
      params.province = address.provinceName;
      params.city = address.cityName;
      params.street = address.address;
      params.zipCode = "10";
      params.isDefault = address.isDefault;


      network.POST({
        contacturl: '/address/addAddress',
        params: (JSON.stringify(params)),
        success: function (res) {

          //成功后逻辑
          console.log('xxxxxxxxxxx');
          my.navigateBack();
          my.showToast({
            content: '添加地址成功',
          })
        },
        fail: function () {
          //失败后逻辑
        }
      })

    } else {

      //修改添加地址请求
      var params = new Object()
      params.userId = 17;       // wx.getStorageSync('userId');
      params.name = address.name;
      params.mobile = address.mobile;
      params.area = address.areaName;
      params.province = address.provinceName;
      params.city = address.cityName;
      params.street = address.address;
      params.zipCode = "10";
      params.isDefault = address.isDefault;
      params.addressId = this.data.addressId;
      network.POST({
        contacturl: '/address/updateAddress',
        params: (JSON.stringify(params)),
        success: function (res) {
          //成功后逻辑
          console.log(res);
          console.log('xxxxxxxxxxx232321213');
          my.navigateBack();
          my.showToast({
            title: '修改地址成功',
          })
        },
        fail: function () {
          //失败后逻辑
        }
      })
    }
  }

});
