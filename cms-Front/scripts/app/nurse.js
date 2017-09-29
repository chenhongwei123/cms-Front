/**
 * Created by HJJ on 2017/1/13.
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

define(['jquery','cookie','bootstrap','sweetalert','jqueryTime','remodal','upfile'],function($){


// $(document).ready(function () {

    if(window.localStorage){
        // alert("浏览支持localStorage")
    }
    else
    {
        alert("浏览暂不支持localStorage")
    }


    //----------------------验证登录---------------------------------------------
    if( $.cookie("name") && $.cookie("name")!==null){
        //alert("1111")
        //console.log($.cookie("name"))
        $(".n1").text($.cookie("name"))
        $(".n2").css("display","block")
    }else{
        document.location.href ="../login.html"
    };

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



    var $tr=null;
    $("#tbody1").empty($tr)
//--------------------全部护工------------------------------------------
    $.ajax({
        type:"get",
       // url:"http://admindev.honganjk.com/admin/nurses.action",
        url:urlx("admin/nurses.action"),
        async:true,
        headers:{
            "code":$.cookie("code"),
            "token":$.cookie("token")
        },

        dataType: "json",

        data: {
            "start":0,
            "size":20,

        },
        success:function(data){
           // //console.log(data)
            $.each(data.data.objs, function(index) {
                var a=data.data.objs[index].id
                var b=data.data.objs[index].type
                //console.log(data.data.objs[index].ctype);
                $tr=("<tr >"+
                "<td goodid=" + a + ">"+data.data.objs[index].id+"</td>  <td goodid2=" + b + ">"+shanghu(data.data.objs[index].dtype)+"</td> <td>"+data.data.objs[index].name+"</td> <td>"+data.data.objs[index].mobile+"</td> <td>"+sex(data.data.objs[index].sex)+"</td> <td>"+data.data.objs[index].sn+"</td> <td>"+data.data.objs[index].years+"</td> <td>"+formatDate(data.data.objs[index].createTime)+"</td> <td>"+formatDate(data.data.objs[index].updateTime)+"</td>"
                +"<td class='q'><a  class='a1'>更多</a></td> <td class='jump'><a class='a3' data-toggle='modal' data-target='#myModal'>"+zhuangtai1(data.data.objs[index].type)+"</a>"
                +"<td><div class='box1'>"
                +"<div class='jumbotron jumbotron-style'>"
                +"<div class='container'>"
                +"<h3>护工详细信息</h3>"
                +"</div> "
                +"</div> "
                +"<ul class='adddishesUl'>"
                +"<div class='save-update'>"
                +"<a class='nurse-update'>修改</a>"
                +"<a class='nurse-save'>保存</a>"
                +"</div>"
                +"<img class='xx' src='../images/xxafter.png'/>"
                +"<li><span>id:</span>"
                +"<input disabled class='nurse-id' type='text' value='"+data.data.objs[index].id+"'/>"
                +"</li>"
                +"<li><span>护工头像:</span>"
                +"<img id='flexible-img' class='small cms-nurse-logo' src='"+data.data.objs[index].img+"' />"
                +"<input disabled class='file nurse-logo' type='file'/>"
                +"</li>"
                +"<li><span>护工名称:</span>"
                +"<input disabled type='text' value='"+data.data.objs[index].name+"'/>"
                +"</li>"
                +"<li><span>护工类型:</span>"
                +"<input disabled type='text'value='"+workType(data.data.objs[index].stype)+"'/>"
                +"</li>"
                +"<li><span>性别:</span>"
                +"<select class='chooseSex' disabled>"
                +"<option>"+sex(data.data.objs[index].sex)+"</option>"
                +"<option>女</option>"
                +"<option>男</option>"
                +"</select>"
                +"</li>"
                +"<li><span>服务类型:</span>"
                +"<input type='text'value='"+shanghu(data.data.objs[index].dtype)+"'/>"
                +"</li>"
                +"<li><span>状态类型:</span>"
                +"<input type='text'value='"+zhuangtai2(data.data.objs[index].type)+"'/>"
                +"</li>"
                +"<li><span>账号:</span>"
                +"<input type='text'value='"+data.data.objs[index].account+"'/>"
                +"</li>"
                +"<li><span>联系人号码:</span>"
                +"<input disabled class='nurse-mobile' type='text'value='"+data.data.objs[index].mobile+"'/>"
                +"</li>"
                +"<li><span>身份证号:</span>"
                +"<input disabled class='nurse-sn' type='text'value='"+data.data.objs[index].sn+"'/>"
                +"</li>"
                +"<li><span>出生日期:</span>"
                +"<input type='text'value='"+formatBirthday(data.data.objs[index].born)+"'/>"
                +"</li>"
                +"<li><span>籍贯:</span>"
                +"<input disabled class='nurse-birthplace' type='text'value='"+data.data.objs[index].birthplace+"'/>"
                +"</li>"
                +"<li><span>现住址:</span>"
                +"<input disabled class='nurse-address' type='text'value='"+data.data.objs[index].address+"'/>"
                +"</li>"
                +"<li><span>服务区域:</span>"
                +"<input disabled class='nurse-area' type='text'value='"+data.data.objs[index].area+"'/>"
                +"</li>"
                +"<li><span>工作年限:</span>"
                +"<input disabled class='nurse-years' type='text'value='"+data.data.objs[index].years+"'/>"
                +"</li>"
                +"<li><span>介绍:</span>"
                +"<input disabled class='nurse-introduce' type='text'value='"+data.data.objs[index].introduction+"'/>"
                +"</li>"
                +"<li><span>银行卡号:</span>"
                +"<input disabled class='nurse-card' type='text'value='"+data.data.objs[index].card+"'/>" +
                "</li>"
                +"<li><span>开户行:</span>" +
                "<input disabled class='nurse-bank' type='text'value='"+data.data.objs[index].bank+"'/>" +
                "</li>"
                +"<li><span>身份证正面:</span>" +
                "<img class='cms-nurse-positiveImg'  src='"+data.data.objs[index].positiveImg+"'/>" +
                "<input disabled class='nurse-positiveImg file' type='file'/>" +
                "</li><br>"
                +"<li><span>身份证反面:</span>" +
                "<img class='cms-nurse-obverseImg' src='"+data.data.objs[index].obverseImg+"'/>" +
                "<input disabled class='nurse-obverseImg file' type='file'/>" +
                "</li><br>" +
                "<li><span>资格证:</span>" +
                "<img class='cms-nurse-licenseImg' src='"+data.data.objs[index].licenseImg+"'/>" +
                "<input disabled class=' nurse-licenseImg file' type='file'/>" +
                "</li><br>"
                +"</ul>"
                +"</div></td>"
                +"</tr>");

                $("#tbody1").append($tr)


            });

            //-------------------------------------
            $("#PrevPage").attr("disabled",true);
            $("#NextPage").attr("disabled",true);

            if(JSON.stringify(data.data.total) <20){
                $("#NextPage").attr("disabled",true);
            }else{
                $("#NextPage").removeAttr("disabled");
            }
            //------------------------------------进行审核-------------------------------------------------
            $(".jump").on('click',function(){

                var index1=$(this).parent('tr').children("td").eq(0).attr('goodid');
               
                if($(this).parent().children("td").eq(10).children('a').text()==='下架护工'){
                    $('.a3').attr('data-target','#outModal');

                    $(this).parent().children("td").eq(9).children('a').eq(0).attr("href","#modal2")
                    $(".Xbutton").on("click",function(){
                        if($("#outTextArea").val().length==''){
                            //console.log($("#outTextArea").val());
                            swal("请填写下架原因!!");
                            // alert("请填写下 架的原因")
                        }else{
                            $.ajax({
                                type:"post",
                               //url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                               url:urlx("admin/unShelveNurse.action"),
                                headers:{
                                    "code":$.cookie("code"),
                                    "token":$.cookie("token")
                                },
                                dataType: "json",
                                data:{

                                    "id":index1,
                                     "reason": "下架原因：" + $("#outTextArea").val()
                                },
                                success: function(data){
                                    //console.log(data)
                                    switch(JSON.stringify(data.code))
                                    {
                                        case '"A00000"':
                                            alert("短信已发送至护工")
                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error:function(XmlHttpRequest,textStatus, errorThrown){
                                    console.log("请求失败"+XmlHttpRequest.responseText);
                                }
                            });//下架
                        }

                    });
                    /**解绑**/
                    $(".Xbutton").unbind('click').click(function(e){
                        if($("#outTextArea").val().length==''){
                            swal("请填写下架原因!!");
                        }else{
                            $.ajax({
                                type:"post",
                                //url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                                url:urlx("admin/unShelveNurse.action"),
                                headers:{
                                    "code":$.cookie("code"),
                                    "token":$.cookie("token")
                                },
                                dataType: "json",
                                data:{

                                    "id":index1,
                                    "reason": "下架原因：" + $("#outTextArea").val()
                                },
                                success: function(data){
                                    //console.log(data)
                                    switch(JSON.stringify(data.code))
                                    {
                                        case '"A00000"':

                                            alert("短信已发送至护工")

                                            location.reload();
                                            // $(".remodal-wrapper").css("display","none")
                                            // $(".remodal-overlay").css("display","none")

                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error:function(XmlHttpRequest,textStatus, errorThrown){
                                    console.log("请求失败"+XmlHttpRequest.responseText);
                                }
                            });//下架
                        }

                    })
                } else {
                    $('.a3').attr('data-target','#myModal');
                    $(".btn1").on("click", function () {
                        $.ajax({
                            type: "post",
                           // url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                            url:urlx("admin/verifyNurse.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {

                                "id": index1,
                                "type": $("#select1").val().substring(0, 1)
                            },
                            success: function (data) {
                                //console.log(data)
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        alert("审核成功")
                                        // $(".remodal-wrapper").css("display", "none")
                                        // $(".remodal-overlay").css("display", "none")
                                        location.reload()
                                        break;
                                    default:
                                        alert("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });//审核成功
                    });
                    /**解绑**/
                    $(".btn1").unbind('click').click(function () {
                        $.ajax({
                            type: "post",
                           // url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                           url:urlx("admin/verifyNurse.action"),
                            headers: {
                                "code": $.cookie("code"),
                                "token": $.cookie("token")
                            },
                            dataType: "json",
                            data: {

                                "id": index1,
                                "type": $("#select1").val().substring(0, 1)
                            },
                            success: function (data) {
                                //console.log(data)
                                switch (JSON.stringify(data.code)) {
                                    case '"A00000"':
                                        alert("审核成功")
                                        // $(".remodal-wrapper").css("display", "none")
                                        // $(".remodal-overlay").css("display", "none")
                                        location.reload()
                                        break;
                                    default:
                                        alert("请求失败")

                                }
                            },
                            error: function (XmlHttpRequest, textStatus, errorThrown) {
                                console.log("请求失败" + XmlHttpRequest.responseText);
                            }
                        });//审核成功
                    });
                    /**************/

                    $(".btn2").on("click", function () {
                        if ($("#bustTextArea").val().length == '') {
                            swal("请填写审核失败的原因");
                        } else {
                            $.ajax({
                                type: "post",
                               // url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                               url:urlx("admin/forbidNurse.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {

                                    "id": index1,
                                    "reason": $("#bustTextArea").val()
                                },
                                success: function (data) {
                                    //console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':

                                            alert("短信已发送至护工")
                                            // $(".remodal-wrapper").css("display", "none")
                                            // $(".remodal-overlay").css("display", "none")
                                            location.reload()
                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });//审核失败
                        }

                    });
                    /**解绑click事件**/
                    $(".btn2").unbind('click').click(function (e) {
                        if ($("#bustTextArea").val().length == '') {
                            swal("请填写审核失败的原因");
                        } else {
                            $.ajax({
                                type: "post",
                                //url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                                url:urlx("admin/forbidNurse.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {

                                    "id": index1,
                                    "reason": $("#bustTextArea").val()
                                },
                                success: function (data) {
                                    //console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':

                                            alert("短信已发送至护工")
                                            // $(".remodal-wrapper").css("display", "none")
                                            // $(".remodal-overlay").css("display", "none")
                                            location.reload()
                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });//审核失败
                        }

                    })
                }

            })
            //-----------------------------------显示遮罩层与更多信息---------------------------------------------------------
            $(".q").on("click",function(){
                // //console.log($(this).parents('tr').children("td").eq(11))
                var index1 = $(this).parent('tr').children("td").eq(0).attr('goodid');

                // //console.log(index1);
                localStorage.setItem("id", index1);
                // localStorage.setImg()
                // //console.log(nurseId);
                $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','block')
                $("#cover").addClass("cover1")

                /**
                 * 修改护工信息
                 */
                $('.save-update').on('click',function (e) {
                    var logoImg = $(this).parent('ul').children('li').eq(1).children('img').attr('src');
                    var positiveImg = $(this).parent('ul').children('li').eq(18).children('img').attr('src'); //修改身份证正面
                    var obverseImg = $(this).parent('ul').children('li').eq(19).children('img').attr('src');
                    var licenseImg = $(this).parent('ul').children('li').eq(20).children('img').attr('src');
                    var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();

                    // //console.log(img);
                    localStorage.setItem('logo',logoImg);
                    localStorage.setItem('positiveImg',positiveImg);
                    localStorage.setItem('obverseImg',obverseImg);
                    localStorage.setItem('licenseImg',licenseImg);
                    localStorage.setItem('nurseName',nurseName);
                    //切换按钮
                    $(this).children("a").eq(0).css("display","none");
                    $(this).children("a").eq(1).css("display","block");

                    // //console.log($(this).parent('tr').children("td").eq(0).attr('goodid'));
                    //console.log( $(this).parent('ul').children('li').eq(0).children('input').val());
                    var name1 = $(this).parent('ul').children('li').eq(2).children('input').val();
                    localStorage.setItem('nurseName',name1);
                    $(this).parent('ul').children('li').eq(1).children('input').attr("disabled",false); //修改头像
                    $(this).parent('ul').children('li').eq(2).children('input').eq(0).attr("disabled",false); //修改姓名
                    $(this).parent('ul').children('li').eq(4).children('select').attr("disabled",false); //修改性别
                    $(this).parent('ul').children('li').eq(8).children('input').attr("disabled",false); //手机号
                    $(this).parent('ul').children('li').eq(9).children('input').attr("disabled",false); //身份证号
                    $(this).parent('ul').children('li').eq(11).children('input').attr("disabled",false); //籍贯
                    $(this).parent('ul').children('li').eq(12).children('input').attr("disabled",false); //修改住址
                    $(this).parent('ul').children('li').eq(13).children('input').attr("disabled",false); //修改服务区域
                    $(this).parent('ul').children('li').eq(14).children('input').attr("disabled",false); //修改工作年份
                    $(this).parent('ul').children('li').eq(15).children('input').attr("disabled",false); //修改自我介绍
                    $(this).parent('ul').children('li').eq(16).children('input').attr("disabled",false); //修改银行卡号
                    $(this).parent('ul').children('li').eq(17).children('input').attr("disabled",false); //修改开户行
                    $(this).parent('ul').children('li').eq(18).children('input').attr("disabled",false); //修改身份证正面
                    $(this).parent('ul').children('li').eq(19).children('input').attr("disabled",false); //修改身份证反面
                    $(this).parent('ul').children('li').eq(20).children('input').attr("disabled",false); //修改资格证


                });

                /**
                 * 保存修改信息
                 */
                $('.nurse-save').on('click',function () {

                    //console.log($(this).parent('div').parent('ul').children('li').eq(2).children('input').val());
                    // var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();
                    // //console.log(nurseName);
                    // localStorage.setItem('nurseName',nurseName);
                    //console.log(localStorage.getItem('id'));
                    $.ajax({
                        type:"post",
                       //url:"http://admindev.honganjk.com/admin/editNurse.action",
                       url:urlx("admin/editNurse.action"),
                        headers:{
                            "code":$.cookie("code"),
                            "token":$.cookie("token")
                        },
                        dataType: "json",
                        data:{
                            "id": localStorage.getItem('id'),
                            "img":localStorage.getItem('logo'), //修改头像
                            "name":$(this).parent('div').parent('ul').children('li').eq(2).children('input').val(),//修改姓名
                            "sex":editSex($(this).parent('div').parent('ul').children('li').eq(4).children('select').val()), //修改性别
                            "mobile":$(this).parent('div').parent('ul').children('li').eq(8).children('input').val(), //身份证号
                            "sn":$(this).parent('div').parent('ul').children('li').eq(9).children('input').val(), //修改籍贯
                            "birthplace":$(this).parent('div').parent('ul').children('li').eq(11).children('input').val(), //修改手机号
                            "address":$(this).parent('div').parent('ul').children('li').eq(12).children('input').val(), //修改住址
                            "area":$(this).parent('div').parent('ul').children('li').eq(13).children('input').val(), //修改服务区域
                            "years":$(this).parent('div').parent('ul').children('li').eq(14).children('input').val(), //修改工作年份
                            "introduction":$(this).parent('div').parent('ul').children('li').eq(15).children('input').val(), //修改自我介绍
                            "card":$(this).parent('div').parent('ul').children('li').eq(16).children('input').val(), //修改银行卡号
                            "bank":$(this).parent('div').parent('ul').children('li').eq(17).children('input').val(), //修改开户行
                            "positiveImg": localStorage.getItem('positiveImg'), //修改身份证正面
                            "obverseImg":localStorage.getItem('obverseImg'), //修改身份证反面
                            "licenseImg":localStorage.getItem('licenseImg') //修改资格证
                        },

                        success: function (data) {


                            //console.log(data);
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


                        },

                        error:function(XmlHttpRequest,textStatus, errorThrown){
                            console.log("请求失败"+XmlHttpRequest.responseText);

                        }

                    });




                });


            });


            $(".xx").on("click",function(){
                localStorage.clear();
                $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','none')
                $("#cover").removeClass("cover1")

            });





            /**
             * 上传头像
             */
            var uploader = uploadJSSDK;
            $(".file").on("change",function(e){
                $(".cms-nurse-logo").attr('src',"../images/jiazai0.gif")
                var files = e.target.files;
                for(var i=0;i<files.length;i++){
                    uploader({
                        file: files[i],
                        name: new Date().getTime(),
                        token: imgtoken,
                        dir: "dev",
                        callback: function (percent, result) {
                            if(percent==100){
                                //console.log(percent)
                                //console.log(result.url)
                                localStorage.setItem('logo',result.url);
                                $(".cms-nurse-logo").attr('src', result.url)

                            }

                        }
                    });
                }
            });


            /**
             * 上传身份证正面
             */
            var uploader = uploadJSSDK;
            $(".nurse-positiveImg").on("change",function(e){
                $(".cms-nurse-positiveImg").attr('src',"../images/jiazai0.gif")
                var files = e.target.files;
                for(var i=0;i<files.length;i++){
                    uploader({
                        file: files[i],
                        name: new Date().getTime(),
                        token: imgtoken,
                        dir: "dev",
                        callback: function (percent, result) {
                            if(percent==100){
                                //console.log(percent)
                                //console.log(result.url)
                                localStorage.setItem('positiveImg',result.url);
                                $(".cms-nurse-positiveImg").attr('src', result.url)
                            }

                        }
                    });
                }
            });


            /**
             * 上传身份证反面
             */
            var uploader = uploadJSSDK;
            $(".nurse-obverseImg").on("change",function(e){
                $(".cms-nurse-obverseImg").attr('src',"../images/jiazai0.gif")
                var files = e.target.files;
                for(var i=0;i<files.length;i++){
                    uploader({
                        file: files[i],
                        name: new Date().getTime(),
                        token: imgtoken,
                        dir: "dev",
                        callback: function (percent, result) {
                            if(percent==100){
                                //console.log(percent)
                                //console.log(result.url)
                                localStorage.setItem('obverseImg',result.url)
                                $(".cms-nurse-obverseImg").attr('src', result.url)
                            }

                        }
                    });
                }
            });


            /**
             * 上传资格证
             */
            var uploader = uploadJSSDK;
            $(".nurse-licenseImg").on("change",function(e){
                $(".cms-nurse-licenseImg").attr('src',"../images/jiazai0.gif")
                var files = e.target.files;
                for(var i=0;i<files.length;i++){
                    uploader({
                        file: files[i],
                        name: new Date().getTime(),
                        token: imgtoken,
                        dir: "dev",
                        callback: function (percent, result) {
                            if(percent==100){
                                //console.log(percent)
                                //console.log(result.url)
                                localStorage.setItem('licenseImg',result.url)
                                $(".cms-nurse-licenseImg").attr('src', result.url)
                            }

                        }
                    });
                }
            });





        }
    });



    /**
     * 验证阿里百川
     */
    $.ajax({
        type: "get",
       // url: "https://bzapi.honganjk.com/common/getToken.action",
       url:urla("common/getToken.action"),
        data: {
            "key":"23384196",
            "secret":"7b484f801524af3bb7f6abb0dbe63459",
            "namespace":"hajk",
        },
        dataType: "json",
        success: function (data) {
            //console.log(data)
            window.imgtoken = data.data;
            //console.log(imgtoken);
        },
        error:function(XmlHttpRequest,textStatus, errorThrown)
        {
            console.log("请求失败"+XmlHttpRequest.responseText);
        }
    });


