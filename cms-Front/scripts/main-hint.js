/**
 * Created by HJJ on 2017/3/23.
 *
 ━━━━━━神兽出没━━━━━━
 　　　┏┓　　　┏┓
 　　┏┛┻━━━┛┻┓
 　　┃　　　　　　　┃
 　　┃　　　━　　　┃
 　　┃　┳┛　┗┳　┃
 　　┃　　　　　　　┃
 　　┃　　　┻　　　┃
 　　┃　　　　　　　┃
 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
 　　　　┃　　　┃    神兽保佑,代码无bug
 　　　　┃　　　┃
 　　　　┃　　　┗━━━┓
 　　　　┃　　　　　　　┣┓
 　　　　┃　　　　　　　┏┛
 　　　　┗┓┓┏━┳┓┏┛
 　　　　　┃┫┫　┃┫┫
 　　　　　┗┻┛　┗┻┛
 ━━━━━━感觉萌萌哒━━━━━━


 */
require.config({
    /**
     * baseUrl:加载所有代码
     */
    baseUrl: '../scripts',
    paths: {
        "jquery": "lib/jQuery/jquery.min",
        "bootstrap": "lib/bootstrap/bootstrap.min",
        "cookie": "lib/jQuery/jquery.cookie.min",
        "sweetalert": "lib/sweetalert/sweetalert-dev",
        "jqueryTime": "lib/jQuery/jquery-time",
        "remodal": "lib/jQuery/remodal",
    },

    shim:{
        "sweetalert": ["jquery"],
        "jqueryTime": ["jquery"],
        "bootstrap": ["jquery"],
         "remodal": ["jquery"],
    }
});

require(['app/hint','util/loadStart']);