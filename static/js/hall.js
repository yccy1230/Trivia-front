
window.onload = function getTables() {
    var websocket;
    if('WebSocket' in window) {
        console.log("此浏览器支持websocket");
        websocket = new WebSocket("ws://115.159.35.11:8080/trivia/ws/hall/");
    } else if('MozWebSocket' in window) {
        alert("此浏览器只支持MozWebSocket");
    } else {
        alert("此浏览器只支持SockJS");
    }
    websocket.onopen = function(evnt) {
        $("#tou").html("链接服务器成功!")
    };
    websocket.onmessage = function(evnt) {
        $('#msg').html($("#msg").html() + "<br/>");
        const data = JSON.parse(evnt.data);
        switch(data.type){
            case 0:
                refreshPlayerList();
                break;
            case 1:
                getMessage(data);
                break;
        }
    };
    websocket.onerror = function(evnt) {};
    websocket.onclose = function(evnt) {
        $("#tou").html("与服务器断开了链接!")
    };
    $.ajax({
        type: "GET",
        url: "/trivia/room/list/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.resCode === "200") {
                console.log(data);
                var obj = data.data;
                if (obj.length == 0) {
                    alert("目前暂无房间开放，请稍后尝试！");
                } else {
                    var s="<div><div class=\"desk\"><img class=\"pic\" src=\"../static/image/room.png\"  alt=\"#\"/>\n" +
                        "        <img class=\"t1_\">\n" +
                        "        <img class=\"t2_\">\n" +
                        "        <img class=\"t3_\">\n" +
                        "        <img class=\"t4_\">\n" +
                        "        <span id=\"id\"></span>\n" +
                        "    </div></div>";
                    var sHtml;
                    $.each(obj, function(index, item) {
                        sHtml = $(s);
                        sHtml.find(".pic").attr("onclick","enterRoom("+item.id+")");
                        $.each(item.playerList, function(index, item) {
                            sHtml.find(".t"+ (index+1)+"_").attr("class","t"+(index+1)+"");
                            sHtml.find(".t"+ (index+1)+"").attr("src",item.headPic);
                        });
                        sHtml.find("#id").html("- " +item.roomName+" -");
                        $("#desks").append(sHtml.html());
                    });
                }
            }
            else {
                alert("出错啦！");
            }
        }
    });

    $.ajax({
        type: "GET",
        url: "/trivia/user/list/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.resCode === "200") {
                console.log(data);
                var obj = data.data;
                $.each(obj, function(index, item) {
                    var s="<tr>";
                    s+="<td>"+item.nickName+"</td>";
                    s+="<td>"+item.roomName+"</td>";
                    if(item.status === 0){
                        s+="<td>等待中</td>";
                    }else{
                        s+="<td>游戏中</td>";
                    }
                    s+="<td>"+item.balance+"</td></tr>";
                    $("#user-table").append(s);
                });
            }
            else {
                alert("出错啦！");
            }
        }
    });
};

function enterRoom(roomId){
    console.log(roomId);
    $.ajax({
        url: "/trivia/room/enter/",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data:{
            roomId: roomId
        },
        success: function(data){
            if (data.resCode === "200") {
                location.href='../game/bin/index.html';
            }else{
                alert("您开不了房！");
            }
        }
    });

}

function refreshPlayerList(){
    $("#desks").clear();
    $.ajax({
        type: "GET",
        url: "/trivia/room/list/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.resCode === "200") {
                console.log(data);
                var obj = data.data;
                if (obj.length == 0) {
                    alert("目前暂无房间开放，请稍后尝试！");
                } else {
                    var s="<div><div class=\"desk\"><img class=\"pic\" src=\"../static/image/room.png\"  alt=\"#\"/>\n" +
                        "        <img class=\"t1_\">\n" +
                        "        <img class=\"t2_\">\n" +
                        "        <img class=\"t3_\">\n" +
                        "        <img class=\"t4_\">\n" +
                        "        <span id=\"id\"></span>\n" +
                        "    </div></div>";
                    var sHtml;
                    $.each(obj, function(index, item) {
                        sHtml = $(s);
                        sHtml.find(".pic").attr("onclick","enterRoom("+item.id+")");
                        $.each(item.playerList, function(index, item) {
                            sHtml.find(".t"+ (index+1)+"_").attr("class","t"+(index+1)+"");
                            sHtml.find(".t"+ (index+1)+"").attr("src",item.headPic);
                        });
                        sHtml.find("#id").html("- " +item.roomName+" -");
                        $("#desks").append(sHtml.html());
                    });
                }
            }
            else {
                alert("出错啦！");
            }
        }
    });
}

function getMessage(data){
    var chat = "<div>"+data.user.nickName+" "+data.gmtCreated+"\n"+data.content+"</div>";
    $("#chatinf").append(chat);
}

function sendMessage(){

    var myDate = new Date();
//获取当前年
    var year=myDate.getFullYear();
//获取当前月
    var month=myDate.getMonth()+1;
//获取当前日
    var date=myDate.getDate();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();

    var now = year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
    var message = $("#inputText").val();
    $.ajax({
        url: "/trivia/message/hall/all/",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data:{
            "message":message,
        },
        success: function(data){
            if (data.resCode === "200") {
                var chat = "<div>我 "+ now + "\n" + message + "</div>";
                $("#chatinf").append(chat);
                $("#inputText").clear();
            }else{
                alert("您发不了消息！");
            }
        }
    });
}

function p(s) {
    return s < 10 ? '0' + s: s;
}