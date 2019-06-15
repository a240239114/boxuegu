define([
  "jquery",
  "template",
  "validate",
  "WebUploader",
  "region",
  "CKEDITOR",
  "jqueryform",
  "datepicker",
  "zhCN"
], function(
  $,
  template,
  validate,
  WebUploader,
  region,
  CKEDITOR,
  jqueryform,
  zhCN
) {
  //请求数据---->渲染页面
  $.ajax({
    url: "/api/teacher/profile",
    type: "get",
    success: function(res) {
      var htmlStr = template("profileTpl", res.result);
      // console.log(res);
      $("#profileInfo").html(htmlStr);

      //配置插件validate
      $("form").validate({
        description: {
          required: {
            required: "请填写信息"
          }
        }
      });

      //省市级联
      $("#selectHome").region({
        url: "./assets/jquery-region/region.json"
      });

      //富文本编辑器
      CKEDITOR.replace("tc_introduce");
    }
  }).done(function() {
    // alert('1');
    // console.dir($("#profileForm").serialize());
    //更新个人资料,委托事件
    $("#btn").on("click", function() {
      console.log("成功了");

      //手动更新ckeditor,把富文本的值传递给textarea中, 不然不能提交真实的信息
      for (var k in CKEDITOR.instances) {
        CKEDITOR.instances[k].updateElement();
        console.log("111111");
      }

      var hometown = $("select", "#selectHome")
        .find(":selected")
        .map(function() {
          console.log(this);
          return $(this).text();
        })
        .toArray()
        .join("|");

      console.log(hometown);

      var data = $("#profileForm").serialize() + "&tc_hometown=" + hometown;
      console.log(data);
      $.ajax({
        url: "/api/teacher/modify",
        type: "post",
        data: data,
        success: function(res) {
          console.log(res);
        }
      });

      return false;
    });
  });
});
