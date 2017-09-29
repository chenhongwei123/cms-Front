/**
 * Created by HJJ on 2017/2/28.
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

define(['jquery','cookie','jqueryTime','bootstrap'],function ($) {


// $(document).ready(function () {
    
    /**
     * 显示列表ajax
     */
    $.ajax({
        type: "get",
         url:urlx("admin/business.action"),
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

            console.log(data);
            $.each(data.data.objs, function (index) {

                var getShopId = data.data.objs[index].id;
                // shopIdArray.push(getShopId);

                var shopType = data.data.objs[index].type;
                $tr = ("<tr >" +
                "<td goodid=" + getShopId + ">" + data.data.objs[index].id + "</td>" +
                "<td shopType=" + shopType + ">" + shanghu(data.data.objs[index].type) + "</td>" +
                "<td>" + data.data.objs[index].name + "</td>" +
                "<td>" + data.data.objs[index].mobile + "</td>" +
                "<td>" + data.data.objs[index].fare + "</td>" +
                "<td>" + data.data.objs[index].lowest + "</td>" +
                "<td class='cmsFirst'><a href='createActivity.html'>活动创建</a></td>" +
                "</tr>")
                $("#tbody1").append($tr)
            });

            // console.log(shopIdArray);

            /**
             * 点击事件&解绑事件
             */
            $(".cmsFirst").on("click",function () {
                var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                var shopName = $(this).parents('tr').children("td").eq(2).text();
                var fare = $(this).parents('tr').children("td").eq(4).text();
                var lowest = $(this).parents('tr').children("td").eq(5).text();
                localStorage.setItem("id",shopId);
                localStorage.setItem("shopName",shopName);
                localStorage.setItem("fare",fare);
                localStorage.setItem("lowest",lowest);
                console.log(shopId);
                console.log(shopName);

                

            })
            $(".cmsFirst").unbind("click").click(function (e) {
                var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                var shopName = $(this).parents('tr').children("td").eq(2).text();
                var fare = $(this).parents('tr').children("td").eq(4).text();
                var lowest = $(this).parents('tr').children("td").eq(5).text();
                localStorage.setItem("id",shopId);
                localStorage.setItem("shopName",shopName);
                localStorage.setItem("fare",fare);
                localStorage.setItem("lowest",lowest);
                console.log(shopId);
                console.log(shopName);
            });


            /**
             * 分页设置
             */
            $("#PrevPage").attr("disabled", true);
            $("#NextPage").attr("disabled", true);

            if(JSON.stringify(data.data.total) < 20) {
                $("#NextPage").attr("disabled", true);
            } else {
                $("#NextPage").removeAttr("disabled");
            }
        }
    });

    

    /**
     * 搜索ajax
     */
    $("#searchOrder").on("click",function () {

        $("#audit1").css("display", "none")
        $("#audit2").css("display", "none")
        $("#audit3").css("display", "block")

        $("#Paging").css("display", "none")
        $("#tbody1").empty($tr)
        $("#change1").text(1)


        if($(".select").val() == "通过食堂名称搜索") {
            $.ajax({
                type: "get",
                 url:urlx("admin/business.action"),
                data: {
                    "start": 0,
                    "size": 1000,
                    "name": $(".wd").val(),
                },
                dataType: "json",
                headers: {
                    "code": $.cookie("code"),
                    "token": $.cookie("token")
                },
                success: function(data) {
                    console.log(data)
                    $.each(data.data.objs, function (index) {

                        var getShopId = data.data.objs[index].id;
                        var shopType = data.data.objs[index].type;
                        $tr = ("<tr >" +
                        "<td goodid=" + getShopId + ">" + data.data.objs[index].id + "</td>" +
                        "<td shopType=" + shopType + ">" + shanghu(data.data.objs[index].type) + "</td>" +
                        "<td>" + data.data.objs[index].name + "</td>" +
                        "<td>" + data.data.objs[index].mobile + "</td>" +
                        "<td>" + data.data.objs[index].fare + "</td>" +
                        "<td>" + data.data.objs[index].lowest + "</td>" +
                        "<td class='cmsFirst'><a href='createActivity.html'>活动创建</a></td>" +
                        "</tr>")
                        $("#tbody1").append($tr)
                    });

                    /**
                     * 绑定事件&解绑事件
                     */
                    $(".cmsFirst").on("click",function () {
                        var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                        var shopName = $(this).parents('tr').children("td").eq(2).text();
                        var lowest = $(this).parents('tr').children("td").eq(5).text();
                        localStorage.setItem("id",shopId);
                        localStorage.setItem("shopName",shopName);
                        localStorage.setItem("lowest",lowest);
                        console.log(shopId);
                    })
                    $(".cmsFirst").unbind("click").click(function (e) {
                        var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                        var shopName = $(this).parents('tr').children("td").eq(2).text();
                        var lowest = $(this).parents('tr').children("td").eq(5).text();
                        localStorage.setItem("id",shopId);
                        localStorage.setItem("shopName",shopName);
                        localStorage.setItem("lowest",lowest);
                        console.log(shopId);
                    });


                    /**
                     * 分页
                     */
                    $("#PrevPage").attr("disabled", true);
                    $("#NextPage").attr("disabled", true);

                    if(JSON.stringify(data.data.total) < 20) {
                        $("#NextPage").attr("disabled", true);
                    } else {
                        $("#NextPage").removeAttr("disabled");
                    }

                },
                error: function(XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            })
        } else {
            $.ajax({
                type: "get",
                 url:urlx("admin/business.action"),
                data: {
                    "start": 0,
                    "size": 1000,
                    "mobile": $(".wd").val(),
                },
                dataType: "json",
                headers: {
                    "code": $.cookie("code"),
                    "token": $.cookie("token")
                },
                success: function (data) {
                    console.log(data)
                    $.each(data.data.objs, function (index) {
                        var a = data.data.objs[index].id
                        var b = data.data.objs[index].type
                        console.log(data.data.objs[index].ctype)

                        $tr = ("<tr >" +
                        "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                        "<td goodid=" + b + ">" + shanghu(data.data.objs[index].type) + "</td>" +
                        "<td>" + data.data.objs[index].name + "</td>" +
                        "<td>" + data.data.objs[index].mobile + "</td>" +
                        "<td>" + data.data.objs[index].fare + "</td>" +
                        "<td>" + data.data.objs[index].lowest + "</td>" +
                        "<td class='cmsFirst'><a href='createActivity.html'>活动创建</a></td>" +
                        "</tr>")
                        $("#tbody1").append($tr)

                    });

                    /**
                     * 绑定事件&解绑事件
                     */
                    $(".cmsFirst").on("click",function () {
                        var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                        var shopName = $(this).parents('tr').children("td").eq(2).text();
                        var lowest = $(this).parents('tr').children("td").eq(5).text();
                        localStorage.setItem("id",shopId);
                        localStorage.setItem("shopName",shopName);
                        localStorage.setItem("lowest",lowest);
                        console.log(shopId);
                    })
                    $(".cmsFirst").unbind("click").click(function (e) {
                        var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                        var shopName = $(this).parents('tr').children("td").eq(2).text();
                        var lowest = $(this).parents('tr').children("td").eq(5).text();
                        localStorage.setItem("id",shopId);
                        localStorage.setItem("shopName",shopName);
                        localStorage.setItem("lowest",lowest);
                        console.log(shopId);
                    });

                    /**
                     * 分页
                     */
                    $("#PrevPage").attr("disabled", true);
                    $("#NextPage").attr("disabled", true);

                    if (JSON.stringify(data.data.total) < 20) {
                        $("#NextPage").attr("disabled", true);
                    } else {
                        $("#NextPage").removeAttr("disabled");
                    }

                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    console.log("请求失败" + XmlHttpRequest.responseText);
                }
            });
        }

    });

    /**
     * 全部列表分页
     */
    if($("#dishpageval").val() == 0) {
        //	      			console.log("0")
        $("#PrevPage").attr("disabled", true);
    } //菜品列表分页相关

    $("#NextPage").on("click",function () {
        $("#tbody1").empty($tr)
        $("#change1").text(1)
        $("#PrevPage").removeAttr("disabled");
        var dishstart = ($("#dishpageval").val() - 0) + 20;

        $.ajax({
            type: "get",
             url:urlx("admin/business.action"),
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
                $.each(data.data.objs, function (index) {

                    var getShopId = data.data.objs[index].id;
                    var shopType = data.data.objs[index].type;
                    $tr = ("<tr >" +
                    "<td goodid=" + getShopId + ">" + data.data.objs[index].id + "</td>" +
                    "<td shopType=" + shopType + ">" + shanghu(data.data.objs[index].type) + "</td>" +
                    "<td>" + data.data.objs[index].name + "</td>" +
                    "<td>" + data.data.objs[index].mobile + "</td>" +
                    "<td>" + data.data.objs[index].fare + "</td>" +
                    "<td>" + data.data.objs[index].lowest + "</td>" +
                    "<td class='cmsFirst'><a href='createActivity.html'>活动创建</a></td>" +
                    "</tr>")
                    $("#tbody1").append($tr)
                });

                /**
                 * 绑定事件&解绑事件
                 */
                $(".cmsFirst").on("click",function () {
                    var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                    var shopName = $(this).parents('tr').children("td").eq(2).text();
                    var lowest = $(this).parents('tr').children("td").eq(5).text();
                    localStorage.setItem("id",shopId);
                    localStorage.setItem("shopName",shopName);
                    localStorage.setItem("lowest",lowest);
                    console.log(shopId);
                })
                $(".cmsFirst").unbind("click").click(function (e) {
                    var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                    var shopName = $(this).parents('tr').children("td").eq(2).text();
                    var lowest = $(this).parents('tr').children("td").eq(5).text();
                    localStorage.setItem("id",shopId);
                    localStorage.setItem("shopName",shopName);
                    localStorage.setItem("lowest",lowest);
                    console.log(shopId);
                });


                /**
                 * 分页
                 */
                $("#dishpageval").val(dishstart);
                $("#change1").text($("#dishpageval").val() / 20 + 1)

                if(JSON.stringify(data.data.total) - 20 <= $("#dishpageval").val()) {
                    $("#NextPage").attr('disabled', true);
                }
            },

            error: function(XmlHttpRequest, textStatus, errorThrown) {
                console.log("请求失败" + XmlHttpRequest.responseText);
            }
        })
    });

    /**
     * 下一页
     */
    $("#PrevPage").on("click",function () {
        $("#tbody1").empty($tr)
        var dishstart = $("#dishpageval").val() - 20;
        $("#NextPage").removeAttr("disabled");
        if(dishstart < 0) {
            return dishstart = 0;
        }

        $.ajax({
            type: "get",
             url:urlx("admin/business.action"),
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

                $.each(data.data.objs, function (index) {

                    var getShopId = data.data.objs[index].id;
                    var shopType = data.data.objs[index].type;
                    $tr = ("<tr >" +
                    "<td goodid=" + getShopId + ">" + data.data.objs[index].id + "</td>" +
                    "<td shopType=" + shopType + ">" + shanghu(data.data.objs[index].type) + "</td>" +
                    "<td>" + data.data.objs[index].name + "</td>" +
                    "<td>" + data.data.objs[index].mobile + "</td>" +
                    "<td>" + data.data.objs[index].fare + "</td>" +
                    "<td>" + data.data.objs[index].lowest + "</td>" +
                    "<td class='cmsFirst'><a href='createActivity.html'>活动创建</a></td>" +
                    "</tr>")
                    $("#tbody1").append($tr)
                });

                /**
                 * 绑定事件&解绑事件
                 */
                $(".cmsFirst").on("click",function () {
                    var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                    var shopName = $(this).parents('tr').children("td").eq(2).text();
                    var lowest = $(this).parents('tr').children("td").eq(5).text();
                    localStorage.setItem("id",shopId);
                    localStorage.setItem("shopName",shopName);
                    localStorage.setItem("lowest",lowest);
                    console.log(shopId);
                });
                $(".cmsFirst").unbind("click").click(function (e) {
                    var shopId = $(this).parents('tr').children("td").eq(0).attr('goodid');
                    var shopName = $(this).parents('tr').children("td").eq(2).text();
                    var lowest = $(this).parents('tr').children("td").eq(5).text();
                    localStorage.setItem("id",shopId);
                    localStorage.setItem("shopName",shopName);
                    localStorage.setItem("lowest",lowest);
                    console.log(shopId);
                });

                /**
                 * 分页
                 */
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

    });

    function shanghu(e) {
        switch(e) {

            case 1:
                return '食堂'
                break;
            case 2:
                return '营养餐'
                break;

        };
    };

    /**
     * 构造函数
     */
    function HashMap()
    {
        /** Map 大小 **/
        var size = 0;
        /** 对象 **/
        var entry = new Object();

        /** 存 **/
        this.put = function (key , value)
        {
            if(!this.containsKey(key))
            {
                size ++ ;
            }
            entry[key] = value;
        }

        /** 取 **/
        this.get = function (key)
        {
            if( this.containsKey(key) )
            {
                return entry[key];
            }
            else
            {
                return null;
            }
        }

        /** 删除 **/
        this.remove = function ( key )
        {
            if( delete entry[key] )
            {
                size --;
            }
        }

        /** 是否包含 Key **/
        this.containsKey = function ( key )
        {
            return (key in entry);
        }

        /** 是否包含 Value **/
        this.containsValue = function ( value )
        {
            for(var prop in entry)
            {
                if(entry[prop] == value)
                {
                    return true;
                }
            }
            return false;
        }

        /** 所有 Value **/
        this.values = function ()
        {
            var values = new Array(size);
            for(var prop in entry)
            {
                values.push(entry[prop]);
            }
            return values;
        }

        /** 所有 Key **/
        this.keys = function ()
        {
            var keys = new Array(size);
            for(var prop in entry)
            {
                keys.push(prop);
            }
            return keys;
        }

        /** Map Size **/
        this.size = function ()
        {
            return size;
        }
    }


// });

});