App({
  onLaunch(options) {
    console.log('App Launch', options);


        //生产
    this.globalData.LocalURL = "https://apis.map.qq.com";
    this.globalData.URL = "https://ec.asktiptop.com:8443/ec";

    //开发
    // this.globalData.LocalURL = "http://apis.map.qq.com";
    // this.globalData.URL = "http://192.168.41.183:8080";  //sqm
    // this.globalData.URL = "http://192.168.41.212:8080"; //zcx

    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
          success: (userInfo) => {
            console.log(userInfo);
          }
        });
        console.log(res);
      },
    });

  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
  },
});
