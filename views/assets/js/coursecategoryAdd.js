define(["jquery", "template", "validate"], function ($, template, validate) {
  if (location.search != "") {//编辑分类

    let cg_id = location.search.slice(7);

    //获取数据
    $.ajax({
      url: "/api/category/edit",
      type: "get",
      data: {
        cg_id: cg_id
      },
      success: function (res) {
        console.log(res.result);
        var html = template("category-add-TPL", res.result);
        $(".category-add").html(html);
      }
    }).done(function (res) {

      $("#course_category_add").validate({
        errorPlacement: function (error, element) {//改变错误信息的位子
          error.appendTo(element.closest(".form-group"));
        },
        submitHandler: function (form) {//提交事件
          console.log("11111");
          let data = $(".form-horizontal").serialize();

          //提交数据
          $.ajax({
            url: `/api/category/modify?${data}`,
            type: "post",
            success: function (res) {
              console.log(res);
              window.location.href = "course_category";
            }
          });
        },
        rules: {
          cg_name: {
            required: true,
            minlength: 2
          },
          cg_order: {
            required: true
          }
        },
        messages: {
          cg_name: {
            required: "请输入分类名称",
            minlength: "分类名称必须由两个以上字符组成"
          },
          cg_order: {
            required: "请输入排序"
          }
        }

      });



      // $("#save").on("click", function () {
      //   console.log("11111");
      //   let data = $(".form-horizontal").serialize();

      //   //提交数据
      //   $.ajax({
      //     url: `/api/category/modify?${data}`,
      //     type: "post",
      //     success: function (res) {
      //       console.log(res);
      //     }
      //   });
      // });


    });


  } else {//添加分类

    $.ajax({//获取顶级分类
      url: "/api/category/top",
      type: "get",
      success: function (res) {
        console.log(res.result);
        var html = template("category-add-TPL", {
          top: res.result
        });
        $(".category-add").html(html);
      }
    }).done(function () {
      $("#course_category_add").validate({
        errorPlacement: function (error, element) {//改变错误信息的位子
          error.appendTo(element.closest(".form-group"));
        },
        submitHandler: function (form) {//提交事件
          //添加分类
          $.ajax({
            url: "/api/category/add",
            type: "post",
            data: $(".form-horizontal").serialize(),
            success: function (res) {
              // console.log(res);
              window.location.href = "course_category";
            }
          });
        },
        rules: {
          cg_name: {
            required: true,
            minlength: 2
          },
          cg_order: {
            required: true
          }
        },
        messages: {
          cg_name: {
            required: "请输入分类名称",
            minlength: "分类名称必须由两个以上字符组成"
          },
          cg_order: {
            required: "请输入排序"
          }
        }

      });
    })

  }//endfor else

})
