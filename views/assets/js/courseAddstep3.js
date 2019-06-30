define(["jquery", "template", "bootstrap", "jqueryform"], function(
  $,
  template
) {
  //console.log(location.search.slice(1));

  $.ajax({
    //获得数据渲染页面
    url: "/api/course/lesson",
    type: "get",
    data: {
      cs_id: location.search.slice(1)
    },
    success: function(res) {
      console.log(res);

      var html = template("courseAddStep3Tpl", res.result);

      //console.log(html);

      $(".steps").html(html);
    }
  }).done(function() {
    //点击添加课时,模态框显示
    $("#btn").on("click", function() {
      $("#chapterModal").modal("show");

    //   //   console.log($(this).attr('data-ct_cs_id'));
    //   let ct_cs_id = $(this).attr("data-ct_cs_id");

    //   //判断免费课时的选中状态----->选中 (ct_is_free=1)
    //   //   console.log($(".checkbox input[type='checkbox']").prop('checked'));
    //   var flag = $(".checkbox input[type='checkbox']").prop("checked");
    //   if (flag) {
    //     var ct_is_free = 1;
    //   } else {
    //     var ct_is_free = 0;
    //   }

    //   let data = $(".form-horizontal").serialize();
    //   data = data + "&ct_cs_id=" + ct_cs_id + "&ct_is_free=" + ct_is_free;

      console.log(data);
      //准备提交数据
      $("#save").click(function() {
        //   console.log($(this).attr('data-ct_cs_id'));
        let ct_cs_id = $(this).attr("data-ct_cs_id");

        //判断免费课时的选中状态----->选中 (ct_is_free=1)
        //   console.log($(".checkbox input[type='checkbox']").prop('checked'));
        var flag = $(".checkbox input[type='checkbox']").prop("checked");
        if (flag) {
          var ct_is_free = 1;
        } else {
          var ct_is_free = 0;
        }

        let data = $(".form-horizontal").serialize();
        data = data + "&ct_cs_id=" + ct_cs_id + "&ct_is_free=" + ct_is_free;

        //   alert("表单提交了")
        $.ajax({
          url: "/api/course/chapter/add",
          type: "POST",
          data: data,
          success: function(res) {
            alert("添加成功");
            console.log(res);
          },
          error: function() {
            alert("添加失败");
          }
        });
      });
    });

    //   console.log($("#btn"))
  });
});
