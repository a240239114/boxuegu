define(["jquery", "template"], function($, template) {


  //   console.log(location.search.slice(7));
  if (location.search != "") {
    let cg_id = location.search.slice(7);

    //获取数据
    $.ajax({
      url: "/api/category/edit",
      type: "get",
      data: {
        cg_id: cg_id
      },
      success: function(res) {
        console.log(res.result);
        var html = template("category-add-TPL", res.result);
        $(".category-add").html(html);
      }
    }).done(function(res) {
      //修改课程分类
      console.log($(".form-horizontal").serialize());

      $("#save").on("click", function() {
        console.log("11111");
        let data = $(".form-horizontal").serialize();

        //提交数据
        $.ajax({
          url: `/api/category/modify?${data}`,
          type: "post",
          success: function(res) {
            console.log(res);
          }
        });
      });
    });


  } else {
     
    $.ajax({//获取顶级分类
        url: "/api/category/top",
        type: "get",
        success: function(res) {
          console.log(res.result);
          var html = template("category-add-TPL",{
              top:res.result
          });
          $(".category-add").html(html);
        }
    }).done(function(){
                // console.log('asdasdasd');

      $("#save").on("click", function() {
        //添加分类
        $.ajax({
          url: "/api/category/add",
          type: "post",
          data: $(".form-horizontal").serialize(),
          success: function(res) {
            console.log(res);
          }
        });
  
      });
   

    })
   
}//endfor else

})
