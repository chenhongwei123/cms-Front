/**
 * Created by HJJ on 2017/3/16.
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

$.ajax({
	type: "get",
	url: urlx("admin/nuOrders.action"),
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
		var jsondata = data.data.objs;

		$("#tbody1").setTemplateElement("template");
		$("#tbody1").processTemplate(jsondata);

		//-----------------分页状态-----------------------
		$("#PrevPage").attr("disabled", true);
		$("#NextPage").attr("disabled", true);

		if(JSON.stringify(data.data.total) < 10) {
			$("#NextPage").attr("disabled", true);
		} else {
			$("#NextPage").removeAttr("disabled");
		}
	}
});
//-------------------------------------查看详情--------------------------------------------
function Orders(e) {
	var did = $(e.target.parentNode.parentNode.children[0]).val()
	var sn = $(e.target.parentNode.parentNode.children[1]).val()
	var mobile = $(e.target.parentNode.parentNode.children[2]).val()
	var serviceTime = $(e.target.parentNode.parentNode.children[3]).val()
	var address = $(e.target.parentNode.parentNode.children[4]).val()
	var remark = $(e.target.parentNode.parentNode.children[5]).val()
	var self = $(e.target.parentNode.parentNode.children[6]).val()
	var type = $(e.target.parentNode.parentNode.children[7]).val()
	var nurse = $(e.target.parentNode.parentNode.children[8]).val()
	var phone = $(e.target.parentNode.parentNode.children[9]).val()
	var contacts = $(e.target.parentNode.parentNode.children[10]).val()
	var sex = $(e.target.parentNode.parentNode.children[11]).val()
	var state = $(e.target.parentNode.parentNode.children[12]).val()
	var title = $(e.target.parentNode.parentNode.children[13]).val()
	var price = $(e.target.parentNode.parentNode.children[14]).val()
	var num = $(e.target.parentNode.parentNode.children[15]).val()
	var nid = $(e.target.parentNode.parentNode.children[16]).val()
	var method = $(e.target.parentNode.parentNode.children[17]).val()
	var createTime = $(e.target.parentNode.parentNode.children[18]).val()
	var foru = $(e.target.parentNode.parentNode.children[19]).val()
	var forn = $(e.target.parentNode.parentNode.children[20]).val()
	var forc = $(e.target.parentNode.parentNode.children[21]).val()

	var str1 = '{"foru":"' + foru + '","forn":"' + forn + '","forc":"' + forc + '","createTime":"' + createTime + '","method":"' + method + '","did":"' + did + '","sn":"' + sn + '","mobile":"' + mobile + '","serviceTime":"' + serviceTime + '","address":"' + address + '","remark":"' + remark + '","self":"' + self + '","type":"' + type + '","nurse":"' + nurse + '","phone":"' + phone + '", "contacts":"' + contacts + '","sex":"' + sex + '","state":"' + state + '","title":"' + title + '","price":"' + price + '","num":"' + num + '","nid":"' + nid + '"}'
	localStorage.setItem('Orders', str1)

	var str = localStorage.getItem('Orders');
	var arr = JSON.parse(str);
	console.log(arr)

	$(".remodal").setTemplateElement("template2");
	$(".remodal").processTemplate(arr);

}
//----------------------------------------------标记异常订单并处理--------------------------------------------------
function mark(e, id) {
	console.log(e.target)
	var did = $(e.target.parentNode.parentNode.children[0]).val()
	var sn = $(e.target.parentNode.parentNode.children[1]).val()
	var nurse = $(e.target.parentNode.parentNode.children[8]).val()
	var contacts = $(e.target.parentNode.parentNode.children[10]).val()
	var price = $(e.target.parentNode.parentNode.children[14]).val()
	var num = $(e.target.parentNode.parentNode.children[15]).val()
	var sum_price = parseInt(price) * parseInt(num)
	console.log(sum_price)
	var str = '{"did":"' + did + '","sn":"' + sn + '","nurse":"' + nurse + '","contacts":"' + contacts + '","sum_price":"' + sum_price + '"}'
	localStorage.setItem('OrdersX', str)
	swal({
			title: "订单异常，是否介入",
			//			text: "订单异常，是否介入",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes",
			closeOnConfirm: false
		},
		function() {
			
			$.ajax({
				type: "get",
				url: urlx("admin/interveneOrder.action"),
				async: true,
				headers: {
					"code": $.cookie("code"),
					"token": $.cookie("token")
				},

				dataType: "json",

				data: {
					"id": id

				},
				success: function(data) {
					console.log(data)
					switch(JSON.stringify(data.code)) {

						case '"A00000"':
							swal({
									title: "现在是否去处理?",
									//									text: "You will not be able to recover this imaginary file!",
									type: "warning",
									showCancelButton: true,
									confirmButtonColor: "#DD6B55",
									confirmButtonText: "Yes",
									cancelButtonText: "No",
									closeOnConfirm: false,
									closeOnCancel: false
								},
								function(isConfirm) {
									if(isConfirm) {
										window.location.href = "exceptionHanding.html"
									} else {
										location.reload()
									}
								});

						case '"A00004"':
							alert(data.msg)
							break;
						case '"A07406"':
							alert(data.msg)
							break;

					}
				},
				error: function(XmlHttpRequest, textStatus, errorThrown) {
					console.log("请求失败" + XmlHttpRequest.responseText);
				}
			});
		});
}
//-------------------------------------------------去处理--------------------------------------------------
function go_nurse(e) {
	var did = $(e.target.parentNode.parentNode.children[0]).val()
	var sn = $(e.target.parentNode.parentNode.children[1]).val()
	var nurse = $(e.target.parentNode.parentNode.children[8]).val()
	var contacts = $(e.target.parentNode.parentNode.children[10]).val()
	var price = $(e.target.parentNode.parentNode.children[14]).val()
	var num = $(e.target.parentNode.parentNode.children[15]).val()
	var sum_price = parseInt(price) * parseInt(num)
	var str = '{"did":"' + did + '","sn":"' + sn + '","nurse":"' + nurse + '","contacts":"' + contacts + '","sum_price":"' + sum_price + '"}'
	localStorage.setItem('OrdersX', str)

	window.location.href = "exceptionHanding.html"
}
//----------------------------------------------订单状态---------------------------------------------------

$(".select2").on("change", function() {
	//alert("111")
	//	$("#tbody1").empty($tr)
	$("#change2").text(1)
	$("#dishpageval1").val(0);
	$("#Paging").css("display", "none")
	$("#Paging1").css("display", "block")
	if($("#dishpageval1").val() == 0) {
		//	      			console.log("0")
		$("#PrevPage1").attr("disabled", true);
	} //菜品列表分页相关

	$.ajax({
		type: "get",
		url: urlx("admin/nuOrders.action"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},

		dataType: "json",

		data: {
			"state": getStr($(".select2").val(), "."),
			"start": 0,
			"size": 10
		},
		success: function(data) {
			console.log(data)
			var jsondata = data.data.objs;

			$("#tbody1").setTemplateElement("template");
			$("#tbody1").processTemplate(jsondata);

			$("#PrevPage1").attr("disabled", true);
			$("#NextPage1").attr("disabled", true);

			if(JSON.stringify(data.data.total) < 10) {
				$("#NextPage1").attr("disabled", true);
			} else {
				$("#NextPage1").removeAttr("disabled");
			}
		}
	});
})
//---------------------------------------------------根据状态来列表分页----------------------------------------------
$("#NextPage1").click(function() {
	//	$("#tbody1").empty($tr)
	$("#PrevPage1").removeAttr("disabled");
	var dishstart1 = ($("#dishpageval1").val() - 0) + 10;
	$.ajax({
		type: "get",
		url: urlx("admin/nuOrders.action"),
		data: {
			"state": getStr($(".select2").val(), "."),
			"start": dishstart1,
			"size": 10,
		},
		dataType: "json",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		success: function(data) {

			var jsondata = data.data.objs;

			$("#tbody1").setTemplateElement("template");
			$("#tbody1").processTemplate(jsondata);

			$("#dishpageval1").val(dishstart1);
			$("#change2").text($("#dishpageval1").val() / 10 + 1)

			if(JSON.stringify(data.data.total) - 10 <= $("#dishpageval1").val()) {
				$("#NextPage1").attr('disabled', true);
			}
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});
}); //下一页

$("#PrevPage1").click(function() {
	//	$("#tbody1").empty($tr)
	var dishstart1 = $("#dishpageval1").val() - 10;
	$("#NextPage1").removeAttr("disabled");
	if(dishstart1 < 0) {
		return dishstart1 = 0;
	}
	$.ajax({
		type: "get",
		url: urlx("admin/nuOrders.action"),
		data: {
			"state": getStr($(".select2").val(), "."),
			"start": dishstart1,
			"size": 10
		},
		dataType: "json",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		success: function(data) {

			console.log(dishstart1)
			var jsondata = data.data.objs;

			$("#tbody1").setTemplateElement("template");
			$("#tbody1").processTemplate(jsondata);

			$("#dishpageval1").val(dishstart1);
			$("#change2").text($("#dishpageval1").val() / 10 + 1)
			if(dishstart1 == 0) {
				$("#PrevPage1").attr("disabled", true);
			}
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});
}); //上一页

//---------------------------------------------------全部列表分页----------------------------------------------
if($("#dishpageval").val() == 0) {
	//	      			console.log("0")
	$("#PrevPage").attr("disabled", true);
} //菜品列表分页相关

$("#NextPage").click(function() {
	//	$("#tbody1").empty($tr)
	$("#change1").text(1)
	$("#PrevPage").removeAttr("disabled");
	var dishstart = ($("#dishpageval").val() - 0) + 10;
	$.ajax({
		type: "get",
		url: urlx("admin/nuOrders.action"),
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
			console.log(data)
			var jsondata = data.data.objs;

			$("#tbody1").setTemplateElement("template");
			$("#tbody1").processTemplate(jsondata);

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
	//	$("#tbody1").empty($tr)
	var dishstart = $("#dishpageval").val() - 10;
	$("#NextPage").removeAttr("disabled");
	if(dishstart < 0) {
		return dishstart = 0;
	}
	$.ajax({
		type: "get",
		url: urlx("admin/nuOrders.action"),
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
			var jsondata = data.data.objs;

			$("#tbody1").setTemplateElement("template");
			$("#tbody1").processTemplate(jsondata);

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
	$("#dishpageval").val(0);
	$("#Paging").css("display", "none")
	$("#Paging1").css("display", "none")
	//	$("#tbody1").empty($tr)
	$("#change1").text(1)
	console.log($(".select1").val())
	if($(".select1").val() == "通过订单号搜索") {
		//alert("111")
		$.ajax({
			type: "get",
			url: urlx("admin/nuOrders.action"),
			data: {
				"start": 0,
				"size": 1000,
				"sn": $(".wd").val(),
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				console.log(data)
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

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
	if($(".select1").val() == "通过下单人名字搜索") {
		$.ajax({
			type: "get",
			url: urlx("admin/nuOrders.action"),
			data: {
				"start": 0,
				"size": 1000,
				"user": $(".wd").val(),
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				console.log(data)
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

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
	if($(".select1").val() == "通过下单人手机号搜索") {
		$.ajax({
			type: "get",
			url: urlx("admin/nuOrders.action"),
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
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

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
	if($(".select1").val() == "通过护工名字搜索") {
		$.ajax({
			type: "get",
			url: urlx("admin/nuOrders.action"),
			data: {
				"start": 0,
				"size": 1000,
				"nurse": $(".wd").val(),
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				console.log(data)
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

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

	if($(".select1").val() == "通过护工电话搜索") {
		$.ajax({
			type: "get",
			url: urlx("admin/nuOrders.action"),
			data: {
				"start": 0,
				"size": 1000,
				"contact": $(".wd").val(),
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				console.log(data)
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

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

//---------------------时间戳-------------------------------------------

function formatDate(data) {
	return $.myTime.UnixToDate(data, true, 8);
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
		case null:
			return '未填写'
			break;
	};
}

//------------------------护理类型转换--------------------------------------------
function type(e) {
	switch(e) {

		case 1:
			return '全天'
			break;
		case 2:
			return '半天'
			break;

	};
}

//------------------------自理类型转换--------------------------------------------
function self(e) {
	switch(e) {

		case 1:
			return '全自理'
			break;
		case 2:
			return '半自理'
			break;
		case 3:
			return '不自理'
			break;

	};
}
//---------------------------订单状态类型转换1------------------------------------------
function stateX(e) {
	switch(e) {
		case 0:
			return '待支付'
			break;

		case 1:
			return '已接单'
			break;
		case 2:
			return '服务中'
			break;
		case 3:
			return '待服务介入中'
			break;
		case 4:
			return '已完成'
			break;
		case 5:
			return '待评价'
			break;
		case 6:
			return '用户删除'
			break;
		case 7:
			return '待接单'
			break;
		case 8:
			return '用户取消'
			break;
		case 9:
			return '护工取消'
			break;
		case 10:
			return '不接单'
			break;
		case 11:
			return '服务中介入'
			break;

	};
}

//----------------------------订单状态类型转换2-------------------------------------------------
function stateV(e) {
	switch(e) {
		case 0:
			return '待支付'
			break;

		case 1:
			return '已接单'
			break;
		case 2:
			return '服务中'
			break;
		case 3:
			return '等待处理'
			break;
		case 4:
			return '已完成'
			break;
		case 5:
			return '待评价'
			break;
		case 6:
			return '用户删除'
			break;
		case 7:
			return '待接单'
			break;
		case 8:
			return '已取消'
			break;
		case 9:
			return '已取消'
			break;
		case 10:
			return '不接单'
			break;
		case 11:
			return '等待处理'
			break;

	};
}
//---------------------时间戳-------------------------------------------

// function formatDate(data) {
//     return $.myTime.UnixToDate(data, true, 8);
// }

//---------------------时间戳-------------------------------------------

function formatDate(data) {
	//			console.log(data)
	if(data == null) {
		//				console.log(data)
		return "无"

	} else {

		return $.myTime.UnixToDate(data, true, 8);
	}

}
//---------------------时间戳-------------------------------------------

function method(data) {

	if(data == null) {
		return "无"

	} else {

		return data
	}

}

//--------------------------字符串处理----------------------------------------
function getStr(string, str) {
	var str_before = string.split(str)[0];
	var str_after = string.split(str)[1];
	//			alert('前：' + str_before + ' - 后：' + str_after);
	return str_before
}