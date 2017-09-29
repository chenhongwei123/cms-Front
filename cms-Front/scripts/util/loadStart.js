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
define(["jquery", "cookie"], function($) {

	if($.cookie("name") && $.cookie("name") !== null) {
		//alert("1111")
		console.log($.cookie("name"))
		$(".n1").text($.cookie("name"))
		$(".n2").css("display", "block")
	} else {
		document.location.href = "../login.html"
	};

	/**
	 *  读取cookie,添加到显示位置
	 */
	//读取cookie放在变量中
	var name = $.cookie('name');
	$('.admin-name').text(name);

	/**
	 * 退出
	 */
	$('.logout').on('click', function() {
		$.cookie("name", "", {
			expires: -1
		}); //清除cookie
		$.cookie("code", "", {
			expires: -1
		});
		$.cookie("token", "", {
			expires: -1
		});
		document.location.href = "../login.html";
	});

//	//--------------------环境转换----------------------------
//	function urlx(url) {
//		//开发环境
////		var str = "http://admindev.honganjk.com/" + url
////		return str
//
//		//生产环境
//				var str = "http://admin.honganjk.com/" + url
//				return str
//
//	
//	}
//
//	//--------------------阿里百川环境转换----------------------------
//	function urla(url) {
//		//开发环境
////		var str = "http://bz.honganjk.com/" + url
////		return str
//
//		//生产环境
//				var str = "https://bzapi.honganjk.com/" + url
//				return strw
//
//		
//	}
//	//---------------------保健品环境转换-------------------------
//	function urlb(url){
//		
//		//开发环境
//			var str = "http://bjpsc.honganjk.com/" + url
//			return str
//
//		//生产环境
//		
//     
//	}
});