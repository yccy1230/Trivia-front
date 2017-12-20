
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
                    var s= "<div><img src=\"../static/image/room.png\" alt=\"#\"/>\n" +
                        "        <img class=\"t1\">\n" +
                        "        <img class=\"t2\">\n" +
                        "        <img class=\"t3\">\n" +
                        "        <img class=\"t4\">\n" +
                        "        <p id=\"id\"></p>\n" +
                        "    </div>";
                    var template = $(s);
                    var sHtml;
                    $.each(obj, function(index, item) {
                        sHtml =template;
                        $.each(item.playerList, function(index, item) {
                            sHtml.find(".t"+ (index+1)+"").attr("src",item.headPic);
                        });
                        sHtml.find("#id").attr("value",item.roomName);
                        $("#desks").append(sHtml);
                    });
                }
            }
            else {
                alert("出错啦！");
            }
        }
    })
};

