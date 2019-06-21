define(["jquery"], function($) {
  var setMenu = function(urlpart) {
    //点击页面----->然后高亮
    // console.log($(".navs li a").toArray());
    // console.log(location.pathname)
    var pathname = urlpart || location.pathname;
    $(".navs li a")
      .toArray()
      .filter(function(dom) {
        //   console.log(location.pathname)
        return dom.pathname == pathname;
      })
      .forEach(dom => {
        // console.log(dom.pathname)
        $(dom).addClass('active');
      });
  };

  var expandMenu = function(){
    $('.aside a + ul').show();
  };

  return {
      setMenu      : setMenu,
      expandMenu   : expandMenu
  };
});
