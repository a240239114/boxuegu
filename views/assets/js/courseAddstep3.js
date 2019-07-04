define(["jquery", "template", "validate", "bootstrap", "jqueryform"], function (
  $,
  template,
  validate
) {
  //console.log(location.search.slice(1));
  $.ajax({
    //获得数据渲染页面
    url: "/api/course/lesson",
    type: "get",
    data: {
      cs_id: location.search.slice(1)
    },
    success: function (res) {
      console.log(res);

      var html = template("courseAddStep3Tpl", res.result);

      //console.log(html);

      $(".steps").html(html);
    }
  }).done(function () {

    //点击添加课时
    $("#btn").on("click", function () {
      $("#chapterModal").modal("show");

      var html = template("chapterModalTpl", {});
      //   console.log(html);
      $("#chapterModal").html(html);
      let ct_cs_id = $(this).attr("data-ct_cs_id");

      $("#formStep3").validate({
        // errorPlacement: function (error, element) {//改变错误信息的位子
        //   error.appendTo(element.closest(".form-group"));
        // },
        submitHandler: function (form) {//提交事件
          var flag = $(".checkbox input[type='checkbox']").prop("checked");
          if (flag) {
            var ct_is_free = 1;
          } else {
            var ct_is_free = 0;
          }

          let data = $(".form-horizontal").serialize();
          data = data + "&ct_cs_id=" + ct_cs_id + "&ct_is_free=" + ct_is_free;

          $.ajax({
            url: "/api/course/chapter/add",
            type: "POST",
            data: data,
            success: function (res) {
              alert("添加成功");
              console.log(res);
              $("#chapterModal").modal("hide");
              window.location.reload();
            },
            error: function () {
              alert("添加失败");
              window.location.reload();
            }
          });

        },
        rules: {
          ct_name: {
            required: true,
            minlength: 6
          },
          ct_brief: {
            required: true,
            minlength: 10
          },
          ct_video: {
            required: true,
            url: true,
            minlength: 6,
          }
        },
        messages: {
          ct_name: {
            required: "请输入课时名称",
            minlength: "课程名称必须由六个以上字符组成"
          },
          ct_brief: {
            required: "请输入课时描述",
            minlength: "课时描述必须由十个以上字符组成"
          },
          ct_video: {
            required: "请输入视频链接",
            url: "请输入正确的网页格式",
            minlength: "标签信息必须由六个以上字符组成"
          }
        }

      });

    });

    //编辑课时
    $("a:contains('编辑')").on("click", function () {
      $("#chapterModal").modal("show");
      // console.log("11111");
      var ct_id = $(this).attr("data-id");
      //    console.log(ct_id);

      //渲染页面
      $.ajax({
        url: "/api/course/chapter/edit",
        type: "get",
        data: {
          ct_id: ct_id
        },
        success: function (res) {
          //   console.log(res);
          var html = template("chapterModalTpl", res.result);
          //  console.log(html);
          $("#chapterModal").html(html);
        }
      }).done(function (res) {

        $("#formStep3").validate({
          // errorPlacement: function (error, element) {//改变错误信息的位子
          //   error.appendTo(element.closest(".form-group"));
          // },
          submitHandler: function (form) {//提交事件
 
            var flag = $(".checkbox input[type='checkbox']").prop("checked");
            if (flag) {
              var ct_is_free = 1;
            } else {
              var ct_is_free = 0;
            }
  
            var data = $(".form-horizontal").serialize();
            var ct_cs_id = res.result.ct_cs_id;
            data =
              data +
              "&ct_id=" +
              ct_id +
              "&ct_cs_id=" +
              ct_cs_id +
              "&ct_is_free=" +
              ct_is_free;
            console.log(data);
            $.ajax({
              url: "/api/course/chapter/modify",
              type: "post",
              data: data,
              success: function (res) {
                console.log(res);
                $("#chapterModal").modal("hide");
                window.location.reload();
              }
            });
  
          },
          rules: {
            ct_name: {
              required: true,
              minlength: 6
            },
            ct_brief: {
              required: true,
              minlength: 10
            },
            ct_video: {
              required: true,
              url: true,
              minlength: 6,
            }
          },
          messages: {
            ct_name: {
              required: "请输入课时名称",
              minlength: "课程名称必须由六个以上字符组成"
            },
            ct_brief: {
              required: "请输入课时描述",
              minlength: "课时描述必须由十个以上字符组成"
            },
            ct_video: {
              required: "请输入视频链接",
              url: "请输入正确的网页格式",
              minlength: "标签信息必须由六个以上字符组成"
            }
          }
  
        });

  
      });
    });

  });
});
