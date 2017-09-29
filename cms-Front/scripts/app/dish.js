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
 菜品管理脚本
 */

define(["jquery","cookie","sweetalert","jqueryTime","bootstrap"],function ($) {




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
     * 添加菜品弹出框
     */
    document.querySelector('div.row .col-md-12 button').onclick = function () {
        swal({
                title: '添加菜品',
                type: "input",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: 'slide-from-top',
                inputPlaceholder: '条目名称',
                inputPlaceholder2: '条目类型'

            },
            function (inputValue) {
                if(inputValue === false){
                    return false;
                }

                if(inputValue === ""){
                    swal.showInputError('不能为空');
                    return false;
                } else
                //验证条目类型
                if(/^[0-9]*[1-9][0-9]*$/.test(inputValue) == false){
                    swal.showInputError('请输入小于127的正整数');
                    return false;
                } else
                if(parseInt(inputValue,10) > 127){
                    swal.showInputError('请输入小于127的正整数');
                    return false;
                }
                /**
                 * 校验类型是否存在
                 */
                $("#one").on("blur",function(){
                    $.ajax({
                        type:"post",
                         url:urlx("admin/checkItemType.action"),

                        headers:{
                            "code":$.cookie("code"),
                            "token":$.cookie("token")
                        },
                        data:{
                            "type":$("#one").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log(data.data)
                            switch(data.data){
                                case true:
                                    swal.showInputError('条目类型重复');
                                    break;
                                case false:
                                    swal.showInput('可以使用√');
                                    break;
                            }
                        },
                        error:function(XmlHttpRequest,textStatus, errorThrown)
                        {
                            sweetAlert("请求失败"+XmlHttpRequest.responseText);
                        }
                    });
                })



                /**
                 * 添加菜品ajax
                 */
                $.ajax({
                    type:"get",
                     url:urlx("admin/addItem.action"),
                    async:true,
                    headers:{
                        "code":$.cookie("code"),
                        "token":$.cookie("token")
                    },
                    dataType: "json",
                    data:{
                        "type":$("#one").val() ,
                        "title":$("#two").val()
                    },
                    success: function(data){
                        console.log(data)
                        switch(JSON.stringify(data.code))
                        {
                            case '"A00000"':
                                // alert("添加成功")
                                swal('添加成功','','success');
                                location.reload()
                                break;
                            default:
                                swal('请求失败','','false');
                        }
                    },
                    error:function(XmlHttpRequest,textStatus, errorThrown){
                        console.log("请求失败"+XmlHttpRequest.responseText);
                    }
                });
                 console.log(inputValue);
            });
    };

    /**
     * 浏览菜品
     */
    var index1 = null;
    $.ajax({
        type:"get",
         url:urlx("admin/items.action"),
        headers:{
            "code":$.cookie("code"),
            "token":$.cookie("token")
        },
        dataType: "json",
        data: {
            "start":0,
            "size":100
        },
        success:function(data) {
            console.log(data);
            $.each(data.data.objs, function (index) {
                var a = data.data.objs[index].id;
                var $tr = ("<tr>" +
                           "<td goodid=" + a + ">" + data.data.objs[index].id + "</td>" +
                           "<td><input class='input1'  style='border: none;' type='text' value='" + data.data.objs[index].title + "' disabled='disabled'  /></td>" +
                           "<td>" + data.data.objs[index].type + "</td>" +
                           "<td>" +
                              "<span class='span1'>" + menutime(data.data.objs[index].state) + "</span>" +
                              "<select class='select1' style='display: none;'>" +
                                "<option>" + menutime(data.data.objs[index].state) + "</option>" +
                                "<option>启用</option>" +
                                "<option>弃用</option>" +
                              "</select>" +
                           "</td>" +
                           "<td>" + formatDate(data.data.objs[index].createTime) + "</td>" +
                           "<td>" + formatDate(data.data.objs[index].updateTime) + "</td>" +
                           "<td class='amend' >" +
                           "<a class='a1'>修改</a>" +
                           "<a class='a2'>保存</a>" +
                           "</td></tr>");
                $("#tbody1").append($tr)
            });

            /**
             * 点击事件
             */
            $(".amend").on('click', function (e) {

                index1 = $(this).parents('tr').children("td").eq(0).attr('goodid')
                console.log(index1)
                //alert("111")
                console.log($(this).parent().children("td").eq(5).children('a').eq(1))
                $(this).parent().children("td").eq(1).children('input').eq(0).attr("disabled", false)
                $(this).parent().children("td").eq(3).children('select').eq(0).css("display", "block");
                $(this).parent().children("td").eq(3).children('span').eq(0).css("display", "none");
                $(this).parent().children("td").eq(6).children('a').eq(1).css("display", "block");
                $(this).parent().children("td").eq(6).children('a').eq(0).css("display", "none");

            });

            $(".a2").on("click",function(e){
                /**
                 * 判断title是否为空
                 */
                // console.log($(this).parents('tr').children("td").eq(1).children('input').eq(0).val());
                if($(this).parents('tr').children("td").eq(1).children('input').eq(0).val() == ''){
                    $(this).parents('tr').children("td").eq(1).children('input').css('border','1px solid red');
                    return;
                }else {

                    /**
                     * 修改名字
                     */
                    $.ajax({
                        type: "post",
                         url:urlx("admin/editItemTitle.action"),
                        headers: {
                            "code": $.cookie("code"),
                            "token": $.cookie("token")
                        },
                        dataType: "json",
                        data: {
                            "title": $(this).parents('tr').children("td").eq(1).children('input').eq(0).val(),
                            "id": $(this).parents('tr').children("td").eq(0).attr('goodid')
                        },
                        success: function (data) {
                            console.log(data)
                            switch (JSON.stringify(data.code)) {
                                case '"A00000"':
                                    swal('修改成功');
                                    $('.confirm').on('click',function () {
                                        location.reload();
                                    });
                                    // location.reload();
                                    break;
                                default:
                                    console.log("请求失败");

                            }
                        },
                        error: function (XmlHttpRequest, textStatus, errorThrown) {
                            console.log("请求失败" + XmlHttpRequest.responseText);
                        }
                    });
                }

                /**
                 * 判断是否弃用或者启用
                 */
                if($(this).parents('tr').children("td").eq(3).children('select').eq(0).val()=="弃用"){
                    //alert("1111111")

                    $.ajax({
                        type:"post",
                         url:urlx("admin/forgoItem.action"),
                        headers:{
                            "code":$.cookie("code"),
                            "token":$.cookie("token")
                        },
                        dataType: "json",
                        data:{

                            "id":$(this).parents('tr').children("td").eq(0).attr('goodid')
                        },
                        success: function(data){
                            console.log(data)
                            switch(JSON.stringify(data.code))
                            {
                                case '"A00000"':
                                    swal('修改成功');
                                    console.log("修改成功");
                                    $('.confirm').on('click',function () {
                                        location.reload();
                                    });
                                    break;
                                default:
                                    console.log("请求失败")

                            }
                        },
                        error:function(XmlHttpRequest,textStatus, errorThrown){
                            console.log("请求失败"+XmlHttpRequest.responseText);
                        }
                    });

                }else{
                    $.ajax({
                        type:"post",
                         url:urlx("admin/enableItem.action"),
                        headers:{
                            "code":$.cookie("code"),
                            "token":$.cookie("token")
                        },
                        dataType: "json",
                        data:{

                            "id":$(this).parents('tr').children("td").eq(0).attr('goodid')
                        },
                        success: function(data){
                            console.log(data)
                            switch(JSON.stringify(data.code))
                            {
                                case '"A00000"':
                                    console.log("修改成功")
                                    break;
                                default:
                                    console.log("请求失败")

                            }
                            swal('修改成功');
                            $('.confirm').on('click',function () {
                                location.reload();
                            });
                        },
                        error:function(XmlHttpRequest,textStatus, errorThrown){
                            console.log("请求失败"+XmlHttpRequest.responseText);
                        }
                    });
                }
            });
        },
        error:function(XmlHttpRequest,textStatus, errorThrown){
            console.log("请求失败"+XmlHttpRequest.responseText);
        }
    });


    
    /**
     * 类型转换
     */
    function menutime(e) {
        switch(e) {
            case 0:
                return '弃用'
                break;
            case 1:
                return '启用'
                break;
        };
    };

    /**
     * 时间戳
     */
    function formatDate(data) {
        return $.myTime.UnixToDate(data,true,8);
    }


// });

});