define([
    'jquery',
    'cookie'
], function($, cookie) {
    $("#form").on("submit", function() {
        var datafrom = $(this).serialize();
        console.log('11111');
        $.ajax({
            url: `/api/login?${datafrom}`,
            type: "post",
            success: (function(res) {
                //把结果存在cookie中去
                $.cookie('userinfo', JSON.stringify(res.result));
                if (res.code == 200) {
                    location.pathname = '/index';
                }
            })
        })
        return false;
    });

});