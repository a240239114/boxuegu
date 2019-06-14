# 如何解决跨域的?
在PHP中调用一个方法请求数据服务器(此时cookie是不能被访问的)---------->去修改httpd.conf文件(配置域名和IP地址的关系)和httpd-vhost.conf文件(配置域名和端口的关系)[配置本地服务器和数据服务器的映射关系]

# cookie 的常用属性
创建:$.cookie('name', 'value');
读取:$.cookie('name'); // => "value"
     $.cookie('nothing'); // => undefined
设置过期时间:$.cookie('name', 'value', { expires: 7 });
设置同一域名下的兄弟文件夹中的子文件可以相互访问cookie:$.cookie('name', 'value', { expires: 7, path: '/' });
设置不同域名下的网页可以跨域访问cookie: domain: 'example.com'
删除:$.removeCookie('name');
http协议下不会默认产生cookie了:secure: true(https)

##项目中的坑
1.委托事件------>jq对象.on('事件名','选择器',function(){})
                 其中这个jq对象必须是已经存在的对象 不能是动态渲染出的对象

2.艺术模板常用的语法: {{if .....}}  {{/if}}  

3.注销和启用过程的思路: 求出 id 和 status ---->发请求----->此时数据库中的status已经改变---->
                       现在重新渲染页面太浪费了------>我们可以得到改变后的status----->[注销,启用].[status]

4. 登录的过程: 验证账号和密码----->成功后后端会发送sessinId到前端----->有了cookie说明已经登录成功------>进行页面跳转

5.退出登录: 删除sessionId和userinfo------>进行逻辑判断----->页面跳转

6.
