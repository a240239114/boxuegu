define([
    'jquery',
    'cookie'
], function($,cookie) {
    var cs_id = $.cookie('cs_id');
    console.log(cs_id);
    $.ajax({
        url:'/api/course/basic',
        type:'get',
        data:{
            'cs_id':cs_id
        },
        success: function(res) {
            console.log(res);
        }
    })
});