define([
  "jquery",
  "template",
  "validate",
  "WebUploader",
  "region",
  "CKEDITOR",
  "jqueryform",
  "datepicker",
  "zhCN"
], function(
  $,
  template,
  validate,
  WebUploader,
  region,
  CKEDITOR,
  jqueryform,
  zhCN
) {
  //请求数据---->渲染页面
  $.ajax({
    url: "/api/teacher/profile",
    type: "get",
    success: function(res) {
      var htmlStr = template("profileTpl", res.result);
      console.log(res.result.tc_id);
      $("#profileInfo").html(htmlStr);

      //配置插件validate
      $("form").validate({
        description: {
          required: {
            required: "请填写信息"
          }
        }
      });

      //省市级联
      $("#selectHome").region({
        url: "./assets/jquery-region/region.json"
      });

      //富文本编辑器
      CKEDITOR.replace("tc_introduce");
    }
  }).done(function() {
    // alert('1');
    // console.dir($("#profileForm").serialize());

    
    //上传图片,初始化
    var uploader = WebUploader.create({
      // 选完文件后，是否自动上传。
      auto: true,

      // swf文件路径
      swf:"./assets/webuploader/Uploader.swf",

      // 文件接收服务端。
      server: "/api/uploader/avatar",

      //上传域的名字
      fileVal:'tc_avatar', 

      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: "#filePicker",

      // 只允许选择图片文件。
      accept: {
        title: "Images",
        extensions: "gif,jpg,jpeg,bmp,png",
        mimeTypes: "image/*"
      }
    });

    // 当有文件添加进来的时候
    uploader.on("fileQueued", function(file) {
      var $li = $(
          '<div id="' +
            file.id +
            '" class="file-item thumbnail">' +
            "<img>" +
            '<div class="info">' +
            file.name +
            "</div>" +
            "</div>"
        ),
        $img = $li.find("img");

        $list = $("#fileList");

      // $list为容器jQuery实例
      $list.append($li);

      // 创建缩略图
      // 如果为非图片文件，可以不用调用此方法。
      // thumbnailWidth x thumbnailHeight 为 100 x 100
      uploader.makeThumb(
        file,
        function(error, src) {
          if (error) {
            $img.replaceWith("<span>不能预览</span>");
            return;
          }

          $img.attr("src", src);
        },
        300,
        300
      );
    });


    $(".info").css({'display':'none'})


    //更新个人资料,委托事件
    $("#btn").on("click", function() {
      console.log("成功了");

      //手动更新ckeditor,把富文本的值传递给textarea中, 不然不能提交真实的信息
      for (var k in CKEDITOR.instances) {
        CKEDITOR.instances[k].updateElement();
        console.log("111111");  
      }

      var hometown = $("select", "#selectHome")
        .find(":selected")
        .map(function() {
          console.log(this);
          return $(this).text();
        })
        .toArray()
        .join("|");

      console.log(hometown);

      var data = $("#profileForm").serialize() + "&tc_hometown=" + hometown;
      console.log(data);
      $.ajax({
        url: "/api/teacher/modify",
        type: "post",
        data: data,
        success: function(res) {
          console.log(res);
        }
      });

      return false;
    });
  });
});
