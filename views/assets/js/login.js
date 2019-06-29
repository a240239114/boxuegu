define([
    'jquery',
    'cookie'
], function($, cookie) {
    $("#form").on("submit", function() {
        var datafrom = $(this).serialize();
        console.log(datafrom);
        // console.log('11111');
        $.ajax({
            url: `/api/login?${datafrom}`,
            type: "post",
            success: function(res) {//成功的回调
                console.log(res)
                //把结果存在cookie中去
                $.cookie('userinfo', JSON.stringify(res.result));
                if (res.code == 200) {
                    location.pathname = '/index';
                }
            },
            error:function(){//失败的回调
                alert("请输入正确的账号和密码")
            }
        })
        return false;
    });

});