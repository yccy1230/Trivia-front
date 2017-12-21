
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
                    var s= "<div><img class=\"desk\" src=\"../static/image/room.png\" alt=\"#\"/>\n" +
                        "        <img class=\"t1\">\n" +
                        "        <img class=\"t2\">\n" +
                        "        <img class=\"t3\">\n" +
                        "        <img class=\"t4\">\n" +
                        "        <span id=\"id\"></span>\n" +
                        "    </div>";
                    var sHtml;
                    $.each(obj, function(index, item) {
                        sHtml = $(s);
                        $.each(item.playerList, function(index, item) {
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
    })
};

