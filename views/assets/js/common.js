define(["nprogress", "jquery", "cookie", "template"], function(
    NProgress,
    $,
    cookie,
    template
) {
    $('#img').hide();
    $(document).ajaxStart(function() {
        NProgress.start();
        $('#img').show();
    });

    $(document).ajaxStop(function() {
        NProgress.done();
        $('#img').fadeOut(1000);
    });


    $(".navs ul")
        .prev("a")
        .on("click", function() {
            $(this)
                .next()
                .slideToggle();
        });

    //默认回到登录页面
    var sessionId = $.cookie("PHPSESSID");

    if (!sessionId && location.pathname != "/login") {
        console.log(location.pathname);
        location.pathname = "/login";
    }

    //渲染主页
    if (location.pathname != "/login") {
        //获取userinfo
        var userinfo = JSON.parse($.cookie("userinfo"));

        //头像和名字需要改变
        var htmlStr = `<div class='profile'>+ <div class='avatar img-circle'>+ <img src=${userinfo.tc_image}></img>+ </div>+<h4>${userinfo.tc_name}</h4>+</div>`;


        // console.log($('.aside>profile'));

        // console.log($('.aside>profile') instanceof(Array));
        //简单数据类型 :undefined null boolean string nunber
        //复杂数据类型:函数 数组 对象
        //内置函数:math date
        //集合转换成为数组
        //var arr = Array.from( arrLike );

        // console.log(typeof $('.aside>profile'));
        var set = Array.from($(".profile"));
        // console.log(set[0]);

        //注意要将DOM对象转换成为jq对象
        $(set[0]).html(htmlStr);
    }

    //退出登录
    $(".fa-sign-out")
        .parent()
        .on("click", function() {
            //删除sessionID和userinfo
            $.removeCookie("PHPSESSID");
            $.removeCookie("userinfo");
            location.pathname = "/login";
        });
});