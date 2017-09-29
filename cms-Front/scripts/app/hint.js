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

	// $(document).ready(function () {
	// /**
	//  *  读取cookie,添加到显示位置
	//  */
	// //读取cookie放在变量中
	// var name = $.cookie('name');
	// $('.admin-name').text(name);
	//
	// /**
	//  * 退出
	//  */
	// $('.logout').on('click',function () {
	//     $.cookie("name","", { expires: -1}); //清除cookie
	//     $.cookie("code","", { expires: -1});
	//     $.cookie("token","", { expires: -1});
	//     document.location.href ="../login.html";
	// });

	localStorage.clear();

	/**
	 * 添加服务技能弹出框
	 */
	//-----------------------------新增充值优惠-------------------------------------	
	$(".add-activity").on("click", function() {
		if($("#content").val() === "") {
			alert("不能为空")
		} else {
			$.ajax({
				type: "get",
				 url:urlx("admin/addTip.action"),
				async: true,
				headers: {
					"code": $.cookie("code"),
					"token": $.cookie("token")
				},
				dataType: "json",
				data: {

					"content": $("#content").val()
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
	 * 浏览温馨提示
	 */
	var index1 = null;
	$.ajax({
		type: "get",
		 url:urlx("admin/tips.action"),
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
			$.each(data.data.objs, function(index) {
				var a = data.data.objs[index].id;
				var $tr = ("<tr>" +
					"<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +

					"<td><textarea cols='50' rows='3' disabled='disabled'> " + data.data.objs[index].content + "</textarea></td>" +

					"<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
					"<td>" + formatDate(data.data.objs[index].updateTime) + "</td>" +

					"<td class='amend' >" +
					"<a class='a1'>修改</a>" +
					"<a class='a2'>保存</a>" +
					"</td>" +

					"<td class='jump'><a data-toggle='modal' data-target='#myModalx' >删除</a></td>" +

					"</tr>");
				$("#tbody1").append($tr)
			});

			/**
			 * 点击事件
			 */
			$(".amend").on('click', function(e) {

				index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				console.log(index1)
				//alert("111")
				console.log($(this).parent().children("td").eq(5).children('a').eq(1))
				//				$(this).parent().children("td").eq(1).children('input').eq(0).attr("disabled", false)

				$(this).parent().children("td").eq(1).children('textarea').eq(0).attr("disabled", false)
				//              $(this).parent().children("td").eq(2).children('span').eq(0).css("display", "none");

				//				$(this).parent().children("td").eq(3).children('select').eq(0).css("display", "block");
				//				$(this).parent().children("td").eq(3).children('span').eq(0).css("display", "none");

				$(this).parent().children("td").eq(4).children('a').eq(1).css("display", "block");
				$(this).parent().children("td").eq(4).children('a').eq(0).css("display", "none");

			});

			$(".a2").on("click", function(e) {

				/**
				 * 修改名字
				 */
				$.ajax({
					type: "post",
					 url:urlx("admin/editTip.action"),
					headers: {
						"code": $.cookie("code"),
						"token": $.cookie("token")
					},
					dataType: "json",
					data: {
						"id": $(this).parents('tr').children("td").eq(0).attr('goodid'),
						
						"content": $(this).parents().children("td").eq(1).children('textarea').eq(0).val()
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

			});
			
			 //----------删除充值优惠--------------------------------	
            $(".jump").on("click",function(){
                index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                console.log(index1)
                $('.delete-activity').on('click', function() {
		            $.ajax({
		                type:"post",
		                 url:urlx("admin/delTip.action"),
		                headers:{
		                    "code":$.cookie("code"),
		                    "token":$.cookie("token")
		                },
		                dataType: "json",
		                data:{
		
		                    "id":index1
		                },
		                success: function(data){
		                    console.log(data)
		                    switch(JSON.stringify(data.code))
		                    {
		                        case '"A00000"':
		                            console.log("删除成功")
		                            location.reload()
		                            break;
		                        default:
		                            console.log("请求失败")
		
		                    }
		                },
		                error:function(XmlHttpRequest,textStatus, errorThrown){
		                    console.log("请求失败"+XmlHttpRequest.responseText);
		                }
		            });
		        })   
            })
			
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
		}
	});

	/**
	 * 类型转换
	 */
	function menutime(e) {
		switch(e) {
			case 0:
				return '0-停用'
				break;
			case 1:
				return '1-启用'
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

});