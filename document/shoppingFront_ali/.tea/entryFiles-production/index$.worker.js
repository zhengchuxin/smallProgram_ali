require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/home/home');
require('../../pages/addComment/addComment');
require('../../pages/goods/goods');
require('../../pages/cart/cart');
require('../../pages/member/member');
require('../../pages/watchPerson/watchPerson');
require('../../pages/search/search');
require('../../pages/collectGood/collectGood');
require('../../pages/goodDetail/goodDetail');
require('../../pages/themeList/themeList');
require('../../pages/order/order');
require('../../pages/orderDetail/orderDetail');
require('../../pages/mycricleorder/mycricleorder');
require('../../pages/mycricleorderDetail/mycricleorderDetail');
require('../../pages/addAddress/addAddress');
require('../../pages/goAddAddress/goAddAddress');
require('../../pages/personCircle/personCircle');
require('../../pages/writeOrder/writeOrder');
require('../../pages/sendGoods/sendGoods');
require('../../pages/index/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
