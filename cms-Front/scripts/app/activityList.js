/**
 * Created by HJJ on 2017/3/1.
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
$(document).ready(function () {



    $.ajax({
        type: "get",
        url:urlx("admin/favors.action"),
        async: true,
        headers: {
            "code": $.cookie("code"),
            "token": $.cookie("token")
        },

        dataType: "json",

        data: {
            "start": 0,
            "size": 20,
        },
        success: function (data) {
            if(data.data.objs.length === 0){
                $('.noData').css("display","block");
            } else {
                $('.noData').css("display","none");
                $.each(data.data.objs, function (index) {
                    console.log(data);
                    var a = data.data.objs[index].id
                    var b = data.data.objs[index].bid
                    var c = data.data.objs[index].type

                    $tr = ("<tr >" +
                    // "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                    "<td goodid=" + b + ">" + data.data.objs[index].bid + "</td>" +
                    "<td>" + data.data.objs[index].bname + "</td>" +
                    "<td>" + data.data.objs[index].title + "</td>" +
                    "<td>" + changeNull(data.data.objs[index].amount) + "</td>" +
                    "<td goodid=" + c + ">" + Type(data.data.objs[index].type) + "</td>" +
                    "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                    "<td class='activityDelete'><a data-toggle='modal' data-target='#myModal' >删除</a></td>" +
                    "<td class='shopInfo'><a data-toggle='modal' data-target='#infoModal' >店铺详情</a></td>" +
                    "</tr>")
                    $("#tbody1").append($tr);
                });
            }

            $('.shopInfo').on('click',function () {
                index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                $.ajax({
                    type: "post",
                    url:urlx("admin/getBZ.action"),
                    headers: {
                        "code": $.cookie("code"),
                        "token": $.cookie("token")
                    },
                    dataType: "json",
                    data: {
                        "id": index2,
                    },
                    success: function (data) {
                        console.log(data.data);
                        console.log(data.data.id);
                        switch (JSON.stringify(data.code)) {
                            case '"A00000"':
                                $('.name').html(data.data.name);
                                $('.mobile').html(data.data.mobile);
                                $('.address').html(data.data.address);
                                break;
                            default:
                                console.log("请求失败")

                        }
                    },
                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                        console.log("请求失败" + XmlHttpRequest.responseText);
                    }
                });

            });




            /**
             * 解绑
             */
            $('.shopInfo').unbind('click').click(function () {
                index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                $.ajax({
                    type: "post",
                    url:urlx("admin/getBZ.action"),
                    headers: {
                        "code": $.cookie("code"),
                        "token": $.cookie("token")
                    },
                    dataType: "json",
                    data: {
                        "id": index2,
                    },
                    success: function (data) {
                        console.log(data.data);
                        console.log(data.data.id);
                        switch (JSON.stringify(data.code)) {
                            case '"A00000"':
                                $('.name').html(data.data.name);
                                $('.mobile').html(data.data.mobile);
                                $('.address').html(data.data.address);
                                break;
                            default:
                                console.log("请求失败")

                        }
                    },
                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                        console.log("请求失败" + XmlHttpRequest.responseText);
                    }
                });
            })



                $('.activityDelete').on("click", function () {

                    // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                    // console.log(index1)
                    console.log(index2)
                    console.log(index3)

                    $('.delete-activity').on('click', function () {
                        $.ajax({
                            type: "post",
                            url:urlx("admin/delPlan.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "bid": index2,
                                "type": index3

                            },
                            success: function (data) {
                                console.log(data)
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        alert("删除成功")
                                        location.reload()
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });
                    })

                });

                /**
                 * 删除事件的解绑任务
                 */
                $('.activityDelete').unbind('click').click(function () {

                    // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                    // console.log(index1)
                    console.log(index2)
                    console.log(index3)

                    $('.delete-activity').on('click', function () {
                        $.ajax({
                            type: "post",
                            url:urlx("admin/delPlan.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "bid": index2,
                                "type": index3

                            },
                            success: function (data) {
                                console.log(data)
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        alert("删除成功")
                                        location.reload()
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });
                    })

                })




            $("#PrevPage").attr("disabled", true);
            $("#NextPage").attr("disabled", true);

            if (JSON.stringify(data.data.total) <= 20) {
                $("#NextPage").attr("disabled", true);
            } else {
                $("#NextPage").removeAttr("disabled");
            }
        }


    });


    $("#type1").on("change", function () {

        var $tr = null;
        $("#tbody1").empty($tr)
        $("#dishpageval1").val(0)
        console.log($("#dishpageval1").val())
        $("#change2").text(1)
        $("#Paging").css("display", "none")
        $("#Paging1").css("display", "block")
        $.ajax({
            type: "get",
            url:urlx("admin/favors.action"),
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
            success: function (data) {
                console.log(data.data.objs.length);
                if(data.data.objs.length === 0){
                    $('.noData').css("display","block");
                } else {
                    $('.noData').css("display","none");
                    $.each(data.data.objs, function (index) {
                        console.log(data);
                        var a = data.data.objs[index].id
                        var b = data.data.objs[index].bid
                        var c = data.data.objs[index].type

                        $tr = ("<tr >" +
                        // "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                        "<td goodid=" + b + ">" + data.data.objs[index].bid + "</td>" +
                        "<td>" + data.data.objs[index].bname + "</td>" +
                        "<td>" + data.data.objs[index].title + "</td>" +
                        "<td>" + changeNull(data.data.objs[index].amount) + "</td>" +
                        "<td goodid=" + c + ">" + Type(data.data.objs[index].type) + "</td>" +
                        "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                        "<td class='activityDelete'><a data-toggle='modal' data-target='#myModal' >删除</a></td>" +
                        "<td class='shopInfo'><a data-toggle='modal' data-target='#infoModal' >店铺详情</a></td>" +
                        "</tr>")
                        $("#tbody1").append($tr);
                    });
                }


                $('.shopInfo').on('click',function () {
                    index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    $.ajax({
                        type: "post",
                        url:urlx("admin/getBZ.action"),
                        headers: {
                            "code": $.cookie("code"),
                            "token": $.cookie("token")
                        },
                        dataType: "json",
                        data: {
                            "id": index2,
                        },
                        success: function (data) {
                            console.log(data.data);
                            console.log(data.data.id);
                            switch (JSON.stringify(data.code)) {
                                case '"A00000"':
                                    $('.name').html(data.data.name);
                                    $('.mobile').html(data.data.mobile);
                                    $('.address').html(data.data.address);
                                    break;
                                default:
                                    console.log("请求失败")

                            }
                        },
                        error: function (XmlHttpRequest, textStatus, errorThrown) {
                            console.log("请求失败" + XmlHttpRequest.responseText);
                        }
                    });

                });




                /**
                 * 解绑
                 */
                $('.shopInfo').unbind('click').click(function () {
                    index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    $.ajax({
                        type: "post",
                        url:urlx("admin/getBZ.action"),
                        headers: {
                            "code": $.cookie("code"),
                            "token": $.cookie("token")
                        },
                        dataType: "json",
                        data: {
                            "id": index2,
                        },
                        success: function (data) {
                            console.log(data.data);
                            console.log(data.data.id);
                            switch (JSON.stringify(data.code)) {
                                case '"A00000"':
                                    $('.name').html(data.data.name);
                                    $('.mobile').html(data.data.mobile);
                                    $('.address').html(data.data.address);
                                    break;
                                default:
                                    console.log("请求失败")

                            }
                        },
                        error: function (XmlHttpRequest, textStatus, errorThrown) {
                            console.log("请求失败" + XmlHttpRequest.responseText);
                        }
                    });
                })



                $('.activityDelete').on("click", function () {

                    // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                    // console.log(index1)
                    console.log(index2)
                    console.log(index3)

                    $('.delete-activity').on('click', function () {
                        $.ajax({
                            type: "post",
                            url:urlx("admin/delPlan.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "bid": index2,
                                "type": index3

                            },
                            success: function (data) {
                                console.log(data)
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        alert("删除成功")
                                        location.reload()
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });
                    })

                });

                /**
                 * 删除事件的解绑任务
                 */
                $('.activityDelete').unbind('click').click(function () {

                    // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                    index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                    // console.log(index1)
                    console.log(index2)
                    console.log(index3)

                    $('.delete-activity').on('click', function () {
                        $.ajax({
                            type: "post",
                            url:urlx("admin/delPlan.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "bid": index2,
                                "type": index3

                            },
                            success: function (data) {
                                console.log(data)
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        alert("删除成功")
                                        location.reload()
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });
                    })

                })




                $("#PrevPage").attr("disabled", true);
                $("#NextPage").attr("disabled", true);

                if (JSON.stringify(data.data.total) <= 20) {
                    $("#NextPage").attr("disabled", true);
                } else {
                    $("#NextPage").removeAttr("disabled");
                }
            }
        })
        //---------------------------------状态分页-------------------------------------------

        $("#NextPage1").click(function () {

            $("#tbody1").empty($tr)
            $("#change2").text(1)
            $("#PrevPage1").removeAttr("disabled");
            var dishstart1 = ($("#dishpageval1").val() - 0) + 20;
            $.ajax({
                type: "get",
                url:urlx("admin/favors.action"),
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
                success: function (data) {
                    if(data.data.objs.length === 0){
                        $('.noData').css("display","block");
                    } else {
                        $('.noData').css("display","none");
                        $.each(data.data.objs, function (index) {
                            console.log(data);
                            var a = data.data.objs[index].id
                            var b = data.data.objs[index].bid
                            var c = data.data.objs[index].type

                            $tr = ("<tr >" +
                            // "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                            "<td goodid=" + b + ">" + data.data.objs[index].bid + "</td>" +
                            "<td>" + data.data.objs[index].bname + "</td>" +
                            "<td>" + data.data.objs[index].title + "</td>" +
                            "<td>" + changeNull(data.data.objs[index].amount) + "</td>" +
                            "<td goodid=" + c + ">" + Type(data.data.objs[index].type) + "</td>" +
                            "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                            "<td class='activityDelete'><a data-toggle='modal' data-target='#myModal' >删除</a></td>" +
                            "<td class='shopInfo'><a data-toggle='modal' data-target='#infoModal' >店铺详情</a></td>" +
                            "</tr>")
                            $("#tbody1").append($tr);
                        });
                    }


                    $('.shopInfo').on('click',function () {
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        $.ajax({
                            type: "post",
                            url:urlx("admin/getBZ.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "id": index2,
                            },
                            success: function (data) {
                                console.log(data.data);
                                console.log(data.data.id);
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        $('.name').html(data.data.name);
                                        $('.mobile').html(data.data.mobile);
                                        $('.address').html(data.data.address);
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });

                    });




                    /**
                     * 解绑
                     */
                    $('.shopInfo').unbind('click').click(function () {
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        $.ajax({
                            type: "post",
                            url:urlx("admin/getBZ.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "id": index2,
                            },
                            success: function (data) {
                                console.log(data.data);
                                console.log(data.data.id);
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        $('.name').html(data.data.name);
                                        $('.mobile').html(data.data.mobile);
                                        $('.address').html(data.data.address);
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });
                    })



                    $('.activityDelete').on("click", function () {

                        // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                        // console.log(index1)
                        console.log(index2)
                        console.log(index3)

                        $('.delete-activity').on('click', function () {
                            $.ajax({
                                type: "post",
                                url:urlx("admin/delPlan.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {
                                    "bid": index2,
                                    "type": index3

                                },
                                success: function (data) {
                                    console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            alert("删除成功")
                                            location.reload()
                                            break;
                                        default:
                                            console.log("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });
                        })

                    });

                    /**
                     * 删除事件的解绑任务
                     */
                    $('.activityDelete').unbind('click').click(function () {

                        // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                        // console.log(index1)
                        console.log(index2)
                        console.log(index3)

                        $('.delete-activity').on('click', function () {
                            $.ajax({
                                type: "post",
                                url:urlx("admin/delPlan.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {
                                    "bid": index2,
                                    "type": index3

                                },
                                success: function (data) {
                                    console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            alert("删除成功")
                                            location.reload()
                                            break;
                                        default:
                                            console.log("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });
                        })

                    })




                    $("#PrevPage").attr("disabled", true);
                    $("#NextPage").attr("disabled", true);

                    if (JSON.stringify(data.data.total) <= 20) {
                        $("#NextPage").attr("disabled", true);
                    } else {
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            });
        }); //下一页

        $("#NextPage1").unbind('click').click(function () {

            $("#tbody1").empty($tr)
            $("#change2").text(1)
            $("#PrevPage1").removeAttr("disabled");
            var dishstart1 = ($("#dishpageval1").val() - 0) + 20;
            $.ajax({
                type: "get",
                url:urlx("admin/favors.action"),
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
                success: function (data) {
                    if(data.data.objs.length === 0){
                        $('.noData').css("display","block");
                    } else {
                        $('.noData').css("display","none");
                        $.each(data.data.objs, function (index) {
                            console.log(data);
                            var a = data.data.objs[index].id
                            var b = data.data.objs[index].bid
                            var c = data.data.objs[index].type

                            $tr = ("<tr >" +
                            // "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                            "<td goodid=" + b + ">" + data.data.objs[index].bid + "</td>" +
                            "<td>" + data.data.objs[index].bname + "</td>" +
                            "<td>" + data.data.objs[index].title + "</td>" +
                            "<td>" + changeNull(data.data.objs[index].amount) + "</td>" +
                            "<td goodid=" + c + ">" + Type(data.data.objs[index].type) + "</td>" +
                            "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                            "<td class='activityDelete'><a data-toggle='modal' data-target='#myModal' >删除</a></td>" +
                            "<td class='shopInfo'><a data-toggle='modal' data-target='#infoModal' >店铺详情</a></td>" +
                            "</tr>")
                            $("#tbody1").append($tr);
                        });
                    }


                    $('.shopInfo').on('click',function () {
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        $.ajax({
                            type: "post",
                            url:urlx("admin/getBZ.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "id": index2,
                            },
                            success: function (data) {
                                console.log(data.data);
                                console.log(data.data.id);
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        $('.name').html(data.data.name);
                                        $('.mobile').html(data.data.mobile);
                                        $('.address').html(data.data.address);
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });

                    });




                    /**
                     * 解绑
                     */
                    $('.shopInfo').unbind('click').click(function () {
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        $.ajax({
                            type: "post",
                            url:urlx("admin/getBZ.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "id": index2,
                            },
                            success: function (data) {
                                console.log(data.data);
                                console.log(data.data.id);
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        $('.name').html(data.data.name);
                                        $('.mobile').html(data.data.mobile);
                                        $('.address').html(data.data.address);
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });
                    })



                    $('.activityDelete').on("click", function () {

                        // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                        // console.log(index1)
                        console.log(index2)
                        console.log(index3)

                        $('.delete-activity').on('click', function () {
                            $.ajax({
                                type: "post",
                                url:urlx("admin/delPlan.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {
                                    "bid": index2,
                                    "type": index3

                                },
                                success: function (data) {
                                    console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            alert("删除成功")
                                            location.reload()
                                            break;
                                        default:
                                            console.log("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });
                        })

                    });

                    /**
                     * 删除事件的解绑任务
                     */
                    $('.activityDelete').unbind('click').click(function () {

                        // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                        // console.log(index1)
                        console.log(index2)
                        console.log(index3)

                        $('.delete-activity').on('click', function () {
                            $.ajax({
                                type: "post",
                                url:urlx("admin/delPlan.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {
                                    "bid": index2,
                                    "type": index3

                                },
                                success: function (data) {
                                    console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            alert("删除成功")
                                            location.reload()
                                            break;
                                        default:
                                            console.log("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });
                        })

                    })




                    $("#PrevPage").attr("disabled", true);
                    $("#NextPage").attr("disabled", true);

                    if (JSON.stringify(data.data.total) <= 20) {
                        $("#NextPage").attr("disabled", true);
                    } else {
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            });
        }); //下一页

        $("#PrevPage1").click(function () {
            $("#tbody1").empty($tr)
            var dishstart2 = $("#dishpageval1").val() - 20;
            $("#NextPage1").removeAttr("disabled");
            if (dishstart2 < 0) {
                return dishstart2 = 0;
            }
            $.ajax({
                type: "get",
                url:urlx("admin/favors.action"),
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

                success: function (data) {
                    if(data.data.objs.length === 0){
                        $('.noData').css("display","block");
                    } else {
                        $('.noData').css("display","none");
                        $.each(data.data.objs, function (index) {
                            console.log(data);
                            var a = data.data.objs[index].id
                            var b = data.data.objs[index].bid
                            var c = data.data.objs[index].type

                            $tr = ("<tr >" +
                            // "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                            "<td goodid=" + b + ">" + data.data.objs[index].bid + "</td>" +
                            "<td>" + data.data.objs[index].bname + "</td>" +
                            "<td>" + data.data.objs[index].title + "</td>" +
                            "<td>" + changeNull(data.data.objs[index].amount) + "</td>" +
                            "<td goodid=" + c + ">" + Type(data.data.objs[index].type) + "</td>" +
                            "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                            "<td class='activityDelete'><a data-toggle='modal' data-target='#myModal' >删除</a></td>" +
                            "<td class='shopInfo'><a data-toggle='modal' data-target='#infoModal' >店铺详情</a></td>" +
                            "</tr>")
                            $("#tbody1").append($tr);
                        });
                    }


                    $('.shopInfo').on('click',function () {
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        $.ajax({
                            type: "post",
                            url:urlx("admin/getBZ.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "id": index2,
                            },
                            success: function (data) {
                                console.log(data.data);
                                console.log(data.data.id);
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        $('.name').html(data.data.name);
                                        $('.mobile').html(data.data.mobile);
                                        $('.address').html(data.data.address);
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });

                    });




                    /**
                     * 解绑
                     */
                    $('.shopInfo').unbind('click').click(function () {
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        $.ajax({
                            type: "post",
                            url:urlx("admin/getBZ.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "id": index2,
                            },
                            success: function (data) {
                                console.log(data.data);
                                console.log(data.data.id);
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        $('.name').html(data.data.name);
                                        $('.mobile').html(data.data.mobile);
                                        $('.address').html(data.data.address);
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });
                    })



                    $('.activityDelete').on("click", function () {

                        // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                        // console.log(index1)
                        console.log(index2)
                        console.log(index3)

                        $('.delete-activity').on('click', function () {
                            $.ajax({
                                type: "post",
                                url:urlx("admin/delPlan.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {
                                    "bid": index2,
                                    "type": index3

                                },
                                success: function (data) {
                                    console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            alert("删除成功")
                                            location.reload()
                                            break;
                                        default:
                                            console.log("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });
                        })

                    });

                    /**
                     * 删除事件的解绑任务
                     */
                    $('.activityDelete').unbind('click').click(function () {

                        // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                        // console.log(index1)
                        console.log(index2)
                        console.log(index3)

                        $('.delete-activity').on('click', function () {
                            $.ajax({
                                type: "post",
                                url:urlx("admin/delPlan.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {
                                    "bid": index2,
                                    "type": index3

                                },
                                success: function (data) {
                                    console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            alert("删除成功")
                                            location.reload()
                                            break;
                                        default:
                                            console.log("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });
                        })

                    })




                    $("#PrevPage").attr("disabled", true);
                    $("#NextPage").attr("disabled", true);

                    if (JSON.stringify(data.data.total) <= 20) {
                        $("#NextPage").attr("disabled", true);
                    } else {
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            });
        }); //上一页

        //解绑
        $("#PrevPage1").unbind('click').click(function () {
            $("#tbody1").empty($tr)
            var dishstart2 = $("#dishpageval1").val() - 20;
            $("#NextPage1").removeAttr("disabled");
            if (dishstart2 < 0) {
                return dishstart2 = 0;
            }
            $.ajax({
                type: "get",
                url:urlx("admin/favors.action"),
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

                success: function (data) {
                    if(data.data.objs.length === 0){
                        $('.noData').css("display","block");
                    } else {
                        $('.noData').css("display","none");
                        $.each(data.data.objs, function (index) {
                            console.log(data);
                            var a = data.data.objs[index].id
                            var b = data.data.objs[index].bid
                            var c = data.data.objs[index].type

                            $tr = ("<tr >" +
                            // "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                            "<td goodid=" + b + ">" + data.data.objs[index].bid + "</td>" +
                            "<td>" + data.data.objs[index].bname + "</td>" +
                            "<td>" + data.data.objs[index].title + "</td>" +
                            "<td>" + changeNull(data.data.objs[index].amount) + "</td>" +
                            "<td goodid=" + c + ">" + Type(data.data.objs[index].type) + "</td>" +
                            "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                            "<td class='activityDelete'><a data-toggle='modal' data-target='#myModal' >删除</a></td>" +
                            "<td class='shopInfo'><a data-toggle='modal' data-target='#infoModal' >店铺详情</a></td>" +
                            "</tr>")
                            $("#tbody1").append($tr);
                        });
                    }


                    $('.shopInfo').on('click',function () {
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        $.ajax({
                            type: "post",
                            url:urlx("admin/getBZ.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "id": index2,
                            },
                            success: function (data) {
                                console.log(data.data);
                                console.log(data.data.id);
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        $('.name').html(data.data.name);
                                        $('.mobile').html(data.data.mobile);
                                        $('.address').html(data.data.address);
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });

                    });




                    /**
                     * 解绑
                     */
                    $('.shopInfo').unbind('click').click(function () {
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        $.ajax({
                            type: "post",
                            url:urlx("admin/getBZ.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {
                                "id": index2,
                            },
                            success: function (data) {
                                console.log(data.data);
                                console.log(data.data.id);
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        $('.name').html(data.data.name);
                                        $('.mobile').html(data.data.mobile);
                                        $('.address').html(data.data.address);
                                        break;
                                    default:
                                        console.log("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });
                    })



                    $('.activityDelete').on("click", function () {

                        // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                        // console.log(index1)
                        console.log(index2)
                        console.log(index3)

                        $('.delete-activity').on('click', function () {
                            $.ajax({
                                type: "post",
                                url:urlx("admin/delPlan.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {
                                    "bid": index2,
                                    "type": index3

                                },
                                success: function (data) {
                                    console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            alert("删除成功")
                                            location.reload()
                                            break;
                                        default:
                                            console.log("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });
                        })

                    });

                    /**
                     * 删除事件的解绑任务
                     */
                    $('.activityDelete').unbind('click').click(function () {

                        // index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index2 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                        index3 = $(this).parents('tr').children("td").eq(4).attr('goodid')
                        // console.log(index1)
                        console.log(index2)
                        console.log(index3)

                        $('.delete-activity').on('click', function () {
                            $.ajax({
                                type: "post",
                                url:urlx("admin/delPlan.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {
                                    "bid": index2,
                                    "type": index3

                                },
                                success: function (data) {
                                    console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            alert("删除成功")
                                            location.reload()
                                            break;
                                        default:
                                            console.log("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });
                        })

                    })




                    $("#PrevPage").attr("disabled", true);
                    $("#NextPage").attr("disabled", true);

                    if (JSON.stringify(data.data.total) <= 20) {
                        $("#NextPage").attr("disabled", true);
                    } else {
                        $("#NextPage").removeAttr("disabled");
                    }
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            });
        }); //上一页








    });

    function Type(e) {
        switch (e) {
            case 1:
                return '店铺首单优惠'
                break;
            case 2:
                return '满减优惠'
                break;

        }
        ;
    };
    //-----------------------------name转换--------------------------------------------------------
    function name(e) {
        switch (e) {
            case null:
                return '未填写称呼'
                break;

        }
        ;
    }


    //---------------------时间戳-------------------------------------------

    function formatDate(data) {
        return $.myTime.UnixToDate(data, true, 8);
    }

    /**
     * 转换null
     * @param showAmount
     * @returns {*}
     */
    function changeNull(showAmount) {
        if (showAmount == null) {
            var str = "没有设置优惠额度";
            return str;
        }
        return showAmount + " 元";

    }
});