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
        jqueryform: './assets/jquery-form/jquery.form',
        datepicker: './assets/bootstrap-datepicker/js/bootstrap-datepicker',
        zhCN:'./assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate:'./assets/jquery-validate/jquery.validate.min',


        //自定义依赖(模块)

        common: './assets/js/common',
        login: './assets/js/login',
        index: './assets/js/index',
        advert_list: './assets/js/advert_list',
        teacherlist: './assets/js/teacherlist',
        edit: './assets/js/edit',
        add: './assets/js/add'
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
        }
    }

});


require(['common']);