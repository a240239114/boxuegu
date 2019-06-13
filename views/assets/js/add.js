define([
    'jquery',
    'template',
    'jqueryform'
], function($, template, jqueryform) {
    var htmlStr = template('teahcereditTPL', {});

    $("#teacherEdit").html(htmlStr);

    //获取表单数据
    var data = $("#formSubmit").serialize();
    console.log(data);
    
    $("#submit").on("click",function(){
        console.log('点我呀');
        //点击就提交数据
         $.ajax({
             url:"/api/teacher/add",
             type:"post",
             data:$("#formSubmit").serialize(),
             success: function() {
                 console.log('oh yee');
             }
         });
         location.pathname = "/teacher_list";
         return false;
    });


});