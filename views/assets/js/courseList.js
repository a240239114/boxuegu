define(["method", "jquery", "template", "pagination"], function(
  method,
  $,
  template,
  pagination
) {
  method.expandMenu();
  
  $(function(){//页面加载事件
       
  //分页实现函数
  function getMsg(num) {
    $.ajax({
      url: "/api/course",
      type: "GET",
      dataType: "json",
      success: function(res) {
          let data = res.result;

          //默认显示第一页
          var html = template('courselistTpl',{
            comments:data.slice(0,5)
          });
          $("#content").html(html);

     
          $(".M-box3").pagination({
            count:5,
            pageCount: num,
            jump: true,
            showData:5,
            coping: true,
            homePage: "首页",
            endPage: "末页",
            prevContent: "上页",
            nextContent: "下页",
            callback: function(api) {
              // console.log(api.getCurrent());
          
              //获取索引
              let index = api.getCurrent();
              // console.log(data);
              //需要显示的数据
              var LoadData = data.slice((index-1)*5,index*5);
              // console.log(LoadData);
              var html = template('courselistTpl',{
                comments:LoadData
              });
              // console.log(html);
              $("#content").html(html);
            }
          });

      } //endfor success
    }); //endfor ajax
  } //endfor getMsg


  getMsg(21);
  })
});
