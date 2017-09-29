/**
 * Created by HJJ on 2017/3/8.
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
     * 读取localStorage的shopID
     */
    var shopId = localStorage.getItem('shopId');
    console.log("店铺id是: "+shopId);

    /**
     * 清除localstorage
     */
    $('.clearLocalStorage').on('click',function () {
       localStorage.clear();
    });

    /**
     * 根据ID查询店铺详情
     */
    $.ajax({
        type: "get",
         url:urlx("admin/getBZ.action"),
        async: true,
        headers:{
            "code": $.cookie("code"),
            "token": $.cookie("token")
        },

        dataType: "json",

        data: {
            "id": shopId
        },
        success: function (data) {
            var shopHead = localStorage.setItem("shopHead",data.data.head);
            var shopPositiveImg = localStorage.setItem("shopPositiveImg",data.data.positive_img_url);
            var shopObverseImg = localStorage.setItem("shopObverseImg",data.data.obverse_img_url);
            var shopPermitImg = localStorage.setItem("shopPermitImg",data.data.permit_img_url);
            var shopLicenseImg = localStorage.setItem("shopLicenseImg",data.data.license_img_url);
            var shopImg = localStorage.setItem("shopImg",data.data.img);
            console.log(data);
            switch (JSON.stringify(data.code)) {
                case '"A00000"':
                    $('#owner').attr("value",data.data.owner);
                    $('#mobile').attr("value",data.data.mobile);
                    $('#card').attr("value",data.data.card);
                    $('#bank').attr("value",data.data.bank);
                    $('#name').attr("value",data.data.name);
                    $('#city').attr("value",data.data.city);
//                  $('#addrOpt').attr("value",data.data.addrOpt);
                    $('#addrOpt').val(data.data.addrOpt);
//                  $('.addrOpt').html(data.data.addrOpt);
                    $('#addrEnter').attr("value",data.data.addrEnter);
                    $('#area').attr("value",data.data.area);
                    $('#extent').attr("value",data.data.extent);
                    // $('#extent').html(data.data.extent);
                    $('#contact').attr("value",data.data.contact);
                    $('#hours').attr("value",data.data.hours);
                    $('#fare').attr("value",data.data.fare);
                    $('#lowest').attr("value",data.data.lowest);
                    $('#descs').html(data.data.descs);
                    $('#remark').html(data.data.remark);
                    $('#bulletin').html(data.data.bulletin);
                    $('#cms-shop-head').attr("src",data.data.head);
                    $('#cms-shop-positiveImg').attr("src",data.data.positive_img_url);
                    $('#cms-shop-obverseImg').attr("src",data.data.obverse_img_url);
                    $('#cms-shop-permitImg').attr("src",data.data.permit_img_url);
                    $('#cms-shop-licenseImg').attr("src",data.data.license_img_url);
                    $('#cms-shop-img').attr("src",data.data.img);
                    break;
                default:
                    console.log("请求失败")

            }
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            console.log("请求失败" + XmlHttpRequest.responseText);
        }
    });

    /**
     * 修改内容
     */
    $("#updateBtn").on('click',function () {
        /**
         * 按钮状态变换
         */
        $('.cms-reg-add').attr("disabled",false);
        $("#updateBtn").attr("disabled","disabled");

        /**
         * 内容允许修改
         */
        $('#owner').attr("disabled",false);
        $('#mobile').attr("disabled",false);
        $('#card').attr("disabled",false);
        $('#bank').attr("disabled",false);
        $('#name').attr("disabled",false);
        $('#city').attr("disabled",false);
        $('#addrOpt').attr("disabled",false);
        $('#addrEnter').attr("disabled",false);
        $('#area').attr("disabled",false);
        $('#extent').attr("disabled",false);
        $('#contact').attr("disabled",false);
        $('#hours').attr("disabled",false);
        $('#fare').attr("disabled",false);
        $('#lowest').attr("disabled",false);
        $('#descs').attr("disabled",false);
        $('#remark').attr("disabled",false);
        $('#bulletin').attr("disabled",false);
        $('.shop-head').attr("disabled",false);
        $('.shop-positiveImg').attr("disabled",false);
        $('.shop-obverseImg').attr("disabled",false);
        $('.shop-permitImg').attr("disabled",false);
        $('.shop-licenseImg').attr("disabled",false);
        $('.shop-img').attr("disabled",false);

        /**
         * 修改按钮
         */
        $('.cms-reg-add').on('click',function () {
            console.log($('#addrOpt').val());
            /**
             * 必须重新填写地址
             */

            /**
             * 修改ajax
             */
            $.ajax({
                type: 'post',
//             / url: 'http://admindev.honganjk.com/admin/editBusiness.action',
                url:urlx("admin/editBusiness.action"),
                async: true,
                headers:{
                    "code": $.cookie("code"),
                    "token": $.cookie("token")
                },
                dataType: "json",
                data: {
                    id: shopId,  //店铺id
                    owner: $('#owner').val(), //商户联系人
                    mobile: $('#mobile').val(), //商户手机号
                    card: $('#card').val(), //商户银行卡号
                    bank: $('#bank').val(), //开户行
                    name: $('#name').val(), //商家名称
                    city: $('#city').val(), //城市
                    addrOpt: $('#addrOpt').val(), //地图显示地址
                    addrEnter: $('#addrEnter').val(), //手动输入具体地址
                    area: $('#area').val(), //服务区域
                    extent: $('#extent').val(), //服务范围
                    contact: $('#contact').val(), //联系方式
                    hours: $('#hours').val(), //营业时间
                    fare: $('#fare').val(), //配送费
                    lowest: $('#lowest').val(), //起送价
                    descs: $('#descs').val(), //简介
                    remark: $('#remark').val(), //备注
                    bulletin: $('#bulletin').val(), //公告
                    head: localStorage.getItem("shopHead"), //商户头像
                    positive_img_url: localStorage.getItem("shopPositiveImg"), //获取身份证正面图片
                    obverse_img_url: localStorage.getItem("shopObverseImg"), //获取身份证反面
                    permit_img_url: localStorage.getItem("shopPermitImg"), //获取商家许可证
                    license_img_url: localStorage.getItem("shopLicenseImg"), //获取商家营业执照
                    img: localStorage.getItem("shopImg") //获取商家图片

                },

                success: function (data) {
                    if($('#addrOpt').val() === ''){
                        alert('请选择地址');

                    } else {
                        switch(JSON.stringify(data.code))
                        {
                            case '"A00000"':
                                alert("修改成功")
                                // localStorage.clear();
                                location.reload()
                                // localStorage.removeItem("id");
                                break;
                            default:
                                console.log("请求失败")

                        }

                    }
                    

                    console.log(localStorage.getItem("shopLicenseImg"));
                    console.log(data);


                },

                error:function(XmlHttpRequest,textStatus, errorThrown){
                    console.log("请求失败"+XmlHttpRequest.responseText);

                }
            });
        });

        /**
         * 上传头像
         */
        var uploader = uploadJSSDK;
        $(".shop-head").on("change",function(e){
            $("#cms-shop-head").attr('src',"../images/jiazai0.gif")
            var files = e.target.files;
            for(var i=0;i<files.length;i++){
                uploader({
                    file: files[i],
                    name: new Date().getTime(),
                    token: imgtoken,
                    dir: "dev",
                    callback: function (percent, result) {
                        if(percent==100){
                            console.log(percent);
                            console.log(result.url);
                            var low_url = result.url;
                            //console.log(typeof(low_url))
                            var arry_url = low_url.split("");
                            console.log(arry_url);
                            console.log(typeof(arry_url));
                            arry_url.splice(4, 0, "s");
                            var arry_url1 = arry_url;
                            console.log(arry_url1);
                            var new_result = arry_url1.join("");
                            console.log(new_result);
                            localStorage.setItem('shopHead',result.url);
                            $("#cms-shop-head").attr('src', result.url)

                        }

                    }
                });
            }
        });

        /**
         * 上传身份证正面
         */
        var uploader = uploadJSSDK;
        $(".shop-positiveImg").on("change",function(e){
            $("#cms-shop-positiveImg").attr('src',"../images/jiazai0.gif")
            var files = e.target.files;
            for(var i=0;i<files.length;i++){
                uploader({
                    file: files[i],
                    name: new Date().getTime(),
                    token: imgtoken,
                    dir: "dev",
                    callback: function (percent, result) {
                        if(percent==100){
                            console.log(percent);
                            console.log(result.url);
                            var low_url = result.url;
                            //console.log(typeof(low_url))
                            var arry_url = low_url.split("");
                            console.log(arry_url);
                            console.log(typeof(arry_url));
                            arry_url.splice(4, 0, "s");
                            var arry_url1 = arry_url;
                            console.log(arry_url1);
                            var new_result = arry_url1.join("");
                            console.log(new_result);
                            localStorage.setItem('shopPositiveImg',result.url);
                            $("#cms-shop-positiveImg").attr('src', result.url)

                        }

                    }
                });
            }
        });

        /**
         * 上传身份证反面
         */
        var uploader = uploadJSSDK;
        $(".shop-obverseImg").on("change",function(e){
            $("#cms-shop-obverseImg").attr('src',"../images/jiazai0.gif")
            var files = e.target.files;
            for(var i=0;i<files.length;i++){
                uploader({
                    file: files[i],
                    name: new Date().getTime(),
                    token: imgtoken,
                    dir: "dev",
                    callback: function (percent, result) {
                        if(percent==100){
                            console.log(percent);
                            console.log(result.url);
                            var low_url = result.url;
                            //console.log(typeof(low_url))
                            var arry_url = low_url.split("");
                            console.log(arry_url);
                            console.log(typeof(arry_url));
                            arry_url.splice(4, 0, "s");
                            var arry_url1 = arry_url;
                            console.log(arry_url1);
                            var new_result = arry_url1.join("");
                            console.log(new_result);
                            localStorage.setItem('shopObverseImg',result.url);
                            $("#cms-shop-obverseImg").attr('src', result.url)

                        }

                    }
                });
            }
        });


        /**
         * 上传许可证
         */
        var uploader = uploadJSSDK;
        $(".shop-permitImg").on("change",function(e){
            $("#cms-shop-permitImg").attr('src',"../images/jiazai0.gif")
            var files = e.target.files;
            for(var i=0;i<files.length;i++){
                uploader({
                    file: files[i],
                    name: new Date().getTime(),
                    token: imgtoken,
                    dir: "dev",
                    callback: function (percent, result) {
                        if(percent==100){
                            console.log(percent);
                            console.log(result.url);
                            var low_url = result.url;
                            //console.log(typeof(low_url))
                            var arry_url = low_url.split("");
                            console.log(arry_url);
                            console.log(typeof(arry_url));
                            arry_url.splice(4, 0, "s");
                            var arry_url1 = arry_url;
                            console.log(arry_url1);
                            var new_result = arry_url1.join("");
                            console.log(new_result);
                            localStorage.setItem('shopPermitImg',result.url);
                            $("#cms-shop-permitImg").attr('src', result.url)

                        }

                    }
                });
            }
        });


        /**
         * 上传营业执照
         */
        var uploader = uploadJSSDK;
        $(".shop-licenseImg").on("change",function(e){
            $("#cms-shop-licenseImg").attr('src',"../images/jiazai0.gif")
            var files = e.target.files;
            for(var i=0;i<files.length;i++){
                uploader({
                    file: files[i],
                    name: new Date().getTime(),
                    token: imgtoken,
                    dir: "dev",
                    callback: function (percent, result) {
                        if(percent==100){
                            console.log(percent);
                            console.log(result.url);
                            var low_url = result.url;
                            //console.log(typeof(low_url))
                            var arry_url = low_url.split("");
                            console.log(arry_url);
                            console.log(typeof(arry_url));
                            arry_url.splice(4, 0, "s");
                            var arry_url1 = arry_url;
                            console.log(arry_url1);
                            var new_result = arry_url1.join("");
                            console.log(new_result);
                            localStorage.setItem('shopLicenseImg',result.url);
                            $("#cms-shop-licenseImg").attr('src', result.url)

                        }

                    }
                });
            }
        });

        /**
         * 上传商家图片
         */
        var uploader = uploadJSSDK;
        $(".shop-img").on("change",function(e){
            $("#cms-shop-img").attr('src',"../images/jiazai0.gif")
            var files = e.target.files;
            for(var i=0;i<files.length;i++){
                uploader({
                    file: files[i],
                    name: new Date().getTime(),
                    token: imgtoken,
                    dir: "dev",
                    callback: function (percent, result) {
                        if(percent==100){
                            console.log(percent);
                            console.log(result.url);
                            var low_url = result.url;
                            //console.log(typeof(low_url))
                            var arry_url = low_url.split("");
                            console.log(arry_url);
                            console.log(typeof(arry_url));
                            arry_url.splice(4, 0, "s");
                            var arry_url1 = arry_url;
                            console.log(arry_url1);
                            var new_result = arry_url1.join("");
                            console.log(new_result);
                            localStorage.setItem('shopImg',result.url);
                            $("#cms-shop-img").attr('src', result.url)

                        }

                    }
                });
            }
        });

    });



    /**
     * 验证阿里百川
     */
    $.ajax({
        type: "get",
//      url: "https://bzapi.honganjk.com/common/getToken.action",
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



});