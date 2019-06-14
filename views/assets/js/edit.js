define(["jquery", "template", "jqueryform", "zhCN", "validate"], function(
  $,
  template,
  jqueryform
) {
  //获取路由ID
  var tc_id = location.search.substr(1);

  $.ajax({
    //渲染页面
    url: "/api/teacher/edit",
    type: "get",
    data: {
      tc_id: tc_id
    },
    success: function(res) {
      res.result.teacherWay = "讲师编辑";
      res.result.submitWay = "编辑";

      //   console.log(res.result);
      //渲染页面
      var htmlStr = template("teahcereditTPL", res.result);
      // console.log(htmlStr);

      $("#teacherEdit").html(htmlStr);

      //配置插件validate
      $("#formSubmit").validate({
        description: {
          require: {
            required: "请填写信息"
          }
        }
      });
    }
  }).done(function() {
    $("#formSubmit").on("submit", function() {
      //点击就提交数据
      $(this).ajaxSubmit({
        url: "/api/teacher/update",
        type: "post",
        success: function(res) {
          console.log(res.msg);

          location.pathname = "/teacher_list";
        }
      });

      return false;
    });
  });
});
