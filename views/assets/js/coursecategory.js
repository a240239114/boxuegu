define(["method","template"], function(method,template) {
    // console.log('1111');
  method.expandMenu();

  //获取顶级分类
  $.ajax({
    url:"/api/category/top",
    type:"get",
    success: function(res) {
      // console.log(res);
      var html =template('cousecategoryTpl',{
        result:res.result
      });

      // console.log(html);

      $("tbody").html(html);

    }
  }).done(function(){//获取子级分类
     $(".active").on('click',function(){
        // console.log($(this).attr('data-id'));

        $.ajax({
          url:"/api/category/child",
          type:"get",
          data:{
            cg_id:$(this).attr('data-id')
          },
          success: function(info) {
            // console.log(info);
            var html =template('coursecategorychildTpl',{
              comments:info.result
            });
      
            console.log(html);
      
            $(".child").html(html);
      
          }
        })
     });
  });
});