/**
 * Created by HJJ on 2017/3/17.
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
$(document).ready(function() {

    /**
     *  读取cookie,添加到显示位置
     */
    //读取cookie放在变量中
    var name = $.cookie('name');
    $('.admin-name').text(name);

    /**
     * 退出
     */
    $('.logout').on('click',function () {
        $.cookie("name","", { expires: -1}); //清除cookie
        $.cookie("code","", { expires: -1});
        $.cookie("token","", { expires: -1});
        document.location.href ="../login.html";
    });


    var $tr = null;
    var $tr2 = null;
    var $tr3 = null;
    $.ajax({
        type: "get",
         url:urlx("admin/logs.action"),
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
            console.log(data.data.total)
            $(".datax").html(data.data.total)
            $.each(data.data.objs, function(index) {
                //					console.log(data.data.objs[index].id)
                var a = data.data.objs[index].id
                var $tr = ("<tr>" +
                "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                "<td>" + data.data.objs[index].uid + "</td>" +
                "<td>" + aid(data.data.objs[index].aid) + "</td>" +
                "<td>" + env(data.data.objs[index].env) + "</td>" +
                "<td>" + client(data.data.objs[index].client) + "</td>" +
                "<td>" + data.data.objs[index].mac + " </td>" +
                "<td>" + data.data.objs[index].methodName + "</td>" +
                "<td>" + formatDate(data.data.objs[index].reqTime) + "</td>" +
                "<td><textarea>" + data.data.objs[index].reqParam + "</textarea></td>" +
                "<td><textarea>" + data.data.objs[index].resData + "</textarea></td>" +
                "<td>" + data.data.objs[index].resCode + " </td>" +
                "<td>" + formatDate(data.data.objs[index].resTime) + "</td>" +
                "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                "</tr>")
                $("#tbody1").append($tr)

            });

            //				//------------------------------------------------------
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
             url:urlx("admin/logs.action"),
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
                $(".datax").html(data.data.total)
                $.each(data.data.objs, function(index) {
                    var a = data.data.objs[index].id
                    var $tr = ("<tr>" +
                    "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                    "<td>" + data.data.objs[index].uid + "</td>" +
                    "<td>" + aid(data.data.objs[index].aid) + "</td>" +
                    "<td>" + env(data.data.objs[index].env) + "</td>" +
                    "<td>" + client(data.data.objs[index].client) + "</td>" +
                    "<td>" + data.data.objs[index].mac + " </td>" +
                    "<td>" + data.data.objs[index].methodName + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].reqTime) + "</td>" +
                    "<td><textarea>" + data.data.objs[index].reqParam + "</textarea></td>" +
                    "<td><textarea>" + data.data.objs[index].resData + "</textarea></td>" +
                    "<td>" + data.data.objs[index].resCode + " </td>" +
                    "<td>" + formatDate(data.data.objs[index].resTime) + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                    "</tr>")

                    $("#tbody1").append($tr)

                });

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
             url:urlx("admin/logs.action"),
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
                $(".datax").html(data.data.total)
                $.each(data.data.objs, function(index) {
                    var a = data.data.objs[index].id
                    var $tr = ("<tr>" +
                    "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                    "<td>" + data.data.objs[index].uid + "</td>" +
                    "<td>" + aid(data.data.objs[index].aid) + "</td>" +
                    "<td>" + env(data.data.objs[index].env) + "</td>" +
                    "<td>" + client(data.data.objs[index].client) + "</td>" +
                    "<td>" + data.data.objs[index].mac + " </td>" +
                    "<td>" + data.data.objs[index].methodName + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].reqTime) + "</td>" +
                    "<td><textarea>" + data.data.objs[index].reqParam + "</textarea></td>" +
                    "<td><textarea>" + data.data.objs[index].resData + "</textarea></td>" +
                    "<td>" + data.data.objs[index].resCode + " </td>" +
                    "<td>" + formatDate(data.data.objs[index].resTime) + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                    "</tr>")

                    $("#tbody1").append($tr)

                });

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
        $(".datax").html("正在查询...")
        //			if($(".select1").val() == "通过昵称搜索") {
        //alert("111")
        $.ajax({
            type: "get",
             url:urlx("admin/logs.action"),
            data: {
                "start": 0,
                "size": 1000,
                "aid": $(".select1").val().substring(0, 1),
                "env": $(".select2").val().substring(0, 1),
                "client": $(".select3").val().substring(0, 1),
                "mac": $(".wd").val(),
                "code": $(".wd2").val(),
                "res": $(".wd3").val(),
                "method": $(".wd4").val(),
                "req": $(".wd5").val()
//					"aid":0,
//					"env":2,
//					"client": 2,
//					"mac":"115.193.148.182",
//					"code":"A00000"
            },
            dataType: "json",
            headers: {
                "code": $.cookie("code"),
                "token": $.cookie("token")
            },
            success: function(data) {
                console.log(data)
                $(".datax").html(data.data.total)
                $.each(data.data.objs, function(index) {
                    var a = data.data.objs[index].id
                    var $tr = ("<tr>" +
                    "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                    "<td>" + data.data.objs[index].uid + "</td>" +
                    "<td>" + aid(data.data.objs[index].aid) + "</td>" +
                    "<td>" + env(data.data.objs[index].env) + "</td>" +
                    "<td>" + client(data.data.objs[index].client) + "</td>" +
                    "<td>" + data.data.objs[index].mac + " </td>" +
                    "<td>" + data.data.objs[index].methodName + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].reqTime) + "</td>" +
                    "<td><textarea>" + data.data.objs[index].reqParam + "</textarea></td>" +
                    "<td><textarea>" + data.data.objs[index].resData + "</textarea></td>" +
                    "<td>" + data.data.objs[index].resCode + " </td>" +
                    "<td>" + formatDate(data.data.objs[index].resTime) + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                    "</tr>")
                    $("#tbody1").append($tr)

                });

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

    })

    //---------------------时间戳-------------------------------------------

    function formatDate(data) {
        return $.myTime.UnixToDate(data, true, 8);
    }

    //------------------------请求服务类型转换--------------------------------------------
    function aid(e) {
        switch(e) {

            case 0:
                return '商户服务'
                break;
            case 1:
                return '用户服务'
                break;
            case 2:
                return '运营服务'
                break;
        };
    }
    //------------------------生产环境类型转换--------------------------------------------
    function env(e) {
        switch(e) {
            case 0:
                return '开发'
                break;
            case 1:
                return '测试'
                break;
            case 2:
                return '生产'
                break;

        };
    }

    //------------------------请求系统类型转换--------------------------------------------
    function client(e) {
        switch(e) {
            case 0:
                return '未知'
                break;
            case 1:
                return 'ios'
                break;
            case 2:
                return 'android'
                break;
            case 3:
                return 'web'
                break;
        };
    }

   

})