define(["jquery", "jqueryform"], function($, jqueryform) {
  // 'use strict';
  // console.log('22222');

  $("form").on("submit", function() {
    //首先需要新密码和确定密码是否相同是否正确
    // console.log($($("input[type='text']").toArray()[1]).val() == $("input[type='password']").val());
    // if ($($("input[type='text']").toArray()[0]).val()) {//原密码不能为空
        //新密码和确认密码都不能为空
        if($($("input[type='text']").toArray()[1]).val()&&$("input[type='password']").val()){
            if($($("input[type='text']").toArray()[1]).val()==$("input[type='password']").val()){//确认密码和新密码是否一致
                $(this).ajaxSubmit({
                    url: "/api/teacher/repass",
                    type: "post",
                    success: function(res) {
                      alert("修改成功")
                      console.log($("form").serialize());
                    },
                    error: function() {
                      alert("您的原始密码不正确");
                      console.log($("form").serialize());
                    }
                  });     
            }else{
                alert('您的新密码和确认密码不一致呀');
            }
        }else{
           alert('新密码不能为空');
        }       
  
    // } else {
    //   alert("您的原始密码不能为空");
    // }

    return false;
  });
});
