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

define(["jquery", "cookie", "sweetalert", "jqueryTime", "bootstrap", "jtemplates"], function($) {
	localStorage.clear();
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
	 * 添加服务技能弹出框
	 */
	//-----------------------------新增-------------------------------------	
	$(".add-activity").on("click", function() {

		var arr = [];
		var newstr
		$("input:checkbox[name='Fruit']:checked").each(function() { // 遍历name=test的多选框
			//$(this).val(); // 每一个被选中项的值
			arr.push($(this).val())
		});
		newstr = arr.join("-")
		$(".checkbox_types").val(newstr)
		if($("#extra").val() == '') {
			alert("请输入目的地名称")
		} else {
			if($("#to_feature").val() == '') {
				alert("请输入亮点介绍")
			} else {
				if($(".upload-img").attr("src") == undefined) {
					alert("请上传图片")
				} else {
					if($(".checkbox_types").val() == '') {
						alert("请填写分类")
					} else {
						add_bourn()
					}
				}
			}
		}

	});
	/**
	 * 浏览
	 */
	$.ajax({
		type: "post",
		url: urll("admin/dests.tour"),
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
			//console.log(data.data.objs);
			var jsondata1 = data.data.objs
			$("#tbody1").setTemplateElement("template");
			$("#tbody1").processTemplate(jsondata1); //规格参数
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
});
//-----------------------------------------增加目的地---------------------------------
function add_bourn() {
	$.ajax({
		type: "post",
		url: urll("admin/addDest.tour"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"name": $("#extra").val(),
			"img": $(".upload-img").attr("src"),
			"feature": $("#to_feature").val(),
			"types": $(".checkbox_types").val()
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
//--------------------------修改目的地----------------------------------------------------------
function btn_alter(e) {
	console.log($(e.target).parents().children("input").eq(5).val())
	var arr = JSON.parse($(e.target).parents().children("input").eq(5).val())
	console.log(arr)
	$(".box").setTemplateElement("template2");
	$(".box").processTemplate(arr); //规格参数
	//console.log(arr.types)
	var typesarr = arr.types
	//console.log(typesarr.join("-"))
	$(".checkbox_types2").val(typesarr.join("-"))
	for(var i = 0; i < typesarr.length; i++) {
		$("input:checkbox[name='Fruit2']").eq(typesarr[i] - 1).attr("checked", 'true')
	}
	var id = arr.id
	$(".btn-activity").unbind().click(function() {
		btn_bourn(id)
	})

}
//-----------------------------------------确认修改目的地---------------------------------
function btn_bourn(id) {
	console.log(id)
	var arr = [];
	var newstr
	$("input:checkbox[name='Fruit2']:checked").each(function() { // 遍历name=test的多选框
		//$(this).val(); // 每一个被选中项的值
		arr.push($(this).val())
	});
	newstr = arr.join("-")
	$(".checkbox_types2").val(newstr)
	//console.log(newstr)
	$.ajax({
		type: "post",
		url: urll("admin/editDest.tour"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"id": id,
			"name": $("#extra2").val(),
			"img": $(".img_name2").val(),
			"feature": $("#to_feature2").val(),
			"types": $(".checkbox_types2").val()
		},
		success: function(data) {
			//console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					alert("修改成功")
					location.reload()
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
//---------------------------------------修改状态--------------------------------------
function btn_state(id, state) {
	$.ajax({
		type: "post",
		url: urll("admin/handleDest.tour"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"id": id,
			"state": state
		},
		success: function(data) {
			//console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					//					alert("修改成功")
					location.reload()
					break;
				default:
					alert(data.msg)
					//console.log("请求失败")
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
//--------------------------------上传图片阿里百川---------------------------
function upfile(e) {
	e = e || window.event;
	var uploader = uploadJSSDK;
	//alert("111")
	var $upimg = e.target.previousElementSibling
	console.log($upimg)
	var $img_name = e.target.nextElementSibling
	var $delete_img = e.target.nextElementSibling.nextElementSibling
	var $banner = e.target.parentNode.parentNode
	$($upimg).attr('src', "../images/jiazai0.gif")
	var files = e.target.files;
	//	console.log(files)
	for(var i = 0; i < files.length; i++) {
		uploader({
			file: files[i],
			name: new Date().getTime(),
			token: imgtoken,
			dir: "dev",
			callback: function(percent, result) {
				if(percent == 100) {
					//console.log(result.url)
					var now_url = result.url
					var new_url = now_url.replace('http', 'https')
					$($img_name).val(new_url)
					$($upimg).attr('src', new_url)
					$(e.target).css("display", "none")
					$($delete_img).css("display", "block")
				}
			}
		});
	}
}
//---------------------删除---------------------------------	
function delete_img(e) {
	//$(e.target).parent().remove()
	//	console.log(e.target.previousElementSibling.previousElementSibling.previousElementSibling)
	$(e.target.previousElementSibling.previousElementSibling.previousElementSibling).attr('src', " ")
	$(e.target.previousElementSibling).attr('value', " ")
	$(e.target.previousElementSibling.previousElementSibling).css("display", "block")
	$(e.target).css("display", "none")
}
/**
 * 类型转换
 */
function menutime(e) {
	switch(e) {
		case 0:
			return '停用'
			break;
		case 1:
			return '启用'
			break;
	};
};
/**
 * 类型反转换
 */
function to_menutime(e) {
	switch(e) {
		case 0:
			return '启用'
			break;
		case 1:
			return '停用'
			break;
	};
};

/**
 * 类型反转换2
 */
function changer(e) {
	switch(e) {
		case 0:
			return 1
			break;
		case 1:
			return 0
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