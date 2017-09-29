/**
 * Created by HJJ on 2017/1/18.
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
/**
 *  读取cookie,添加到显示位置
 */

define(['jquery','cookie','bootstrap','sweetalert','jqueryTime','upfile'],function ($) {


// $(document).ready(function() {

	//-----------------------浏览菜品条目------------------------------------------
	$.ajax({
		type: "get",
		 url:urlx("admin/terms.action"),
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
			console.log(data)
			$.each(data.data.objs, function(index) {
				var a = data.data.objs[index].id
				//<!--4-->
				var $tr = ("<tr>" +
					"<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
					"<td><select  disabled='disabled'><option>" + active(data.data.objs[index].type) + "</option></td>" +
					"<td><img class='showImg' src='" + data.data.objs[index].img + "'/><input disabled class='file' type='file'  /></td>" +
					"<td><input disabled type='text' value='" + data.data.objs[index].price + "'/></td>" +
					"<td><input disabled type='text' value='" + data.data.objs[index].content + "'/></td>" +

					"<td><input disabled type='text' value='" + data.data.objs[index].title + "'/></td>" +

					"<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
					"<td>" + formatDate(data.data.objs[index].updateTime) + "</td>" +
					"<td class='amend' ><a  class='a1'>修改</a><a class='a2'>保存</a></td>" +
					"<td class='delete'><a data-toggle='modal' data-target='#myModalx' >删除</a></td>" +
					"</tr>")
				$("#tbody1").append($tr)
			});

			//-----------------------------------------验证阿里百川---------------------------------------
			$.ajax({
				type: "get",
//				url: "https://bzapi.honganjk.com/common/getToken.action",
                url:urla("common/getToken.action"),
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

			//-------------------上传图片--------------------------------------------------
			var uploader = uploadJSSDK;
			$(".file").on("change", function(e) {
				console.log($(this).parents('tr').children("td").eq(2).children('img').eq(0))
				var $img = $(this).parents('tr').children("td").eq(2).children('img').eq(0)
				$img.attr('src', "../images/jiazai0.gif")
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
								var low_url = result.url
								//									console.log(typeof(low_url))
								var arry_url = low_url.split("")
								console.log(arry_url)
								console.log(typeof(arry_url))
								arry_url.splice(4, 0, "s");
								var arry_url1 = arry_url
								console.log(arry_url1)
								var new_result = arry_url1.join("")
								console.log(new_result)
								$img.attr('src', new_result)
							}

						}
					});
				}
			})
			//---------------------------修改------------------------
			$(".amend").on('click', function(e) {
				//console.log($(this).parents().children("td").eq(1).children('select').eq(0).val())
				console.log($(this).parents('tr').children("td").eq(2).children('img').eq(0).attr("src"));

				index1 = $(this).parents('tr').children("td").eq(0).attr('goodid');
				console.log(index1);
				$(this).children("a").eq(0).css("display", "none");
				$(this).children("a").eq(1).css("display", "block");
				$(this).parent().children("td").eq(3).children('input').eq(0).attr("disabled", false)

				$(this).parent().children("td").eq(5).children('input').eq(0).attr("disabled", false)

				//									$(this).parent().children("td").eq(1).children('select').eq(0).attr("disabled", false)
				//									$(this).parent().children("td").eq(1).children('select').eq(0).css("border", "1px solid")

				$(this).parent().children("td").eq(4).children('input').eq(0).attr("disabled", false)
				//									$(this).parent().children("td").eq(4).children('select').eq(0).css("border", "1px solid")

				$(this).parent().children("td").eq(2).children('input').eq(0).css("display", "block");
				$(this).parent().children("td").eq(2).children('input').eq(0).attr("disabled", false);
			});

			//------------------------保存-----------------------------
			$(".a2").on("click", function(e) {
				//alert("11")
				var $str1 = $(this).parents().children("td").eq(1).children('select').eq(0).val().substring(0, 1)
				console.log($str1)
				console.log($(this).parents('tr').children("td").eq(2).children('img').eq(0).attr("src"))
				console.log($(this).parents('tr').children("td").eq(3).children('input').eq(0).val())

				console.log($(this).parents('tr').children("td").eq(5).children('input').eq(0).val())

				//console.log(window.imgurl)
				$.ajax({
					type: "post",
					 url:urlx("admin/editTerm.action"),
					headers: {
						"code": $.cookie("code"),
						"token": $.cookie("token")
					},
					dataType: "json",
					data: {
						"id": $(this).parents('tr').children("td").eq(0).attr('goodid'),

						"img": $(this).parents('tr').children("td").eq(2).children('img').eq(0).attr("src"),
						"price": $(this).parents('tr').children("td").eq(3).children('input').eq(0).val(),
						"content": $(this).parents('tr').children("td").eq(4).children('input').eq(0).val(),
						"title": $(this).parents('tr').children("td").eq(5).children('input').eq(0).val()

					},
					success: function(data) {
						console.log(data)
						switch(JSON.stringify(data.code)) {
							case '"A00000"':
								swal("修改成功");
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

			});

			//----------删除banner--------------------------------
			$(".delete").on("click", function() {
				index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				console.log(index1)
				$('.delete-activity').on('click', function() {

					$.ajax({
						type: "post",
						 url:urlx("admin/delTerm.action"),
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"id": index1
						},
						success: function(data) {
							console.log(data)
							switch(JSON.stringify(data.code)) {
								case '"A00000"':
									swal("删除成功")
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
				})
			})
			
			//----------------删除解绑---------------------------
			
			$(".delete").unbind("click", function() {
				index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				console.log(index1)
				$('.delete-activity').on('click', function() {

					$.ajax({
						type: "post",
						 url:urlx("admin/delTerm.action"),
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"id": index1
						},
						success: function(data) {
							console.log(data)
							switch(JSON.stringify(data.code)) {
								case '"A00000"':
									swal("删除成功")
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
				})
			})
			
		}
	});

	//-------------------上传图片--------------------------------------------------
	var uploader = uploadJSSDK;
	$(".upload-img-file").on("change", function(e) {
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
						console.log(percent)
						console.log(result.url)
						var low_url = result.url
						//									console.log(typeof(low_url))
						var arry_url = low_url.split("")
						console.log(arry_url)
						console.log(typeof(arry_url))
						arry_url.splice(4, 0, "s");
						var arry_url1 = arry_url
						console.log(arry_url1)
						var new_result = arry_url1.join("")
						console.log(new_result)
						$("#upload-img").attr('src', new_result)
					}

				}
			});
		}
	})
	//-------------------新增banner条目-----------------------------------------------------------------------
	$(".add-banner").on("click", function() {
		//            console.log($("#name2").val())
		$.ajax({
			type: "post",
			 url:urlx("admin/checkTerm.action"),
			async: true,
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			dataType: "json",
			data: {
				"type": $("#type").val().substring(0, 1)
			},
			success: function(data) {
				console.log(data.data)
				if(data.data == true) {
					alert("该类型护理方案已经存在，请重新选择其他类型")
				} else {
					$.ajax({
						type: "post",
						 url:urlx("admin/addTerm.action"),
						async: true,
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"type": $("#type").val().substring(0, 1),
							"img": $("#upload-img").attr("src"),
							"title": $("#title").val(),
							"price": $("#price").val(),
							"content": $("#content").val()
						},
						success: function(data) {
							console.log(data)
							switch(JSON.stringify(data.code)) {
								case '"A00000"':
									alert("新增成功")
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
			},

			error: function(XmlHttpRequest, textStatus, errorThrown) {
				console.log("请求失败" + XmlHttpRequest.responseText);

			}
		});
	})

	//-------------------------------活动类型转换------------------------------------
	function active(e) {
		switch(e) {

			case 1:
				return '1-全天项目'
				break;
			case 2:
				return '2-钟点项目'
				break;
				//							case 3:           //<!--10-->
				//								return '3-跳转商户'
				//								break;
		};
	};
	//-------------------------------平台类型转换-------------------------------------------------

	function terrace(e) {
		switch(e) {

			case 1:
				return '1-护工平台'
				break;
			case 2:
				return '2-用户APP'
				break;
			case 3:
				return '3-订餐商户平台'
				break;
		};
	};
	//---------------------时间戳-------------------------------------------
	function formatDate(data) {
		return $.myTime.UnixToDate(data, true, 8);
	}

	function banner(e) {
		switch(e) {

			case 1:
				return '1-首页'
				break;
			case 2:
				return '2-餐饮业务'
				break;
			case 3:
				return '3-护理业务'
				break;
		};
	};

	function formatDate(data) {
		return $.myTime.UnixToDate(data, true, 8);
	}

// });

});