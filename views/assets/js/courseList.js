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
        comments: res.result.slice(0, 10)
      });

      $(".courses").html(html);
    }
  }).done(function(res) {

    //定义分页函数
    function handleData(currentPage, length, data) {
      var arr = data.slice((currentPage - 1) * length, currentPage * length);
      return arr;
    }

    $(".pagination li").on("click", function() {
      var that = this;
      //获取data-index的值 
      var arr = handleData($(that).index(),10,res.result);

      console.log(arr);
 
      // var html = template("courselistTpl", {
      //   comments:arr
      // });
      // // console.log(html);
      // $(".courses").html(html);
    });
  });
});




