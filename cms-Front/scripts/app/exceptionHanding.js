$(document).ready(function() {
	$(".order_id").text(JSON.parse(localStorage.getItem("OrdersX")).did)
	$(".order_sn").html(JSON.parse(localStorage.getItem("OrdersX")).sn)
	$(".order_nurse").html(JSON.parse(localStorage.getItem("OrdersX")).nurse)
	$(".order_contacts").html(JSON.parse(localStorage.getItem("OrdersX")).contacts)
	$(".sum_price").html(JSON.parse(localStorage.getItem("OrdersX")).sum_price)
	
	//  var id=$(".order_id").html(JSON.parse(localStorage.getItem("OrdersX")).did)

	$('.btn-cost').on('click', function() {
		//alert("11")
		console.log($("#forC").val())
		console.log($("#forU").val())
		console.log($("#forN").val())
		$.ajax({
			type: "get",
			 url:urlx("admin/processOrder.action"),
			async: true,
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},

			dataType: "json",

			data: {
				"id": $(".order_id").text(),
				"forU": $("#forU").val(),
				"forN": $("#forN").val(),
				"forC": $("#forC").val(),
				"method": $("#method").val()
			},
			success: function(data) {
				console.log(data)
				switch(JSON.stringify(data.code)) {

					case '"A00000"':
						alert("处理成功")
						window.location.href="nurseOrders.html"
						break;
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
		})

	})

})