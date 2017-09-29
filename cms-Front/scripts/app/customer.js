

define(['jquery','cookie','bootstrap','jqueryTime'],function ($) {


// $(document).ready(function() {

    var $tr = null;
    $("#tbody1").empty($tr)
    //--------------------全部反馈信息------------------------------------------
    $.ajax({
        type: "get",
         url:urlx("admin/messages.action"),
        async: true,
        headers: {
            "code": $.cookie("code"),
            "token": $.cookie("token")
        },

        dataType: "json",

        data: {
            "start": 0,
            "size": 20,

            //"type":0
        },
        success: function(data) {
            console.log(data)

            $.each(data.data.objs, function(index) {
                var a = data.data.objs[index].id
                var b = data.data.objs[index].type
                //		            	    console.log(data.data.objs[index].type)
                $tr = ("<tr >" +
                "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                "<td>" + changeNull(data.data.objs[index].name) + "</td>" +
                "<td>" + data.data.objs[index].mobile + "</td>" +
                "<td class='msg_width'>" + data.data.objs[index].msg + "</td>" +
                "<td>" + formatDate(data.data.objs[index].create_time) + "</td>" +
                "<td>" + qudao(data.data.objs[index].type) + "</td>" +
                "</tr>")
                $("#tbody1").append($tr)
            });

            //-------------------------------------
            $("#PrevPage").attr("disabled", true);
            $("#NextPage").attr("disabled", true);

            if(JSON.stringify(data.data.total) <= 20) {
                $("#NextPage").attr("disabled", true);
            } else {
                $("#NextPage").removeAttr("disabled");
            }

        }
    })
    //-------------------------------------状态显示反馈信息-----------------------------------------------------------------------
    $("#type1").on("change", function() {

        var $tr = null;
        $("#tbody1").empty($tr)
        $("#dishpageval1").val(0)
        console.log($("#dishpageval1").val())
        $("#change2").text(1)
        $("#Paging").css("display", "none")
        $("#Paging1").css("display", "block")
        $.ajax({
            type: "get",
             url:urlx("admin/messages.action"),
            async: true,
            headers: {
                "code": $.cookie("code"),
                "token": $.cookie("token")
            },

            dataType: "json",

            data: {
                "start": 0,
                "size": 20,
                "type": $("#type1").val().substring(0, 2)
                //"type":0
            },
            success: function(data) {
                console.log(data)
                $.each(data.data.objs, function(index) {
                    var a = data.data.objs[index].id
                    var b = data.data.objs[index].type
                    //		            	    console.log(data.data.objs[index].type)
                    $tr = ("<tr >" +
                    "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                    "<td>" + changeNull(data.data.objs[index].name) + "</td>" +
                    "<td>" + data.data.objs[index].mobile + "</td>" +
                    "<td class='msg_width'>" + data.data.objs[index].msg + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].create_time) + "</td>" +
                    "<td>" + qudao(data.data.objs[index].type) + "</td>" +
                    "</tr>")
                    $("#tbody1").append($tr)

                });
                //-------------------------------------
                $("#PrevPage1").attr("disabled", true);
                $("#NextPage1").attr("disabled", true);

                if(JSON.stringify(data.data.total) <= 20) {
                    $("#NextPage1").attr("disabled", true);
                } else {
                    $("#NextPage1").removeAttr("disabled");
                }
            }
        })
        //---------------------------------状态分页-------------------------------------------

        $("#NextPage1").click(function() {

            $("#tbody1").empty($tr)
            $("#change2").text(1)
            $("#PrevPage1").removeAttr("disabled");
            var dishstart1 = ($("#dishpageval1").val() - 0) + 20;
            $.ajax({
                type: "get",
                 url:urlx("admin/messages.action"),
                data: {

                    "start": dishstart1,
                    "size": 20,
                    "type": $("#type1").val().substring(0, 2)
                },
                dataType: "json",
                headers: {
                    "code": $.cookie("code"),
                    "token": $.cookie("token")
                },
                success: function(data) {
                    console.log(JSON.stringify(data.data.total))
                    $.each(data.data.objs, function(index) {
                        var a = data.data.objs[index].id
                        var b = data.data.objs[index].type

                        $tr = ("<tr >" +
                        "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                        "<td>" + changeNull(data.data.objs[index].name) + "</td>" +
                        "<td>" + data.data.objs[index].mobile + "</td>" +
                        "<td class='msg_width'>" + data.data.objs[index].msg + "</td>" +
                        "<td>" + formatDate(data.data.objs[index].create_time) + "</td>" +
                        "<td>" + qudao(data.data.objs[index].type) + "</td>" +
                        "</tr>")
                        $("#tbody1").append($tr)

                    });
                    $("#dishpageval1").val(dishstart1);
                    $("#change2").text($("#dishpageval1").val() / 20 + 1)

                    if(JSON.stringify(data.data.total) - 20 <= $("#dishpageval1").val()) {
                        $("#NextPage1").attr('disabled', true);
                    }

                },
                error: function(XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            });
        }); //下一页

        $("#NextPage1").unbind('click').click(function() {

            $("#tbody1").empty($tr)
            $("#change2").text(1)
            $("#PrevPage1").removeAttr("disabled");
            var dishstart1 = ($("#dishpageval1").val() - 0) + 20;
            $.ajax({
                type: "get",
                 url:urlx("admin/messages.action"),
                data: {

                    "start": dishstart1,
                    "size": 20,
                    "type": $("#type1").val().substring(0, 2)
                },
                dataType: "json",
                headers: {
                    "code": $.cookie("code"),
                    "token": $.cookie("token")
                },
                success: function(data) {
                    $.each(data.data.objs, function(index) {
                        var a = data.data.objs[index].id
                        var b = data.data.objs[index].type

                        $tr = ("<tr >" +
                        "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                        "<td>" + changeNull(data.data.objs[index].name) + "</td>" +
                        "<td>" + data.data.objs[index].mobile + "</td>" +
                        "<td class='msg_width'>" + data.data.objs[index].msg + "</td>" +
                        "<td>" + formatDate(data.data.objs[index].create_time) + "</td>" +
                        "<td>" + qudao(data.data.objs[index].type) + "</td>" +
                        "</tr>")
                        $("#tbody1").append($tr)

                    });
                    $("#dishpageval1").val(dishstart1);
                    $("#change2").text($("#dishpageval1").val() / 20 + 1)

                    if(JSON.stringify(data.data.total) - 20 <= $("#dishpageval1").val()) {
                        $("#NextPage1").attr('disabled', true);
                    }

                },
                error: function(XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            });
        }); //下一页

        $("#PrevPage1").click(function() {
            $("#tbody1").empty($tr)
            var dishstart2 = $("#dishpageval1").val() - 20;
            $("#NextPage1").removeAttr("disabled");
            if(dishstart2 < 0) {
                return dishstart2 = 0;
            }
            $.ajax({
                type: "get",
                 url:urlx("admin/messages.action"),
                data: {

                    "start": dishstart2,
                    "size": 20,
                    "type": $("#type1").val().substring(0, 2)
                },
                dataType: "json",
                headers: {
                    "code": $.cookie("code"),
                    "token": $.cookie("token")
                },

                success: function(data) {

                    $.each(data.data.objs, function(index) {
                        var a = data.data.objs[index].id
                        var b = data.data.objs[index].type

                        $tr = ("<tr >" +
                        "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                        "<td>" + changeNull(data.data.objs[index].name) + "</td>" +
                        "<td>" + data.data.objs[index].mobile + "</td>" +
                        "<td class='msg_width'>" + data.data.objs[index].msg + "</td>" +
                        "<td>" + formatDate(data.data.objs[index].create_time) + "</td>" +
                        "<td>" + qudao(data.data.objs[index].type) + "</td>" +
                        "</tr>")

                        $("#tbody1").append($tr)
                    });
                    $("#dishpageval1").val(dishstart2);
                    $("#change2").text($("#dishpageval1").val() / 20 + 1)
                    if(dishstart2 == 0) {
                        $("#PrevPage1").attr("disabled", true);
                    }

                },
                error: function(XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            });
        }); //上一页

        //解绑
        $("#PrevPage1").unbind('click').click(function() {
            $("#tbody1").empty($tr)
            var dishstart2 = $("#dishpageval1").val() - 20;
            $("#NextPage1").removeAttr("disabled");
            if(dishstart2 < 0) {
                return dishstart2 = 0;
            }
            $.ajax({
                type: "get",
                 url:urlx("admin/messages.action"),
                data: {

                    "start": dishstart2,
                    "size": 20,
                    "type": $("#type1").val().substring(0, 2)
                },
                dataType: "json",
                headers: {
                    "code": $.cookie("code"),
                    "token": $.cookie("token")
                },

                success: function(data) {

                    $.each(data.data.objs, function(index) {
                        var a = data.data.objs[index].id
                        var b = data.data.objs[index].type

                        $tr = ("<tr >" +
                        "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                        "<td>" + changeNull(data.data.objs[index].name) + "</td>" +
                        "<td>" + data.data.objs[index].mobile + "</td>" +
                        "<td class='msg_width'>" + data.data.objs[index].msg + "</td>" +
                        "<td>" + formatDate(data.data.objs[index].create_time) + "</td>" +
                        "<td>" + qudao(data.data.objs[index].type) + "</td>" +
                        "</tr>")

                        $("#tbody1").append($tr)
                    });
                    $("#dishpageval1").val(dishstart2);
                    $("#change2").text($("#dishpageval1").val() / 20 + 1)
                    if(dishstart2 == 0) {
                        $("#PrevPage1").attr("disabled", true);
                    }

                },
                error: function(XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            });
        }); //上一页
    }) //---------------------------------------------------全部列表分页----------------------------------------------
    if($("#dishpageval").val() == 0) {
        //	      			console.log("0")
        $("#PrevPage").attr("disabled", true);
    } //菜品列表分页相关

    $("#NextPage").click(function() {
        $("#tbody1").empty($tr)
        $("#change1").text(1)
        $("#PrevPage").removeAttr("disabled");
        var dishstart = ($("#dishpageval").val() - 0) + 20;
        $.ajax({
            type: "get",
             url:urlx("admin/messages.action"),
            data: {

                "start": dishstart,
                "size": 20
            },
            dataType: "json",
            headers: {
                "code": $.cookie("code"),
                "token": $.cookie("token")
            },
            success: function(data) {
                $.each(data.data.objs, function(index) {
                    var a = data.data.objs[index].id
                    var b = data.data.objs[index].type

                    $tr = ("<tr >" +
                    "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                    "<td>" + changeNull(data.data.objs[index].name) + "</td>" +
                    "<td>" + data.data.objs[index].mobile + "</td>" +
                    "<td class='msg_width'>" + data.data.objs[index].msg + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].create_time) + "</td>" +
                    "<td>" + qudao(data.data.objs[index].type) + "</td>" +
                    "</tr>")
                    $("#tbody1").append($tr)

                });
                $("#dishpageval").val(dishstart);
                $("#change1").text($("#dishpageval").val() / 20 + 1)

                if(JSON.stringify(data.data.total) - 20 <= $("#dishpageval").val()) {
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
        var dishstart = $("#dishpageval").val() - 20;
        $("#NextPage").removeAttr("disabled");
        if(dishstart < 0) {
            return dishstart = 0;
        }
        $.ajax({
            type: "get",
             url:urlx("admin/messages.action"),
            data: {

                "start": dishstart,
                "size": 20
            },
            dataType: "json",
            headers: {
                "code": $.cookie("code"),
                "token": $.cookie("token")
            },

            success: function(data) {

                $.each(data.data.objs, function(index) {
                    var a = data.data.objs[index].id
                    var b = data.data.objs[index].type

                    $tr = ("<tr >" +
                    "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                    "<td>" + changeNull(data.data.objs[index].name) + "</td>" +
                    "<td>" + data.data.objs[index].mobile + "</td>" +
                    "<td class='msg_width'>" + data.data.objs[index].msg + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].create_time) + "</td>" +
                    "<td>" + qudao(data.data.objs[index].type) + "</td>" +
                    "</tr>")

                    $("#tbody1").append($tr)
                });
                $("#dishpageval").val(dishstart);
                $("#change1").text($("#dishpageval").val() / 20 + 1)
                if(dishstart == 0) {
                    $("#PrevPage").attr("disabled", true);
                }

            },
            error: function(XmlHttpRequest, textStatus, errorThrown) {
                console.log("请求失败" + XmlHttpRequest.responseText);
            }
        });
    }); //上一页

    //-------------------------------渠道类型转换-------------------------------------------------

    function qudao(e) {
        switch(e) {
            case 1:
                return '用户app的反馈'
                break;
            case 2:
                return '护工app的反馈'
                break;
            case 3:
                return '官网的反馈信息'
                break;

        };
    };
    //-----------------------------name转换--------------------------------------------------------
    



    var changeNull = function (str) {
        if(str === null){
            return '未填写称呼';
        }

        return str;
    };


    //---------------------时间戳-------------------------------------------

    var formatDate = function (data) {
        return $.myTime.UnixToDate(data, true, 8);
    };


// });

});