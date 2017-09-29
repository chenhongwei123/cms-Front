/**
 * jQuery加载
 */
$(document).ready(function () {


    $('.cms-reg-add').on('click',function () {

        console.log($("#longitude").val());
        console.log($("#latitude").val());

        $.ajax({
            type:"post",
             url:urlx("admin/addBusiness.action"),
            async:true,
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },
            dataType: "json",
            data:{
                "owner":$("#owner").val(), //获取商户联系人
                "mobile":$("#mobile").val(), //获取手机号
                "card":$("#card").val(), //获取银行卡号
                "name":$("#name").val(), //获取商家名称
                "bank":$("#bank").val(), //获取开户行
                "city":$("#city").val(), //获取城市
                "addrOpt":$("#addrOpt").val(), //获取地图中选中的部分
                "addrEnter":$("#addrEnter").val(), //获取输入的部分
                "area":$("#area").val(), //获取商圈
                "longitude":$("#longitude").val(), //获取经度
                "latitude":$("#latitude").val(), //获取纬度
                "extent":$("#extent").val(), //获取服务范围
                "contact":$("#contact").val(), //获取门店电话
                "hours":$("#hours").val(), //获取营业时间
                "fare":$("#fare").val(), //设置配送费
                "lowest":$("#lowest").val(), //获取起送价
                "descs":$("#descs").val(), //获取简介
                "remark":$("#remark").val(), //获取备注
                "bulletin":$("#bulletin").val(), //获取公告
                "account":$("#account").val(), //获取账号
                "password":$.md5($("#password").val()), //获取密码
                "type":$("#type").val(), //获取商户类型
                "head":$("#cms-shop-head").attr("src"), //获取商家头像
                "positive_img_url":$("#cms-shop-positiveImg").attr("src"), //获取商家联系人身份证正面照片
                "obverse_img_url":$("#cms-shop-obverseImg").attr("src"), //获取商家联系人身份证反面照片
                "permit_img_url":$("#cms-shop-permitImg").attr("src"), //获取商家许可证图片
                "license_img_url":$("#cms-shop-licenseImg").attr("src"), //获取营业执照
                "img":$("#cms-shop-img").attr("src") //获取商家图片
            },

            success: function (data) {
                console.log(data);


                switch(JSON.stringify(data.code))
                {
                    case '"A00000"':
                        alert("添加成功")
                        location.reload()
                        break;
                    case '"A02405"':
                        alert("已经注册")
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

    /**
     * 验证阿里百川
     */
    $.ajax({
        type: "get",
//      url: "https://bzapi.honganjk.com/common/getToken.action",
        url:urla('common/getToken.action'),
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
                        console.log(percent)
                        console.log(result.url)
                        $("#cms-shop-head").attr('src', result.url)
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
                        console.log(percent)
                        console.log(result.url)
                        $("#cms-shop-obverseImg").attr('src', result.url)
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
                        console.log(percent)
                        console.log(result.url)
                        $("#cms-shop-positiveImg").attr('src', result.url)
                    }

                }
            });
        }
    });


    /**
     * 许可证
     * @type {*|uploadJSSDK}
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
                        console.log(percent)
                        console.log(result.url)
                        $("#cms-shop-permitImg").attr('src', result.url)
                    }

                }
            });
        }
    });

    /**
     * 营业执照
     * @type {*|uploadJSSDK}
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
                        console.log(percent)
                        console.log(result.url)
                        $("#cms-shop-licenseImg").attr('src', result.url)
                    }

                }
            });
        }
    });


    /**
     * 商家图片
     * @type {*|uploadJSSDK}
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
                        console.log(percent)
                        console.log(result.url)
                        $("#cms-shop-img").attr('src', result.url)
                    }

                }
            });
        }
    });




    var availableTags = [
        "中国银行",
        "中国工商银行 ",
        "中国邮政储蓄银行",
        "中国农业银行 ",
        "中国建设银行",
        "交通银行 ",
        "招商银行",
        "中信实业银行",
        "民生银行",
        "光大银行",
        "兴业银行",
        "华夏银行",
        "上海银行",
        "北京银行",
        "杭州银行",
        "深圳发展银行",
        "广东发展银行",
        "国家开发银行",
        "花旗中国银行",
        "汇丰中国银行",
        "渣打中国银行",
        "香港汇丰银行",
        "九江银行"
    ];
    $(".bank" ).autocomplete({
        source: availableTags
    });
    
});

