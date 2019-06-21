//引入gulp
var gulp = require('gulp');
//这样的话 其他的模块可以直接使用 $ 符号来引入
var $ = require('gulp-load-plugins')();
var open = require('open');
var htmlMin = require('gulp-htmlmin');

//定义目录路径
var app = {
    //源代码，文件目录
    srcPath: 'views/',
    //项目，发布目录上产部署
    prdPath: 'dist/'
};

//压缩html文件
gulp.task('html-min',function(){
    return gulp.src('views/*.html')//读取源文件
               .pipe(htmlMin({collapseWhitespace:true}))//调用压缩方法
               .pipe(gulp.dest('dist/'))//输出源文件
})

//通过bower安装的插件，需要拷贝到 devPath prdPath中
gulp.task('lib',function(){
    //   /**/* 读取这个文件夹下边的所有的文件或者文件夹
    gulp.src('views/assets/**/*')
    //读取完整后进行操作  西安拷贝到整合目录 并重命名，在拷贝到生产目录并重命名
    // .pipe(gulp.dest(app.devPath + 'vender'))
    .pipe(gulp.dest(app.prdPath + 'assets'))
    .pipe($.connect.reload());  //文件更改后自动编译 并执行启动服务重新打开浏览器

    gulp.src('views/public/**/*')
    //读取完整后进行操作  西安拷贝到整合目录 并重命名，在拷贝到生产目录并重命名
    // .pipe(gulp.dest(app.devPath + 'vender'))
    .pipe(gulp.dest(app.prdPath + 'public'))
    .pipe($.connect.reload());  //文件更改后自动编译 并执行启动服务重新打开浏览器
});


//将 index.less 文件 拷贝到 devPath prdPath中，index.less引入了所有的其他的less
gulp.task('less',function(){
    gulp.src(app.srcPath + 'less/index.less')
    .pipe($.less())  
    // .pipe(gulp.dest(app.devPath + 'less'))
    .pipe($.cssmin())
    .pipe(gulp.dest(app.prdPath + 'less'))
    .pipe($.connect.reload());
});

//拷贝 压缩 图片 最后放到发布目录下
gulp.task('image',function(){
    gulp.src(app.srcPath + 'images/**/*')
    //江源图片放到整合目录下，在压缩放到生产目录下
    // .pipe(gulp.dest(app.devPath + 'image'))
    .pipe($.imagemin())
    .pipe(gulp.dest(app.prdPath + 'images'))
    .pipe($.connect.reload());
});

//压缩js文件
gulp.task('js',function(){
    gulp.src(app.srcPath+'views/assets/js/*.js')
        .pipe(gulp.dest(app.prdPath+'assets/js/'))//临时输出文件
        .pipe($.uglify())
        // .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(app.prdPath+'assets/js/'))
})


//清除旧文件，每次更新的时候
gulp.task('clean',function(){
    gulp.src([app.prdPath])
    .pipe($.clean());
})

//总的方法
gulp.task('build',['image', 'less','html-min', 'lib','js','clean']);

//编写服务
gulp.task('serve',['build'], function() {
    $.connect.server({
        //服务起来的入口
        root: [app.prdPath],
        //文件更改后自动刷新页面
        livereload: true,
        //端口号
        port: 1234
    });
    // 在 命令工具中执行 gulp serve  就相当于是启动了服务
    //自动打开浏览器
    open('http://localhost:1234');
    //我们希望更改了文件，就自动编译，并且打包等然后打开浏览器
    gulp.watch('bower_components/**/*' , ['lib']);
    //监听 script 下边的 js 文件，并执行 script 方法
    gulp.watch(app.srcPath + 'script/**/*.js', ['script']);
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    // gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
    gulp.watch(app.srcPath + 'image/**/*', ['image']);
    //这样文件变更了就会自动构建
});


//默认执行的任务，直接 执行 gulp 变行了。都编写完成后再终端 执行 gulp 便可以了。
gulp.task('default', ['serve']);