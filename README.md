# 如何解决跨域的?

在 PHP 中调用一个方法请求数据服务器(此时 cookie 是不能被访问的)---------->去修改 httpd.conf 文件(配置域名和 IP 地址的关系)和 httpd-vhost.conf 文件(配置域名和端口的关系)[配置本地服务器和数据服务器的映射关系]

# cookie 的常用属性

创建:$.cookie('name', 'value');
读取:$.cookie('name'); // => "value"
$.cookie('nothing'); // => undefined
设置过期时间:$.cookie('name', 'value', { expires: 7 });
设置同一域名下的兄弟文件夹中的子文件可以相互访问 cookie:$.cookie('name', 'value', { expires: 7, path: '/' });
设置不同域名下的网页可以跨域访问cookie: domain: 'example.com'
删除:$.removeCookie('name');
http 协议下不会默认产生 cookie 了:secure: true(https)

##项目中的坑 1.委托事件------>jq 对象.on('事件名','选择器',function(){})
其中这个 jq 对象必须是已经存在的对象 不能是动态渲染出的对象

2.艺术模板常用的语法: {{if .....}} {{/if}}

3.注销和启用过程的思路: 求出 id 和 status ---->发请求----->此时数据库中的 status 已经改变---->
现在重新渲染页面太浪费了------>我们可以得到改变后的 status----->[注销,启用].[status]

4. 登录的过程: 验证账号和密码----->成功后后端会发送 sessinId 到前端----->有了 cookie 说明已经登录成功------>进行页面跳转

5.退出登录: 删除 sessionId 和 userinfo------>进行逻辑判断----->页面跳转

6.

###git 命令行
git log --oneline --all --graph                 图形化的显示
git log -p                                      查看详情
git checkout -b "新分支名"                       创建并跳转分支
git tag -a "V1" -m "描述"                       打标签
git tag                                         列出所有标签
git show v1                                     显示 v1 的详细信息
git branch                                      列举所有的分支
git branch -d "分支名"                           删除分支

##页面之间传值的方式
1、使用 window.location 的 href 属性，等于重新刷新页面，必须是 get 请求，post 请求需要服务端解析，post 是用来客户端服务端传递数据
window.location.href=”b.html?valus=parm”; 传值端
window.location.search; 接收端

2、 cookie ，window.localStorage(需要考虑兼容)，利用浏览器存储传值，页面需要同源，不能在不同的浏览器之间如此（也即页面不能分享）。

3、通过 URL 中传标示，从应用的缓存中传值。和方式 1 类似，值不会暴露在 URL 中。

4、设置窗口之间的父子关联关系

5、window.postMessage 传值，HTML5 新特性，需考虑兼容


##不是模块才需要配置
如何查看是不是模块?------->在源码中收索define是否存在------->存在就是模块

###反向代理


###bug
表单验证
过滤器

