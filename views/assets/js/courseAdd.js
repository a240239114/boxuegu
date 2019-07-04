define(["method","cookie","validate"], function(method,cookie,validate) {
    // console.log('1111');
  method.expandMenu();  
 

  //配置表单验证
  $("#courseadd").validate({
    submitHandler: function (form) {//提交事件
      // alert("提交事件")
      $.ajax({
        url:'/api/course/create',
        type:'post',
        data:$('form').serialize(),
        success: function(res) {
           console.log(res);
          //  $.cookie('cs_id', JSON.stringify(res.result.cs_id));
           location.href = "/course_add_step1?"+res.result.cs_id;
        }
      })
    },
    rules: {
      cs_name: {
        required: true,
        minlength: 5
      }
    },
    messages: {
      cs_name: {
        required: "请输入课程名称",
        minlength: "课程名称必须由五个以上字符组成"
      }
    }
  });

  //点击按钮提交数据
  // $("#createBtn").click(function(){
  //   console.log($('form').serialize());
  //   $.ajax({
  //     url:'/api/course/create',
  //     type:'post',
  //     data:$('form').serialize(),
  //     success: function(res) {
  //        console.log(res);
  //       //  $.cookie('cs_id', JSON.stringify(res.result.cs_id));
  //        location.href = "http://studyio.com/course_add_step1?"+res.result.cs_id;
  //     }
  //   })
  // });
});
