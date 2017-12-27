
window.onload = function getTables() {
    $.ajax({
        type: "GET",
        url: "http://localhost/trivia/room/list/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.resCode === "200") {
                console.log(data);
                var obj = data.data;
                if (obj.length == 0) {
                    alert("目前暂无房间开放，请稍后尝试！");
                } else {
                    var s="<div><div class=\"desk\"><img class=\"pic\" src=\"../static/image/room.png\" alt=\"#\"/>\n" +
                        "        <img class=\"t1_\">\n" +
                        "        <img class=\"t2_\">\n" +
                        "        <img class=\"t3_\">\n" +
                        "        <img class=\"t4_\">\n" +
                        "        <span id=\"id\"></span>\n" +
                        "    </div></div>";
                    var sHtml;
                    $.each(obj, function(index, item) {
                        sHtml = $(s);
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
        url: "http://localhost/trivia/user/list/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.resCode === "200") {
                console.log(data);
                var obj = data.data;
                var s="<tr>";
                var sHtml;
                $.each(obj, function(index, item) {
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

