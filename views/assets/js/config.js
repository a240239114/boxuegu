require.config({
    // baseUrl: './assets',
    paths: { //基础路径和小名

        //第三方依赖(模块)
        jquery: './assets/jquery/jquery.min',
        bootstrap: './assets/bootstrap/js/bootstrap.min',
        nprogress: './assets/nprogress/nprogress',
        echarts: './assets/echarts/echarts.min',
        cookie: './assets/jquery-cookie/jquery.cookie',
        template: './assets/artTemplate/template',
        jqueryform: './assets/jquery-form/jquery.form',//提交数据不用传值,插件已经封装好了
        datepicker: './assets/bootstrap-datepicker/js/bootstrap-datepicker',//日期插件
        zhCN:'./assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',//中文格式
        validate:'./assets/jquery-validate/jquery.validate',//验证表单 
        WebUploader:'./assets/webuploader/webuploader',//上传图片
        region:'./assets/jquery-region/jquery.region',//城市联级
        CKEDITOR:'./assets/ckeditor/ckeditor',//富文本插件
        pagination:'./assets/pagination/jquery.pagination',//分页插件


        //自定义依赖(模块)
        common: './assets/js/common',
        login: './assets/js/login',
        index: './assets/js/index',
        advert_list: './assets/js/advert_list',
        teacherlist: './assets/js/teacherlist',
        edit: './assets/js/edit',
        add: './assets/js/add',
        setting:'./assets/js/setting',
        method:'./assets/js/method',
        courseAdd:'./assets/js/courseAdd',
        courseAddstep1:'./assets/js/courseAddstep1',
        courseAddstep2:'./assets/js/courseAddstep2',
        courseAddstep3:'./assets/js/courseAddstep3',
        courseList:'./assets/js/courseList',
        coursecategory:'./assets/js/coursecategory',
        coursecategoryAdd:'./assets/js/coursecategoryAdd',
        coursetopic:'./assets/js/coursetopic',
        repass:'./assets/js/repass'
    },

    shim: { //设置依赖关系
        bootstrap: {
            deps: ['jquery']
        },
        zhCN:{
            deps:['datepicker']
        },
        validate:{
            deps:['jquery']
        },
        CKEDITOR:{
            exports:'CKEDITOR'
        },
        pagination:{
            deps:['jquery']
        }
    }

});


require(['common']);