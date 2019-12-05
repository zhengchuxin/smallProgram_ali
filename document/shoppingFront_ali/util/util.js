const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}


//生产
var API_URL = 'https://ec.asktiptop.com:8443/ec'

// //开发
// var API_URL = 'http://192.168.41.212:8080'  //zcx
// var API_URL = 'http://192.168.41.183:8080'  //sqm

var requestHandler = {
  params: {},
  success: function (res) {
    //success
  },
  fail: function () {

  },
}

//get请求
function GET(requestHandler) {
  request('GET', requestHandler)
}

//POST请求  
function POST(requestHandler) {
  request('POST', requestHandler)
}

function request(method, requestHandler) {

  //注意：可以对params加密等处理  
  var params = requestHandler.params;
  my.httpRequest ({
    url: API_URL + requestHandler.contacturl, //域名拼接后缀
    headers: {'Content-Type': 'application/json'}, 
    data: params,    //参数
    dataType: 'json',
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  
    success: (res) =>{

      // wx.hideNavigationBarLoading()
      // wx.hideLoading()

      //注意：可以对参数解密等处理  
      requestHandler.success(res)
    },
    fail: (err) => {

      // wx.hideNavigationBarLoading()
      // wx.hideLoading()
      requestHandler.fail(err)
    },
    complete: function () {
      // complete  
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST
}  
