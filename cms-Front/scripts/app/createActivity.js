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
$(document).ready(function () {

    /**
     * 读取localStorage内容
     */
    var shopName = localStorage.getItem('shopName');
    var fare = localStorage.getItem("fare");
    var lowest = localStorage.getItem('lowest');
    var id = localStorage.getItem('id');
    $('.getShopName').text(shopName);
    $('.getlowest').text(lowest);
    console.log(fare);
    $('.getFare').text(fare);

    if(lowest == 0){
        $('.btn-cost').attr("disabled","disabled");
    }

    $('.btn-cost').on('click',function () {


        $.ajax({
            type: "post",
             url:urlx("admin/checkPlan.action"),
            async: true,
            headers: {
                "code": $.cookie("code"),
                "token": $.cookie("token")
            },

            dataType: "json",

            data: {
                "type": 1,
                "bid": id
            },
            success: function(data) {
                console.log($('.cms-radio').val());
                console.log(data.data);
                // if(lowest == 0){
                //     alert('起送价是0');
                //     $('.first-reduce').css({'display':'none'});
                // }
                if(data.data == true) {
                   alert("已经发布过首单立减活动")
                } else {
                    //--------------------------发布首单立减优惠方案----------------------------
                   console.log($(".select1").val()) 
                        $.ajax({
                            type: "post",
                             url:urlx("admin/bzFirstPlan.action"),
                            async: true,
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },

                            dataType: "json",

                            data: {
                                "bid": id,
                                "amount": $("#amount").val(),
                                "img": $("#cms-activity-banner").attr("src"),
                                "site": $(".select1").val().substring(0,1),
                                "remark": $("#remark").val(),
                                "free":changeFree($('.activityFree').val())
                            },
                            success: function(data) {
                                console.log(data)
                                switch(JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        alert("发布成功")
                                        location.reload()
                                        break;
                                    default:
                                        alert("请求失败")

                                }
                            },

                            error: function(XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);

                            }
                        });

                }
            }
        });

    });

    $('.btn-reduction').on('click',function () {

        $.ajax({
            type: "post",
             url:urlx("admin/checkPlan.action"),
            async: true,
            headers: {
                "code": $.cookie("code"),
                "token": $.cookie("token")
            },

            dataType: "json",

            data: {
                "type": 2,
                "bid": id,
            },
            success: function(data) {
                console.log(data.data)
                if(data.data == true) {
                    alert("已经发布过满减活动")
                } else {


                        console.log($("#preferential-reduction").val());
                        console.log($(".select1-re").val().substr(0,1));
                        console.log($("#reductionBanner").attr("src"));
                        console.log($("#remark2").val());
                        $.ajax({
                            type: "post",
                             url:urlx("admin/fullDownPlan.action"),
                            async: true,
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },

                            dataType: "json",

                            data: {
                                "bid": id,
                                "favors": $("#preferential-reduction").val(),
                                "img": $("#reductionBanner").attr("src"),
                                "site": $(".select1-re").val().substr(0,1),
                                "remark": $("#remark2").val()
                            },
                            success: function(data) {
                                console.log(data)
                                switch(JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        alert("发布成功")
                                        location.reload()
                                        break;
                                    default:
                                        alert("请求失败")

                                }
                            },

                            error: function(XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);

                            }
                        });

                }
            }
        });

    })


    //-----------------------------------------验证阿里百川---------------------------------------

    $.ajax({
        type: "get",
       // url: "https://bzapi.honganjk.com/common/getToken.action",
        url:urla("common/getToken.action"),
        data: {
            "key": "23384196",
            "secret": "7b484f801524af3bb7f6abb0dbe63459",
            "namespace": "hajk",
        },
        dataType: "json",
        success: function(data) {
            console.log(data)
            window.imgtoken = data.data;
        },
        error: function(XmlHttpRequest, textStatus, errorThrown) {
            console.log("请求失败" + XmlHttpRequest.responseText);
        }
    });

    var uploader = uploadJSSDK;
    $(".cms-createActivity-banner").on("change", function(e) {
        $("#cms-activity-banner").attr('src', "../images/jiazai0.gif")
        var files = e.target.files;
        for(var i = 0; i < files.length; i++) {
            uploader({
                file: files[i],
                name: new Date().getTime(),
                token: imgtoken,
                dir: "dev",
                callback: function(percent, result) {
                    if(percent == 100) {
                        console.log(percent)
                        console.log(result.url)
                        $("#cms-activity-banner").attr('src', result.url)
                    }

                }
            });
        }
    })


    var uploader = uploadJSSDK;
    $("#cms-createActivity-banner").on("change", function(e) {
        $("#reductionBanner").attr('src', "../images/jiazai0.gif")
        var files = e.target.files;
        for(var i = 0; i < files.length; i++) {
            uploader({
                file: files[i],
                name: new Date().getTime(),
                token: imgtoken,
                dir: "dev",
                callback: function(percent, result) {
                    if(percent == 100) {
                        console.log(percent)
                        console.log(result.url)
                        $("#reductionBanner").attr('src', result.url)
                    }

                }
            });
        }
    })



    function changeFree(str) {
        if(str == '是'){
            return 1;
        }
        return 0;
    }


});
