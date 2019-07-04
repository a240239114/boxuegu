define(["jquery", "template", "jqueryform", "validate", "zhCN"], function (
  $,
  template,
  jqueryform,
  validate
) {
  var htmlStr = template("teahcereditTPL", {});
  //渲染页面
  $("#teacherEdit").html(htmlStr);

  //配置validate插件 初始化插件
  $("#formSubmit").validate({
    errorPlacement: function (error, element) {//改变错误信息的位子
      error.appendTo(element.closest(".form-group"));
    },
    submitHandler: function (form) {//提交事件
      var data = $("#formSubmit").serializeArray();
      data.forEach(function(item,index){//数组的循环方法
          if(item.name == "tc_confirm_pass"){
             data.splice(index,1);
            //  console.log(data);
          }   
      })
      //点击就提交数据
      $.ajax({
        url: "/api/teacher/add",
        type: "post",
        data: data,
        success: function() {
          console.log("oh yee");
        }
      });
      location.pathname = "/teacher_list";
      return false;
    },
    rules: {
      tc_name: {
        required: true,
        minlength: 6
      },
      tc_pass: {
        required: true,
        minlength: 6
      },
      tc_confirm_pass: {
        required: true,
        minlength: 6,
        equalTo:"#tc_pass"
      },
      tc_join_date: {
        required: true
      },
      tc_type: {
        required: true
      }
    },
    messages: {
      tc_name: {
        required: "请输入姓名",
        minlength: "姓名必须由六个以上字符组成"
      },
      tc_pass: {
        required: "请输入密码",
        minlength: "密码必须由六个以上字符组成"
      },
      tc_confirm_pass: {
        required: "请输入确认密码",
        minlength: "密码必须由六个以上字符组成",
        equalTo: "密码与确认密码不一致"
      },
      tc_join_date: {
        required: "请输入入职日期"
      },
      tc_type: {
        required: "请输类型"
      }
    }
  });

});
