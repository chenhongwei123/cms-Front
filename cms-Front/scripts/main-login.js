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
    baseUrl: 'scripts',
    paths: {
        "jquery": "lib/jQuery/jquery.min",
        "md5": "lib/jQuery/jquery.md5",
        "bootstrap": "lib/bootstrap/bootstrap.min",
        "cookie": "lib/jQuery/jquery.cookie.min"

    },

    /**
     * 加载没有使用AMD规范的插件
     */
    shim:{
        "bootstrap": ["jquery"],
        "md5": ["jquery"]
    }
});

require(['app/checkLogin','util/loginTools']);