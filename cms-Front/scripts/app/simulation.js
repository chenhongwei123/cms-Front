/*************************
 * Created by HJJ on 2017/6/29.
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
***********************/

//-----------------------------------全选---------------------------------------------

$(document).ready(function() {

	$('#myTabs').click(function(e) {
		e.preventDefault()
		$(this).tab('show');
	});

	//--------------------时间插件-------------------
	laydate({
		elem: '.J-xl',
		min: laydate.now(0),
		choose: function(e) {
			var dataa = $.myTime.DateToUnix(e);
			$("#timeunix").val(dataa);
		}
	});
	/**
	 * 读取localStorage内容
	 */

	var id = parseInt(JSON.parse(localStorage.getItem('uid')).id);
	var account = JSON.parse(localStorage.getItem('uid')).account

	$('.getShopName').text(id);
	$(".getFare").text(account);

	//---------------------------获取地址id---------------------------------------
	$.ajax({
		type: "get",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urlx("admin/addrs.action"),
		data: {
			"uid": id

		},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					$.each(data.data, function(index) {
						var $select = ("<option >" + data.data[index].id + "." + data.data[index].address + "</option>")
						$("#sele_id").append($select)
						$("#sele_id2").append($select)
					})

					break;
				default:
					alert(data.msg)
			}
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});

	//---------------------------获取护工id---------------------------------------

	$.ajax({
		type: "get",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urlx("admin/nurses.action"),
		data: {
			"start": 0,
			"size": 100,
			"type": 1,
			"kind": 1
		},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					$.each(data.data.objs, function(index) {
						var $select = ("<option >" + data.data.objs[index].id + "." + data.data.objs[index].name + "</option>")
						$("#sele_nid").append($select)
						//						$("#sele_id2").append($select)
					})
					break;
				default:
					alert(data.msg)
			}
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});

	$.ajax({
		type: "get",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urlx("admin/nurses.action"),
		data: {
			"start": 0,
			"size": 100,
			"type": 1,
			"kind": 2
		},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					$.each(data.data.objs, function(index) {
						var $select = ("<option >" + data.data.objs[index].id + "." + data.data.objs[index].name + "</option>")
						$("#sele_nid2").append($select)
						//						$("#sele_id2").append($select)
					})

					break;
				default:
					alert(data.msg)
			}
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});

	//-----------------------------模拟护理全天订单下单----------------------------------------------

	$('.btn-cost').on('click', function() {
		var uid = parseInt(JSON.parse(localStorage.getItem('uid')).id);

		var nid = getStr($("#sele_nid").val(), '.')
		console.log($("#sele_id").val())
		console.log(nid)

		if($("#sele_id").val() == null) {
			alert("没有配送地址无法下单")

		} else {
			if($("#J-xl").val().length == 0) {
				alert("请选择开始时段")
			} else {
				if($("#amount").val().length == 0) {
					alert("请填写时段值")
				} else {
					if($("#content").val().length == 0) {
						alert("请填写评论")
					} else {
						$.ajax({
							type: "post",
							headers: {
								"code": $.cookie("code"),
								"token": $.cookie("token")
							},
							url: urlx("/admin/order.action"),
							data: {
								"aid": $("#sele_id").val().substring(0, 3),
								"remark": $("#remark").val(),
								"begin": $("#J-xl").val().substring(8),
								"self": $("#sele_self").val().substring(0, 1),
								"size": $("#amount").val(),
								"uid": uid,
								"content": $("#content").val(),
								"nid": nid
							},
							async: true,
							dataType: "json",
							success: function(data) {
								console.log(data)
								switch(JSON.stringify(data.code)) {
									case '"A00000"':
										alert("下单成功")
										//location.reload()
										break;
									case '"A00004"':
										alert(data.msg)
										break;
									default:
										alert("请求失败")

								}

							},
							error: function(XmlHttpRequest, textStatus, errorThrown) {
								console.log("请求失败" + XmlHttpRequest.responseText);
							}
						});

					}
				}
			}
		}

	})

	//-----------------------------模拟护理钟点订单下单----------------------------------------------

	$('.btn-reduction').on('click', function() {
		var nid = getStr($("#sele_nid2").val(), '.')
		console.log(nid)

		var fruit = "";

		var fruit = $("input:radio[name='fruit']:checked").val()
		console.log($("input:radio[name='fruit']:checked").val())
		$("#checkbox_hidden").val(fruit)

		var uid = parseInt(JSON.parse(localStorage.getItem('uid')).id);
		//

		if($("#sele_id2").val() == null) {
			alert("没有配送地址无法下单")

		} else {
			if($("#amount2").val().length == 0) {
				alert("请选择周几")
			} else {
				if($("#checkbox_hidden").val().length == 0) {
					alert("请填写时段范围")
				} else {
					if($("#content2").val().length == 0) {
						alert("请填写评论")
					} else {

						$.ajax({
							type: "post",
							headers: {
								"code": $.cookie("code"),
								"token": $.cookie("token")
							},
							url: urlx("/admin/orderPeriod.action"),
							data: {
								"aid": $("#sele_id2").val().substring(0, 3),
								"remark": $("#remark").val(),
								"week": $("#amount2").val(),
								"self": $("#sele_self").val().substring(0, 1),
								"size": $("#checkbox_hidden").val(),
								"uid": uid,
								"content": $("#content2").val(),
								"nid": nid
							},
							async: true,
							dataType: "json",
							success: function(data) {
								console.log(data)
								switch(JSON.stringify(data.code)) {
									case '"A00000"':
										alert("下单成功")
										//location.reload()
										break;
									case '"A00004"':
										alert(data.msg)
										break;
									default:
										alert("请求失败")

								}
							},
							error: function(XmlHttpRequest, textStatus, errorThrown) {
								console.log("请求失败" + XmlHttpRequest.responseText);
							}
						});
					}
				}
			}
		}

	})

	//-------------------字符串处理------------------------
	function getStr(string, str) {
		var str_before = string.split(str)[0];
		var str_after = string.split(str)[1];
		//alert('前：' + str_before + ' - 后：' + str_after);
		return str_before
	}
});