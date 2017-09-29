/**
 * Created by HJJ on 2017/2/20.
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
$(document).ready(function() {

	$('.cms-reg-add').on('click', function() {
		console.log($("#cms-nurse-logo").attr("src"))
		if($("#name").val() == '') {
			alert("请填写名字")
		} else {
			if($("#mobile").val() == '') {
				alert("请填写手机号")
			} else {
				if($("#birthplace").val() == '') {
					alert("请填写籍贯")
				} else {
					if($("#address").val() == '') {
						alert("请填写地址")
					} else {
						if($("#sex").val() == null) {
							alert("请填写性别")
						} else {
							if($("#cms-nurse-logo").attr("src") == undefined) {
								alert("请上传用户头像")
							} else {
								if($("#textarea1").val() == '') {
									alert("请填写个人介绍")
								} else {
									if($(".cms-time").val() == null) {
										alert("请填写服务时间类型")
									} else {
										if($("#years").val() == '') {
											alert("请填写工作年限")
										} else {
											if($("#bank").val() == '') {
												alert("请填写开户行")
											} else {
												if($("#area").val() == '') {
													alert("请填写服务区域")
												} else {
													if($("#sn").val() == '') {
														alert("请填写身份证号")
													} else {
														if($('.cms-nurse-type').val() == null) {
															alert("请填写服务类型")
														} else {
															if($("#cms-positiveImg-img").attr("src") == undefined) {
																alert("请上传身份证正面")
															} else {
																if($("#cms-obverseImg-img").attr("src") == undefined) {
																	alert("请上传身份证反面")
																} else {
																	if($("#cms-licenseImg-img").attr("src") == undefined) {
																		alert("请上传资格证图片")
																	} else {
																		addNurse()
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}

	});

	/**
	 * 验证阿里百川
	 */
	$.ajax({
		type: "get",
		//      url: "https://bzapi.honganjk.com/common/getToken.action",
		url: urla('common/getToken.action'),
		data: {
			"key": "23384196",
			"secret": "7b484f801524af3bb7f6abb0dbe63459",
			"namespace": "hajk",
		},
		dataType: "json",
		success: function(data) {
			console.log(data)
			window.imgtoken = data.data;
			console.log(imgtoken);
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});

	/**
	 * 上传头像
	 */
	var uploader = uploadJSSDK;
	$(".file1").on("change", function(e) {
		$("#cms-nurse-logo").attr('src', "../images/jiazai0.gif")
		var files = e.target.files;
		for(var i = 0; i < files.length; i++) {
			uploader({
				file: files[i],
				name: new Date().getTime(),
				token: imgtoken,
				dir: "dev",
				callback: function(percent, result) {
					if(percent == 100) {
						console.log(percent)
						console.log(result.url)
						$("#cms-nurse-logo").attr('src', result.url)
					}

				}
			});
		}
	});

	/**
	 * 上传身份证正面
	 */
	var uploader = uploadJSSDK;
	$(".cms-positiveImg").on("change", function(e) {
		$("#cms-positiveImg-img").attr('src', "../images/jiazai0.gif")
		var files = e.target.files;
		for(var i = 0; i < files.length; i++) {
			uploader({
				file: files[i],
				name: new Date().getTime(),
				token: imgtoken,
				dir: "dev",
				callback: function(percent, result) {
					if(percent == 100) {
						console.log(percent)
						console.log(result.url)
						$("#cms-positiveImg-img").attr('src', result.url)
					}

				}
			});
		}
	});

	/**
	 * 上传身份证反面
	 */
	var uploader = uploadJSSDK;
	$(".cms-obverseImg").on("change", function(e) {
		$("#cms-obverseImg-img").attr('src', "../images/jiazai0.gif")
		var files = e.target.files;
		for(var i = 0; i < files.length; i++) {
			uploader({
				file: files[i],
				name: new Date().getTime(),
				token: imgtoken,
				dir: "dev",
				callback: function(percent, result) {
					if(percent == 100) {
						console.log(percent)
						console.log(result.url)
						$("#cms-obverseImg-img").attr('src', result.url)
					}

				}
			});
		}
	});

	/**
	 * 上传资格证
	 */
	var uploader = uploadJSSDK;
	$(".cms-licenseImg").on("change", function(e) {
		$("#cms-licenseImg-img").attr('src', "../images/jiazai0.gif")
		var files = e.target.files;
		for(var i = 0; i < files.length; i++) {
			uploader({
				file: files[i],
				name: new Date().getTime(),
				token: imgtoken,
				dir: "dev",
				callback: function(percent, result) {
					if(percent == 100) {
						console.log(percent)
						console.log(result.url)
						$("#cms-licenseImg-img").attr('src', result.url)
					}

				}
			});
		}
	});

});

function addNurse() {
	$.ajax({
		type: "post",
		url: urlx("admin/addNurse.action"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"name": $("#name").val(), //获取名字
			"mobile": $("#mobile").val(), //获取手机号
			"birthplace": $("#birthplace").val(), //获取籍贯
			"address": $("#address").val(), //获取地址
			"sex": $("#sex").val(), //获取性别
			"img": $("#cms-nurse-logo").attr("src"), //获取用户头像
			"introduction": $("#textarea1").val(), //获取介绍
			"dtype": $(".cms-time").val(), //获取服务时间类型
			"years": $("#years").val(), //获取工作年限
			"bank": $("#bank").val(), //获取开户行
			"area": $("#area").val(), //获取服务区域
			"sn": $("#sn").val(), //获取身份证号
			"card": $("#card").val(), //获取银行卡号
			"stype": $('.cms-nurse-type').val(), //获取服务类型
			"positiveImg": $("#cms-positiveImg-img").attr("src"), //获取身份证正面
			"obverseImg": $("#cms-obverseImg-img").attr("src"), //获取身份证反面
			"licenseImg": $("#cms-licenseImg-img").attr("src") //获取资格证图片
		},

		success: function(data) {
			console.log(data);
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					alert("添加成功")
					// location.reload()
					break;
				case '"A08405"':
					alert("已经注册")
					// location.reload()
					break;
				default:
					alert(data.msg)
					console.log("请求失败")
			}
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);

		}

	});
}