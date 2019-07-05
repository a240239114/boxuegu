define(["nprogress", "jquery", "cookie", "template", "method"], function (
    NProgress,
    $,
    cookie,
    template,
    method
) {
    $('.wrap').hide();
    $(document).ajaxStart(function () {
        NProgress.start();
        $('.wrap').show();
    });

    $(document).ajaxStop(function () {
        NProgress.done();
        $('.wrap').fadeOut(1000);
    });

    // setMenu();
    // console.log(method.setMenu)
    method.setMenu();

    $(".navs ul")
        .prev("a")
        .on("click", function () {
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
        var htmlStr = template('userinfoId', userinfo);

        // console.log(userinfo);
        $("#profile").html(htmlStr);
    }

    //退出登录
    $(".fa-sign-out")
        .parent()
        .on("click", function () {
            //删除sessionID和userinfo
            $.removeCookie("PHPSESSID");
            $.removeCookie("userinfo");
            location.pathname = "/login";
        });

    //实现局部刷新功能
    //    $('a').on('click',function(){
    //        var url = $(this).attr('href');
    //        console.log(url);
    //        $(".main").load(url+' .main>*')
    //        return false
    //    })    
});