//-------------------------------------状态显示-----------------------------------------------------------------------
    $("#type1").on("change",function(){
        var $tr=null;
        $("#tbody1").empty($tr)
        // $("#audit1").css("display","none")
        // $("#audit2").css("display","block")
        $("#Paging").css("display","none")
        // $("#Paging1").css("display","block")
        ////console.log($("#type1").val().substring(0,1))

        $.ajax({
            type:"get",
           //url:"http://admindev.honganjk.com/admin/nurses.action",
           url:urlx("admin/nurses.action"),
            async:true,
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },

            dataType: "json",

            data: {
                "start":0,
                "size":1000,
                "type":$("#type1").val().substring(0,2)
                //"type":0
            },
            success:function(data){
                //console.log(data)

                $.each(data.data.objs, function(index) {
                    var a=data.data.objs[index].id
                    var b=data.data.objs[index].type

                    $tr=("<tr >"+
                    "<td goodid=" + a + ">"+data.data.objs[index].id+"</td>  <td goodid2=" + b + ">"+shanghu(data.data.objs[index].dtype)+"</td> <td>"+data.data.objs[index].name+"</td> <td>"+data.data.objs[index].mobile+"</td> <td>"+sex(data.data.objs[index].sex)+"</td> <td>"+data.data.objs[index].sn+"</td> <td>"+data.data.objs[index].years+"</td> <td>"+formatDate(data.data.objs[index].createTime)+"</td> <td>"+formatDate(data.data.objs[index].updateTime)+"</td>"
                    +"<td class='q'><a  class='a1'>更多</a></td> <td class='jump'><a class='a3' data-toggle='modal' data-target='#myModal'>"+zhuangtai1(data.data.objs[index].type)+"</a>"
                    +"<td><div class='box1'>"
                    +"<div class='jumbotron jumbotron-style'>"
                    +"<div class='container'>"
                    +"<h3>护工详细信息</h3>"
                    +"</div> "
                    +"</div> "
                    +"<ul class='adddishesUl'>"
                    +"<div class='save-update'>"
                    +"<a class='nurse-update'>修改</a>"
                    +"<a class='nurse-save'>保存</a>"
                    +"</div>"
                    +"<img class='xx' src='../images/xxafter.png'/>"
                    +"<li><span>id:</span>"
                    +"<input disabled class='nurse-id' type='text' value='"+data.data.objs[index].id+"'/>"
                    +"</li>"
                    +"<li><span>护工头像:</span>"
                    +"<img id='flexible-img' class='small cms-nurse-logo' src='"+data.data.objs[index].img+"' />"
                    +"<input disabled class='file nurse-logo' type='file'/>"
                    +"</li>"
                    +"<li><span>护工名称:</span>"
                    +"<input disabled type='text' value='"+data.data.objs[index].name+"'/>"
                    +"</li>"
                    +"<li><span>护工类型:</span>"
                    +"<input disabled type='text'value='"+workType(data.data.objs[index].stype)+"'/>"
                    +"</li>"
                    +"<li><span>性别:</span>"
                    +"<select class='chooseSex' disabled>"
                    +"<option>"+sex(data.data.objs[index].sex)+"</option>"
                    +"<option>女</option>"
                    +"<option>男</option>"
                    +"</select>"
                    +"</li>"
                    +"<li><span>服务类型:</span>"
                    +"<input type='text'value='"+shanghu(data.data.objs[index].dtype)+"'/>"
                    +"</li>"
                    +"<li><span>状态类型:</span>"
                    +"<input type='text'value='"+zhuangtai2(data.data.objs[index].type)+"'/>"
                    +"</li>"
                    +"<li><span>账号:</span>"
                    +"<input type='text'value='"+data.data.objs[index].account+"'/>"
                    +"</li>"
                    +"<li><span>联系人号码:</span>"
                    +"<input disabled class='nurse-mobile' type='text'value='"+data.data.objs[index].mobile+"'/>"
                    +"</li>"
                    +"<li><span>身份证号:</span>"
                    +"<input disabled class='nurse-sn' type='text'value='"+data.data.objs[index].sn+"'/>"
                    +"</li>"
                    +"<li><span>出生日期:</span>"
                    +"<input type='text'value='"+formatBirthday(data.data.objs[index].born)+"'/>"
                    +"</li>"
                    +"<li><span>籍贯:</span>"
                    +"<input disabled class='nurse-birthplace' type='text'value='"+data.data.objs[index].birthplace+"'/>"
                    +"</li>"
                    +"<li><span>现住址:</span>"
                    +"<input disabled class='nurse-address' type='text'value='"+data.data.objs[index].address+"'/>"
                    +"</li>"
                    +"<li><span>服务区域:</span>"
                    +"<input disabled class='nurse-area' type='text'value='"+data.data.objs[index].area+"'/>"
                    +"</li>"
                    +"<li><span>工作年限:</span>"
                    +"<input disabled class='nurse-years' type='text'value='"+data.data.objs[index].years+"'/>"
                    +"</li>"
                    +"<li><span>介绍:</span>"
                    +"<input disabled class='nurse-introduce' type='text'value='"+data.data.objs[index].introduction+"'/>"
                    +"</li>"
                    +"<li><span>银行卡号:</span>"
                    +"<input disabled class='nurse-card' type='text'value='"+data.data.objs[index].card+"'/>" +
                    "</li>"
                    +"<li><span>开户行:</span>" +
                    "<input disabled class='nurse-bank' type='text'value='"+data.data.objs[index].bank+"'/>" +
                    "</li>"
                    +"<li><span>身份证正面:</span>" +
                    "<img class='cms-nurse-positiveImg'  src='"+data.data.objs[index].positiveImg+"'/>" +
                    "<input disabled class='nurse-positiveImg file' type='file'/>" +
                    "</li><br>"
                    +"<li><span>身份证反面:</span>" +
                    "<img class='cms-nurse-obverseImg' src='"+data.data.objs[index].obverseImg+"'/>" +
                    "<input disabled class='nurse-obverseImg file' type='file'/>" +
                    "</li><br>" +
                    "<li><span>资格证:</span>" +
                    "<img class='cms-nurse-licenseImg' src='"+data.data.objs[index].licenseImg+"'/>" +
                    "<input disabled class=' nurse-licenseImg file' type='file'/>" +
                    "</li><br>"
                    +"</ul>"
                    +"</div></td>"
                    +"</tr>");

                    $("#tbody1").append($tr)

                    if($("#type1").val().substring(0,2) == 0){
                        // //console.log(changeType($("#type1").val().substring(0,5)));
                        // //console.log($("#type1").val().substring(0,1));
                        $(".a3").html("去审核")
                        // return false;
//		                       	 $(".a2").attr("href","#modal")
//		                       	 //console.log($('.a2').parents('tr').children("td").eq(0).attr('goodid'))
                    }else if($("#type1").val().substring(0,2)==+1){
                        $(".a3").html("下架护工");
                        // $(".a2").css("color","green")
                        $(".a3").attr("href","#");
                    }else if($("#type1").val().substring(0,2)==-1){
                        $(".a2").html("上架食堂")
                    }
                });
                //--------------------------------------------------------
                $("#PrevPage1").attr("disabled",true);
                $("#NextPage1").attr("disabled",true);

                if(JSON.stringify(data.data.total) < 20){
                    $("#NextPage1").attr("disabled",true);
                }else{
                    $("#NextPage1").removeAttr("disabled");
                }
                //------------------------------------进行审核-------------------------------------------------
                $(".jump").on('click',function(){

                    var index1=$(this).parent('tr').children("td").eq(0).attr('goodid')
                    //console.log($(this).parent().children("td").eq(9).children('a').text());

                    if($(this).parent().children("td").eq(10).children('a').text()==='下架护工'){
                        // $(".remodal-wrapper").css("display","none");
                        // $("#audit4").css("display","block");
                        $('.a3').attr('data-target','#outModal');

                        $(this).parent().children("td").eq(9).children('a').eq(0).attr("href","#modal2")
                        $(".Xbutton").on("click",function(){
                            if($("#outTextArea").val().length == ''){
                                swal("请填写下架的原因");
                            }else{
                                $.ajax({
                                    type:"post",
                                   //url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                                     url:urlx("admin/unShelveNurse.action"),
                                    headers:{
                                        "code":$.cookie("code"),
                                        "token":$.cookie("token")
                                    },
                                    dataType: "json",
                                    data:{

                                        "id":index1,
                                         "reason": "下架原因：" + $("#outTextArea").val()
                                    },
                                    success: function(data){
                                        //console.log(data)
                                        switch(JSON.stringify(data.code))
                                        {
                                            case '"A00000"':

                                                swal("短信已发送至护工");
                                                // $(".remodal-wrapper").css("display","none")
                                                // $(".remodal-overlay").css("display","none")
                                                location.reload()
                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error:function(XmlHttpRequest,textStatus, errorThrown){
                                        console.log("请求失败"+XmlHttpRequest.responseText);
                                    }
                                });//下架
                            }

                        });

                        /**解绑**/
                        $(".Xbutton").unbind('click').click(function(e){
                            if($("#outTextArea").val().length == ''){
                                swal("请填写下 架的原因");
                            }else{
                                $.ajax({
                                    type:"post",
                                   // url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                                    url:urlx("admin/unShelveNurse.action"),
                                    headers:{
                                        "code":$.cookie("code"),
                                        "token":$.cookie("token")
                                    },
                                    dataType: "json",
                                    data:{

                                        "id":index1,
                                         "reason": "下架原因：" + $("#outTextArea").val()
                                    },
                                    success: function(data){
                                        //console.log(data)
                                        switch(JSON.stringify(data.code))
                                        {
                                            case '"A00000"':

                                                swal("短信已发送至护工");

                                                location.reload();
                                                // $(".remodal-wrapper").css("display","none")
                                                // $(".remodal-overlay").css("display","none")

                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error:function(XmlHttpRequest,textStatus, errorThrown){
                                        console.log("请求失败"+XmlHttpRequest.responseText);
                                    }
                                });//下架
                            }

                        });

                    } else {
                        // $(".remodal-wrapper").css("display","block")
                        // $(".remodal-overlay").css("display","block")

                        $(".btn1").on("click", function () {
                            $.ajax({
                                type: "post",
                               //url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                                url:urlx("admin/verifyNurse.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {

                                    "id": index1,
                                    "type": $("#select1").val().substring(0, 1)
                                },
                                success: function (data) {
                                    //console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            swal("审核成功");
                                            // $(".remodal-wrapper").css("display", "none")
                                            // $(".remodal-overlay").css("display", "none")
                                            location.reload()
                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });//审核成功
                        });

                        /**解绑**/
                        $(".btn1").unbind('click').click(function () {
                            $.ajax({
                                type: "post",
                               // url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                                url:urlx("admin/verifyNurse.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {

                                    "id": index1,
                                    "type": $("#select1").val().substring(0, 1)
                                },
                                success: function (data) {
                                    //console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            swal("审核成功");
                                            // $(".remodal-wrapper").css("display", "none")
                                            // $(".remodal-overlay").css("display", "none")
                                            location.reload()
                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });//审核成功
                        });
                        /**************/

                        $(".btn2").on("click", function () {
                            if ($("#bustTextArea").val().length == '') {
                                swal("请填写审核失败的原因");
                            } else {
                                $.ajax({
                                    type: "post",
                                    //url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                                     url:urlx("admin/forbidNurse.action"),
                                    headers: {
                                        "code": $.cookie("code"),
                                        "token": $.cookie("token")
                                    },
                                    dataType: "json",
                                    data: {

                                        "id": index1,
                                        "reason": $("#bustTextArea").val()
                                    },
                                    success: function (data) {
                                        //console.log(data)
                                        switch (JSON.stringify(data.code)) {
                                            case '"A00000"':

                                                swal("短信已发送至护工");
                                                // $(".remodal-wrapper").css("display", "none")
                                                // $(".remodal-overlay").css("display", "none")
                                                location.reload()
                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                                        console.log("请求失败" + XmlHttpRequest.responseText);
                                    }
                                });//审核失败
                            }

                        });

                        /**解绑click事件**/
                        $(".btn2").unbind('click').click(function (e) {
                            if ($("#bustTextArea").val().length == '') {
                                swal("请填写审核失败的原因");
                            } else {
                                $.ajax({
                                    type: "post",
                                   // url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                                    url:urlx("admin/forbidNurse.action"),
                                    headers: {
                                        "code": $.cookie("code"),
                                        "token": $.cookie("token")
                                    },
                                    dataType: "json",
                                    data: {

                                        "id": index1,
                                        "reason": $("#bustTextArea").val()
                                    },
                                    success: function (data) {
                                        //console.log(data)
                                        switch (JSON.stringify(data.code)) {
                                            case '"A00000"':

                                                swal("短信已发送至护工");
                                                // $(".remodal-wrapper").css("display", "none")
                                                // $(".remodal-overlay").css("display", "none")
                                                location.reload()
                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                                        console.log("请求失败" + XmlHttpRequest.responseText);
                                    }
                                });//审核失败
                            }

                        })
                    }

                });
                //-----------------------------------显示遮罩层与更多信息---------------------------------------------------------
                $(".q").on("click",function(){
                    // //console.log($(this).parents('tr').children("td").eq(11))
                    var index1 = $(this).parent('tr').children("td").eq(0).attr('goodid');

                    // //console.log(index1);
                    localStorage.setItem("id", index1);
                    // localStorage.setImg()
                    // //console.log(nurseId);
                    $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','block')
                    $("#cover").addClass("cover1")

                    /**
                     * 修改护工信息
                     */
                    $('.save-update').on('click',function (e) {
                        var logoImg = $(this).parent('ul').children('li').eq(1).children('img').attr('src');
                        var positiveImg = $(this).parent('ul').children('li').eq(18).children('img').attr('src'); //修改身份证正面
                        var obverseImg = $(this).parent('ul').children('li').eq(19).children('img').attr('src');
                        var licenseImg = $(this).parent('ul').children('li').eq(20).children('img').attr('src');
                        var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();

                        // //console.log(img);
                        localStorage.setItem('logo',logoImg);
                        localStorage.setItem('positiveImg',positiveImg);
                        localStorage.setItem('obverseImg',obverseImg);
                        localStorage.setItem('licenseImg',licenseImg);
                        localStorage.setItem('nurseName',nurseName);
                        //切换按钮
                        $(this).children("a").eq(0).css("display","none");
                        $(this).children("a").eq(1).css("display","block");

                        // //console.log($(this).parent('tr').children("td").eq(0).attr('goodid'));
                        //console.log( $(this).parent('ul').children('li').eq(0).children('input').val());
                        var name1 = $(this).parent('ul').children('li').eq(2).children('input').val();
                        localStorage.setItem('nurseName',name1);
                        $(this).parent('ul').children('li').eq(1).children('input').attr("disabled",false); //修改头像
                        $(this).parent('ul').children('li').eq(2).children('input').eq(0).attr("disabled",false); //修改姓名
                        $(this).parent('ul').children('li').eq(4).children('select').attr("disabled",false); //修改性别
                        $(this).parent('ul').children('li').eq(8).children('input').attr("disabled",false); //手机号
                        $(this).parent('ul').children('li').eq(9).children('input').attr("disabled",false); //身份证号
                        $(this).parent('ul').children('li').eq(11).children('input').attr("disabled",false); //籍贯
                        $(this).parent('ul').children('li').eq(12).children('input').attr("disabled",false); //修改住址
                        $(this).parent('ul').children('li').eq(13).children('input').attr("disabled",false); //修改服务区域
                        $(this).parent('ul').children('li').eq(14).children('input').attr("disabled",false); //修改工作年份
                        $(this).parent('ul').children('li').eq(15).children('input').attr("disabled",false); //修改自我介绍
                        $(this).parent('ul').children('li').eq(16).children('input').attr("disabled",false); //修改银行卡号
                        $(this).parent('ul').children('li').eq(17).children('input').attr("disabled",false); //修改开户行
                        $(this).parent('ul').children('li').eq(18).children('input').attr("disabled",false); //修改身份证正面
                        $(this).parent('ul').children('li').eq(19).children('input').attr("disabled",false); //修改身份证反面
                        $(this).parent('ul').children('li').eq(20).children('input').attr("disabled",false); //修改资格证


                    });

                    /**
                     * 保存修改信息
                     */
                    $('.nurse-save').on('click',function () {

                        //console.log($(this).parent('div').parent('ul').children('li').eq(2).children('input').val());
                        // var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();
                        // //console.log(nurseName);
                        // localStorage.setItem('nurseName',nurseName);
                        //console.log(localStorage.getItem('id'));
                        $.ajax({
                            type:"post",
                            //url:"http://admindev.honganjk.com/admin/editNurse.action",
                             url:urlx("admin/editNurse.action"),
                            headers:{
                                "code":$.cookie("code"),
                                "token":$.cookie("token")
                            },
                            dataType: "json",
                            data:{
                                "id": localStorage.getItem('id'),
                                "img":localStorage.getItem('logo'), //修改头像
                                "name":$(this).parent('div').parent('ul').children('li').eq(2).children('input').val(),//修改姓名
                                "sex":editSex($(this).parent('div').parent('ul').children('li').eq(4).children('select').val()), //修改性别
                                "mobile":$(this).parent('div').parent('ul').children('li').eq(8).children('input').val(), //身份证号
                                "sn":$(this).parent('div').parent('ul').children('li').eq(9).children('input').val(), //修改籍贯
                                "birthplace":$(this).parent('div').parent('ul').children('li').eq(11).children('input').val(), //修改手机号
                                "address":$(this).parent('div').parent('ul').children('li').eq(12).children('input').val(), //修改住址
                                "area":$(this).parent('div').parent('ul').children('li').eq(13).children('input').val(), //修改服务区域
                                "years":$(this).parent('div').parent('ul').children('li').eq(14).children('input').val(), //修改工作年份
                                "introduction":$(this).parent('div').parent('ul').children('li').eq(15).children('input').val(), //修改自我介绍
                                "card":$(this).parent('div').parent('ul').children('li').eq(16).children('input').val(), //修改银行卡号
                                "bank":$(this).parent('div').parent('ul').children('li').eq(17).children('input').val(), //修改开户行
                                "positiveImg": localStorage.getItem('positiveImg'), //修改身份证正面
                                "obverseImg":localStorage.getItem('obverseImg'), //修改身份证反面
                                "licenseImg":localStorage.getItem('licenseImg') //修改资格证
                            },

                            success: function (data) {


                                //console.log(data);
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


                            },

                            error:function(XmlHttpRequest,textStatus, errorThrown){
                                console.log("请求失败"+XmlHttpRequest.responseText);

                            }

                        });




                    });


                });
                $(".xx").on("click",function(){
                    $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','none')
                    $("#cover").removeClass("cover1")
                })


                /**
                 * 上传头像
                 */
                var uploader = uploadJSSDK;
                $(".file").on("change",function(e){
                    $(".cms-nurse-logo").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('logo',result.url);
                                    $(".cms-nurse-logo").attr('src', result.url)

                                }

                            }
                        });
                    }
                });


                /**
                 * 上传身份证正面
                 */
                var uploader = uploadJSSDK;
                $(".nurse-positiveImg").on("change",function(e){
                    $(".cms-nurse-positiveImg").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('positiveImg',result.url);
                                    $(".cms-nurse-positiveImg").attr('src', result.url)
                                }

                            }
                        });
                    }
                });


                /**
                 * 上传身份证反面
                 */
                var uploader = uploadJSSDK;
                $(".nurse-obverseImg").on("change",function(e){
                    $(".cms-nurse-obverseImg").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('obverseImg',result.url)
                                    $(".cms-nurse-obverseImg").attr('src', result.url)
                                }

                            }
                        });
                    }
                });


                /**
                 * 上传资格证
                 */
                var uploader = uploadJSSDK;
                $(".nurse-licenseImg").on("change",function(e){
                    $(".cms-nurse-licenseImg").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('licenseImg',result.url)
                                    $(".cms-nurse-licenseImg").attr('src', result.url)
                                }

                            }
                        });
                    }
                });

            }
        })


        /**
         * 验证阿里百川
         */
        $.ajax({
            type: "get",
            //url: "https://bzapi.honganjk.com/common/getToken.action",
             url:urla("common/getToken.action"),
            data: {
                "key":"23384196",
                "secret":"7b484f801524af3bb7f6abb0dbe63459",
                "namespace":"hajk",
            },
            dataType: "json",
            success: function (data) {
                //console.log(data)
                window.imgtoken = data.data;
                //console.log(imgtoken);
            },
            error:function(XmlHttpRequest,textStatus, errorThrown)
            {
                console.log("请求失败"+XmlHttpRequest.responseText);
            }
        });
    })

    //----------------------------搜索-------------------------------------------------

    /**
     * 护工名称搜索
     */
    $("#searchOrder").on("click",function(){
        // $("#audit1").css("display","none")
        // $("#audit2").css("display","none")
        // $("#audit3").css("display","block")
//              	$("#dishpageval").val(0);
        $("#Paging").css("display","none")
        $("#tbody1").empty($tr)
        $("#change1").text(1)
        if($(".select").val()=="通过护工姓名搜索"){
            //alert("111")
            $.ajax({
                type: "get",
                //url: "http://admindev.honganjk.com/admin/nurses.action",
                 url:urlx("admin/nurses.action"),
                data: {
                    "start":0,
                    "size":1000,
                    "name":$(".wd").val(),
                },
                dataType: "json",
                headers:{
                    "code":$.cookie("code"),
                    "token":$.cookie("token")
                },
                success: function (data) {
                    //console.log(data)
                    $.each(data.data.objs, function(index) {
                        var a=data.data.objs[index].id
                        var b=data.data.objs[index].type
                        //console.log(data.data.objs[index].ctype)

                        $tr=("<tr >"+
                        "<td goodid=" + a + ">"+data.data.objs[index].id+"</td>  <td goodid2=" + b + ">"+shanghu(data.data.objs[index].dtype)+"</td> <td>"+data.data.objs[index].name+"</td> <td>"+data.data.objs[index].mobile+"</td> <td>"+sex(data.data.objs[index].sex)+"</td> <td>"+data.data.objs[index].sn+"</td> <td>"+data.data.objs[index].years+"</td> <td>"+formatDate(data.data.objs[index].createTime)+"</td> <td>"+formatDate(data.data.objs[index].updateTime)+"</td>"
                        +"<td class='q'><a  class='a1'>更多</a></td> <td class='jump'><a class='a3' data-toggle='modal' data-target='#myModal'>"+zhuangtai1(data.data.objs[index].type)+"</a>"
                        +"<td><div class='box1'>"
                        +"<div class='jumbotron jumbotron-style'>"
                        +"<div class='container'>"
                        +"<h3>护工详细信息</h3>"
                        +"</div> "
                        +"</div> "
                        +"<ul class='adddishesUl'>"
                        +"<div class='save-update'>"
                        +"<a class='nurse-update'>修改</a>"
                        +"<a class='nurse-save'>保存</a>"
                        +"</div>"
                        +"<img class='xx' src='../images/xxafter.png'/>"
                        +"<li><span>id:</span>"
                        +"<input disabled class='nurse-id' type='text' value='"+data.data.objs[index].id+"'/>"
                        +"</li>"
                        +"<li><span>护工头像:</span>"
                        +"<img id='flexible-img' class='small cms-nurse-logo' src='"+data.data.objs[index].img+"' />"
                        +"<input disabled class='file nurse-logo' type='file'/>"
                        +"</li>"
                        +"<li><span>护工名称:</span>"
                        +"<input disabled type='text' value='"+data.data.objs[index].name+"'/>"
                        +"</li>"
                        +"<li><span>护工类型:</span>"
                        +"<input disabled type='text'value='"+workType(data.data.objs[index].stype)+"'/>"
                        +"</li>"
                        +"<li><span>性别:</span>"
                        +"<select class='chooseSex' disabled>"
                        +"<option>"+sex(data.data.objs[index].sex)+"</option>"
                        +"<option>女</option>"
                        +"<option>男</option>"
                        +"</select>"
                        +"</li>"
                        +"<li><span>服务类型:</span>"
                        +"<input type='text'value='"+shanghu(data.data.objs[index].dtype)+"'/>"
                        +"</li>"
                        +"<li><span>状态类型:</span>"
                        +"<input type='text'value='"+zhuangtai2(data.data.objs[index].type)+"'/>"
                        +"</li>"
                        +"<li><span>账号:</span>"
                        +"<input type='text'value='"+data.data.objs[index].account+"'/>"
                        +"</li>"
                        +"<li><span>联系人号码:</span>"
                        +"<input disabled class='nurse-mobile' type='text'value='"+data.data.objs[index].mobile+"'/>"
                        +"</li>"
                        +"<li><span>身份证号:</span>"
                        +"<input disabled class='nurse-sn' type='text'value='"+data.data.objs[index].sn+"'/>"
                        +"</li>"
                        +"<li><span>出生日期:</span>"
                        +"<input type='text'value='"+formatBirthday(data.data.objs[index].born)+"'/>"
                        +"</li>"
                        +"<li><span>籍贯:</span>"
                        +"<input disabled class='nurse-birthplace' type='text'value='"+data.data.objs[index].birthplace+"'/>"
                        +"</li>"
                        +"<li><span>现住址:</span>"
                        +"<input disabled class='nurse-address' type='text'value='"+data.data.objs[index].address+"'/>"
                        +"</li>"
                        +"<li><span>服务区域:</span>"
                        +"<input disabled class='nurse-area' type='text'value='"+data.data.objs[index].area+"'/>"
                        +"</li>"
                        +"<li><span>工作年限:</span>"
                        +"<input disabled class='nurse-years' type='text'value='"+data.data.objs[index].years+"'/>"
                        +"</li>"
                        +"<li><span>介绍:</span>"
                        +"<input disabled class='nurse-introduce' type='text'value='"+data.data.objs[index].introduction+"'/>"
                        +"</li>"
                        +"<li><span>银行卡号:</span>"
                        +"<input disabled class='nurse-card' type='text'value='"+data.data.objs[index].card+"'/>" +
                        "</li>"
                        +"<li><span>开户行:</span>" +
                        "<input disabled class='nurse-bank' type='text'value='"+data.data.objs[index].bank+"'/>" +
                        "</li>"
                        +"<li><span>身份证正面:</span>" +
                        "<img class='cms-nurse-positiveImg'  src='"+data.data.objs[index].positiveImg+"'/>" +
                        "<input disabled class='nurse-positiveImg file' type='file'/>" +
                        "</li><br>"
                        +"<li><span>身份证反面:</span>" +
                        "<img class='cms-nurse-obverseImg' src='"+data.data.objs[index].obverseImg+"'/>" +
                        "<input disabled class='nurse-obverseImg file' type='file'/>" +
                        "</li><br>" +
                        "<li><span>资格证:</span>" +
                        "<img class='cms-nurse-licenseImg' src='"+data.data.objs[index].licenseImg+"'/>" +
                        "<input disabled class=' nurse-licenseImg file' type='file'/>" +
                        "</li><br>"
                        +"</ul>"
                        +"</div></td>"
                        +"</tr>");

                        $("#tbody1").append($tr)


                    });

                    //-------------------------------------
                    $("#PrevPage").attr("disabled",true);
                    $("#NextPage").attr("disabled",true);

                    if(JSON.stringify(data.data.total) <20){
                        $("#NextPage").attr("disabled",true);
                    }else{
                        $("#NextPage").removeAttr("disabled");
                    }
                    //------------------------------------进行审核-------------------------------------------------
                    $(".jump").on('click',function(){
                        // $(".remodal-wrapper").css("display","block")
                        // $(".remodal-overlay").css("display","block")
                        var index1=$(this).parent('tr').children("td").eq(0).attr('goodid')
                        // //console.log($("#select3").val().substring(0,1))

                        if($(this).parent().children("td").eq(10).children('a').eq(0).html()=="下架护工"){

                            $('.a3').attr('data-target','#outModal');

                            // $(".remodal-wrapper").css("display","none");
                            // $('.audit').css("display",'none');
                            // $("#audit4").css("display","block");

                            // $(this).parent().children("td").eq(9).children('a').eq(0).attr("href","#modal2")
                            $(".Xbutton").on("click",function(){
                                if($("#outTextArea").val().length==''){
                                    swal("请填写下架的原因");
                                }else{
                                    $.ajax({
                                        type:"post",
                                       //url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                                        url:urlx("admin/unShelveNurse.action"),
                                        headers:{
                                            "code":$.cookie("code"),
                                            "token":$.cookie("token")
                                        },
                                        dataType: "json",
                                        data:{

                                            "id":index1,
                                             "reason": "下架原因：" + $("#outTextArea").val()
                                        },
                                        success: function(data){
                                            //console.log(data)
                                            switch(JSON.stringify(data.code))
                                            {
                                                case '"A00000"':

                                                    swal("短信已发送至护工");
                                                    // $(".remodal-wrapper").css("display","none")
                                                    // $(".remodal-overlay").css("display","none")
                                                    location.reload()
                                                    break;
                                                default:
                                                    alert("请求失败")

                                            }
                                        },
                                        error:function(XmlHttpRequest,textStatus, errorThrown){
                                            console.log("请求失败"+XmlHttpRequest.responseText);
                                        }
                                    });//下架
                                }

                            })

                            /**解绑**/

                            $(".Xbutton").unbind('click').click(function(e){
                                if($("#outTextArea").val().length==''){
                                    swal("请填写下架的原因");
                                }else{
                                    $.ajax({
                                        type:"post",
                                        //url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                                         url:urlx("admin/unShelveNurse.action"),
                                        headers:{
                                            "code":$.cookie("code"),
                                            "token":$.cookie("token")
                                        },
                                        dataType: "json",
                                        data:{

                                            "id":index1,
                                             "reason": "下架原因：" + $("#outTextArea").val()
                                        },
                                        success: function(data){
                                            //console.log(data)
                                            switch(JSON.stringify(data.code))
                                            {
                                                case '"A00000"':

                                                    swal("短信已发送至护工");
                                                    // $(".remodal-wrapper").css("display","none")
                                                    // $(".remodal-overlay").css("display","none")
                                                    location.reload()
                                                    break;
                                                default:
                                                    alert("请求失败")

                                            }
                                        },
                                        error:function(XmlHttpRequest,textStatus, errorThrown){
                                            console.log("请求失败"+XmlHttpRequest.responseText);
                                        }
                                    });//下架
                                }

                            });

                        } else {
                            // $(".remodal-wrapper").css("display","block");
                            // $(".remodal-overlay").css("display","block");

                            $('.a3').attr('data-target','#myModal');

                            // $(".sold-out").css('display','none');

                            $(".btn1").on("click", function () {
                                $.ajax({
                                    type: "post",
                                   // url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                                    url:urlx("admin/verifyNurse.action"),
                                    headers: {
                                        "code": $.cookie("code"),
                                        "token": $.cookie("token")
                                    },
                                    dataType: "json",
                                    data: {

                                        "id": index1,
                                        "type": $("#select1").val().substring(0, 1)
                                    },
                                    success: function (data) {
                                        //console.log(data)
                                        switch (JSON.stringify(data.code)) {
                                            case '"A00000"':
                                                swal("审核成功");
                                                // $(".remodal-wrapper").css("display", "none")
                                                // $(".remodal-overlay").css("display", "none")
                                                location.reload()
                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                                        console.log("请求失败" + XmlHttpRequest.responseText);
                                    }
                                });//审核成功
                            });

                            /**解绑**/
                            $(".btn1").unbind('click').click(function (e) {
                                $.ajax({
                                    type: "post",
                                    //url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                                     url:urlx("admin/verifyNurse.action"),
                                    headers: {
                                        "code": $.cookie("code"),
                                        "token": $.cookie("token")
                                    },
                                    dataType: "json",
                                    data: {

                                        "id": index1,
                                        "type": $("#select1").val().substring(0, 1)
                                    },
                                    success: function (data) {
                                        //console.log(data)
                                        switch (JSON.stringify(data.code)) {
                                            case '"A00000"':
                                                swal("审核成功");
                                                // $(".remodal-wrapper").css("display", "none")
                                                // $(".remodal-overlay").css("display", "none")
                                                location.reload()
                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                                        console.log("请求失败" + XmlHttpRequest.responseText);
                                    }
                                });//审核成功
                            });

                            $(".btn2").on("click", function () {
                                if ($("#bustTextArea").val().length == '') {
                                    // //console.log($("#textarea3").val());
                                    swal("请填写审核失败的原因");
                                } else {
                                    $.ajax({
                                        type: "post",
                                       //url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                                        url:urlx("admin/forbidNurse.action"),
                                        headers: {
                                            "code": $.cookie("code"),
                                            "token": $.cookie("token")
                                        },
                                        dataType: "json",
                                        data: {

                                            "id": index1,
                                            "reason": $("#bustTextArea").val()
                                        },
                                        success: function (data) {
                                            //console.log(data)
                                            switch (JSON.stringify(data.code)) {
                                                case '"A00000"':

                                                    swal("短信已发送至护工");
                                                    // $(".remodal-wrapper").css("display", "none")
                                                    // $(".remodal-overlay").css("display", "none")
                                                    location.reload()
                                                    break;
                                                default:
                                                    alert("请求失败")

                                            }
                                        },
                                        error: function (XmlHttpRequest, textStatus, errorThrown) {
                                            console.log("请求失败" + XmlHttpRequest.responseText);
                                        }
                                    });//审核失败
                                }

                            });


                            /**解绑事件**/
                            $(".btn2").unbind('click').click(function (e) {
                                if ($("#bustTextArea").val().length == '') {
                                    // //console.log($("#textarea3").val());
                                    swal("请填写审核失败的原因");
                                } else {
                                    $.ajax({
                                        type: "post",
                                        //url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                                        url:urlx("admin/forbidNurse.action"),
                                        headers: {
                                            "code": $.cookie("code"),
                                            "token": $.cookie("token")
                                        },
                                        dataType: "json",
                                        data: {

                                            "id": index1,
                                            "reason": $("#bustTextArea").val()
                                        },
                                        success: function (data) {
                                            //console.log(data)
                                            switch (JSON.stringify(data.code)) {
                                                case '"A00000"':

                                                    swal("短信已发送至护工");
                                                    // $(".remodal-wrapper").css("display", "none")
                                                    // $(".remodal-overlay").css("display", "none")
                                                    location.reload()
                                                    break;
                                                default:
                                                    alert("请求失败")

                                            }
                                        },
                                        error: function (XmlHttpRequest, textStatus, errorThrown) {
                                            console.log("请求失败" + XmlHttpRequest.responseText);
                                        }
                                    });//审核失败
                                }

                            });
                        }

                    })
//-----------------------------------显示遮罩层与更多信息---------------------------------------------------------
                    /**
                     * 联系方式搜索
                     */
                    // $(".a1").on("click",function(){
                    //     //console.log($(this).parents('tr').children("td").eq(11))
                    //     $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','block')
                    //     $("#cover").addClass("cover1")
                    // })
                    $(".q").on("click",function(){
                        // //console.log($(this).parents('tr').children("td").eq(11))
                        var index1 = $(this).parent('tr').children("td").eq(0).attr('goodid');

                        // //console.log(index1);
                        localStorage.setItem("id", index1);
                        // localStorage.setImg()
                        // //console.log(nurseId);
                        $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','block')
                        $("#cover").addClass("cover1")

                        /**
                         * 修改护工信息
                         */
                        $('.save-update').on('click',function (e) {
                            var logoImg = $(this).parent('ul').children('li').eq(1).children('img').attr('src');
                            var positiveImg = $(this).parent('ul').children('li').eq(18).children('img').attr('src'); //修改身份证正面
                            var obverseImg = $(this).parent('ul').children('li').eq(19).children('img').attr('src');
                            var licenseImg = $(this).parent('ul').children('li').eq(20).children('img').attr('src');
                            var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();

                            // //console.log(img);
                            localStorage.setItem('logo',logoImg);
                            localStorage.setItem('positiveImg',positiveImg);
                            localStorage.setItem('obverseImg',obverseImg);
                            localStorage.setItem('licenseImg',licenseImg);
                            localStorage.setItem('nurseName',nurseName);
                            //切换按钮
                            $(this).children("a").eq(0).css("display","none");
                            $(this).children("a").eq(1).css("display","block");

                            // //console.log($(this).parent('tr').children("td").eq(0).attr('goodid'));
                            //console.log( $(this).parent('ul').children('li').eq(0).children('input').val());
                            var name1 = $(this).parent('ul').children('li').eq(2).children('input').val();
                            localStorage.setItem('nurseName',name1);
                            $(this).parent('ul').children('li').eq(1).children('input').attr("disabled",false); //修改头像
                            $(this).parent('ul').children('li').eq(2).children('input').eq(0).attr("disabled",false); //修改姓名
                            $(this).parent('ul').children('li').eq(4).children('select').attr("disabled",false); //修改性别
                            $(this).parent('ul').children('li').eq(8).children('input').attr("disabled",false); //手机号
                            $(this).parent('ul').children('li').eq(9).children('input').attr("disabled",false); //身份证号
                            $(this).parent('ul').children('li').eq(11).children('input').attr("disabled",false); //籍贯
                            $(this).parent('ul').children('li').eq(12).children('input').attr("disabled",false); //修改住址
                            $(this).parent('ul').children('li').eq(13).children('input').attr("disabled",false); //修改服务区域
                            $(this).parent('ul').children('li').eq(14).children('input').attr("disabled",false); //修改工作年份
                            $(this).parent('ul').children('li').eq(15).children('input').attr("disabled",false); //修改自我介绍
                            $(this).parent('ul').children('li').eq(16).children('input').attr("disabled",false); //修改银行卡号
                            $(this).parent('ul').children('li').eq(17).children('input').attr("disabled",false); //修改开户行
                            $(this).parent('ul').children('li').eq(18).children('input').attr("disabled",false); //修改身份证正面
                            $(this).parent('ul').children('li').eq(19).children('input').attr("disabled",false); //修改身份证反面
                            $(this).parent('ul').children('li').eq(20).children('input').attr("disabled",false); //修改资格证


                        });

                        /**
                         * 保存修改信息
                         */
                        $('.nurse-save').on('click',function () {

                            //console.log($(this).parent('div').parent('ul').children('li').eq(2).children('input').val());
                            // var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();
                            // //console.log(nurseName);
                            // localStorage.setItem('nurseName',nurseName);
                            //console.log(localStorage.getItem('id'));
                            $.ajax({
                                type:"post",
                                //url:"http://admindev.honganjk.com/admin/editNurse.action",
                                url:urlx("admin/editNurse.action"),
                                headers:{
                                    "code":$.cookie("code"),
                                    "token":$.cookie("token")
                                },
                                dataType: "json",
                                data:{
                                    "id": localStorage.getItem('id'),
                                    "img":localStorage.getItem('logo'), //修改头像
                                    "name":$(this).parent('div').parent('ul').children('li').eq(2).children('input').val(),//修改姓名
                                    "sex":editSex($(this).parent('div').parent('ul').children('li').eq(4).children('select').val()), //修改性别
                                    "mobile":$(this).parent('div').parent('ul').children('li').eq(8).children('input').val(), //身份证号
                                    "sn":$(this).parent('div').parent('ul').children('li').eq(9).children('input').val(), //修改籍贯
                                    "birthplace":$(this).parent('div').parent('ul').children('li').eq(11).children('input').val(), //修改手机号
                                    "address":$(this).parent('div').parent('ul').children('li').eq(12).children('input').val(), //修改住址
                                    "area":$(this).parent('div').parent('ul').children('li').eq(13).children('input').val(), //修改服务区域
                                    "years":$(this).parent('div').parent('ul').children('li').eq(14).children('input').val(), //修改工作年份
                                    "introduction":$(this).parent('div').parent('ul').children('li').eq(15).children('input').val(), //修改自我介绍
                                    "card":$(this).parent('div').parent('ul').children('li').eq(16).children('input').val(), //修改银行卡号
                                    "bank":$(this).parent('div').parent('ul').children('li').eq(17).children('input').val(), //修改开户行
                                    "positiveImg": localStorage.getItem('positiveImg'), //修改身份证正面
                                    "obverseImg":localStorage.getItem('obverseImg'), //修改身份证反面
                                    "licenseImg":localStorage.getItem('licenseImg') //修改资格证
                                },

                                success: function (data) {


                                    //console.log(data);
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


                                },

                                error:function(XmlHttpRequest,textStatus, errorThrown){
                                    console.log("请求失败"+XmlHttpRequest.responseText);

                                }

                            });




                        });


                    });
                    $(".xx").on("click",function(){
                        $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','none')
                        $("#cover").removeClass("cover1")
                    })


                    /**
                     * 上传头像
                     */
                    var uploader = uploadJSSDK;
                    $(".file").on("change",function(e){
                        $(".cms-nurse-logo").attr('src',"../images/jiazai0.gif")
                        var files = e.target.files;
                        for(var i=0;i<files.length;i++){
                            uploader({
                                file: files[i],
                                name: new Date().getTime(),
                                token: imgtoken,
                                dir: "dev",
                                callback: function (percent, result) {
                                    if(percent==100){
                                        //console.log(percent)
                                        //console.log(result.url)
                                        localStorage.setItem('logo',result.url);
                                        $(".cms-nurse-logo").attr('src', result.url)

                                    }

                                }
                            });
                        }
                    });


                    /**
                     * 上传身份证正面
                     */
                    var uploader = uploadJSSDK;
                    $(".nurse-positiveImg").on("change",function(e){
                        $(".cms-nurse-positiveImg").attr('src',"../images/jiazai0.gif")
                        var files = e.target.files;
                        for(var i=0;i<files.length;i++){
                            uploader({
                                file: files[i],
                                name: new Date().getTime(),
                                token: imgtoken,
                                dir: "dev",
                                callback: function (percent, result) {
                                    if(percent==100){
                                        //console.log(percent)
                                        //console.log(result.url)
                                        localStorage.setItem('positiveImg',result.url);
                                        $(".cms-nurse-positiveImg").attr('src', result.url)
                                    }

                                }
                            });
                        }
                    });


                    /**
                     * 上传身份证反面
                     */
                    var uploader = uploadJSSDK;
                    $(".nurse-obverseImg").on("change",function(e){
                        $(".cms-nurse-obverseImg").attr('src',"../images/jiazai0.gif")
                        var files = e.target.files;
                        for(var i=0;i<files.length;i++){
                            uploader({
                                file: files[i],
                                name: new Date().getTime(),
                                token: imgtoken,
                                dir: "dev",
                                callback: function (percent, result) {
                                    if(percent==100){
                                        //console.log(percent)
                                        //console.log(result.url)
                                        localStorage.setItem('obverseImg',result.url)
                                        $(".cms-nurse-obverseImg").attr('src', result.url)
                                    }

                                }
                            });
                        }
                    });


                    /**
                     * 上传资格证
                     */
                    var uploader = uploadJSSDK;
                    $(".nurse-licenseImg").on("change",function(e){
                        $(".cms-nurse-licenseImg").attr('src',"../images/jiazai0.gif")
                        var files = e.target.files;
                        for(var i=0;i<files.length;i++){
                            uploader({
                                file: files[i],
                                name: new Date().getTime(),
                                token: imgtoken,
                                dir: "dev",
                                callback: function (percent, result) {
                                    if(percent==100){
                                        //console.log(percent)
                                        //console.log(result.url)
                                        localStorage.setItem('licenseImg',result.url)
                                        $(".cms-nurse-licenseImg").attr('src', result.url)
                                    }

                                }
                            });
                        }
                    });

                },



                error:function(XmlHttpRequest,textStatus,errorThrown){
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            })
        }else{
            $.ajax({
                type: "get",
               // url: "http://admindev.honganjk.com/admin/nurses.action",
                url:urlx("admin/nurses.action"),
                data: {
                    "start":0,
                    "size":1000,
                    "mobile":$(".wd").val(),
                },
                dataType: "json",
                headers:{
                    "code":$.cookie("code"),
                    "token":$.cookie("token")
                },
                success: function (data) {
                    //console.log(data)
                    $.each(data.data.objs, function(index) {
                        var a=data.data.objs[index].id
                        var b=data.data.objs[index].type
                        //console.log(data.data.objs[index].ctype)

                        $tr=("<tr >"+
                        "<td goodid=" + a + ">"+data.data.objs[index].id+"</td>  <td goodid2=" + b + ">"+shanghu(data.data.objs[index].dtype)+"</td> <td>"+data.data.objs[index].name+"</td> <td>"+data.data.objs[index].mobile+"</td> <td>"+sex(data.data.objs[index].sex)+"</td> <td>"+data.data.objs[index].sn+"</td> <td>"+data.data.objs[index].years+"</td> <td>"+formatDate(data.data.objs[index].createTime)+"</td> <td>"+formatDate(data.data.objs[index].updateTime)+"</td>"
                        +"<td class='q'><a  class='a1'>更多</a></td> <td class='jump'><a class='a3' data-toggle='modal' data-target='#myModal'>"+zhuangtai1(data.data.objs[index].type)+"</a>"
                        +"<td><div class='box1'>"
                        +"<div class='jumbotron jumbotron-style'>"
                        +"<div class='container'>"
                        +"<h3>护工详细信息</h3>"
                        +"</div> "
                        +"</div> "
                        +"<ul class='adddishesUl'>"
                        +"<div class='save-update'>"
                        +"<a class='nurse-update'>修改</a>"
                        +"<a class='nurse-save'>保存</a>"
                        +"</div>"
                        +"<img class='xx' src='../images/xxafter.png'/>"
                        +"<li><span>id:</span>"
                        +"<input disabled class='nurse-id' type='text' value='"+data.data.objs[index].id+"'/>"
                        +"</li>"
                        +"<li><span>护工头像:</span>"
                        +"<img id='flexible-img' class='small cms-nurse-logo' src='"+data.data.objs[index].img+"' />"
                        +"<input disabled class='file nurse-logo' type='file'/>"
                        +"</li>"
                        +"<li><span>护工名称:</span>"
                        +"<input disabled type='text' value='"+data.data.objs[index].name+"'/>"
                        +"</li>"
                        +"<li><span>护工类型:</span>"
                        +"<input disabled type='text'value='"+workType(data.data.objs[index].stype)+"'/>"
                        +"</li>"
                        +"<li><span>性别:</span>"
                        +"<select class='chooseSex' disabled>"
                        +"<option>"+sex(data.data.objs[index].sex)+"</option>"
                        +"<option>女</option>"
                        +"<option>男</option>"
                        +"</select>"
                        +"</li>"
                        +"<li><span>服务类型:</span>"
                        +"<input type='text'value='"+shanghu(data.data.objs[index].dtype)+"'/>"
                        +"</li>"
                        +"<li><span>状态类型:</span>"
                        +"<input type='text'value='"+zhuangtai2(data.data.objs[index].type)+"'/>"
                        +"</li>"
                        +"<li><span>账号:</span>"
                        +"<input type='text'value='"+data.data.objs[index].account+"'/>"
                        +"</li>"
                        +"<li><span>联系人号码:</span>"
                        +"<input disabled class='nurse-mobile' type='text'value='"+data.data.objs[index].mobile+"'/>"
                        +"</li>"
                        +"<li><span>身份证号:</span>"
                        +"<input disabled class='nurse-sn' type='text'value='"+data.data.objs[index].sn+"'/>"
                        +"</li>"
                        +"<li><span>出生日期:</span>"
                        +"<input type='text'value='"+formatBirthday(data.data.objs[index].born)+"'/>"
                        +"</li>"
                        +"<li><span>籍贯:</span>"
                        +"<input disabled class='nurse-birthplace' type='text'value='"+data.data.objs[index].birthplace+"'/>"
                        +"</li>"
                        +"<li><span>现住址:</span>"
                        +"<input disabled class='nurse-address' type='text'value='"+data.data.objs[index].address+"'/>"
                        +"</li>"
                        +"<li><span>服务区域:</span>"
                        +"<input disabled class='nurse-area' type='text'value='"+data.data.objs[index].area+"'/>"
                        +"</li>"
                        +"<li><span>工作年限:</span>"
                        +"<input disabled class='nurse-years' type='text'value='"+data.data.objs[index].years+"'/>"
                        +"</li>"
                        +"<li><span>介绍:</span>"
                        +"<input disabled class='nurse-introduce' type='text'value='"+data.data.objs[index].introduction+"'/>"
                        +"</li>"
                        +"<li><span>银行卡号:</span>"
                        +"<input disabled class='nurse-card' type='text'value='"+data.data.objs[index].card+"'/>" +
                        "</li>"
                        +"<li><span>开户行:</span>" +
                        "<input disabled class='nurse-bank' type='text'value='"+data.data.objs[index].bank+"'/>" +
                        "</li>"
                        +"<li><span>身份证正面:</span>" +
                        "<img class='cms-nurse-positiveImg'  src='"+data.data.objs[index].positiveImg+"'/>" +
                        "<input disabled class='nurse-positiveImg file' type='file'/>" +
                        "</li><br>"
                        +"<li><span>身份证反面:</span>" +
                        "<img class='cms-nurse-obverseImg' src='"+data.data.objs[index].obverseImg+"'/>" +
                        "<input disabled class='nurse-obverseImg file' type='file'/>" +
                        "</li><br>" +
                        "<li><span>资格证:</span>" +
                        "<img class='cms-nurse-licenseImg' src='"+data.data.objs[index].licenseImg+"'/>" +
                        "<input disabled class=' nurse-licenseImg file' type='file'/>" +
                        "</li><br>"
                        +"</ul>"
                        +"</div></td>"
                        +"</tr>");

                        $("#tbody1").append($tr)


                    });

                    //-------------------------------------
                    $("#PrevPage").attr("disabled",true);
                    $("#NextPage").attr("disabled",true);

                    if(JSON.stringify(data.data.total) <20){
                        $("#NextPage").attr("disabled",true);
                    }else{
                        $("#NextPage").removeAttr("disabled");
                    }
                    //------------------------------------进行审核-------------------------------------------------
                    $(".jump").on('click',function(){
                        // $(".remodal-wrapper").css("display","block")
                        // $(".remodal-overlay").css("display","block")
                        var index1=$(this).parent('tr').children("td").eq(0).attr('goodid')
                        // //console.log($("#select3").val().substring(0,1))

                        if($(this).parent().children("td").eq(10).children('a').text()==='下架护工'){
                            $('.a3').attr('data-target','#outModal');

                            // $(".remodal-wrapper").css("display","none");
                            // $("#audit4").css("display","block");

                            $(this).parent().children("td").eq(9).children('a').eq(0).attr("href","#modal2")
                            $(".Xbutton").on("click",function(){
                                if($("#outTextArea").val().length==''){
                                    //console.log($("#outTextArea").val());
                                    swal("请填写下架原因!!");
                                    // alert("请填写下 架的原因")
                                }else{
                                    $.ajax({
                                        type:"post",
                                       //url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                                       url:urlx("admin/unShelveNurse.action"),
                                        headers:{
                                            "code":$.cookie("code"),
                                            "token":$.cookie("token")
                                        },
                                        dataType: "json",
                                        data:{

                                            "id":index1,
                                             "reason": "下架原因：" + $("#outTextArea").val()
                                        },
                                        success: function(data){
                                            //console.log(data)
                                            switch(JSON.stringify(data.code))
                                            {
                                                case '"A00000"':

                                                    swal("短信已发送至客户")

                                                    location.reload();
                                                    // $(".remodal-wrapper").css("display","none")
                                                    // $(".remodal-overlay").css("display","none")

                                                    break;
                                                default:
                                                    alert("请求失败")

                                            }
                                        },
                                        error:function(XmlHttpRequest,textStatus, errorThrown){
                                            console.log("请求失败"+XmlHttpRequest.responseText);
                                        }
                                    });//下架
                                }

                            });
                            /**解绑**/
                            $(".Xbutton").unbind('click').click(function(e){
                                if($("#outTextArea").val().length==''){
                                    swal("请填写下架原因!!");
                                }else{
                                    $.ajax({
                                        type:"post",
                                       // url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                                        url:urlx("admin/unShelveNurse.action"),
                                        headers:{
                                            "code":$.cookie("code"),
                                            "token":$.cookie("token")
                                        },
                                        dataType: "json",
                                        data:{

                                            "id":index1,
                                             "reason": "下架原因：" + $("#outTextArea").val()
                                        },
                                        success: function(data){
                                            //console.log(data)
                                            switch(JSON.stringify(data.code))
                                            {
                                                case '"A00000"':

                                                    alert("短信已发送至护工")

                                                    location.reload();
                                                    // $(".remodal-wrapper").css("display","none")
                                                    // $(".remodal-overlay").css("display","none")

                                                    break;
                                                default:
                                                    alert("请求失败")

                                            }
                                        },
                                        error:function(XmlHttpRequest,textStatus, errorThrown){
                                            console.log("请求失败"+XmlHttpRequest.responseText);
                                        }
                                    });//下架
                                }

                            })
                        } else {
                            $('.a3').attr('data-target', '#myModal');
                            $(".btn1").on("click", function () {
                                $.ajax({
                                    type: "post",
                                    //url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                                     url:urlx("admin/verifyNurse.action"),
                                    headers: {
                                        "code": $.cookie("code"),
                                        "token": $.cookie("token")
                                    },
                                    dataType: "json",
                                    data: {

                                        "id": index1,
                                        "type": $("#select1").val().substring(0, 1)
                                    },
                                    success: function (data) {
                                        //console.log(data)
                                        switch (JSON.stringify(data.code)) {
                                            case '"A00000"':
                                                swal("审核成功");
                                                location.reload()
                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                                        console.log("请求失败" + XmlHttpRequest.responseText);
                                    }
                                });//审核成功
                            });

                            /**解绑**/
                            $(".btn1").unbind('click').click(function (e) {
                                $.ajax({
                                    type: "post",
                                    //url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                                    url:urlx("admin/verifyNurse.action"),
                                    headers: {
                                        "code": $.cookie("code"),
                                        "token": $.cookie("token")
                                    },
                                    dataType: "json",
                                    data: {

                                        "id": index1,
                                        "type": $("#select1").val().substring(0, 1)
                                    },
                                    success: function (data) {
                                        //console.log(data)
                                        switch (JSON.stringify(data.code)) {
                                            case '"A00000"':
                                                swal("审核成功");
                                                location.reload()
                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                                        console.log("请求失败" + XmlHttpRequest.responseText);
                                    }
                                });//审核成功
                            });

                            $(".btn2").on("click", function () {
                                if ($("#bustTextArea").val().length == '') {
                                    // //console.log($("#textarea3").val());
                                    swal("请填写审核失败的原因");
                                } else {
                                    $.ajax({
                                        type: "post",
                                       // url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                                       url:urlx("admin/forbidNurse.action"),
                                        headers: {
                                            "code": $.cookie("code"),
                                            "token": $.cookie("token")
                                        },
                                        dataType: "json",
                                        data: {

                                            "id": index1,
                                            "reason": $("#bustTextArea").val()
                                        },
                                        success: function (data) {
                                            //console.log(data)
                                            switch (JSON.stringify(data.code)) {
                                                case '"A00000"':

                                                    swal("短信已发送至护工");
                                                    // $(".remodal-wrapper").css("display","none")
                                                    // $(".remodal-overlay").css("display","none")
                                                    location.reload()
                                                    break;
                                                default:
                                                    alert("请求失败")

                                            }
                                        },
                                        error: function (XmlHttpRequest, textStatus, errorThrown) {
                                            console.log("请求失败" + XmlHttpRequest.responseText);
                                        }
                                    });//审核失败
                                }

                            });

                            /**解绑**/


                            $(".btn2").unbind('click').click(function (e) {
                                if ($("#bustTextArea").val().length == '') {
                                    // //console.log($("#textarea3").val());
                                    swal("请填写审核失败的原因");
                                } else {
                                    $.ajax({
                                        type: "post",
                                        //url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                                        url:urlx("admin/forbidNurse.action"),
                                        headers: {
                                            "code": $.cookie("code"),
                                            "token": $.cookie("token")
                                        },
                                        dataType: "json",
                                        data: {

                                            "id": index1,
                                            "reason": $("#bustTextArea").val()
                                        },
                                        success: function (data) {
                                            //console.log(data)
                                            switch (JSON.stringify(data.code)) {
                                                case '"A00000"':

                                                    swal("短信已发送至护工");
                                                    // $(".remodal-wrapper").css("display","none")
                                                    // $(".remodal-overlay").css("display","none")
                                                    location.reload()
                                                    break;
                                                default:
                                                    alert("请求失败")

                                            }
                                        },
                                        error: function (XmlHttpRequest, textStatus, errorThrown) {
                                            console.log("请求失败" + XmlHttpRequest.responseText);
                                        }
                                    });//审核失败
                                }

                            });
                        }
                    });
                    //-----------------------------------显示遮罩层与更多信息---------------------------------------------------------
                    // $(".a1").on("click",function(){
                    //     //console.log($(this).parents('tr').children("td").eq(11))
                    //     $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','block')
                    //     $("#cover").addClass("cover1")
                    // })
                    $(".q").on("click",function(){
                        // //console.log($(this).parents('tr').children("td").eq(11))
                        var index1 = $(this).parent('tr').children("td").eq(0).attr('goodid');

                        // //console.log(index1);
                        localStorage.setItem("id", index1);
                        // localStorage.setImg()
                        // //console.log(nurseId);
                        $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','block')
                        $("#cover").addClass("cover1")

                        /**
                         * 修改护工信息
                         */
                        $('.save-update').on('click',function (e) {
                            var logoImg = $(this).parent('ul').children('li').eq(1).children('img').attr('src');
                            var positiveImg = $(this).parent('ul').children('li').eq(18).children('img').attr('src'); //修改身份证正面
                            var obverseImg = $(this).parent('ul').children('li').eq(19).children('img').attr('src');
                            var licenseImg = $(this).parent('ul').children('li').eq(20).children('img').attr('src');
                            var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();

                            // //console.log(img);
                            localStorage.setItem('logo',logoImg);
                            localStorage.setItem('positiveImg',positiveImg);
                            localStorage.setItem('obverseImg',obverseImg);
                            localStorage.setItem('licenseImg',licenseImg);
                            localStorage.setItem('nurseName',nurseName);
                            //切换按钮
                            $(this).children("a").eq(0).css("display","none");
                            $(this).children("a").eq(1).css("display","block");

                            // //console.log($(this).parent('tr').children("td").eq(0).attr('goodid'));
                            //console.log( $(this).parent('ul').children('li').eq(0).children('input').val());
                            var name1 = $(this).parent('ul').children('li').eq(2).children('input').val();
                            localStorage.setItem('nurseName',name1);
                            $(this).parent('ul').children('li').eq(1).children('input').attr("disabled",false); //修改头像
                            $(this).parent('ul').children('li').eq(2).children('input').eq(0).attr("disabled",false); //修改姓名
                            $(this).parent('ul').children('li').eq(4).children('select').attr("disabled",false); //修改性别
                            $(this).parent('ul').children('li').eq(8).children('input').attr("disabled",false); //手机号
                            $(this).parent('ul').children('li').eq(9).children('input').attr("disabled",false); //身份证号
                            $(this).parent('ul').children('li').eq(11).children('input').attr("disabled",false); //籍贯
                            $(this).parent('ul').children('li').eq(12).children('input').attr("disabled",false); //修改住址
                            $(this).parent('ul').children('li').eq(13).children('input').attr("disabled",false); //修改服务区域
                            $(this).parent('ul').children('li').eq(14).children('input').attr("disabled",false); //修改工作年份
                            $(this).parent('ul').children('li').eq(15).children('input').attr("disabled",false); //修改自我介绍
                            $(this).parent('ul').children('li').eq(16).children('input').attr("disabled",false); //修改银行卡号
                            $(this).parent('ul').children('li').eq(17).children('input').attr("disabled",false); //修改开户行
                            $(this).parent('ul').children('li').eq(18).children('input').attr("disabled",false); //修改身份证正面
                            $(this).parent('ul').children('li').eq(19).children('input').attr("disabled",false); //修改身份证反面
                            $(this).parent('ul').children('li').eq(20).children('input').attr("disabled",false); //修改资格证


                        });

                        /**
                         * 保存修改信息
                         */
                        $('.nurse-save').on('click',function () {

                            //console.log($(this).parent('div').parent('ul').children('li').eq(2).children('input').val());
                            // var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();
                            // //console.log(nurseName);
                            // localStorage.setItem('nurseName',nurseName);
                            //console.log(localStorage.getItem('id'));
                            $.ajax({
                                type:"post",
                                //url:"http://admindev.honganjk.com/admin/editNurse.action",
                                url:urlx("admin/editNurse.action"),
                                headers:{
                                    "code":$.cookie("code"),
                                    "token":$.cookie("token")
                                },
                                dataType: "json",
                                data:{
                                    "id": localStorage.getItem('id'),
                                    "img":localStorage.getItem('logo'), //修改头像
                                    "name":$(this).parent('div').parent('ul').children('li').eq(2).children('input').val(),//修改姓名
                                    "sex":editSex($(this).parent('div').parent('ul').children('li').eq(4).children('select').val()), //修改性别
                                    "mobile":$(this).parent('div').parent('ul').children('li').eq(8).children('input').val(), //身份证号
                                    "sn":$(this).parent('div').parent('ul').children('li').eq(9).children('input').val(), //修改籍贯
                                    "birthplace":$(this).parent('div').parent('ul').children('li').eq(11).children('input').val(), //修改手机号
                                    "address":$(this).parent('div').parent('ul').children('li').eq(12).children('input').val(), //修改住址
                                    "area":$(this).parent('div').parent('ul').children('li').eq(13).children('input').val(), //修改服务区域
                                    "years":$(this).parent('div').parent('ul').children('li').eq(14).children('input').val(), //修改工作年份
                                    "introduction":$(this).parent('div').parent('ul').children('li').eq(15).children('input').val(), //修改自我介绍
                                    "card":$(this).parent('div').parent('ul').children('li').eq(16).children('input').val(), //修改银行卡号
                                    "bank":$(this).parent('div').parent('ul').children('li').eq(17).children('input').val(), //修改开户行
                                    "positiveImg": localStorage.getItem('positiveImg'), //修改身份证正面
                                    "obverseImg":localStorage.getItem('obverseImg'), //修改身份证反面
                                    "licenseImg":localStorage.getItem('licenseImg') //修改资格证
                                },

                                success: function (data) {


                                    //console.log(data);
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


                                },

                                error:function(XmlHttpRequest,textStatus, errorThrown){
                                    console.log("请求失败"+XmlHttpRequest.responseText);

                                }

                            });




                        });


                    });
                    $(".xx").on("click",function(){
                        $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','none')
                        $("#cover").removeClass("cover1")
                    })


                    /**
                     * 上传头像
                     */
                    var uploader = uploadJSSDK;
                    $(".file").on("change",function(e){
                        $(".cms-nurse-logo").attr('src',"../images/jiazai0.gif")
                        var files = e.target.files;
                        for(var i=0;i<files.length;i++){
                            uploader({
                                file: files[i],
                                name: new Date().getTime(),
                                token: imgtoken,
                                dir: "dev",
                                callback: function (percent, result) {
                                    if(percent==100){
                                        //console.log(percent)
                                        //console.log(result.url)
                                        localStorage.setItem('logo',result.url);
                                        $(".cms-nurse-logo").attr('src', result.url)

                                    }

                                }
                            });
                        }
                    });


                    /**
                     * 上传身份证正面
                     */
                    var uploader = uploadJSSDK;
                    $(".nurse-positiveImg").on("change",function(e){
                        $(".cms-nurse-positiveImg").attr('src',"../images/jiazai0.gif")
                        var files = e.target.files;
                        for(var i=0;i<files.length;i++){
                            uploader({
                                file: files[i],
                                name: new Date().getTime(),
                                token: imgtoken,
                                dir: "dev",
                                callback: function (percent, result) {
                                    if(percent==100){
                                        //console.log(percent)
                                        //console.log(result.url)
                                        localStorage.setItem('positiveImg',result.url);
                                        $(".cms-nurse-positiveImg").attr('src', result.url)
                                    }

                                }
                            });
                        }
                    });


                    /**
                     * 上传身份证反面
                     */
                    var uploader = uploadJSSDK;
                    $(".nurse-obverseImg").on("change",function(e){
                        $(".cms-nurse-obverseImg").attr('src',"../images/jiazai0.gif")
                        var files = e.target.files;
                        for(var i=0;i<files.length;i++){
                            uploader({
                                file: files[i],
                                name: new Date().getTime(),
                                token: imgtoken,
                                dir: "dev",
                                callback: function (percent, result) {
                                    if(percent==100){
                                        //console.log(percent)
                                        //console.log(result.url)
                                        localStorage.setItem('obverseImg',result.url)
                                        $(".cms-nurse-obverseImg").attr('src', result.url)
                                    }

                                }
                            });
                        }
                    });


                    /**
                     * 上传资格证
                     */
                    var uploader = uploadJSSDK;
                    $(".nurse-licenseImg").on("change",function(e){
                        $(".cms-nurse-licenseImg").attr('src',"../images/jiazai0.gif")
                        var files = e.target.files;
                        for(var i=0;i<files.length;i++){
                            uploader({
                                file: files[i],
                                name: new Date().getTime(),
                                token: imgtoken,
                                dir: "dev",
                                callback: function (percent, result) {
                                    if(percent==100){
                                        //console.log(percent)
                                        //console.log(result.url)
                                        localStorage.setItem('licenseImg',result.url)
                                        $(".cms-nurse-licenseImg").attr('src', result.url)
                                    }

                                }
                            });
                        }
                    });
                },
                error:function(XmlHttpRequest,textStatus,errorThrown){
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            });


            /**
             * 验证阿里百川
             */
            $.ajax({
                type: "get",
               // url: "https://bzapi.honganjk.com/common/getToken.action",
                url:urla("common/getToken.action"),
                data: {
                    "key":"23384196",
                    "secret":"7b484f801524af3bb7f6abb0dbe63459",
                    "namespace":"hajk",
                },
                dataType: "json",
                success: function (data) {
                    //console.log(data)
                    window.imgtoken = data.data;
                    //console.log(imgtoken);
                },
                error:function(XmlHttpRequest,textStatus, errorThrown)
                {
                    console.log("请求失败"+XmlHttpRequest.responseText);
                }
            });
        }
    })


//---------------------------------------------------全部列表分页----------------------------------------------
    if($("#dishpageval").val() == 0){
//	      			//console.log("0")
        $("#PrevPage").attr("disabled",true);
    }//菜品列表分页相关


    $("#NextPage").click(function(){
        $("#tbody1").empty($tr)
        $("#change1").text(1)
        $("#PrevPage").removeAttr("disabled");
        var dishstart = ($("#dishpageval").val()-0) + 20;
        $.ajax({
            type: "get",
            //url: "http://admindev.honganjk.com/admin/nurses.action",
             url:urlx("admin/nurses.action"),
            data: {

                "start":dishstart,
                "size":20
            },
            dataType: "json",
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },
            success: function (data) {

                $.each(data.data.objs, function(index) {
                    var a=data.data.objs[index].id
                    var b=data.data.objs[index].type
                    $tr=("<tr >"+
                    "<td goodid=" + a + ">"+data.data.objs[index].id+"</td>  <td goodid2=" + b + ">"+shanghu(data.data.objs[index].dtype)+"</td> <td>"+data.data.objs[index].name+"</td> <td>"+data.data.objs[index].mobile+"</td> <td>"+sex(data.data.objs[index].sex)+"</td> <td>"+data.data.objs[index].sn+"</td> <td>"+data.data.objs[index].years+"</td> <td>"+formatDate(data.data.objs[index].createTime)+"</td> <td>"+formatDate(data.data.objs[index].updateTime)+"</td>"
                    +"<td class='q'><a  class='a1'>更多</a></td> <td class='jump'><a class='a3' data-toggle='modal' data-target='#myModal'>"+zhuangtai1(data.data.objs[index].type)+"</a>"
                    +"<td><div class='box1'>"
                    +"<div class='jumbotron jumbotron-style'>"
                    +"<div class='container'>"
                    +"<h3>护工详细信息</h3>"
                    +"</div> "
                    +"</div> "
                    +"<ul class='adddishesUl'>"
                    +"<div class='save-update'>"
                    +"<a class='nurse-update'>修改</a>"
                    +"<a class='nurse-save'>保存</a>"
                    +"</div>"
                    +"<img class='xx' src='../images/xxafter.png'/>"
                    +"<li><span>id:</span>"
                    +"<input disabled class='nurse-id' type='text' value='"+data.data.objs[index].id+"'/>"
                    +"</li>"
                    +"<li><span>护工头像:</span>"
                    +"<img id='flexible-img' class='small cms-nurse-logo' src='"+data.data.objs[index].img+"' />"
                    +"<input disabled class='file nurse-logo' type='file'/>"
                    +"</li>"
                    +"<li><span>护工名称:</span>"
                    +"<input disabled class='nurse-name' type='text' value='"+data.data.objs[index].name+"'/>"
                    +"</li>"
                    +"<li><span>护工类型:</span>"
                    +"<input disabled type='text'value='"+workType(data.data.objs[index].stype)+"'/>"
                    +"</li>"
                    +"<li><span>性别:</span>"
                    +"<select class='chooseSex' disabled>"
                    +"<option>"+sex(data.data.objs[index].sex)+"</option>"
                    +"<option>女</option>"
                    +"<option>男</option>"
                    +"</select>"
                    +"</li>"
                    +"<li><span>服务类型:</span>"
                    +"<input type='text'value='"+shanghu(data.data.objs[index].dtype)+"'/>"
                    +"</li>"
                    +"<li><span>状态类型:</span>"
                    +"<input type='text'value='"+zhuangtai2(data.data.objs[index].type)+"'/>"
                    +"</li>"
                    +"<li><span>账号:</span>"
                    +"<input type='text'value='"+data.data.objs[index].account+"'/>"
                    +"</li>"
                    +"<li><span>联系人号码:</span>"
                    +"<input disabled class='nurse-mobile' type='text'value='"+data.data.objs[index].mobile+"'/>"
                    +"</li>"
                    +"<li><span>身份证号:</span>"
                    +"<input disabled class='nurse-sn' type='text'value='"+data.data.objs[index].sn+"'/>"
                    +"</li>"
                    +"<li><span>出生日期:</span>"
                    +"<input type='text'value='"+formatBirthday(data.data.objs[index].born)+"'/>"
                    +"</li>"
                    +"<li><span>籍贯:</span>"
                    +"<input disabled class='nurse-birthplace' type='text'value='"+data.data.objs[index].birthplace+"'/>"
                    +"</li>"
                    +"<li><span>现住址:</span>"
                    +"<input disabled class='nurse-address' type='text'value='"+data.data.objs[index].address+"'/>"
                    +"</li>"
                    +"<li><span>服务区域:</span>"
                    +"<input disabled class='nurse-area' type='text'value='"+data.data.objs[index].area+"'/>"
                    +"</li>"
                    +"<li><span>工作年限:</span>"
                    +"<input disabled class='nurse-years' type='text'value='"+data.data.objs[index].years+"'/>"
                    +"</li>"
                    +"<li><span>介绍:</span>"
                    +"<input disabled class='nurse-introduce' type='text'value='"+data.data.objs[index].introduction+"'/>"
                    +"</li>"
                    +"<li><span>银行卡号:</span>"
                    +"<input disabled class='nurse-card' type='text'value='"+data.data.objs[index].card+"'/>" +
                    "</li>"
                    +"<li><span>开户行:</span>" +
                    "<input disabled class='nurse-bank' type='text'value='"+data.data.objs[index].bank+"'/>" +
                    "</li>"
                    +"<li><span>身份证正面:</span>" +
                    "<img class='cms-nurse-positiveImg'  src='"+data.data.objs[index].positiveImg+"'/>" +
                    "<input disabled class='nurse-positiveImg file' type='file'/>" +
                    "</li><br>"
                    +"<li><span>身份证反面:</span>" +
                    "<img class='cms-nurse-obverseImg' src='"+data.data.objs[index].obverseImg+"'/>" +
                    "<input disabled class='nurse-obverseImg file' type='file'/>" +
                    "</li><br>" +
                    "<li><span>资格证:</span>" +
                    "<img class='cms-nurse-licenseImg' src='"+data.data.objs[index].licenseImg+"'/>" +
                    "<input disabled class=' nurse-licenseImg file' type='file'/>" +
                    "</li><br>"
                    +"</ul>"
                    +"</div></td>"
                    +"</tr>");

                    $("#tbody1").append($tr)
                });
                $("#dishpageval").val(dishstart);
                $("#change1").text($("#dishpageval").val()/20+1)

                if(JSON.stringify(data.data.total) - 20 <= $("#dishpageval").val()){
                    $("#NextPage").attr('disabled',true);
                }

                //-----------------------------------显示遮罩层与更多信息---------------------------------------------------------
                $(".q").on("click",function(){
                    // //console.log($(this).parents('tr').children("td").eq(11))
                    var index1 = $(this).parent('tr').children("td").eq(0).attr('goodid');

                    // //console.log(index1);
                    localStorage.setItem("id", index1);
                    // localStorage.setImg()
                    // //console.log(nurseId);
                    $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','block')
                    $("#cover").addClass("cover1")

                    /**
                     * 修改护工信息
                     */
                    $('.save-update').on('click',function (e) {
                        var logoImg = $(this).parent('ul').children('li').eq(1).children('img').attr('src');
                        var positiveImg = $(this).parent('ul').children('li').eq(18).children('img').attr('src'); //修改身份证正面
                        var obverseImg = $(this).parent('ul').children('li').eq(19).children('img').attr('src');
                        var licenseImg = $(this).parent('ul').children('li').eq(20).children('img').attr('src');
                        var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();

                        // //console.log(img);
                        localStorage.setItem('logo',logoImg);
                        localStorage.setItem('positiveImg',positiveImg);
                        localStorage.setItem('obverseImg',obverseImg);
                        localStorage.setItem('licenseImg',licenseImg);
                        localStorage.setItem('nurseName',nurseName);
                        //切换按钮
                        $(this).children("a").eq(0).css("display","none");
                        $(this).children("a").eq(1).css("display","block");

                        // //console.log($(this).parent('tr').children("td").eq(0).attr('goodid'));
                        //console.log( $(this).parent('ul').children('li').eq(0).children('input').val());
                        var name1 = $(this).parent('ul').children('li').eq(2).children('input').val();
                        localStorage.setItem('nurseName',name1);
                        $(this).parent('ul').children('li').eq(1).children('input').attr("disabled",false); //修改头像
                        $(this).parent('ul').children('li').eq(2).children('input').eq(0).attr("disabled",false); //修改姓名
                        $(this).parent('ul').children('li').eq(4).children('select').attr("disabled",false); //修改性别
                        $(this).parent('ul').children('li').eq(8).children('input').attr("disabled",false); //手机号
                        $(this).parent('ul').children('li').eq(9).children('input').attr("disabled",false); //身份证号
                        $(this).parent('ul').children('li').eq(11).children('input').attr("disabled",false); //籍贯
                        $(this).parent('ul').children('li').eq(12).children('input').attr("disabled",false); //修改住址
                        $(this).parent('ul').children('li').eq(13).children('input').attr("disabled",false); //修改服务区域
                        $(this).parent('ul').children('li').eq(14).children('input').attr("disabled",false); //修改工作年份
                        $(this).parent('ul').children('li').eq(15).children('input').attr("disabled",false); //修改自我介绍
                        $(this).parent('ul').children('li').eq(16).children('input').attr("disabled",false); //修改银行卡号
                        $(this).parent('ul').children('li').eq(17).children('input').attr("disabled",false); //修改开户行
                        $(this).parent('ul').children('li').eq(18).children('input').attr("disabled",false); //修改身份证正面
                        $(this).parent('ul').children('li').eq(19).children('input').attr("disabled",false); //修改身份证反面
                        $(this).parent('ul').children('li').eq(20).children('input').attr("disabled",false); //修改资格证

                    });

                    /**
                     * 保存修改信息
                     */
                    $('.nurse-save').on('click',function () {

                        //console.log($(this).parent('div').parent('ul').children('li').eq(2).children('input').val());
                        // var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();
                        // //console.log(nurseName);
                        // localStorage.setItem('nurseName',nurseName);
                        //console.log(localStorage.getItem('id'));
                        $.ajax({
                            type:"post",
                           //url:"http://admindev.honganjk.com/admin/editNurse.action",
                            url:urlx("admin/editNurse.action"),
                            headers:{
                                "code":$.cookie("code"),
                                "token":$.cookie("token")
                            },
                            dataType: "json",
                            data:{
                                "id": localStorage.getItem('id'),
                                "img":localStorage.getItem('logo'), //修改头像
                                "name":$(this).parent('div').parent('ul').children('li').eq(2).children('input').val(),//修改姓名
                                "sex":editSex($(this).parent('div').parent('ul').children('li').eq(4).children('select').val()), //修改性别
                                "mobile":$(this).parent('div').parent('ul').children('li').eq(8).children('input').val(), //身份证号
                                "sn":$(this).parent('div').parent('ul').children('li').eq(9).children('input').val(), //修改籍贯
                                "birthplace":$(this).parent('div').parent('ul').children('li').eq(11).children('input').val(), //修改手机号
                                "address":$(this).parent('div').parent('ul').children('li').eq(12).children('input').val(), //修改住址
                                "area":$(this).parent('div').parent('ul').children('li').eq(13).children('input').val(), //修改服务区域
                                "years":$(this).parent('div').parent('ul').children('li').eq(14).children('input').val(), //修改工作年份
                                "introduction":$(this).parent('div').parent('ul').children('li').eq(15).children('input').val(), //修改自我介绍
                                "card":$(this).parent('div').parent('ul').children('li').eq(16).children('input').val(), //修改银行卡号
                                "bank":$(this).parent('div').parent('ul').children('li').eq(17).children('input').val(), //修改开户行
                                "positiveImg": localStorage.getItem('positiveImg'), //修改身份证正面
                                "obverseImg":localStorage.getItem('obverseImg'), //修改身份证反面
                                "licenseImg":localStorage.getItem('licenseImg') //修改资格证
                            },

                            success: function (data) {


                                //console.log(data);
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


                            },

                            error:function(XmlHttpRequest,textStatus, errorThrown){
                                console.log("请求失败"+XmlHttpRequest.responseText);

                            }

                        });




                    });


                });

                $(".xx").on("click",function(){
                    $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','none')
                    $("#cover").removeClass("cover1")
                })
                //------------------------------------进行审核-------------------------------------------------
                $(".jump").on('click',function(){
                    // $(".remodal-wrapper").css("display","block")
                    // $(".remodal-overlay").css("display","block")
                    // var index1=$(this).parent('tr').children("td").eq(0).attr('goodid')
                    // //console.log($("#select1").val().substring(0,1))

                    var index1=$(this).parent('tr').children("td").eq(0).attr('goodid');
                    //console.log(index1);
                    //console.log($("#select1").val().substring(0,1));
                    //console.log($(this).parent().children("td").eq(10).children('a').text());

                    if($(this).parent().children("td").eq(10).children('a').text()==='下架护工'){
                        $('.a3').attr('data-target','#outModal');

                        // $(".remodal-wrapper").css("display","none");
                        // $("#audit4").css("display","block");

                        $(this).parent().children("td").eq(9).children('a').eq(0).attr("href","#modal2")
                        $(".Xbutton").on("click",function(){
                            if($("#outTextArea").val().length==''){
                                //console.log($("#outTextArea").val());
                                swal("请填写下架原因!!");
                                // alert("请填写下 架的原因")
                            }else{
                                $.ajax({
                                    type:"post",
                                    //url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                                    url:urlx("admin/unShelveNurse.action"),
                                    headers:{
                                        "code":$.cookie("code"),
                                        "token":$.cookie("token")
                                    },
                                    dataType: "json",
                                    data:{

                                        "id":index1,
                                         "reason": "下架原因：" + $("#outTextArea").val()
                                    },
                                    success: function(data){
                                        //console.log(data)
                                        switch(JSON.stringify(data.code))
                                        {
                                            case '"A00000"':

                                                alert("短信已发送至护工")

                                                location.reload();
                                                // $(".remodal-wrapper").css("display","none")
                                                // $(".remodal-overlay").css("display","none")

                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error:function(XmlHttpRequest,textStatus, errorThrown){
                                        console.log("请求失败"+XmlHttpRequest.responseText);
                                    }
                                });//下架
                            }

                        });
                        /**解绑**/
                        $(".Xbutton").unbind('click').click(function(e){
                            if($("#outTextArea").val().length==''){
                                swal("请填写下架原因!!");
                            }else{
                                $.ajax({
                                    type:"post",
                                    //url:"http://admindev.honganjk.com/admin/unShelveNurse.action",
                                    url:urlx("admin/unShelveNurse.action"),
                                    headers:{
                                        "code":$.cookie("code"),
                                        "token":$.cookie("token")
                                    },
                                    dataType: "json",
                                    data:{

                                        "id":index1,
                                         "reason": "下架原因：" + $("#outTextArea").val()
                                    },
                                    success: function(data){
                                        //console.log(data)
                                        switch(JSON.stringify(data.code))
                                        {
                                            case '"A00000"':

                                                alert("短信已发送至护工")

                                                location.reload();
                                                // $(".remodal-wrapper").css("display","none")
                                                // $(".remodal-overlay").css("display","none")

                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error:function(XmlHttpRequest,textStatus, errorThrown){
                                        console.log("请求失败"+XmlHttpRequest.responseText);
                                    }
                                });//下架
                            }

                        })
                    } else {
                        $('.a3').attr('data-target', '#myModal');
                        $(".btn1").on("click", function () {

                            $.ajax({
                                type: "post",
                                //url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                                url:urlx("admin/verifyNurse.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {

                                    "id": index1,
                                    "type": $("#select1").val().substring(0, 1)
                                },
                                success: function (data) {
                                    //console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            swal("审核成功");
                                            // $(".remodal-wrapper").css("display","none")
                                            // $(".remodal-overlay").css("display","none")
                                            location.reload()
                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });//审核成功
                        });

                        /**解绑**/
                        $(".btn1").unbind('click').click(function (e) {

                            $.ajax({
                                type: "post",
                                //url: "http://admindev.honganjk.com/admin/verifyNurse.action",
                                 url:urlx("admin/verifyNurse.action"),
                                headers: {
                                    "code": $.cookie("code"),
                                    "token": $.cookie("token")
                                },
                                dataType: "json",
                                data: {

                                    "id": index1,
                                    "type": $("#select1").val().substring(0, 1)
                                },
                                success: function (data) {
                                    //console.log(data)
                                    switch (JSON.stringify(data.code)) {
                                        case '"A00000"':
                                            swal("审核成功");
                                            // $(".remodal-wrapper").css("display","none")
                                            // $(".remodal-overlay").css("display","none")
                                            location.reload()
                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error: function (XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("请求失败" + XmlHttpRequest.responseText);
                                }
                            });//审核成功
                        });

                        $(".btn2").on("click", function () {
                            if ($("#bustTextArea").val().length == '') {
                                swal("请填写审核失败的原因");
                            } else {
                                $.ajax({
                                    type: "post",
                                   // url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                                    url:urlx("admin/forbidNurse.action"),
                                    headers: {
                                        "code": $.cookie("code"),
                                        "token": $.cookie("token")
                                    },
                                    dataType: "json",
                                    data: {

                                        "id": index1,
                                        "reason": $("#bustTextArea").val()
                                    },
                                    success: function (data) {
                                        //console.log(data)
                                        switch (JSON.stringify(data.code)) {
                                            case '"A00000"':

                                                swal("短信已发送至护工");
                                                // $(".remodal-wrapper").css("display","none")
                                                // $(".remodal-overlay").css("display","none")
                                                location.reload()
                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                                        console.log("请求失败" + XmlHttpRequest.responseText);
                                    }
                                });//审核失败
                            }

                        });

                        /**解绑**/
                        $(".btn2").unbind('click').click(function (e) {
                            if ($("#bustTextArea").val().length == '') {
                                swal("请填写审核失败的原因");
                            } else {
                                $.ajax({
                                    type: "post",
                                   // url: "http://admindev.honganjk.com/admin/forbidNurse.action",
                                   url:urlx("admin/forbidNurse.action"),
                                    headers: {
                                        "code": $.cookie("code"),
                                        "token": $.cookie("token")
                                    },
                                    dataType: "json",
                                    data: {

                                        "id": index1,
                                        "reason": $("#bustTextArea").val()
                                    },
                                    success: function (data) {
                                        //console.log(data)
                                        switch (JSON.stringify(data.code)) {
                                            case '"A00000"':

                                                swal("短信已发送至护工");
                                                // $(".remodal-wrapper").css("display","none")
                                                // $(".remodal-overlay").css("display","none")
                                                location.reload()
                                                break;
                                            default:
                                                alert("请求失败")

                                        }
                                    },
                                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                                        console.log("请求失败" + XmlHttpRequest.responseText);
                                    }
                                });//审核失败
                            }

                        });
                    }
                })

                /**
                 * 上传头像
                 */
                var uploader = uploadJSSDK;
                $(".file").on("change",function(e){
                    $(".cms-nurse-logo").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('logo',result.url);
                                    $(".cms-nurse-logo").attr('src', result.url)

                                }

                            }
                        });
                    }
                });


                /**
                 * 上传身份证正面
                 */
                var uploader = uploadJSSDK;
                $(".nurse-positiveImg").on("change",function(e){
                    $(".cms-nurse-positiveImg").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('positiveImg',result.url);
                                    $(".cms-nurse-positiveImg").attr('src', result.url)
                                }

                            }
                        });
                    }
                });


                /**
                 * 上传身份证反面
                 */
                var uploader = uploadJSSDK;
                $(".nurse-obverseImg").on("change",function(e){
                    $(".cms-nurse-obverseImg").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('obverseImg',result.url)
                                    $(".cms-nurse-obverseImg").attr('src', result.url)
                                }

                            }
                        });
                    }
                });


                /**
                 * 上传资格证
                 */
                var uploader = uploadJSSDK;
                $(".nurse-licenseImg").on("change",function(e){
                    $(".cms-nurse-licenseImg").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('licenseImg',result.url)
                                    $(".cms-nurse-licenseImg").attr('src', result.url)
                                }

                            }
                        });
                    }
                });

            },
            error:function(XmlHttpRequest,textStatus, errorThrown)
            {
                console.log("请求失败"+XmlHttpRequest.responseText);
            }
        });
    });//下一页

    /**
     * 验证阿里百川
     */
    $.ajax({
        type: "get",
        //url: "https://bzapi.honganjk.com/common/getToken.action",
         url:urla("common/getToken.action"),
        data: {
            "key":"23384196",
            "secret":"7b484f801524af3bb7f6abb0dbe63459",
            "namespace":"hajk",
        },
        dataType: "json",
        success: function (data) {
            //console.log(data)
            window.imgtoken = data.data;
            //console.log(imgtoken);
        },
        error:function(XmlHttpRequest,textStatus, errorThrown)
        {
            console.log("请求失败"+XmlHttpRequest.responseText);
        }
    });



    $("#PrevPage").click(function(){
        $("#tbody1").empty($tr)
        var dishstart = $("#dishpageval").val() - 20;
        $("#NextPage").removeAttr("disabled");
        if(dishstart < 0){
            return dishstart = 0;
        }
        $.ajax({
            type: "get",
            //url: "http://admindev.honganjk.com/admin/nurses.action",
            url:urlx("admin/nurses.action"),
            data: {

                "start":dishstart,
                "size":20
            },
            dataType: "json",
            headers:{
                "code":$.cookie("code"),
                "token":$.cookie("token")
            },

            success: function (data) {

                $.each(data.data.objs, function(index) {
                    var a=data.data.objs[index].id
                    var b=data.data.objs[index].type
                    $tr=("<tr >"+
                    "<td goodid=" + a + ">"+data.data.objs[index].id+"</td>  <td goodid2=" + b + ">"+shanghu(data.data.objs[index].dtype)+"</td> <td>"+data.data.objs[index].name+"</td> <td>"+data.data.objs[index].mobile+"</td> <td>"+sex(data.data.objs[index].sex)+"</td> <td>"+data.data.objs[index].sn+"</td> <td>"+data.data.objs[index].years+"</td> <td>"+formatDate(data.data.objs[index].createTime)+"</td> <td>"+formatDate(data.data.objs[index].updateTime)+"</td>"
                    +"<td class='q'><a  class='a1'>更多</a></td> <td class='jump'><a class='a3' data-toggle='modal' data-target='#myModal'>"+zhuangtai1(data.data.objs[index].type)+"</a>"
                    +"<td><div class='box1'>"
                    +"<div class='jumbotron jumbotron-style'>"
                    +"<div class='container'>"
                    +"<h3>护工详细信息</h3>"
                    +"</div> "
                    +"</div> "
                    +"<ul class='adddishesUl'>"
                    +"<div class='save-update'>"
                    +"<a class='nurse-update'>修改</a>"
                    +"<a class='nurse-save'>保存</a>"
                    +"</div>"
                    +"<img class='xx' src='../images/xxafter.png'/>"
                    +"<li><span>id:</span>"
                    +"<input disabled class='nurse-id' type='text' value='"+data.data.objs[index].id+"'/>"
                    +"</li>"
                    +"<li><span>护工头像:</span>"
                    +"<img id='flexible-img' class='small cms-nurse-logo' src='"+data.data.objs[index].img+"' />"
                    +"<input disabled class='file nurse-logo' type='file'/>"
                    +"</li>"
                    +"<li><span>护工名称:</span>"
                    +"<input disabled type='text' value='"+data.data.objs[index].name+"'/>"
                    +"</li>"
                    +"<li><span>护工类型:</span>"
                    +"<input disabled type='text'value='"+workType(data.data.objs[index].stype)+"'/>"
                    +"</li>"
                    +"<li><span>性别:</span>"
                    +"<select class='chooseSex' disabled>"
                    +"<option>"+sex(data.data.objs[index].sex)+"</option>"
                    +"<option>女</option>"
                    +"<option>男</option>"
                    +"</select>"
                    +"</li>"
                    +"<li><span>服务类型:</span>"
                    +"<input type='text'value='"+shanghu(data.data.objs[index].dtype)+"'/>"
                    +"</li>"
                    +"<li><span>状态类型:</span>"
                    +"<input type='text'value='"+zhuangtai2(data.data.objs[index].type)+"'/>"
                    +"</li>"
                    +"<li><span>账号:</span>"
                    +"<input type='text'value='"+data.data.objs[index].account+"'/>"
                    +"</li>"
                    +"<li><span>联系人号码:</span>"
                    +"<input disabled class='nurse-mobile' type='text'value='"+data.data.objs[index].mobile+"'/>"
                    +"</li>"
                    +"<li><span>身份证号:</span>"
                    +"<input disabled class='nurse-sn' type='text'value='"+data.data.objs[index].sn+"'/>"
                    +"</li>"
                    +"<li><span>出生日期:</span>"
                    +"<input type='text'value='"+formatBirthday(data.data.objs[index].born)+"'/>"
                    +"</li>"
                    +"<li><span>籍贯:</span>"
                    +"<input disabled class='nurse-birthplace' type='text'value='"+data.data.objs[index].birthplace+"'/>"
                    +"</li>"
                    +"<li><span>现住址:</span>"
                    +"<input disabled class='nurse-address' type='text'value='"+data.data.objs[index].address+"'/>"
                    +"</li>"
                    +"<li><span>服务区域:</span>"
                    +"<input disabled class='nurse-area' type='text'value='"+data.data.objs[index].area+"'/>"
                    +"</li>"
                    +"<li><span>工作年限:</span>"
                    +"<input disabled class='nurse-years' type='text'value='"+data.data.objs[index].years+"'/>"
                    +"</li>"
                    +"<li><span>介绍:</span>"
                    +"<input disabled class='nurse-introduce' type='text'value='"+data.data.objs[index].introduction+"'/>"
                    +"</li>"
                    +"<li><span>银行卡号:</span>"
                    +"<input disabled class='nurse-card' type='text'value='"+data.data.objs[index].card+"'/>" +
                    "</li>"
                    +"<li><span>开户行:</span>" +
                    "<input disabled class='nurse-bank' type='text'value='"+data.data.objs[index].bank+"'/>" +
                    "</li>"
                    +"<li><span>身份证正面:</span>" +
                    "<img class='cms-nurse-positiveImg'  src='"+data.data.objs[index].positiveImg+"'/>" +
                    "<input disabled class='nurse-positiveImg file' type='file'/>" +
                    "</li><br>"
                    +"<li><span>身份证反面:</span>" +
                    "<img class='cms-nurse-obverseImg' src='"+data.data.objs[index].obverseImg+"'/>" +
                    "<input disabled class='nurse-obverseImg file' type='file'/>" +
                    "</li><br>" +
                    "<li><span>资格证:</span>" +
                    "<img class='cms-nurse-licenseImg' src='"+data.data.objs[index].licenseImg+"'/>" +
                    "<input disabled class=' nurse-licenseImg file' type='file'/>" +
                    "</li><br>"
                    +"</ul>"
                    +"</div></td>"
                    +"</tr>");

                    $("#tbody1").append($tr)
                });
                $("#dishpageval").val(dishstart);
                $("#change1").text($("#dishpageval").val()/20+1)
                if(dishstart == 0){
                    $("#PrevPage").attr("disabled",true);
                }
                //-----------------------------------显示遮罩层与更多信息---------------------------------------------------------
                $(".q").on("click",function(){
                    // //console.log($(this).parents('tr').children("td").eq(11))
                    var index1 = $(this).parent('tr').children("td").eq(0).attr('goodid');

                    // //console.log(index1);
                    localStorage.setItem("id", index1);
                    // localStorage.setImg()
                    // //console.log(nurseId);
                    $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','block')
                    $("#cover").addClass("cover1")

                    /**
                     * 修改护工信息
                     */
                    $('.save-update').on('click',function (e) {
                        var logoImg = $(this).parent('ul').children('li').eq(1).children('img').attr('src');
                        var positiveImg = $(this).parent('ul').children('li').eq(18).children('img').attr('src'); //修改身份证正面
                        var obverseImg = $(this).parent('ul').children('li').eq(19).children('img').attr('src');
                        var licenseImg = $(this).parent('ul').children('li').eq(20).children('img').attr('src');
                        var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();

                        // //console.log(img);
                        localStorage.setItem('logo',logoImg);
                        localStorage.setItem('positiveImg',positiveImg);
                        localStorage.setItem('obverseImg',obverseImg);
                        localStorage.setItem('licenseImg',licenseImg);
                        localStorage.setItem('nurseName',nurseName);
                        //切换按钮
                        $(this).children("a").eq(0).css("display","none");
                        $(this).children("a").eq(1).css("display","block");

                        // //console.log($(this).parent('tr').children("td").eq(0).attr('goodid'));
                        //console.log( $(this).parent('ul').children('li').eq(0).children('input').val());
                        var name1 = $(this).parent('ul').children('li').eq(2).children('input').val();
                        localStorage.setItem('nurseName',name1);
                        $(this).parent('ul').children('li').eq(1).children('input').attr("disabled",false); //修改头像
                        $(this).parent('ul').children('li').eq(2).children('input').eq(0).attr("disabled",false); //修改姓名
                        $(this).parent('ul').children('li').eq(4).children('select').attr("disabled",false); //修改性别
                        $(this).parent('ul').children('li').eq(8).children('input').attr("disabled",false); //手机号
                        $(this).parent('ul').children('li').eq(9).children('input').attr("disabled",false); //身份证号
                        $(this).parent('ul').children('li').eq(11).children('input').attr("disabled",false); //籍贯
                        $(this).parent('ul').children('li').eq(12).children('input').attr("disabled",false); //修改住址
                        $(this).parent('ul').children('li').eq(13).children('input').attr("disabled",false); //修改服务区域
                        $(this).parent('ul').children('li').eq(14).children('input').attr("disabled",false); //修改工作年份
                        $(this).parent('ul').children('li').eq(15).children('input').attr("disabled",false); //修改自我介绍
                        $(this).parent('ul').children('li').eq(16).children('input').attr("disabled",false); //修改银行卡号
                        $(this).parent('ul').children('li').eq(17).children('input').attr("disabled",false); //修改开户行
                        $(this).parent('ul').children('li').eq(18).children('input').attr("disabled",false); //修改身份证正面
                        $(this).parent('ul').children('li').eq(19).children('input').attr("disabled",false); //修改身份证反面
                        $(this).parent('ul').children('li').eq(20).children('input').attr("disabled",false); //修改资格证

                    });

                    /**
                     * 保存修改信息
                     */
                    $('.nurse-save').on('click',function () {

                        //console.log($(this).parent('div').parent('ul').children('li').eq(2).children('input').val());
                        // var nurseName = $(this).parent('ul').children('li').eq(2).children('input').val();
                        // //console.log(nurseName);
                        // localStorage.setItem('nurseName',nurseName);
                        //console.log(localStorage.getItem('id'));
                        $.ajax({
                            type:"post",
                            //url:"http://admindev.honganjk.com/admin/editNurse.action",
                            url:urlx("admin/editNurse.action"),
                            headers:{
                                "code":$.cookie("code"),
                                "token":$.cookie("token")
                            },
                            dataType: "json",
                            data:{
                                "id": localStorage.getItem('id'),
                                "img":localStorage.getItem('logo'), //修改头像
                                "name":$(this).parent('div').parent('ul').children('li').eq(2).children('input').val(),//修改姓名
                                "sex":editSex($(this).parent('div').parent('ul').children('li').eq(4).children('select').val()), //修改性别
                                "mobile":$(this).parent('div').parent('ul').children('li').eq(8).children('input').val(), //身份证号
                                "sn":$(this).parent('div').parent('ul').children('li').eq(9).children('input').val(), //修改籍贯
                                "birthplace":$(this).parent('div').parent('ul').children('li').eq(11).children('input').val(), //修改手机号
                                "address":$(this).parent('div').parent('ul').children('li').eq(12).children('input').val(), //修改住址
                                "area":$(this).parent('div').parent('ul').children('li').eq(13).children('input').val(), //修改服务区域
                                "years":$(this).parent('div').parent('ul').children('li').eq(14).children('input').val(), //修改工作年份
                                "introduction":$(this).parent('div').parent('ul').children('li').eq(15).children('input').val(), //修改自我介绍
                                "card":$(this).parent('div').parent('ul').children('li').eq(16).children('input').val(), //修改银行卡号
                                "bank":$(this).parent('div').parent('ul').children('li').eq(17).children('input').val(), //修改开户行
                                "positiveImg": localStorage.getItem('positiveImg'), //修改身份证正面
                                "obverseImg":localStorage.getItem('obverseImg'), //修改身份证反面
                                "licenseImg":localStorage.getItem('licenseImg') //修改资格证
                            },

                            success: function (data) {


                                //console.log(data);
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


                            },

                            error:function(XmlHttpRequest,textStatus, errorThrown){
                                console.log("请求失败"+XmlHttpRequest.responseText);

                            }

                        });




                    });


                });
                $(".xx").on("click",function(){
                    $(this).parents('tr').children("td").eq(11).children('div').eq(0).css('display','none')
                    $("#cover").removeClass("cover1")
                });



                //------------------------------------进行审核-------------------------------------------------
                $(".jump").on('click',function(){
                    // $(".remodal-wrapper").css("display","block")
                    // $(".remodal-overlay").css("display","block")
                    var index1=$(this).parent('tr').children("td").eq(0).attr('goodid')
                    // //console.log($("#select1").val().substring(0,1))
                    $('.a3').attr('data-target','#myModal');
                    $(".btn1").on("click",function(){
                        $.ajax({
                            type:"post",
                            //url:"http://admindev.honganjk.com/admin/verifyNurse.action",
                              url:urlx("admin/verifyNurse.action"),
                            headers:{
                                "code":$.cookie("code"),
                                "token":$.cookie("token")
                            },
                            dataType: "json",
                            data:{

                                "id":index1,
                                "type":$("#select1").val().substring(0,1)
                            },
                            success: function(data){
                                //console.log(data)
                                switch(JSON.stringify(data.code))
                                {
                                    case '"A00000"':
                                        swal("审核成功");
                                        // $(".remodal-wrapper").css("display","none")
                                        // $(".remodal-overlay").css("display","none")
                                        location.reload()
                                        break;
                                    default:
                                        alert("请求失败")

                                }
                            },
                            error:function(XmlHttpRequest,textStatus, errorThrown){
                                console.log("请求失败"+XmlHttpRequest.responseText);
                            }
                        });//审核成功
                    });


                    /**解绑**/
                    $(".btn1").unbind('click').click(function(e){
                        $.ajax({
                            type:"post",
                            //url:"http://admindev.honganjk.com/admin/verifyNurse.action",
                             url:urlx("admin/verifyNurse.action"),
                            headers:{
                                "code":$.cookie("code"),
                                "token":$.cookie("token")
                            },
                            dataType: "json",
                            data:{

                                "id":index1,
                                "type":$("#select1").val().substring(0,1)
                            },
                            success: function(data){
                                //console.log(data)
                                switch(JSON.stringify(data.code))
                                {
                                    case '"A00000"':
                                        swal("审核成功");
                                        // $(".remodal-wrapper").css("display","none")
                                        // $(".remodal-overlay").css("display","none")
                                        location.reload()
                                        break;
                                    default:
                                        alert("请求失败")

                                }
                            },
                            error:function(XmlHttpRequest,textStatus, errorThrown){
                                console.log("请求失败"+XmlHttpRequest.responseText);
                            }
                        });//审核成功
                    });



                    $(".btn2").on("click",function(){
                        if($("#bustTextArea").val().length==''){
                            swal("请填写审核失败的原因");
                        }else{
                            $.ajax({
                                type:"post",
                                //url:"http://admindev.honganjk.com/admin/forbidNurse.action",
                                 url:urlx("admin/forbidNurse.action"),
                                headers:{
                                    "code":$.cookie("code"),
                                    "token":$.cookie("token")
                                },
                                dataType: "json",
                                data:{

                                    "id":index1,
                                    "reason":$("#bustTextArea").val()
                                },
                                success: function(data){
                                    //console.log(data)
                                    switch(JSON.stringify(data.code))
                                    {
                                        case '"A00000"':

                                            swal("短信已发送至护工");

                                            location.reload();
                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error:function(XmlHttpRequest,textStatus, errorThrown){
                                    console.log("请求失败"+XmlHttpRequest.responseText);
                                }
                            });//审核失败
                        }

                    });


                    /**解绑**/
                    $(".btn2").on("click",function(){
                        if($("#bustTextArea").val().length==''){
                            swal("请填写审核失败的原因");
                        }else{
                            $.ajax({
                                type:"post",
                                //url:"http://admindev.honganjk.com/admin/forbidNurse.action",
                                 url:urlx("admin/forbidNurse.action"),
                                headers:{
                                    "code":$.cookie("code"),
                                    "token":$.cookie("token")
                                },
                                dataType: "json",
                                data:{

                                    "id":index1,
                                    "reason":$("#bustTextArea").val()
                                },
                                success: function(data){
                                    //console.log(data)
                                    switch(JSON.stringify(data.code))
                                    {
                                        case '"A00000"':

                                            swal("短信已发送至护工");

                                            location.reload();
                                            break;
                                        default:
                                            alert("请求失败")

                                    }
                                },
                                error:function(XmlHttpRequest,textStatus, errorThrown){
                                    console.log("请求失败"+XmlHttpRequest.responseText);
                                }
                            });//审核失败
                        }

                    });

                })

                /**
                 * 上传头像
                 */
                var uploader = uploadJSSDK;
                $(".file").on("change",function(e){
                    $(".cms-nurse-logo").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('logo',result.url);
                                    $(".cms-nurse-logo").attr('src', result.url)

                                }

                            }
                        });
                    }
                });


                /**
                 * 上传身份证正面
                 */
                var uploader = uploadJSSDK;
                $(".nurse-positiveImg").on("change",function(e){
                    $(".cms-nurse-positiveImg").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('positiveImg',result.url);
                                    $(".cms-nurse-positiveImg").attr('src', result.url)
                                }

                            }
                        });
                    }
                });


                /**
                 * 上传身份证反面
                 */
                var uploader = uploadJSSDK;
                $(".nurse-obverseImg").on("change",function(e){
                    $(".cms-nurse-obverseImg").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('obverseImg',result.url)
                                    $(".cms-nurse-obverseImg").attr('src', result.url)
                                }

                            }
                        });
                    }
                });


                /**
                 * 上传资格证
                 */
                var uploader = uploadJSSDK;
                $(".nurse-licenseImg").on("change",function(e){
                    $(".cms-nurse-licenseImg").attr('src',"../images/jiazai0.gif")
                    var files = e.target.files;
                    for(var i=0;i<files.length;i++){
                        uploader({
                            file: files[i],
                            name: new Date().getTime(),
                            token: imgtoken,
                            dir: "dev",
                            callback: function (percent, result) {
                                if(percent==100){
                                    //console.log(percent)
                                    //console.log(result.url)
                                    localStorage.setItem('licenseImg',result.url)
                                    $(".cms-nurse-licenseImg").attr('src', result.url)
                                }

                            }
                        });
                    }
                });

            },



            error:function(XmlHttpRequest,textStatus, errorThrown)
            {
                console.log("请求失败"+XmlHttpRequest.responseText);
            }
        });
    });//上一页




    /**
     * 验证阿里百川
     */
    $.ajax({
        type: "get",
        //url: "https://bzapi.honganjk.com/common/getToken.action",
         url:urla("common/getToken.action"),
        data: {
            "key":"23384196",
            "secret":"7b484f801524af3bb7f6abb0dbe63459",
            "namespace":"hajk",
        },
        dataType: "json",
        success: function (data) {
            //console.log(data)
            window.imgtoken = data.data;
            //console.log(imgtoken);
        },
        error:function(XmlHttpRequest,textStatus, errorThrown)
        {
            console.log("请求失败"+XmlHttpRequest.responseText);
        }
    });





    //-------------------------------商户类型转换-------------------------------------------------

    function shanghu(e) {
        switch(e) {

            case 1:
                return '全天'
                break;
            case 2:
                return '钟点'
                break;

        };
    };

    //-------------------------------状态类型转换-------------------------------------------------

    function zhuangtai(e) {
        switch(e) {

            case -1:
                return '下架护工'
                break;
            case 0:
                return '未审核护工'
                break;
            case 1:
                return '杭州地区护工(已审核)'
                break;
            case 2:
                return '暂无'
                break;

        };
    };
       function zhuangtai1(e) {
        switch(e) {

            case -1:
                return '上架护工'
                break;
            case 0:
                return '去审核'
                break;
            case 1:
                return '下架护工'
                break;
            case 2:
                return '暂无'
                break;

        };
    };

    function zhuangtai2(e) {
        switch(e) {

            case -1:
                return '下架护工'
                break;
            case 0:
                return '未审核'
                break;
            case 1:
                return '已审核'
                break;
            case 2:
                return '暂无'
                break;

        };
    };


    function sex(e) {
        switch (e){
            case 1:
                return '女'
                break;
            case 2:
                return '男'
                break;
        };
    }

    function editSex(e) {
        switch (e){
            case '女':
                return 1
                break;
            case '男':
                return 2
                break;
        };
    }

    function workType(e) {
        switch (e){
            case 1:
                return '护工'
                break;
            case 2:
                return '康复师'
                break;
        };
    }


    function formatBirthday(obj) {
        var str = obj.toString();
        //console.log(str);
        return str.substr(0,4)+'-'+str.substr(4,2)+'-'+str.substr(6,2);
    }



    //---------------------时间戳-------------------------------------------

    function formatDate(data) {
        return $.myTime.UnixToDate(data,true,8);
    }


    function getLocalStorage(key) {
        return localStorage.getItem(key);
    }




// });
});