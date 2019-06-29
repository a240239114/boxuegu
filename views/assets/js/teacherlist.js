define(["jquery", "template", "bootstrap"], function($, template) {
  $(function() {
    //先请求数据渲染页面
    $.ajax({
      url: "/api/teacher",
      type: "GET",
      success: function(res) {
        console.log(res);
        if (res.code == 200) {
          //渲染模板
          var htmlStr = template("tpl", {
            comments: res.result
          });
          $("#teacherlistTpl").html(htmlStr);
        }
      }
    });
  });

  $("#teacherlistTpl").on("click", ".search", function() {
    //点击查看
    //  console.log(this);
    //让弹框出现----->请求数据-------->利用末班引擎渲染数据
    var tc_id = $(this)
      .parent("td")
      .attr("data-id");

    $.ajax({
      url: "/api/teacher/view",
      type: "get",
      data: {
        tc_id: tc_id
      },
      success: function(res) {
        var htmlStr = template("caonima", res.result);
        console.log(htmlStr);
        $("#teacherModal").html(htmlStr);

        $("#myModal").modal("show");
      }
    });
  });

  var arr = ["注销", "启用"];
  //注销启用功能
  $("#teacherlistTpl").on("click", ".zhuxiao", function() {
    console.log(this);
    var that = this;
    var tc_id = $(this)
      .parent("td")
      .attr("data-id");
    var tc_status = $(this).attr("data-status");
    console.log(tc_status);

    $.ajax({
        url:"/api/teacher/handle",
        type:"post",
        data:{
            "tc_id":tc_id,
            "tc_status":tc_status
        },
        success:function(res){
            console.log(res);
            $(that).attr("data-status",res.result.tc_status);
            $(that).text(arr[res.result.tc_status]);
        }
    })
  });




});
