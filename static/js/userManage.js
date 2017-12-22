window.onload = function userTable() {
    var table;
    layui.use('table', function() {
        table = layui.table;
        table.render({
            //绑定容器
            id: 'table',
            elem: '#table'
            //设置表头
            ,
            cols: [
                [
                    { field: 'id', title: 'ID', width: 40, align: 'center', sort: 'true' }, { field: 'username', title: '用户名', width: 140, align: 'center' }, { field: 'email', title: '邮箱', width: 170, align: 'center' }, { field: 'phone', title: '手机号', width: 120, align: 'center' }, { field: 'title', title: '活动', width: 150, align: 'center' }, { field: 'status', title: '状态', width: 100, align: 'center', templet: '#statusTpl' }, { field: 'timeBegin', title: '开始时间', width: 160, align: 'center', templet: '#timeBeginTpl', sort: 'true' }, { field: 'timeEnd', title: '结束时间', width: 160, align: 'center', templet: "#timeEndTpl", sort: 'true' }, { field: 'introduction', title: '简介', align: 'center', width: 178, templet: "#introTpl" }, { field: 'gmtCreated', title: '申请时间', width: 160, align: 'center', templet: "#submitTimeTpl", sort: 'true' }, { field: 'operate', title: '操作', width: 150, fixed: 'right', align: 'center', toolbar: '#barDemo' }
                ]
            ],
            page: true,
            url: 'http://localhost/trivia/user/',
            where: { status: $("#statu").val() },
            method: 'get',
            request: {
                pageName: 'pno',
                limitName: 'PAGE_SIZE'
            },
            response: {
                statusName: 'resMsg',
                statusCode: '200',
                msgName: 'errorMsg',
                countName: 'total',
                dataName: 'obj'
            },
            done: function(res, curr, count) { //渲染完成回调
                initIframeHeight(600);
            },
            initSort: {
                field: 'gmtCreated',
                type: 'desc'
            },
            limits: [10, 20, 30],
            limit: 10,
            loading: true,
            height: '500',
            skin: 'line',
            even: true,
            size: 'lg'
        });
    });

},

layui.use('table', function(){
    var table = layui.table;
    //监听表格复选框选择
    table.on('checkbox(demo)', function(obj){
        console.log(obj)
    });
    //监听工具条
    table.on('tool(demo)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            layer.msg('ID：'+ data.id + ' 的查看操作');
        } else if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            layer.alert('编辑行：<br>'+ JSON.stringify(data))
        }
    });

    var $ = layui.$, active = {
        getCheckData: function(){ //获取选中数据
            var checkStatus = table.checkStatus('idTest')
                ,data = checkStatus.data;
            layer.alert(JSON.stringify(data));
        }
        ,getCheckLength: function(){ //获取选中数目
            var checkStatus = table.checkStatus('idTest')
                ,data = checkStatus.data;
            layer.msg('选中了：'+ data.length + ' 个');
        }
        ,isAll: function(){ //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            layer.msg(checkStatus.isAll ? '全选': '未全选')
        }
    };

    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});

layui.use('element', function(){
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

    //监听导航点击
    element.on('nav(demo)', function(elem){
        //console.log(elem)
        layer.msg(elem.text());
    });
});

layui.use('table', function(){
    var table = layui.table;
});