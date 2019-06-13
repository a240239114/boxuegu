define(["jquery", "template", "jqueryform"], function($, template, jqueryform) {
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
    }
  }).done(function() {
    //   console.log(tc_id);

//     $("#formSubmit").on("click", "#submit", function() {
//       let data = $("#formSubmit").serialize();
//       console.log(data);
//       //点击就提交数据
//       $.ajax({
//         url: `/api/teacher/update?${data}`,
//         type: "get",
//         success: function(res) {
//           console.log(res.msg);

//           location.pathname = "/teacher_list";
//         }
//       });

//       return false;
//     });


    
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
