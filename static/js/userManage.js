$(function(){
    loadUserTable();
});

function loadUserTable(){
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#table'
            ,height: 'full-200'
            ,page: true //开启分页
            ,url: 'http://localhost/trivia/user/'
            ,method: 'get'
            ,cols: [[ //表头
                {field: 'id', title: 'ID', width: 80, align: 'center', sort: 'true'},
                {field: 'account', title: '用户名', width: 150, align: 'center'},
                {field: 'nickName', title: '昵称', width: 100, align: 'center'},
                {field: 'headPic', title: '头像', width: 120, align: 'center', templet: '#picTpl'},
                {field: 'userType', title: '用户类型', width: 100, align: 'center'},
                {field: 'status', title: '状态', width: 100, align: 'center'},
                {field: 'balance', title: '财富', width: 100, align: 'center'},
                {field: 'lastLogin',title: '上次登陆时间',width: 180,align: 'center',templet: '#timeBeginTpl',sort: 'true'},
                {fixed: 'right',title:'操作', width: 165, align:'center', toolbar: '#barDemo'}
            ]]
            ,request: {
                pageName:"pno", //页码的参数名称，默认：page
                limitName: "PAGE_SIZE" //每页数据量的参数名，默认：limit
            }
            ,response: {
                statusName: 'resCode',
                statusCode: '200',
                msgName: 'resMsg',
                countName: 'count',
                dataName: 'data'
            },
            size: 'lg'
        });

        //监听工具条
        table.on('tool(table)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
            var data = obj.data, //获得当前行数据
                layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'detail'){
                layer.msg('查看操作');
            } else if(layEvent === 'del'){
                layer.confirm('确定删除该行吗？', function(index){
                    //向服务端发送删除指令
                    $.ajax({
                        url: "http://localhost/trivia/user/"+data.id+"/",
                        type: "DELETE",
                        dataType: "json",
                        success: function(data){
                            if (data.resCode === "200") {
                                obj.del(); //删除对应行（tr）的DOM结构
                                layer.close(index);
                                layer.msg('删除成功！');
                            }else{
                                layer.msg("删除失败！");
                            }
                        },
                    });
                });
            } else if(layEvent === 'edit'){
                layer.msg('编辑操作');
            }
        });

    });
}



