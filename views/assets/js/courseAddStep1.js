define([
  "jquery",
  "cookie",
  "method",
  "validate",
  "template",
  "CKEDITOR"
], function($, cookie, method, validate, template, CKEDITOR) {
  var cs_id = location.search.slice(1);
  console.log(cs_id);

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
    success: function(res) {
        console.log(res);
      var htmlStr = template("courseAddTml", res.result);

      $("#course-add").html(htmlStr);

      //初始化富文本
      CKEDITOR.replace("cs_brief");
    }
  });

  //事件委托
  $("#course-add").on("change", "#categorytop", function() {
    //console.log(this.value);
    //获取id
    // console.log(this instanceof jQuery);
    // console.log($(this) instanceof jQuery);
    // console.log($(this).val());
    // console.log($(this).attr("value"));

    // 渲染页面
    $.ajax({
      url: "/api/category/child",
      type: "get",
      data: {
        cg_id: this.value
      },
      success: function(res) {
        // console.log(res.result);
        var htmlstr = res.result.map(function(item) {
          return (
            '<option value="' + item.cg_id + '">' + item.cg_name + "</option>"
          );
        });
        htmlstr.unshift('<option value="">请输入子分类</option>');

        //此时htmlstr是数组
        // console.log(htmlstr);

        $("#categorybottom").html(htmlstr.join(""));
      }
    });
  });

  //提交数据
  $("#course-add").on("click", "#submit", function() {
    console.log($("#form").serialize());

    //手动更新ckeditor,把富文本的值传递给textarea中, 不然不能提交真实的信息
    for (var k in CKEDITOR.instances) {
      CKEDITOR.instances[k].updateElement();
    }

    $.ajax({
      url: "/api/course/update/basic",
      type: "post",
      data: $("#form").serialize(),
      success: function(res) {
        console.log(res);
      }
    });
  });
});
