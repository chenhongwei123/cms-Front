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
 首页脚本
 */
define(['jquery','cookie',"bootstrap"],function ($) {


$(document).ready(function () {

//  var dataArray = [];
    if($.cookie("token")==null){
    	document.location.href ="../login.html";
    }

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

    /**
     * 用户统计
     */
    $.ajax({
        type:"get",
        //url:"http://admindev.honganjk.com/admin/users.action",
         url:urlx("admin/users.action"),
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
            var totla = data.data.total;
            var userTotal  = totla+" 位";
            $('.user-count').append(userTotal)
            console.log(userTotal);
        },
        error: function (msg) {
            alert("请求失败")
        }
    });

    /**
     * 食堂统计
     */
    $.ajax({
        type:'get',
       // url:'http://admindev.honganjk.com/admin/business.action',
        url:urlx("admin/business.action"),
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
            var totla = data.data.total;
            var shopTotal  = totla+" 家";
            $('.shop-count').append(shopTotal)
            console.log(shopTotal);
        },
        error: function (msg) {
            alert("请求失败")
        }

    });

    /**
     * 订单统计
     */
    $.ajax({
        type:'get',
        //url:'http://admindev.honganjk.com/admin/orders.action',
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
            var totla = data.data.total;
            var orderTotal = totla+" 份";
            $('.order-count').append(orderTotal)
            console.log(orderTotal);
        },
        error: function (msg) {
            alert("请求失败")
        }

    });

    /**
     * 护工统计
     */
    $.ajax({

        type:'get',
       // url:'http://admindev.honganjk.com/admin/nurses.action',
        url:urlx("admin/nurses.action"),
        async:true,
        headers:{
            "code":$.cookie("code"),
            "token":$.cookie("token")
        },
        dataType: "json",

        data: {
            "start":0,
            "size":20
        },
        success:function(data){
            var totla = data.data.total;
            var nurseTotal  = totla+" 位";
            $('.nurse-count').append(nurseTotal);
            console.log(nurseTotal);
        },
        error: function (msg) {
            alert("请求失败")
        }

    });

    /**
     * 护理订单统计
     */
    $.ajax({

        type:'get',
        //url:'http://admindev.honganjk.com/admin/nuOrders.action',
         url:urlx("admin/nuOrders.action"),
        async:true,
        headers:{
            "code":$.cookie("code"),
            "token":$.cookie("token")
        },
        dataType: "json",

        data: {
            "start":0,
            "size":20
        },
        success:function(data){
            var totla = data.data.total;
            var nurseOrdersTotal  = totla+" 份";
            $('.nurse-orser-count').append(nurseOrdersTotal);
            console.log(nurseOrdersTotal);
        },
        error: function (msg) {
            alert("请求失败")
        }

    });
    
    // console.log(dataArray);
});

});