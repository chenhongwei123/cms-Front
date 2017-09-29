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

define(['jquery','cookie','bootstrap','jqueryTime'],function ($) {
    

// $(document).ready(function () {

    $.ajax({
        type:"get",
       // url:urlx("admin/recharges.action",
        url:urlx("admin/recharges.action"),
        headers:{
            "code":$.cookie("code"),
            "token":$.cookie("token")
        },
        dataType: "json",

        data: {
            "start":0,
            "size":100
        },
        success:function(data){
            console.log(data)
            $.each(data.data.objs, function(index) {
                var a=data.data.objs[index].id
                var $tr=("<tr>"
                +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
                +"<td><input disabled type='text' value='"+data.data.objs[index].descs+"'></td>"
                +"<td><input id='addMoney' disabled type='text' value='"+data.data.objs[index].reality+"'></td>"
                +"<td><input id='extraMoney' disabled type='text' value='"+data.data.objs[index].extra+"'></td>"
                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
                +"<td class='q'><a class='a1'>修改</a><a class='save'>保存</a></td> <td class='jump'><a data-toggle='modal' data-target='#myModalx' >删除</a></td>"
                +"</tr>")
                $("#tbody1").append($tr)
            });

            //------------------------修改---------------------
            $(".q").on('click',function(e){
                $(this).parent().children("td").eq(1).children('input').eq(0).attr("disabled",false)
                $(this).parent().children("td").eq(2).children('input').eq(0).attr("disabled",false)
                $(this).parent().children("td").eq(3).children('input').eq(0).attr("disabled",false)

                $(this).parent().children("td").eq(6).children('a').eq(1).css("display","block")
                $(this).parent().children("td").eq(6).children('a').eq(0).css("display","none")

            })
            //-----------------------保存--------------------------
            $(".save").on("click",function(){
                index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                console.log($(this).parents('tr').children("td").eq(2).children('input').eq(0).val())
                console.log(index1)
                $.ajax({
                    type:"post",
                    url:urlx("admin/editRecharge.action"),
                    headers:{
                        "code":$.cookie("code"),
                        "token":$.cookie("token")
                    },
                    dataType: "json",
                    data:{
                        "id":index1,
                        "reality": $(this).parents('tr').children("td").eq(2).children('input').eq(0).val(),
                        "extra":$(this).parents('tr').children("td").eq(3).children('input').eq(0).val(),
                        "desc":$(this).parents('tr').children("td").eq(1).children('input').eq(0).val(),
                    },
                    success: function(data){
                        console.log(data)
                        switch(JSON.stringify(data.code))
                        {
                            case '"A00000"':
                                alert("修改成功")
                                location.reload()
                                break;
                            default:
                                console.log("请求失败")

                        }
                    },
                    error:function(XmlHttpRequest,textStatus, errorThrown){
                        console.log("请求失败"+XmlHttpRequest.responseText);
                    }
                })
            })
            //----------删除充值优惠--------------------------------	
            $(".jump").on("click",function(){
                index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                console.log(index1)
                $('.delete-activity').on('click', function() {
		            $.ajax({
		                type:"post",
		                url:urlx("admin/delRecharge.action"),
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
            
              //----------删除解绑--------------------------------	
            $(".jump").unbind("click",function(){
                index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                console.log(index1)
                $('.delete-activity').on('click', function() {
		            $.ajax({
		                type:"post",
		                url:urlx("admin/delRecharge.action"),
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
            
            
        }
    })
    //-----------------------------新增充值优惠-------------------------------------	
    $(".add-activity").on("click",function(){
        $.ajax({
            type:"get",
            url:urlx("admin/addRecharge.action"),
            async:true,
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },
            dataType: "json",
            data:{
                "reality":$("#reality").val(),
                "extra":$("#extra").val(),
                "desc":$("#desc").val()
            },
            success: function(data){
                console.log(data)
                switch(JSON.stringify(data.code))
                {
                    case '"A00000"':
                        alert("添加成功")
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
    });



    //---------------------时间戳-------------------------------------------    

    function formatDate(data) {
        return $.myTime.UnixToDate(data,true,8);
    }

    /**
     * 判断输入是否为正整数
     */
    console.log($("#addmoney").val());

// });

});