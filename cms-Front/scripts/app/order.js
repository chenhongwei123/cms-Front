/**
 * Created by HJJ on 2017/1/12.
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

    var $tr=null;
    $("#tbody1").empty($tr)
    $.ajax({
        type:"get",
         url:urlx("admin/orders.action"),
        async:true,
        headers:{
            "code":$.cookie("code"),
            "token":$.cookie("token")
        },

        dataType: "json",

        data: {
            "start":0,
            "size":10
        },
        success:function(data){
            console.log(data)
            $.each(data.data.objs, function(index) {
                var a=data.data.objs[index].id
                var $tr=("<tr>"
                +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
                +"<td>"+data.data.objs[index].name+"</td>"
                +"<td>"+data.data.objs[index].mobile+"</td>"
                +"<td>"+data.data.objs[index].uid+"</td>"
                +"<td>"+data.data.objs[index].num+"</td>"
                +"<td>"+data.data.objs[index].bname+"</td>"
                +"<td>"+data.data.objs[index].contact+"</td>"
                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
//              +"<td>"+data.data.objs[index].remark+"</td>"
                +"<td>"+data.data.objs[index].price+"</td>"
                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
                +"<td>"+data.data.objs[index].fare+"</td>"
                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
                +"</tr>")
                $("#tbody1").append($tr)

            });
            $("#PrevPage").attr("disabled",true);
            $("#NextPage").attr("disabled",true);
//                console.log(dishselect)
            if(JSON.stringify(data.data.total) < 10){
                $("#NextPage").attr("disabled",true);
            }else{
                $("#NextPage").removeAttr("disabled");
            }
        }
    });



    //----------------------------------------------订单状态---------------------------------------------------

    $(".select2").on("change",function(){
        //alert("111")
        $("#tbody1").empty($tr)
        $("#change2").text(1)
        $("#dishpageval1").val(0);
        $("#Paging").css("display","none")
        $("#Paging1").css("display","block")
        if($("#dishpageval1").val() == 0){
//	      			console.log("0")
            $("#PrevPage1").attr("disabled",true);
        }//菜品列表分页相关
        $.ajax({
            type:"get",
             url:urlx("admin/orders.action"),
            async:true,
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },

            dataType: "json",

            data: {
                "state":$(".select2").val().substring(0,1),
                "start":0,
                "size":10
            },
            success:function(data){
                console.log(data)
                $.each(data.data.objs, function(index) {
                    var a=data.data.objs[index].id
                    var $tr=("<tr>"
                    +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
	                +"<td>"+data.data.objs[index].name+"</td>"
	                +"<td>"+data.data.objs[index].mobile+"</td>"
	                +"<td>"+data.data.objs[index].uid+"</td>"
	                +"<td>"+data.data.objs[index].num+"</td>"
	                +"<td>"+data.data.objs[index].bname+"</td>"
	                +"<td>"+data.data.objs[index].contact+"</td>"
	                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
	//              +"<td>"+data.data.objs[index].remark+"</td>"
	                +"<td>"+data.data.objs[index].price+"</td>"
	                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
	                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
	                +"<td>"+data.data.objs[index].fare+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
	                +"</tr>")
                    $("#tbody1").append($tr)

                });
                $("#PrevPage1").attr("disabled",true);
                $("#NextPage1").attr("disabled",true);

                if(JSON.stringify(data.data.total) < 10){
                    $("#NextPage1").attr("disabled",true);
                }else{
                    $("#NextPage1").removeAttr("disabled");
                }
            }
        });
    })

    //---------------------------------------------------根据状态来列表分页----------------------------------------------
    $("#NextPage1").click(function(){
        $("#tbody1").empty($tr)
        $("#PrevPage1").removeAttr("disabled");
        var dishstart1 = ($("#dishpageval1").val()-0) + 10;
        $.ajax({
            type: "get",
             url:urlx("admin/orders.action"),
            data: {
                "state":$(".select2").val().substring(0,1),
                "start":dishstart1,
                "size":10,
            },
            dataType: "json",
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },
            success: function (data) {

                $.each(data.data.objs, function(index) {

                    var a=data.data.objs[index].id
                    var $tr=("<tr>"
                    +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
	                +"<td>"+data.data.objs[index].name+"</td>"
	                +"<td>"+data.data.objs[index].mobile+"</td>"
	                +"<td>"+data.data.objs[index].uid+"</td>"
	                +"<td>"+data.data.objs[index].num+"</td>"
	                +"<td>"+data.data.objs[index].bname+"</td>"
	                +"<td>"+data.data.objs[index].contact+"</td>"
	                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
	//              +"<td>"+data.data.objs[index].remark+"</td>"
	                +"<td>"+data.data.objs[index].price+"</td>"
	                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
	                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
	                +"<td>"+data.data.objs[index].fare+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
	                +"</tr>")
                    $("#tbody1").append($tr)

                });
                $("#dishpageval1").val(dishstart1);
                $("#change2").text($("#dishpageval1").val()/10+1)

                if(JSON.stringify(data.data.total) - 10 <= $("#dishpageval1").val()){
                    $("#NextPage1").attr('disabled',true);
                }
            },
            error:function(XmlHttpRequest,textStatus, errorThrown)
            {
                console.log("请求失败"+XmlHttpRequest.responseText);
            }
        });
    });//下一页

    $("#PrevPage1").click(function(){
        $("#tbody1").empty($tr)
        var dishstart1 = $("#dishpageval1").val() - 10;
        $("#NextPage1").removeAttr("disabled");
        if(dishstart1 < 0){
            return dishstart1 = 0;
        }
        $.ajax({
            type: "get",
             url:urlx("admin/orders.action"),
            data: {
                "state":$(".select2").val().substring(0,1),
                "start":dishstart1,
                "size":10
            },
            dataType: "json",
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },
            success: function (data) {

                console.log(dishstart1)
                $.each(data.data.objs, function(index) {
                    var a=data.data.objs[index].id
                    var $tr=("<tr>"
                    +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
	                +"<td>"+data.data.objs[index].name+"</td>"
	                +"<td>"+data.data.objs[index].mobile+"</td>"
	                +"<td>"+data.data.objs[index].uid+"</td>"
	                +"<td>"+data.data.objs[index].num+"</td>"
	                +"<td>"+data.data.objs[index].bname+"</td>"
	                +"<td>"+data.data.objs[index].contact+"</td>"
	                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
	//              +"<td>"+data.data.objs[index].remark+"</td>"
	                +"<td>"+data.data.objs[index].price+"</td>"
	                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
	                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
	                +"<td>"+data.data.objs[index].fare+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
	                +"</tr>")
                    $("#tbody1").append($tr)

                });
                $("#dishpageval1").val(dishstart1);
                $("#change2").text($("#dishpageval1").val()/10+1)
                if(dishstart1 == 0){
                    $("#PrevPage1").attr("disabled",true);
                }
            },
            error:function(XmlHttpRequest,textStatus, errorThrown)
            {
                console.log("请求失败"+XmlHttpRequest.responseText);
            }
        });
    });//上一页


    //---------------------------------------------------全部列表分页----------------------------------------------
    if($("#dishpageval").val() == 0){
//	      			console.log("0")
        $("#PrevPage").attr("disabled",true);
    }//菜品列表分页相关


    $("#NextPage").click(function(){
        $("#tbody1").empty($tr)
        $("#change1").text(1)
        $("#PrevPage").removeAttr("disabled");
        var dishstart = ($("#dishpageval").val()-0) + 10;
        $.ajax({
            type: "get",
             url:urlx("admin/orders.action"),
            data: {

                "start":dishstart,
                "size":10
            },
            dataType: "json",
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },
            success: function (data) {

                $.each(data.data.objs, function(index) {
                    var a=data.data.objs[index].id
                    var $tr=("<tr>"
                    +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
	                +"<td>"+data.data.objs[index].name+"</td>"
	                +"<td>"+data.data.objs[index].mobile+"</td>"
	                +"<td>"+data.data.objs[index].uid+"</td>"
	                +"<td>"+data.data.objs[index].num+"</td>"
	                +"<td>"+data.data.objs[index].bname+"</td>"
	                +"<td>"+data.data.objs[index].contact+"</td>"
	                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
	//              +"<td>"+data.data.objs[index].remark+"</td>"
	                +"<td>"+data.data.objs[index].price+"</td>"
	                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
	                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
	                +"<td>"+data.data.objs[index].fare+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
	                +"</tr>")
                    $("#tbody1").append($tr)

                });
                $("#dishpageval").val(dishstart);
                $("#change1").text($("#dishpageval").val()/10+1)

                if(JSON.stringify(data.data.total) - 10 <= $("#dishpageval").val()){
                    $("#NextPage").attr('disabled',true);
                }
            },
            error:function(XmlHttpRequest,textStatus, errorThrown)
            {
                console.log("请求失败"+XmlHttpRequest.responseText);
            }
        });
    });//下一页

    $("#PrevPage").click(function(){
        $("#tbody1").empty($tr)
        var dishstart = $("#dishpageval").val() - 10;
        $("#NextPage").removeAttr("disabled");
        if(dishstart < 0){
            return dishstart = 0;
        }
        $.ajax({
            type: "get",
             url:urlx("admin/orders.action"),
            data: {

                "start":dishstart,
                "size":10
            },
            dataType: "json",
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },
            success: function (data) {
                $.each(data.data.objs, function(index) {
                    var a=data.data.objs[index].id
                    var $tr=("<tr>"
                    +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
	                +"<td>"+data.data.objs[index].name+"</td>"
	                +"<td>"+data.data.objs[index].mobile+"</td>"
	                +"<td>"+data.data.objs[index].uid+"</td>"
	                +"<td>"+data.data.objs[index].num+"</td>"
	                +"<td>"+data.data.objs[index].bname+"</td>"
	                +"<td>"+data.data.objs[index].contact+"</td>"
	                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
	                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
	//              +"<td>"+data.data.objs[index].remark+"</td>"
	                +"<td>"+data.data.objs[index].price+"</td>"
	                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
	                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
	                +"<td>"+data.data.objs[index].fare+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
	                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
	                +"</tr>")
                    $("#tbody1").append($tr)

                });
                $("#dishpageval").val(dishstart);
                $("#change1").text($("#dishpageval").val()/10+1)
                if(dishstart == 0){
                    $("#PrevPage").attr("disabled",true);
                }
            },
            error:function(XmlHttpRequest,textStatus, errorThrown)
            {
                console.log("请求失败"+XmlHttpRequest.responseText);
            }
        });
    });//上一页


    //----------------------------搜索-------------------------------------------------

    $("#searchOrder").on("click",function(){
        $("#dishpageval").val(0);
        $("#Paging").css("display","none")
        $("#Paging1").css("display","none")
        $("#tbody1").empty($tr)
        $("#change1").text(1)
        console.log($(".select1").val())
        if($(".select1").val()=="通过订单号搜索"){
            //alert("111")
            $.ajax({
                type: "get",
                 url:urlx("admin/orders.action"),
                data: {
                    "start":0,
                    "size":1000,
                    "sn":$(".wd1").val(),
                },
                dataType: "json",
                headers:{
                    "code":$.cookie("code"),
                    "token":$.cookie("token")
                },
                success: function (data) {
                    console.log(data)
                    $.each(data.data.objs, function(index) {
                        var a=data.data.objs[index].id
                        var $tr=("<tr>"
                        +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
		                +"<td>"+data.data.objs[index].name+"</td>"
		                +"<td>"+data.data.objs[index].mobile+"</td>"
		                +"<td>"+data.data.objs[index].uid+"</td>"
		                +"<td>"+data.data.objs[index].num+"</td>"
		                +"<td>"+data.data.objs[index].bname+"</td>"
		                +"<td>"+data.data.objs[index].contact+"</td>"
		                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
		//              +"<td>"+data.data.objs[index].remark+"</td>"
		                +"<td>"+data.data.objs[index].price+"</td>"
		                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
		                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
		                +"<td>"+data.data.objs[index].fare+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
		                +"</tr>")
                        $("#tbody1").append($tr)

                    });
                    $("#PrevPage").attr("disabled",true);
                    $("#NextPage").attr("disabled",true);

                    if(JSON.stringify(data.data.total) < 10){
                        $("#NextPage").attr("disabled",true);
                    }else{
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error:function(XmlHttpRequest,textStatus,errorThrown){
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            });
        }
        if($(".select1").val()=="通过收货人名字搜索"){
            $.ajax({
                type: "get",
                 url:urlx("admin/orders.action"),
                data: {
                    "start":0,
                    "size":1000,
                    "user":$(".wd1").val(),
                },
                dataType: "json",
                headers:{
                    "code":$.cookie("code"),
                    "token":$.cookie("token")
                },
                success: function (data) {
                    console.log(data)
                    $.each(data.data.objs, function(index) {
                        var a=data.data.objs[index].id
                        var $tr=("<tr>"
                        +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
		                +"<td>"+data.data.objs[index].name+"</td>"
		                +"<td>"+data.data.objs[index].mobile+"</td>"
		                +"<td>"+data.data.objs[index].uid+"</td>"
		                +"<td>"+data.data.objs[index].num+"</td>"
		                +"<td>"+data.data.objs[index].bname+"</td>"
		                +"<td>"+data.data.objs[index].contact+"</td>"
		                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
		//              +"<td>"+data.data.objs[index].remark+"</td>"
		                +"<td>"+data.data.objs[index].price+"</td>"
		                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
		                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
		                +"<td>"+data.data.objs[index].fare+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
		                +"</tr>")
                        $("#tbody1").append($tr)

                    });
                    $("#PrevPage").attr("disabled",true);
                    $("#NextPage").attr("disabled",true);

                    if(JSON.stringify(data.data.total) < 10){
                        $("#NextPage").attr("disabled",true);
                    }else{
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error:function(XmlHttpRequest,textStatus,errorThrown){
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            });
        }
        if($(".select1").val()=="通过收货人手机号搜索"){
            $.ajax({
                type: "get",
                 url:urlx("admin/orders.action"),
                data: {
                    "start":0,
                    "size":1000,
                    "mobile":$(".wd1").val(),
                },
                dataType: "json",
                headers:{
                    "code":$.cookie("code"),
                    "token":$.cookie("token")
                },
                success: function (data) {
                    console.log(data)
                    $.each(data.data.objs, function(index) {
                        var a=data.data.objs[index].id
                        var $tr=("<tr>"
                        +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
		                +"<td>"+data.data.objs[index].name+"</td>"
		                +"<td>"+data.data.objs[index].mobile+"</td>"
		                +"<td>"+data.data.objs[index].uid+"</td>"
		                +"<td>"+data.data.objs[index].num+"</td>"
		                +"<td>"+data.data.objs[index].bname+"</td>"
		                +"<td>"+data.data.objs[index].contact+"</td>"
		                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
		//              +"<td>"+data.data.objs[index].remark+"</td>"
		                +"<td>"+data.data.objs[index].price+"</td>"
		                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
		                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
		                +"<td>"+data.data.objs[index].fare+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
		                +"</tr>")
                        $("#tbody1").append($tr)

                    });
                    $("#PrevPage").attr("disabled",true);
                    $("#NextPage").attr("disabled",true);

                    if(JSON.stringify(data.data.total) < 10){
                        $("#NextPage").attr("disabled",true);
                    }else{
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error:function(XmlHttpRequest,textStatus,errorThrown){
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            });
        }
        if($(".select1").val()=="通过订餐商户名字搜索"){
            $.ajax({
                type: "get",
                 url:urlx("admin/orders.action"),
                data: {
                    "start":0,
                    "size":1000,
                    "business":$(".wd1").val(),
                },
                dataType: "json",
                headers:{
                    "code":$.cookie("code"),
                    "token":$.cookie("token")
                },
                success: function (data) {
                    console.log(data)
                    $.each(data.data.objs, function(index) {
                        var a=data.data.objs[index].id
                        var $tr=("<tr>"
                        +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
		                +"<td>"+data.data.objs[index].name+"</td>"
		                +"<td>"+data.data.objs[index].mobile+"</td>"
		                +"<td>"+data.data.objs[index].uid+"</td>"
		                +"<td>"+data.data.objs[index].num+"</td>"
		                +"<td>"+data.data.objs[index].bname+"</td>"
		                +"<td>"+data.data.objs[index].contact+"</td>"
		                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
		//              +"<td>"+data.data.objs[index].remark+"</td>"
		                +"<td>"+data.data.objs[index].price+"</td>"
		                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
		                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
		                +"<td>"+data.data.objs[index].fare+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
		                +"</tr>")
                        $("#tbody1").append($tr)

                    });
                    $("#PrevPage").attr("disabled",true);
                    $("#NextPage").attr("disabled",true);

                    if(JSON.stringify(data.data.total) < 10){
                        $("#NextPage").attr("disabled",true);
                    }else{
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error:function(XmlHttpRequest,textStatus,errorThrown){
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            });
        }
        if($(".select1").val()=="通过订餐商户电话搜索"){
            $.ajax({
                type: "get",
                 url:urlx("admin/orders.action"),
                data: {
                    "start":0,
                    "size":1000,
                    "business":$(".wd1").val(),
                },
                dataType: "json",
                headers:{
                    "code":$.cookie("code"),
                    "token":$.cookie("token")
                },
                success: function (data) {
                    console.log(data)
                    $.each(data.data.objs, function(index) {
                        var a=data.data.objs[index].id
                        var $tr=("<tr>"
                       +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
		                +"<td>"+data.data.objs[index].name+"</td>"
		                +"<td>"+data.data.objs[index].mobile+"</td>"
		                +"<td>"+data.data.objs[index].uid+"</td>"
		                +"<td>"+data.data.objs[index].num+"</td>"
		                +"<td>"+data.data.objs[index].bname+"</td>"
		                +"<td>"+data.data.objs[index].contact+"</td>"
		                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
		//              +"<td>"+data.data.objs[index].remark+"</td>"
		                +"<td>"+data.data.objs[index].price+"</td>"
		                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
		                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
		                +"<td>"+data.data.objs[index].fare+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
		                +"</tr>")
                        $("#tbody1").append($tr)

                    });
                    $("#PrevPage").attr("disabled",true);
                    $("#NextPage").attr("disabled",true);

                    if(JSON.stringify(data.data.total) < 10){
                        $("#NextPage").attr("disabled",true);
                    }else{
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error:function(XmlHttpRequest,textStatus,errorThrown){
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            });
        }
        if($(".select1").val()=="通过订餐商户电话搜索"){
            $.ajax({
                type: "get",
                 url:urlx("admin/orders.action"),
                data: {
                    "start":0,
                    "size":1000,
                    "contact":$(".wd1").val(),
                },
                dataType: "json",
                headers:{
                    "code":$.cookie("code"),
                    "token":$.cookie("token")
                },
                success: function (data) {
                    console.log(data)
                    $.each(data.data.objs, function(index) {
                        var a=data.data.objs[index].id
                        var $tr=("<tr>"
                        +"<td goodid=" + a + ">"+data.data.objs[index].id+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].sn+"</textarea></td>"
		                +"<td>"+data.data.objs[index].name+"</td>"
		                +"<td>"+data.data.objs[index].mobile+"</td>"
		                +"<td>"+data.data.objs[index].uid+"</td>"
		                +"<td>"+data.data.objs[index].num+"</td>"
		                +"<td>"+data.data.objs[index].bname+"</td>"
		                +"<td>"+data.data.objs[index].contact+"</td>"
		                +"<td>"+sex(data.data.objs[index].sex)+"</td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].delivery_time+"</textarea></td>"
		                +"<td><textarea cols='8'>"+data.data.objs[index].address+"</textarea></td>"
		//              +"<td>"+data.data.objs[index].remark+"</td>"
		                +"<td>"+data.data.objs[index].price+"</td>"
		                +"<td>"+pay(data.data.objs[index].pay)+"</td>"
		                +"<td>"+stateRep(data.data.objs[index].state)+"</td>"
		                +"<td>"+data.data.objs[index].fare+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].create_time)+"</td>"
		                +"<td>"+formatDate(data.data.objs[index].update_time)+"</td>"
		                +"</tr>")
                        $("#tbody1").append($tr)

                    });
                    $("#PrevPage").attr("disabled",true);
                    $("#NextPage").attr("disabled",true);

                    if(JSON.stringify(data.data.total) < 10){
                        $("#NextPage").attr("disabled",true);
                    }else{
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error:function(XmlHttpRequest,textStatus,errorThrown){
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            });
        }

    })


    //---------------------时间戳-------------------------------------------

    function formatDate(data) {
        return $.myTime.UnixToDate(data,true,8);
    }

    //------------------------性别类型转换--------------------------------------------
    function sex(e){
        switch(e) {

            case 1:
                return '男'
                break;
            case 2:
                return '女'
                break;

        };
    }
    //---------------------------付款方式类型转换------------------------------------------
    function pay(e){
        switch(e) {
            case 0:
                return '未选择付款方式'
                break;
            case 1:
                return '微信支付'
                break;
            case 2:
                return '支付宝支付'
                break;
            case 3:
                return '银联支付'
                break;
            case 4:
                return '余额支付'
                break;

        };
    }
    //----------------------------订单状态类型转换-------------------------------------------------
    function stateRep(e) {
        switch(e) {
            case 0:
                return '待支付'
                break;
            case 1:
                return '已接单'
                break;
            case 2:
                return '在配送'
                break;
            case 3:
                return '退款中'
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

        };
    };
    //---------------------时间戳-------------------------------------------

    function formatDate(data) {
        return $.myTime.UnixToDate(data,true,8);
    }
// })

});