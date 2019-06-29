define(["jquery", "template", "jqueryform", "validate", "zhCN"], function(
  $,
  template,
  jqueryform,
  validate
) {
  var htmlStr = template("teahcereditTPL", {});
  //渲染页面
  $("#teacherEdit").html(htmlStr);

  //配置validate插件 初始化插件
  $("#formSubmit").validate();

  //获取表单数据
  var data = $("#formSubmit").serialize();

  $("#submit").on("click", function() {
    //点击就提交数据
    $.ajax({
      url: "/api/teacher/add",
      type: "post",
      data: $("#formSubmit").serialize(),
      success: function() {
        console.log("oh yee");
      }
    });
    // location.pathname = "/teacher_list";
    return false;
  });
});
