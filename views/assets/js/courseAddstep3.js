define([
    'jquery',
    'template'
], function($, template) {
   //console.log(location.search.slice(1));

   $.ajax({
       url:"/api/course/lesson",
       type:"get",
       data:{
           cs_id :location.search.slice(1)
       },
       success: function(res) {
           console.log(res);

           var html = template('courseAddStep3Tpl',res.result);

           //console.log(html);

           $(".steps").html(html);
       }
   })
});