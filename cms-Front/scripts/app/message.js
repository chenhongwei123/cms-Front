/**
 * Created by HJJ on 2017/1/3.
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
短信群发
 */
define(["jquery", "cookie", "sweetalert", "jqueryTime", "bootstrap", "jtemplates"], function($) {
	$(".btn").on("click", function() {
		if($("#mobile").val() == '') {
			alert("请输入手机号")
		} else {
			if($("#msg").val() == '') {
				alert("请输入短信内容")
			} else {
				$.ajax({
					type: "post",
					url: urlx("admin/sendMsg.action"),
					async: true,
					headers: {
						"code": $.cookie("code"),
						"token": $.cookie("token")
					},
					dataType: "json",
					data: {
						"mobile": $("#mobile").val(),
						"msg": $("#msg").val()
					},
					success: function(data) {
						switch(JSON.stringify(data.code)) {
							case '"A00000"':
								alert("发送成功")
								break;
							default:
								alert(data.msg)
						}

					},
					error: function(XmlHttpRequest, textStatus, errorThrown) {
						console.log("请求失败" + XmlHttpRequest.responseText);
						console.log("请求失败" + XMLHttpRequest.status);
						console.log("请求失败" + XMLHttpRequest.readyState);
						console.log("请求失败" + textStatus);
						if(textStatus == "parsererror") {
							window.location.href = "../login.html"
						}
					}
				});
			}
		}

	})

})