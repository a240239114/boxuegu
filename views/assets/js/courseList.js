define(["method", "jquery", "template"], function(method, $, template) {
  // console.log('1111');
  method.expandMenu();

  //请求数据
  $.ajax({
    url: "/api/course",
    type: "get",
    success: function(res) {
      console.log(res);

      //页面加载就请求,索引为1的页面
      var html = template("courselistTpl", {
        comments: res.result.slice(0, 5)
      });

      $(".courses").html(html);
    }
  }).done(function(res) {
    $(".pagination a").on("click", function() {
       //获取data-index的值
      var index = $(this).attr('data-index');

      // console.log($(this).attr('data-index'));
     
      var data = {
        comments: res.result.slice((index-1)*5, index*5)
      }

      console.log(data);
      var html = template("courselistTpl",data);
      // console.log(html);
      // $(".courses").html(html);
    });
  });
});
