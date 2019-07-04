define(["jquery", "template", "jqueryform", "validate", "zhCN"], function (
  $,
  template,
  jqueryform,
  validate
) {
  var htmlStr = template("teahcereditTPL", {});
  //渲染页面
  $("#teacherEdit").html(htmlStr);

  //配置validate插件 初始化插件
  $("#formSubmit").validate({
    errorPlacement: function (error, element) {
      error.appendTo(element.closest( ".form-group" ));
    },
    submitHandler: function (form) {//提交事件
      alert("submitted");
    },
    rules: {
      tc_name: {
        required: true,
        minlength: 6
      },
      tc_pass: {
        required: true,
        minlength: 6
      },
      tc_join_date: {
        required: true
      },
      tc_type: {
        required: true
      }
    },
    messages: {
      tc_name: {
        required: "请输入姓名",
        minlength: "姓名必须由六个以上字符组成"
      },
      tc_pass: {
        required: "请输入密码",
        minlength: "姓名必须由六个以上字符组成"
      },
      tc_join_date: {
        required: "请输入入职日期"
      },
      tc_type: {
        required: "请输类型"
      }
    }
  });

  $("#submit").on("click", function () {
    // var data = $("#formSubmit").serialize();
    // //点击就提交数据
    // $.ajax({
    //   url: "/api/teacher/add",
    //   type: "post",
    //   data: $("#formSubmit").serialize(),
    //   success: function() {
    //     console.log("oh yee");
    //   }
    // });
    // // location.pathname = "/teacher_list";
    // return false;
  });
});
