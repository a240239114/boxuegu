define(["method","cookie","validate"], function(method,cookie,validate) {
    // console.log('1111');
  method.expandMenu();  
 

  //配置表单验证
  $("#courseadd").validate();

  //点击按钮提交数据
  $("#createBtn").click(function(){
    console.log($('form').serialize());
    $.ajax({
      url:'/api/course/create',
      type:'post',
      data:$('form').serialize(),
      success: function(res) {
         console.log(res);
        //  $.cookie('cs_id', JSON.stringify(res.result.cs_id));
         location.href = "http://studyio.com/course_add_step1?"+res.result.cs_id;
      }
    })
  });
});
