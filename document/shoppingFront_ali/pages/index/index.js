// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0
  },
  onLoad() {
    var _this = this
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);

    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
          success: ({ nickName, avatar }) => {
            this.setData({
              avatar: avatar
            });
          }
        });
      },
    });

  },
  bindViewTap() {
    my.switchTab({
      url: '/pages/home/home',
    });
    
  },
});
