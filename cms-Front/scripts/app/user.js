/**
 * Created by HJJ on 2017/1/9.
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

define(['jquery', 'cookie', 'bootstrap', 'jqueryTime', 'remodal', 'upfile'], function($) {

	// $(document).ready(function () {

	var $tr = null;
	var $tr2 = null;
	var $tr3 = null;
	$.ajax({
		type: "get",
		 url:urlx("admin/users.action"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},

		dataType: "json",

		data: {
			"start": 0,
			"size": 10
		},
		success: function(data) {
			console.log(data)
			$.each(data.data.objs, function(index) {
				var a = data.data.objs[index].id
				var $tr = ("<tr>" +
					"<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
					"<td>" + data.data.objs[index].name + "</td>" +
					"<td>" + data.data.objs[index].account + "</td>" +
					"<td><img id='flexible-img' src='" + data.data.objs[index].img + "'/></td>" +
					"<td>" + data.data.objs[index].balance + "</td>" +
					"<td>" + data.data.objs[index].mobile + " </td>" +
					"<td>" + data.data.objs[index].create_time + "</td>" +
					"<td>" + data.data.objs[index].update_time + "</td>" +
					"<td>" + related(data.data.objs[index].related) + "</td>" +
					"<td class='ax'> <button type='button' class='btn btn-sm btn-success' data-toggle='modal' data-target='#myModal'>充值</button></td>" +
					"<td><a class='a1' href='#modalx'>详情</a></td>" +
					"<td><a class='a2 a2-user' href='#modaly'>详情</a></td>" +
					"<td><a class='a4' href='#'>去下单</a></td>" +
					"</tr>")
				$("#tbody1").append($tr)

			});
			//-------------------------------------收货地址详情---------------------------------------------
			$(".a1").on("click", function() {
				$("#tbody2").empty($tr2)
				var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				console.log(index1)
				// $("#cover").addClass("cover1")
				// $("#box").css("display","block")

				$.ajax({
					type: "get",
					 url:urlx("admin/addrs.action"),
					async: true,
					headers: {
						"code": $.cookie("code"),
						"token": $.cookie("token")
					},
					dataType: "json",
					data: {
						"uid": index1,
					},
					success: function(data) {
						console.log(data)
						$.each(data.data, function(index) {
							var $tr2 = ("<tr>" +
								"<td>" + data.data[index].id + "</td>" +
								"<td>" + data.data[index].name + "</td>" +
								"<td>" + sex(data.data[index].sex) + "</td>" +
								"<td>" + data.data[index].contact + "</td>" +
								"<td>" + data.data[index].longitude + "</td>" +
								"<td>" + data.data[index].latitude + "</td>" +
								"<td>" + data.data[index].address + "</td>" +
								"<td>" + data.data[index].createTime + "</td>" +
								"</tr>")
							$("#tbody2").append($tr2)
						})
					}
				});
			})
			//-------------------------------------收藏商户详情---------------------------------------------
			$(".a2").on("click", function() {
				$("#tbody3").empty($tr3)
				var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				console.log(index1)
				// $("#cover").addClass("cover1")
				// $("#box1").css("display","block")

				$.ajax({
					type: "get",
					 url:urlx("admin/keeps.action"),
					async: true,
					headers: {
						"code": $.cookie("code"),
						"token": $.cookie("token")
					},
					dataType: "json",
					data: {
						"uid": index1,
					},
					success: function(data) {
						console.log(data)
						$.each(data.data, function(index) {
							var $tr3 = ("<tr>" +
								"<td>" + data.data[index].id + "</td>" +
								"<td>" + data.data[index].name + "</td>" +
								"<td>" + data.data[index].distance + "</td>" +
								"<td><img id='flexible-img' src='" + data.data[index].img + "'></td>" +
								"<td>" + data.data[index].score + "</td>" +
								"<td>" + data.data[index].type + "</td>" +
								"<td>" + data.data[index].rank + "</td>" +
								"<td>" + data.data[index].sale + "</td>" +
								"<td>" + data.data[index].time + "</td>" +
								"<td>" + data.data[index].latitude + "</td>" +
								"<td>" + data.data[index].longitude + "</td>" +
								"<td>" + data.data[index].lowest + "</td>" +
								"<td>" + data.data[index].fare + "</td>" +
								"</tr>")
							$("#tbody3").append($tr3)
						})
					}
				});
			})
			//-----------------------------用户充值-------------------------------------	
			$(".ax").on("click", function() {
				var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				console.log(index1)

				$(".add-activity").unbind('click').on("click", function() {
					$.ajax({
						type: "get",
						 url:urlx("admin/userBalance.action"),
						async: true,
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"uid": index1,
							"amount": $("#reality").val()

						},
						success: function(data) {
							console.log(data)
							switch(JSON.stringify(data.code)) {
								case '"A00000"':
									alert("充值成功")
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
				});
			})
			//-------------------模拟下单------------------------------
			$(".a4").on("click", function() {
				var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				var account = $(this).parents('tr').children("td").eq(2).html()

				var uid = '{"id":"' + index1 + '","account":"' + account + '"}'
				localStorage.setItem("uid", uid)

				window.location.href = "simulation.html"
			})
			//------------------------------------------------------
			$("#PrevPage").attr("disabled", true);
			$("#NextPage").attr("disabled", true);
			//                console.log(dishselect)
			if(JSON.stringify(data.data.total) < 10) {
				$("#NextPage").attr("disabled", true);
			} else {
				$("#NextPage").removeAttr("disabled");
			}
		}
	});

	//---------------------------------------------------列表分页----------------------------------------------
	if($("#dishpageval").val() == 0) {
		//	      			console.log("0")
		$("#PrevPage").attr("disabled", true);
	} //菜品列表分页相关

	$("#NextPage").click(function() {
		$("#tbody1").empty($tr)
		$("#PrevPage").removeAttr("disabled");
		var dishstart = ($("#dishpageval").val() - 0) + 10;
		$.ajax({
			type: "get",
			 url:urlx("admin/users.action"),
			data: {

				"start": dishstart,
				"size": 10
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {

				$.each(data.data.objs, function(index) {
					var a = data.data.objs[index].id
					var $tr = ("<tr>" +
						"<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
						"<td>" + data.data.objs[index].name + "</td>" +
						"<td>" + data.data.objs[index].account + "</td>" +
						"<td><img id='flexible-img' src='" + data.data.objs[index].img + "'/></td>" +
						"<td>" + data.data.objs[index].balance + "</td>" +
						"<td>" + data.data.objs[index].mobile + "</td>" +
						"<td>" + data.data.objs[index].create_time + "</td>" +
						"<td>" + data.data.objs[index].update_time + "</td>" +
						"<td>" + related(data.data.objs[index].related) + "</td>" +
						"<td class='ax'> <button type='button' class='btn btn-sm btn-success' data-toggle='modal' data-target='#myModal'>充值</button></td>" +
						"<td><a class='a1' href='#modalx'>详情</a></td>" +
						"<td><a class='a2 a2-user' href='#modaly'>详情</a></td>" +
						"<td><a class='a4' href='#'>去下单</a></td>" +
						"</tr>")
					$("#tbody1").append($tr)

				});
				//-------------------------------------收货地址详情---------------------------------------------
				$(".a1").on("click", function() {
					$("#tbody2").empty($tr2)
					var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
					console.log(index1)
					//					$("#cover").addClass("cover1")
					//					$("#box").css("display", "block")

					$.ajax({
						type: "get",
						 url:urlx("admin/addrs.action"),
						async: true,
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"uid": index1,
						},
						success: function(data) {
							console.log(data)
							$.each(data.data, function(index) {
								var $tr2 = ("<tr>" +
									"<td>" + data.data[index].id + "</td>" +
									"<td>" + data.data[index].name + "</td>" +
									"<td>" + sex(data.data[index].sex) + "</td>" +
									"<td>" + data.data[index].contact + "</td>" +
									"<td>" + data.data[index].longitude + "</td>" +
									"<td>" + data.data[index].latitude + "</td>" +
									"<td>" + data.data[index].address + "</td>" +
									"<td>" + data.data[index].createTime + "</td>" +
									"</tr>")
								$("#tbody2").append($tr2)
							})
						}
					});
				})
				//-------------------------------------收藏商户详情---------------------------------------------
				$(".a2-user").on("click", function() {
					$("#tbody3").empty($tr3)
					var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
					console.log(index1)
					//					$("#cover").addClass("cover1")
					//					$("#box1").css("display", "block")

					$.ajax({
						type: "get",
						 url:urlx("admin/keeps.action"),
						async: true,
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"uid": index1,
						},
						success: function(data) {
							console.log(data)
							$.each(data.data, function(index) {
								var $tr3 = ("<tr>" +
									"<td>" + data.data[index].id + "</td>" +
									"<td>" + data.data[index].name + "</td>" +
									"<td>" + data.data[index].distance + "</td>" +
									"<td><img id='flexible-img' src='" + data.data[index].img + "'></td>" +
									"<td>" + data.data[index].score + "</td>" +
									"<td>" + data.data[index].type + "</td>" +
									"<td>" + data.data[index].rank + "</td>" +
									"<td>" + data.data[index].sale + "</td>" +
									"<td>" + data.data[index].time + "</td>" +
									"<td>" + data.data[index].latitude + "</td>" +
									"<td>" + data.data[index].longitude + "</td>" +
									"<td>" + data.data[index].lowest + "</td>" +
									"<td>" + data.data[index].fare + "</td>" +
									"</tr>")
								$("#tbody3").append($tr3)
							})
						}
					});
				})
				//-----------------------------用户充值-------------------------------------	
				$(".ax").on("click", function() {
					var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
					console.log(index1)

					$(".add-activity").unbind('click').on("click", function() {
						$.ajax({
							type: "get",
							 url:urlx("admin/userBalance.action"),
							async: true,
							headers: {
								"code": $.cookie("code"),
								"token": $.cookie("token")
							},
							dataType: "json",
							data: {
								"uid": index1,
								"amount": $("#reality").val()

							},
							success: function(data) {
								console.log(data)
								switch(JSON.stringify(data.code)) {
									case '"A00000"':
										alert("充值成功")
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
					});
				})
				//-------------------模拟下单------------------------------
				$(".a4").on("click", function() {
					var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
					var account = $(this).parents('tr').children("td").eq(2).html()

					var uid = '{"id":"' + index1 + '","account":"' + account + '"}'
					localStorage.setItem("uid", uid)

					window.location.href = "simulation.html"
				})

				$("#dishpageval").val(dishstart);
				$("#change1").text($("#dishpageval").val() / 10 + 1)

				if(JSON.stringify(data.data.total) - 10 <= $("#dishpageval").val()) {
					$("#NextPage").attr('disabled', true);
				}
			},
			error: function(XmlHttpRequest, textStatus, errorThrown) {
				console.log("请求失败" + XmlHttpRequest.responseText);
			}
		});
	}); //下一页

	$("#PrevPage").click(function() {
		$("#tbody1").empty($tr)

		var dishstart = $("#dishpageval").val() - 10;
		$("#NextPage").removeAttr("disabled");
		if(dishstart < 0) {
			return dishstart = 0;
		}
		$.ajax({
			type: "get",
			 url:urlx("admin/users.action"),
			data: {

				"start": dishstart,
				"size": 10
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				$.each(data.data.objs, function(index) {
					var a = data.data.objs[index].id
					var $tr = ("<tr>" +
						"<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
						"<td>" + data.data.objs[index].name + "</td>" +
						"<td>" + data.data.objs[index].account + "</td>" +
						"<td><img id='flexible-img' src='" + data.data.objs[index].img + "'/></td>" +
						"<td>" + data.data.objs[index].balance + "</td>" +
						"<td>" + data.data.objs[index].mobile + "</td>" +
						"<td>" + data.data.objs[index].create_time + "</td>" +
						"<td>" + data.data.objs[index].update_time + "</td>" +
						"<td>" + related(data.data.objs[index].related) + "</td>" +
						"<td class='ax'> <button type='button' class='btn btn-sm btn-success' data-toggle='modal' data-target='#myModal'>充值</button></td>" +
						"<td><a class='a1' href='#modalx'>详情</a></td>" +
						"<td><a class='a2 a2-user' href='#modaly'>详情</a></td>" +
						"<td><a class='a4' href='#'>去下单</a></td>" +
						"</tr>")
					$("#tbody1").append($tr)

				});
				//-------------------------------------收货地址详情---------------------------------------------
				$(".a1").on("click", function() {
					$("#tbody2").empty($tr2)
					var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
					console.log(index1)
					//					$("#cover").addClass("cover1")
					//					$("#box").css("display", "block")

					$.ajax({
						type: "get",
						 url:urlx("admin/addrs.action"),
						async: true,
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"uid": index1,
						},
						success: function(data) {
							console.log(data)
							$.each(data.data, function(index) {
								var $tr2 = ("<tr>" +
									"<td>" + data.data[index].id + "</td>" +
									"<td>" + data.data[index].name + "</td>" +
									"<td>" + sex(data.data[index].sex) + "</td>" +
									"<td>" + data.data[index].contact + "</td>" +
									"<td>" + data.data[index].longitude + "</td>" +
									"<td>" + data.data[index].latitude + "</td>" +
									"<td>" + data.data[index].address + "</td>" +
									"<td>" + data.data[index].createTime + "</td>" +
									"</tr>")
								$("#tbody2").append($tr2)
							})
						}
					});
				})
				//-------------------------------------收藏商户详情---------------------------------------------
				$(".a2-user").on("click", function() {
					$("#tbody3").empty($tr3)
					var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
					console.log(index1)
					//					$("#cover").addClass("cover1")
					//					$("#box1").css("display", "block")

					$.ajax({
						type: "get",
						 url:urlx("admin/keeps.action"),
						async: true,
						headers: {
							"code": $.cookie("code"),
							"token": $.cookie("token")
						},
						dataType: "json",
						data: {
							"uid": index1,
						},
						success: function(data) {
							console.log(data)
							$.each(data.data, function(index) {
								var $tr3 = ("<tr>" +
									"<td>" + data.data[index].id + "</td>" +
									"<td>" + data.data[index].name + "</td>" +
									"<td>" + data.data[index].distance + "</td>" +
									"<td><img id='flexible-img' src='" + data.data[index].img + "'></td>" +
									"<td>" + data.data[index].score + "</td>" +
									"<td>" + data.data[index].type + "</td>" +
									"<td>" + data.data[index].rank + "</td>" +
									"<td>" + data.data[index].sale + "</td>" +
									"<td>" + data.data[index].time + "</td>" +
									"<td>" + data.data[index].latitude + "</td>" +
									"<td>" + data.data[index].longitude + "</td>" +
									"<td>" + data.data[index].lowest + "</td>" +
									"<td>" + data.data[index].fare + "</td>" +
									"</tr>")
								$("#tbody3").append($tr3)
							})
						}
					});
				})
				//-----------------------------用户充值-------------------------------------	
				$(".ax").on("click", function() {
					var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
					console.log(index1)

					$(".add-activity").unbind('click').on("click", function() {
						$.ajax({
							type: "get",
							 url:urlx("admin/userBalance.action"),
							async: true,
							headers: {
								"code": $.cookie("code"),
								"token": $.cookie("token")
							},
							dataType: "json",
							data: {
								"uid": index1,
								"amount": $("#reality").val()

							},
							success: function(data) {
								console.log(data)
								switch(JSON.stringify(data.code)) {
									case '"A00000"':
										alert("充值成功")
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
					});
				})

				//-------------------模拟下单------------------------------
				$(".a4").on("click", function() {
					var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
					var account = $(this).parents('tr').children("td").eq(2).html()

					var uid = '{"id":"' + index1 + '","account":"' + account + '"}'
					localStorage.setItem("uid", uid)

					window.location.href = "simulation.html"
				})
				$("#dishpageval").val(dishstart);
				$("#change1").text($("#dishpageval").val() / 10 + 1)
				if(dishstart == 0) {
					$("#PrevPage").attr("disabled", true);
				}
			},
			error: function(XmlHttpRequest, textStatus, errorThrown) {
				console.log("请求失败" + XmlHttpRequest.responseText);
			}
		});
	}); //上一页

	//----------------------------搜索-------------------------------------------------

	$("#searchOrder").on("click", function() {
		//              	$("#dishpageval").val(0);
		$("#Paging").css("display", "none")
		$("#tbody1").empty($tr)
		$("#change1").text(1)
		if($(".select1").val() == "通过昵称搜索") {
			//alert("111")
			$.ajax({
				type: "get",
				 url:urlx("admin/users.action"),
				data: {
					"start": 0,
					"size": 1000,
					"name": $(".wd").val(),
				},
				dataType: "json",
				headers: {
					"code": $.cookie("code"),
					"token": $.cookie("token")
				},
				success: function(data) {
					console.log(data)
					$.each(data.data.objs, function(index) {
						var a = data.data.objs[index].id
						var $tr = ("<tr>" +
							"<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
							"<td>" + data.data.objs[index].name + "</td>" +
							"<td>" + data.data.objs[index].account + "</td>" +
							"<td><img id='flexible-img' src='" + data.data.objs[index].img + "'/></td>" +
							"<td>" + data.data.objs[index].balance + "</td>" +
							"<td>" + data.data.objs[index].mobile + "</td>" +
							"<td>" + data.data.objs[index].create_time + "</td>" +
							"<td>" + data.data.objs[index].update_time + "</td>" +
							"<td>" + related(data.data.objs[index].related) + "</td>" +
							"<td class='ax'> <button type='button' class='btn btn-sm btn-success' data-toggle='modal' data-target='#myModal'>充值</button></td>" +
							"<td><a class='a1' href='#modalx'>详情</a></td>" +
							"<td><a class='a2 a2-user' href='#modaly'>详情</a></td>" +
							"<td><a class='a4' href='#'>去下单</a></td>" +
							"</tr>")
						$("#tbody1").append($tr)

					});
					//-------------------------------------收货地址详情---------------------------------------------
					$(".a1").on("click", function() {
						$("#tbody2").empty($tr2)
						var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
						console.log(index1)
						//						$("#cover").addClass("cover1")
						//						$("#box").css("display", "block")

						$.ajax({
							type: "get",
							 url:urlx("admin/addrs.action"),
							async: true,
							headers: {
								"code": $.cookie("code"),
								"token": $.cookie("token")
							},
							dataType: "json",
							data: {
								"uid": index1,
							},
							success: function(data) {
								console.log(data)
								$.each(data.data, function(index) {
									var $tr2 = ("<tr>" +
										"<td>" + data.data[index].id + "</td>" +
										"<td>" + data.data[index].name + "</td>" +
										"<td>" + sex(data.data[index].sex) + "</td>" +
										"<td>" + data.data[index].contact + "</td>" +
										"<td>" + data.data[index].longitude + "</td>" +
										"<td>" + data.data[index].latitude + "</td>" +
										"<td>" + data.data[index].address + "</td>" +
										"<td>" + data.data[index].createTime + "</td>" +
										"</tr>")
									$("#tbody2").append($tr2)
								})
							}
						});
					})
					//-------------------------------------收藏商户详情---------------------------------------------
					$(".a2-user").on("click", function() {
						$("#tbody3").empty($tr3)
						var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
						console.log(index1)
						//						$("#cover").addClass("cover1")
						//						$("#box1").css("display", "block")

						$.ajax({
							type: "get",
							 url:urlx("admin/keeps.action"),
							async: true,
							headers: {
								"code": $.cookie("code"),
								"token": $.cookie("token")
							},
							dataType: "json",
							data: {
								"uid": index1,
							},
							success: function(data) {
								console.log(data)
								$.each(data.data, function(index) {
									var $tr3 = ("<tr>" +
										"<td>" + data.data[index].id + "</td>" +
										"<td>" + data.data[index].name + "</td>" +
										"<td>" + data.data[index].distance + "</td>" +
										"<td><img id='flexible-img' src='" + data.data[index].img + "'></td>" +
										"<td>" + data.data[index].score + "</td>" +
										"<td>" + data.data[index].type + "</td>" +
										"<td>" + data.data[index].rank + "</td>" +
										"<td>" + data.data[index].sale + "</td>" +
										"<td>" + data.data[index].time + "</td>" +
										"<td>" + data.data[index].latitude + "</td>" +
										"<td>" + data.data[index].longitude + "</td>" +
										"<td>" + data.data[index].lowest + "</td>" +
										"<td>" + data.data[index].fare + "</td>" +
										"</tr>")
									$("#tbody3").append($tr3)
								})
							}
						});
					})
					//-----------------------------用户充值-------------------------------------	
					$(".ax").on("click", function() {
						var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
						console.log(index1)

						$(".add-activity").unbind('click').on("click", function() {
							$.ajax({
								type: "get",
								 url:urlx("admin/userBalance.action"),
								async: true,
								headers: {
									"code": $.cookie("code"),
									"token": $.cookie("token")
								},
								dataType: "json",
								data: {
									"uid": index1,
									"amount": $("#reality").val()

								},
								success: function(data) {
									console.log(data)
									switch(JSON.stringify(data.code)) {
										case '"A00000"':
											alert("充值成功")
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
						});
					})
					//-------------------模拟下单------------------------------
					$(".a4").on("click", function() {
						var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
						var account = $(this).parents('tr').children("td").eq(2).html()

						var uid = '{"id":"' + index1 + '","account":"' + account + '"}'
						localStorage.setItem("uid", uid)

						window.location.href = "simulation.html"
					})

					$("#PrevPage").attr("disabled", true);
					$("#NextPage").attr("disabled", true);

					if(JSON.stringify(data.data.total) < 10) {
						$("#NextPage").attr("disabled", true);
					} else {
						$("#NextPage").removeAttr("disabled");
					}
				},
				error: function(XmlHttpRequest, textStatus, errorThrown) {
					console.log("请求失败" + XmlHttpRequest.responseText);
				}
			});
		} else {
			$.ajax({
				type: "get",
				 url:urlx("admin/users.action"),
				data: {
					"start": 0,
					"size": 1000,
					"mobile": $(".wd").val(),
				},
				dataType: "json",
				headers: {
					"code": $.cookie("code"),
					"token": $.cookie("token")
				},
				success: function(data) {
					console.log(data)
					$.each(data.data.objs, function(index) {
						var a = data.data.objs[index].id
						var $tr = ("<tr>" +
							"<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
							"<td>" + data.data.objs[index].name + "</td>" +
							"<td>" + data.data.objs[index].account + "</td>" +
							"<td><img id='flexible-img' src='" + data.data.objs[index].img + "'/></td>" +
							"<td>" + data.data.objs[index].balance + "</td>" +
							"<td>" + data.data.objs[index].mobile + "</td>" +
							"<td>" + data.data.objs[index].create_time + "</td>" +
							"<td>" + data.data.objs[index].update_time + "</td>" +
							"<td>" + related(data.data.objs[index].related) + "</td>" +
							"<td class='ax'> <button type='button' class='btn btn-sm btn-success' data-toggle='modal' data-target='#myModal'>充值</button></td>" +
							"<td><a class='a1' href='#modalx'>详情</a></td>" +
							"<td><a class='a2 a2-user' href='#modaly'>详情</a></td>" +
							"<td><a class='a4' href='#'>去下单</a></td>" +
							"</tr>")
						$("#tbody1").append($tr)

					});
					//-------------------------------------收货地址详情---------------------------------------------
					$(".a1").on("click", function() {
						$("#tbody2").empty($tr2)
						var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
						console.log(index1)
						//						$("#cover").addClass("cover1")
						//						$("#box").css("display", "block")

						$.ajax({
							type: "get",
							 url:urlx("admin/addrs.action"),
							async: true,
							headers: {
								"code": $.cookie("code"),
								"token": $.cookie("token")
							},
							dataType: "json",
							data: {
								"uid": index1,
							},
							success: function(data) {
								console.log(data)
								$.each(data.data, function(index) {
									var $tr2 = ("<tr>" +
										"<td>" + data.data[index].id + "</td>" +
										"<td>" + data.data[index].name + "</td>" +
										"<td>" + sex(data.data[index].sex) + "</td>" +
										"<td>" + data.data[index].contact + "</td>" +
										"<td>" + data.data[index].longitude + "</td>" +
										"<td>" + data.data[index].latitude + "</td>" +
										"<td>" + data.data[index].address + "</td>" +
										"<td>" + data.data[index].createTime + "</td>" +
										"</tr>")
									$("#tbody2").append($tr2)
								})
							}
						});
					})
					//-------------------------------------收藏商户详情---------------------------------------------
					$(".a2-user").on("click", function() {
						$("#tbody3").empty($tr3)
						var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
						console.log(index1)
						//						$("#cover").addClass("cover1")
						//						$("#box1").css("display", "block")

						$.ajax({
							type: "get",
							 url:urlx("admin/keeps.action"),
							async: true,
							headers: {
								"code": $.cookie("code"),
								"token": $.cookie("token")
							},
							dataType: "json",
							data: {
								"uid": index1,
							},
							success: function(data) {
								console.log(data)
								$.each(data.data, function(index) {
									var $tr3 = ("<tr>" +
										"<td>" + data.data[index].id + "</td>" +
										"<td>" + data.data[index].name + "</td>" +
										"<td>" + data.data[index].distance + "</td>" +
										"<td><img id='flexible-img' src='" + data.data[index].img + "'></td>" +
										"<td>" + data.data[index].score + "</td>" +
										"<td>" + data.data[index].type + "</td>" +
										"<td>" + data.data[index].rank + "</td>" +
										"<td>" + data.data[index].sale + "</td>" +
										"<td>" + data.data[index].time + "</td>" +
										"<td>" + data.data[index].latitude + "</td>" +
										"<td>" + data.data[index].longitude + "</td>" +
										"<td>" + data.data[index].lowest + "</td>" +
										"<td>" + data.data[index].fare + "</td>" +
										"</tr>")
									$("#tbody3").append($tr3)
								})
							}
						});
					})
					//-----------------------------用户充值-------------------------------------	
					$(".ax").on("click", function() {
						var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
						console.log(index1)

						$(".add-activity").unbind('click').on("click", function() {
							$.ajax({
								type: "get",
								 url:urlx("admin/userBalance.action"),
								async: true,
								headers: {
									"code": $.cookie("code"),
									"token": $.cookie("token")
								},
								dataType: "json",
								data: {
									"uid": index1,
									"amount": $("#reality").val()

								},
								success: function(data) {
									console.log(data)
									switch(JSON.stringify(data.code)) {
										case '"A00000"':
											alert("充值成功")
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
						});
					})
					//-------------------模拟下单------------------------------
					$(".a4").on("click", function() {
						var index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
						var account = $(this).parents('tr').children("td").eq(2).html()

						var uid = '{"id":"' + index1 + '","account":"' + account + '"}'
						localStorage.setItem("uid", uid)

						window.location.href = "simulation.html"
					})

					$("#PrevPage").attr("disabled", true);
					$("#NextPage").attr("disabled", true);

					if(JSON.stringify(data.data.total) < 10) {
						$("#NextPage").attr("disabled", true);
					} else {
						$("#NextPage").removeAttr("disabled");
					}
				},
				error: function(XmlHttpRequest, textStatus, errorThrown) {
					console.log("请求失败" + XmlHttpRequest.responseText);
				}
			});
		}

	})
	//---------------------退出遮罩层----------------------------------
	$(".xx").on("click", function() {
		$("#cover").removeClass("cover1")
		$("#box").css("display", "none")
		$("#box1").css("display", "none")
	})
	//---------------------时间戳-------------------------------------------

	function formatDate(data) {
		return $.myTime.UnixToDate(data, true, 8);
	}

	//------------------------关联类型转换--------------------------------------------
	function related(e) {
		switch(e) {

			case 0:
				return '未关联'
				break;
			case 1:
				return '已关联'
				break;

		};
	}
	//------------------------性别类型转换--------------------------------------------
	function sex(e) {
		switch(e) {

			case 1:
				return '男'
				break;
			case 2:
				return '女'
				break;

		};
	}

	// });
});