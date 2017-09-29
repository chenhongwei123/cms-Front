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
 服务技能管理脚本
 */

define(["jquery", "cookie", "sweetalert", "jqueryTime", "bootstrap"], function($) {

	// });

	localStorage.clear();

	/**
	 * 添加服务技能弹出框
	 */
	//-----------------------------新增-------------------------------------	
	$(".add-activity").on("click", function() {
		//		if($("#extra").val() === "") {
		//			alert("不能为空")
		//		} else {
		$.ajax({
			type: "post",
			//url: "http://bjpsc.honganjk.com/admin/addKind.json",
			url: urlb("admin/addSupply.json"),
			async: true,
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			dataType: "json",
			data: {
				"name": $("#extra").val(),
				"icon": $("#upload-img").attr("src"),
				"contact": $("#sort").val(),

			},
			success: function(data) {
				//console.log(data)
				switch(JSON.stringify(data.code)) {
					case '"A00000"':
						alert("添加成功")
						location.reload()
						break;
					default:
						alert(data.msg)
						//console.log("请求失败")
				}
			},
			error: function(XmlHttpRequest, textStatus, errorThrown) {
				//console.log("请求失败" + XmlHttpRequest.responseText);
			}
		});
		//}

	});
	//-----------------------------------------验证阿里百川---------------------------------------
	$.ajax({
		type: "get",
		//				url: "https://bzapi.honganjk.com/common/getToken.action",
		url: urla("common/getToken.action"),
		data: {
			"key": "23384196",
			"secret": "7b484f801524af3bb7f6abb0dbe63459",
			"namespace": "hajk",
		},
		dataType: "json",
		success: function(data) {
			//console.log(data)
			window.imgtoken = data.data;
			//console.log(imgtoken);
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			//console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});
	/**
	 * 浏览
	 */
	var index1 = null;
	$.ajax({
		type: "post",

		//url:"http://bjpsc.honganjk.com/admin/brands.json",
		url: urlb("admin/supplys.json"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"start": 0,
			"size": 100
		},
		success: function(data) {
			//console.log(data);
			$.each(data.data.objs, function(index) {
				var a = data.data.objs[index].id;
				var $tr = ("<tr>" +
					"<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +

					"<td><input class='input1'  style='border: none;' type='text' value='" + data.data.objs[index].feature + "' disabled='disabled'  /></td>" +

					"<td>" +
					"<span class='span1'>" + menutime(data.data.objs[index].state) + "</span>" +
					"<select class='select1' style='display: none;'>" +
					"<option>" + menutime(data.data.objs[index].state) + "</option>" +
					"<option>0.停用</option>" +
					"<option>1.启用</option>" +
					"</select>" +
					"</td>" +

					"<td><input style='border: none;' type='text' value='" + data.data.objs[index].contact + "' disabled='disabled'  /></td>" +

					"<td><img style='width:100px;height: 100px' src='" + data.data.objs[index].icon + "'><input class='file' style='display:none' type='file'/></td>" +

					"<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +

					"<td>" + formatDate(data.data.objs[index].updateTime) + "</td>" +

					"<td class='amend' >" +
					"<a class='a1'>修改</a>" +
					"<a class='a2'>保存</a>" +
					"</td></tr>");
				$("#tbody1").append($tr)
			});

			//-------------------上传图片--------------------------------------------------
			var uploader = uploadJSSDK;
			$(".file").on("change", function(e) {
				//console.log($(this).parents('tr').children("td").eq(4).children('img').eq(0));
				var $img = $(this).parents('tr').children("td").eq(4).children('img').eq(0);
				$img.attr('src', "../images/jiazai0.gif");
				var files = e.target.files;
				for(var i = 0; i < files.length; i++) {
					uploader({
						file: files[i],
						name: new Date().getTime(),
						token: imgtoken,
						dir: "dev",
						callback: function(percent, result) {
							if(percent == 100) {
								//console.log(percent)
								//console.log(result.url)
								window.imgurl = result.url;
								//console.log($img)
								var now_url = result.url
								var new_url = now_url.replace('http', 'https')
								//console.log(new_url)
								$img.attr('src', new_url)
							}

						}
					});
				}
			})
			/**
			 * 点击事件
			 */
			$(".amend").on('click', function(e) {

				index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				//console.log(index1)

				//--------------名字-----------------

				$(this).parent().children("td").eq(1).children('input').eq(0).attr("disabled", false)

				//-------------状态---------------
				$(this).parent().children("td").eq(2).children('select').eq(0).css("display", "block");
				$(this).parent().children("td").eq(2).children('span').eq(0).css("display", "none");

				//--------------电话-----------------
				$(this).parent().children("td").eq(3).children('input').eq(0).attr("disabled", false)

				//-------------图标---------------
				$(this).parent().children("td").eq(4).children('input').eq(0).css("display", "block");
				//				
				//-------------修改-----------
				$(this).parent().children("td").eq(7).children('a').eq(1).css("display", "block");
				$(this).parent().children("td").eq(7).children('a').eq(0).css("display", "none");

			});

			$(".a2").on("click", function(e) {
				/**
				 * 判断title是否为空
				 */
				//				//console.log($(this).parents().children("td").eq(2).children('textarea').eq(0).val());
				//				//console.log($(this).parents('tr').children("td").eq(3).children('select').eq(0).val().substring(0, 1))
				if($(this).parents('tr').children("td").eq(1).children('input').eq(0).val() == '') {
					$(this).parents('tr').children("td").eq(1).children('input').css('border', '1px solid red');
					return;
				} else {

					/**
					 * 修改名字
					 */
					$.ajax({
						type: "post",
						//url: "http://bjpsc.honganjk.com/admin/editBrand.json",
						url: urlb("admin/editSupply.json"),
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"id": $(this).parents('tr').children("td").eq(0).attr('goodid'),
							"name": $(this).parents('tr').children("td").eq(1).children('input').eq(0).val(),
							"contact": $(this).parents('tr').children("td").eq(3).children('input').eq(0).val(),
							"icon": $(this).parents('tr').children("td").eq(4).children('img').eq(0).attr("src")
						},
						success: function(data) {
							//console.log(data)
							switch(JSON.stringify(data.code)) {
								case '"A00000"':
									swal('修改成功');

									$('.confirm').on('click', function() {
										location.reload();
									});
									// location.reload();
									break;
								default:
									//console.log("请求失败");

							}
						},
						error: function(XmlHttpRequest, textStatus, errorThrown) {
							//console.log("请求失败" + XmlHttpRequest.responseText);
						}
					});
					/**
					 * 修改是否启用
					 */
					//console.log($(this).parents('tr').children("td").eq(2).children('select').eq(0).val().substring(0, 1))
					$.ajax({
						type: "post",
						//url: "http://bjpsc.honganjk.com/admin/handleBrand.json",
						url: urlb("admin/handleSupply.json"),
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {

							"id": $(this).parents('tr').children("td").eq(0).attr('goodid'),
							"state": $(this).parents('tr').children("td").eq(2).children('select').eq(0).val().substring(0, 1)
						},
						success: function(data) {
							//console.log(data)
							switch(JSON.stringify(data.code)) {
								case '"A00000"':
									swal('修改成功');

									$('.confirm').on('click', function() {
										location.reload();
									});
									break;
								default:
									//console.log("请求失败")

							}
						},
						error: function(XmlHttpRequest, textStatus, errorThrown) {
							//console.log("请求失败" + XmlHttpRequest.responseText);
						}
					});

				}

			});
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			//console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});
	//-------------------上传图片--------------------------------------------------
	var uploader = uploadJSSDK;
	$(".file1").on("change", function(e) {
		$("#upload-img").attr('src', "../images/jiazai0.gif")
		var files = e.target.files;
		for(var i = 0; i < files.length; i++) {
			uploader({
				file: files[i],
				name: new Date().getTime(),
				token: imgtoken,
				dir: "dev",
				callback: function(percent, result) {
					if(percent == 100) {
						//						//console.log(percent)
						//						//console.log(result.url)
						var now_url = result.url
						var new_url = now_url.replace('http', 'https')
						//console.log(new_url)
						$("#upload-img").attr('src', new_url)
					}

				}
			});
		}
	})
	/**
	 * 类型转换
	 */
	function menutime(e) {
		switch(e) {
			case 0:
				return '0.停用'
				break;
			case 1:
				return '1.启用'
				break;
		};
	};

	/**
	 * 时间戳
	 */
	function formatDate(data) {
		return $.myTime.UnixToDate(data, true, 8);
	}

	// });
	//-------------------------------活动类型转换------------------------------------
	function active(e) {
		switch(e) {

			case 1:
				return '1-护工';
				break;

			case 2:
				return '2-康复师';
				break;

		};
	};
});