/**
 * Created by HJJ on 2017/1/4.
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
 版本管理
 */

define(['jquery','cookie','bootstrap','sweetalert','jqueryTime'],function ($) {



// $(document).ready(function () {

    /**
     * 浏览版本
     */
    var index1 = null;
    $.ajax({
        type:"get",
         url:urlx("admin/versions.action"),
        headers:{
            "code":$.cookie("code"),
            "token":$.cookie("token")
        },
        dataType: "json",
        success:function (json) {
            $.each(json.data, function (index,item) {
                console.log(json.data[index].id);
                console.log(json);
                // console.log(json.objs[index].id);
                var a = json.data[index].id;
                var $tr = ("<tr>" +
                "<td goodid=" + a + ">" + json.data[index].id + "</td>" +
                "<td>" +
                "<input disabled='disabled' class='input1'  style='border: none;' type='text' value='" + json.data[index].version + "'/></td>" +
                "<td>" +
                "<span class='span1'>" + changeType(json.data[index].type) + "</span>" +
                "<select class='select1' style='display: none;'>" +
                "<option>用户</option>" +
                "<option>商户</option>" +
                "</select>" +
                "</td>" +
                "<td><input disabled='disabled' class='input1'  style='border: none;' type='text' value='" + json.data[index].url + "'/></td>" +
                "<td><input disabled='disabled' class='input1' id='inputDesc'  style='border: none;' type='text' value='" + json.data[index].descs + "'/></td>" +
                "<td>" +
					"<select disabled>" +
					"<option>" + terrace(json.data[index].forced) + "</option>" +
					"<option>0-否</option>" +
					"<option>1-是</option>" +
					
					"</select>" +
				"</td> " +
                "<td>" + formatDate(json.data[index].create_time) + "</td>" +
                "<td>" + formatDate(json.data[index].update_time) + "</td>" +
                "<td class='amend'><a  class='a1'>修改</a><a class='a2'>保存</a></td>" +
                "<td class='delete'><a data-toggle='modal' data-target='#myModalx' >删除</a></td>"+
                "</tr>");
                $("#tbody1").append($tr)
                // if($('#inputDesc').val().toString() == 'null'){
                //     $('#inputDesc').html('');
                //     console.log('aaa');
                // }
            });

            //-----------------------------------------验证阿里百川---------------------------------------
            $.ajax({
                type: "get",
                //url: "https://bzapi.honganjk.com/common/getToken.action",
                 url:urla("common/getToken.action"),
                data: {
                    "key":"23384196",
                    "secret":"7b484f801524af3bb7f6abb0dbe63459",
                    "namespace":"hajk",
                },
                dataType: "json",
                success: function (data) {
                    console.log(data)
                    window.imgtoken = data.data;
                    console.log(imgtoken);
                },
                error:function(XmlHttpRequest,textStatus, errorThrown)
                {
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            });

            /**
             * 点击事件
             */
            $(".amend").on('click',function(e){
//          	alert("1111111")
                //console.log($(this).parents().children("td").eq(1).children('select').eq(0).val())
                console.log($(this).parents('tr').children("td").eq(2).children('img').eq(0).attr("src"));

                index1 = $(this).parents('tr').children("td").eq(0).attr('goodid');
                console.log(index1);
                $(this).children("a").eq(0).css("display","none");
                $(this).children("a").eq(1).css("display","block");
                $(this).parent().children("td").eq(1).children('input').eq(0).attr("disabled",false);

                $(this).parent().children("td").eq(3).children('input').eq(0).attr("disabled",false);

                $(this).parent().children("td").eq(4).children('input').eq(0).attr("disabled",false);
                
                $(this).parent().children("td").eq(5).children('select').eq(0).attr("disabled", false)
				$(this).parent().children("td").eq(5).children('select').eq(0).css("border", "1px solid")
                
               
            });


            /**
             * 修改版本
             */
            $(".a2").on("click",function(e){
            	var $str2 = $(this).parents('tr').children("td").eq(5).children('select').eq(0).val().substring(0, 1)
				console.log($str2)
                /**
                 * 判断title是否为空
                 */
                // console.log($(this).parents('tr').children("td").eq(1).children('input').eq(0).val());
                if($(this).parents('tr').children("td").eq(1).children('input').eq(0).val() == ''){
                    $(this).parents('tr').children("td").eq(1).children('input').css('border','1px solid red');
                    return;
                }else {

                    /**
                     * 修改版本号
                     */
                    $.ajax({
                        type: "post",
                         url:urlx("admin/editVersion.action"),
                        headers: {
                            "code": $.cookie("code"),
                            "token": $.cookie("token")
                        },
                        dataType: "json",
                        data: {
                            "id": $(this).parents('tr').children("td").eq(0).attr('goodid'),
                            "version": $(this).parents('tr').children("td").eq(1).children('input').eq(0).val(),
                            "url": $(this).parents('tr').children("td").eq(3).children('input').eq(0).val(),
                            "forced":$str2,
                            "desc":$(this).parents('tr').children("td").eq(4).children('input').eq(0).val(),
                        },
                        success: function (data) {
                            console.log(data);
                            switch (JSON.stringify(data.code)) {
                                case '"A00000"':
                                    swal("修改成功");
                                    $('.confirm').on('click',function () {
                                        location.reload();
                                    });
                                    break;
                                default:
                                    console.log("请求失败")

                            }
                        },
                        error: function (XmlHttpRequest, textStatus, errorThrown) {
                            console.log("请求失败" + XmlHttpRequest.responseText);
                        }
                    });
                }

            });
            
            //----------删除banner--------------------------------
			$(".delete").on("click", function() {
				index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
				console.log(index1)

				$('.delete-activity').on('click', function() {
					$.ajax({
						type: "post",
						 url:urlx("admin/delVersion.action"),
						     
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
									console.log("删除成功")
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




    /**
     * 添加版本
     */
    $('.add-version').on("click",function () {
//      checkoutUrl($("#app-url").val());
        console.log('aaaa'+changeStr($('#select option:selected').val()));
        console.log('aaaaa'+""+$("#descs").val());
        console.log($("#app-url").val())
        $.ajax({
            type:'post',
             url:urlx("admin/addVersion.action"),
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },
            dataType: "json",
            data:{
                "version":$("#version").val() ,
                "type":changeStr($('#select option:selected').val()),
                "forced":$("#upgrade").val().substring(0, 1),
                "url":$("#app-url").val(),
                "desc":$("#descs").val()
            },
            success: function(data){

                console.log(data);
                console.log(data.code);
                switch(JSON.stringify(data.code))
                {
                    case '"A00000"':
                        // alert("添加成功")
                        swal('添加成功','','success');

                        location.reload();
                        break;
                    case '"A00001"':
                        swal('此类型版本已经存在!');
                        break;
                    default:
                        swal('请求失败','','false');
                }
            },
            error:function(XmlHttpRequest,textStatus, errorThrown){
                console.log("请求失败"+XmlHttpRequest.responseText);
            }
        });
    });






        






    /**
     * 类型转换
     */
    function changeType(e) {
        switch(e) {
            case 1:
                return '用户'
                break;
            case 2:
                return '商户'
                break;
            case 3:
                return '护工'
                break;    
        };
    };


    /**
     * 转换2
     */
    function changeStr(str) {
        switch(str) {
            case '用户':
                return 1
                break;
            case '商户':
                return 2
                break;
             case '护工':
                return 3
                break;    
        };
    };
    function terrace(e){
    	switch(e) {
            case 0:
                return '0-否'
                break;
            case 1:
                return '1-是'
                break;
        };
    }

    /**
     * 调用模态框
     */
    $('.a1').on('click',function () {
        $('#updateModal').modal();
    });

    /**
     * 时间戳
     */
    function formatDate(data) {
        return $.myTime.UnixToDate(data,true,8);
    }

    /**
     * 判断输入的url是否是https
     */
//  function checkoutUrl(str) {
//      var headerStr = str.trim().substring(0,5);
//          if(headerStr !== 'https'){
//              $('#errinfo-url').html("请输入https开头的网址").css('color','red');
//          }
//  }

// });

});

