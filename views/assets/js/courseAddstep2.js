define(["jquery", "template", "WebUploader"], function(
  $,
  template,
  WebUploader
) {
  // console.log('1111');

  //获取id
  console.log(location.search.slice(1));
  var cs_id = location.search.slice(1);

  //请求数据 渲染页面
  $.ajax({
    url: "/api/course/picture",
    type: "get",
    data: {
      cs_id: cs_id
    },
    success: function(res) {
      console.log(res);
      var html = template("courseStep2Tpl", res.result);
      //    console.log(html)

      $(".steps").html(html);
    }
  }).done(function(res){
            // 初始化Web Uploader
            var uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,
        
                // swf文件路径
                swf: "./assets/webuploader/Uploader.swf",
        
                // 文件接收服务端。
                server:"/api/uploader/cover",
        
                formData: {
                  cs_id: res.result.cs_id
                },
        
                //上传域的名字
                fileVal: "cs_cover_original",
        
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
                  400,
                  200
                );
                });

             //删除btn样式
             $("#filePicker").removeClass('btn-success');  
             $(".webuploader-pick").css({'height':'30px','width':'68px'})


             uploader.on("uploadComplete",function(file){
                 //页面跳转
                 location.href = "http://studyio.com/course_add_step3?"+res.result.cs_id;
             })
  }) 
});
