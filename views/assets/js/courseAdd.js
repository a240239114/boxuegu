define(["method","cookie"], function(method,cookie) {
    // console.log('1111');
  method.expandMenu();

  //点击按钮提交数据
  $("#createBtn").click(function(){
    console.log($('form').serialize());
    $.ajax({
      url:'/api/course/create',
      type:'post',
      data:$('form').serialize(),
      success: function(res) {
         console.log(res.result);
         $.cookie('cs_id', JSON.stringify(res.result.cs_id));
      }
    })
  });
});
