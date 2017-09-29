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

	localStorage.clear();

	//-----------------------------新增-------------------------------------	
	$(".add-activity").on("click", function() {

		//		var $goodid=getStr($("#type").val(),".")
		//		console.log($goodid)
		if($("#extra").val() === "") {
			alert("不能为空")
		} else {
			$.ajax({
				type: "get",
				 url:urlx("admin/addHealthItem.action"),
				async: true,
				headers: {
					"code": $.cookie("code"),
					"token": $.cookie("token")
				},
				dataType: "json",
				data: {
					"title": $("#extra").val(),
					"type": getStr($("#type").val(), ".")
				},
				success: function(data) {
					console.log(data)
					switch(JSON.stringify(data.code)) {
						case '"A00000"':
							alert("添加成功")
							location.reload()
							break;
						default:
							console.log("请求失败")

					}
				},

				error: function(XmlHttpRequest, textStatus, errorThrown) {
					console.log("请求失败" + XmlHttpRequest.responseText);
				}
			});
		}

	});

	/**
	 * 浏览
	 */
	var index1 = null;
	$.ajax({
		type: "get",
		 url:urlx("admin/healthItems.action"),
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
			console.log(data);
			//-------------------获取类型-------------------------------------
			$.ajax({
				type: "get",
				 url:urlx("common/healthTypes.action"),
				async: true,

				dataType: "json",

				success: function(data) {
					console.log(data)
					$.each(data.data, function(index) {
						var b = data.data[index].id;
						$option = ("<option goodid=" + b + ">" + data.data[index].id + "." + data.data[index].title + "</option>")
						//						$("#type").append($option)
						$(".select").append($option)
					})
				},

				error: function(XmlHttpRequest, textStatus, errorThrown) {
					console.log("请求失败" + XmlHttpRequest.responseText);
				}
			});

			$.each(data.data.objs, function(index) {
				var a = data.data.objs[index].id;
				var $tr = ("<tr>" +
					"<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
					"<td><input class='input1'  style='border: none;' type='text' value='" + data.data.objs[index].title + "' disabled='disabled'  /></td>" +
					//					"<td><textarea cols='50' rows='3' disabled='disabled'> " + data.data.objs[index].content + "</textarea></td>" +
					"<td>" +
					"<span class='span'>" + data.data.objs[index].type + "." + data.data.objs[index].label + "</span>" +
					"<select class='select' style='display: none;'>" +
					"<option>" + data.data.objs[index].type + "." + data.data.objs[index].label + "</option>" +

					"</select>" +
					"</td>" +
					"<td>" +
					"<span class='span1'>" + menutime(data.data.objs[index].state) + "</span>" +
					"<select class='select1' style='display: none;'>" +
					"<option>" + menutime(data.data.objs[index].state) + "</option>" +
					"<option>0.停用</option>" +
					"<option>1.启用</option>" +
					"</select>" +
					"</td>" +

					"<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
					"<td>" + formatDate(data.data.objs[index].updateTime) + "</td>" +
					"<td class='amend' >" +
					"<a class='a1'>修改</a>" +
					"<a class='a2'>保存</a>" +
					"</td></tr>");
				$("#tbody1").append($tr)
			});

			/**
			 * 点击事件
			 */
			$(".amend").on('click', function(e) {

				index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				console.log(index1)
				//alert("111")
				console.log($(this).parent().children("td").eq(6).children('a').eq(1))
				$(this).parent().children("td").eq(1).children('input').eq(0).attr("disabled", false)
				//-------------类型修改---------------
				$(this).parent().children("td").eq(2).children('select').eq(0).css("display", "block");
				$(this).parent().children("td").eq(2).children('span').eq(0).css("display", "none");
				//-------------状态---------------
				$(this).parent().children("td").eq(3).children('select').eq(0).css("display", "block");
				$(this).parent().children("td").eq(3).children('span').eq(0).css("display", "none");

				//-------------修改-----------
				$(this).parent().children("td").eq(6).children('a').eq(1).css("display", "block");
				$(this).parent().children("td").eq(6).children('a').eq(0).css("display", "none");
				
				

			});

			$(".a2").on("click", function(e) {
				/**
				 * 判断title是否为空
				 */
				//				console.log($(this).parents().children("td").eq(2).children('textarea').eq(0).val());
				//				console.log($(this).parents('tr').children("td").eq(3).children('select').eq(0).val().substring(0, 1))
				if($(this).parents('tr').children("td").eq(1).children('input').eq(0).val() == '') {
					$(this).parents('tr').children("td").eq(1).children('input').css('border', '1px solid red');
					return;
				} else {

					/**
					 * 修改名字
					 */
					$.ajax({
						type: "post",
						 url:urlx("admin/editHealthItem.action"),
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"id": $(this).parents('tr').children("td").eq(0).attr('goodid'),
							"title": $(this).parents('tr').children("td").eq(1).children('input').eq(0).val(),
							"type":getStr($(this).parents('tr').children("td").eq(2).children('select').eq(0).val(),".") 

						},
						success: function(data) {
							console.log(data)
							switch(JSON.stringify(data.code)) {
								case '"A00000"':
									swal('修改成功');

									$('.confirm').on('click', function() {
										location.reload();
									});
									// location.reload();
									break;
								default:
									console.log("请求失败");

							}
						},
						error: function(XmlHttpRequest, textStatus, errorThrown) {
							console.log("请求失败" + XmlHttpRequest.responseText);
						}
					});

					$.ajax({
						type: "post",
						 url:urlx("admin/handleHealthItem.action"),
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {

							"id": $(this).parents('tr').children("td").eq(0).attr('goodid'),
							"state": $(this).parents('tr').children("td").eq(3).children('select').eq(0).val().substring(0, 1)
						},
						success: function(data) {
							console.log(data)
							switch(JSON.stringify(data.code)) {
								case '"A00000"':
									swal('修改成功');

									$('.confirm').on('click', function() {
										location.reload();
									});
									break;
								default:
									console.log("请求失败")

							}
						},
						error: function(XmlHttpRequest, textStatus, errorThrown) {
							console.log("请求失败" + XmlHttpRequest.responseText);
						}
					});

				}

			});
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});

	//-------------------获取类型-------------------------------------
	$.ajax({
		type: "get",
		 url:urlx("common/healthTypes.action"),
		async: true,

		dataType: "json",

		success: function(data) {
			console.log(data)
			$.each(data.data, function(index) {
				var b = data.data[index].id;
				$option = ("<option goodid=" + b + ">" + data.data[index].id + "." + data.data[index].title + "</option>")
				$("#type").append($option)
				$(".select").append($option)
			})
		},

		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});
	//--------------------------字符串处理-------------------------------------
	function getStr(string, str) {
		var str_before = string.split(str)[0];
		var str_after = string.split(str)[1];

		return str_before
	}
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