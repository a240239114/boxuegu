define([
  "jquery",
  "cookie",
  "method",
  "validate",
  "template",
  "CKEDITOR"
], function ($, cookie, method, validate, template, CKEDITOR) {
  var cs_id = location.search.slice(1);

  //ul展开
  method.expandMenu();

  //高亮显示
  method.setMenu("/course_add");

  //渲染页面
  $.ajax({
    url: "/api/course/basic",
    type: "get",
    data: {
      cs_id: cs_id
    },
    success: function (res) {
      // console.log(res);
      var htmlStr = template("courseAddTml", res.result);

      $("#course-add").html(htmlStr);
    }
  }).done(function (res) {
    var cs_id = res.result.cs_id;

    //事件委托,根据选择相应的父级分类,响应相应的子级分类
    $("#course-add").on("change", "#categorytop", function () {
      // 渲染页面
      $.ajax({
        url: "/api/category/child",
        type: "get",
        data: {
          cg_id: this.value
        },
        success: function (res) {
          // console.log(res.result);
          var htmlstr = res.result.map(function (item) {
            return (
              '<option value="' + item.cg_id + '">' + item.cg_name + "</option>"
            );
          });
          htmlstr.unshift('<option value="">请输入子分类</option>');
          $("#categorybottom").html(htmlstr.join(""));
        }
      });
    });

    //配置validate插件 初始化插件
    $("#formStep1").validate({
      errorPlacement: function (error, element) {//改变错误信息的位子
        error.appendTo(element.closest(".form-group"));
      },
      submitHandler: function (form) {//提交事件
        //初始化富文本
        CKEDITOR.replace("cs_brief");


        //手动更新ckeditor,把富文本的值传递给textarea中, 不然不能提交真实的信息
        for (var k in CKEDITOR.instances) {
          CKEDITOR.instances[k].updateElement();
        }

        $.ajax({
          url: "/api/course/update/basic",
          type: "post",
          data: $("#formStep1").serialize(),
          success: function (res) {
             //页面跳转并且传参
             window.location.href = "course_add_step2?"+cs_id;
          }
        });

      },
      rules: {
        cs_name: {
          required: true,
          minlength: 6
        },
        cs_brief: {
          required: true,
          minlength: 10
        },
        cs_tags: {
          required: true,
          minlength: 6,
        }
      },
      messages: {
        cs_name: {
          required: "请输入课程名称",
          minlength: "课程名称必须由六个以上字符组成"
        },
        cs_brief: {
          required: "请输入课程描述",
          minlength: "课程描述必须由十个以上字符组成"
        },
        cs_tags: {
          required: "请输入标签信息",
          minlength: "标签信息必须由六个以上字符组成"
        }
      }
    });
  });
});
