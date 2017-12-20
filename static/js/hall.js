
window.onload = function getTables() {
    alert("")
    $.ajax({
        type: "POST",
        /*url: "http://192.168.1.111:8080/trivia/session/login/",*/
        url: "http://localhost/trivia/session/login/",

        data: JSON.stringify({
            account : $("#username").val(),
            password : $("#userpwd").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        success: function (data) {
            console.log(data);
            if (data.resCode === "200") {
                console.log("succ");
                location.href="../static/lib/lufylegend.js-lufylegend-1.10.1/examples/demo/rpg/1.html";
            }
            else {
                alert("请确认您输入的用户名或密码输入是否正确！");
                $("#userpwd").val("");
                $("#userpwd").focus();
            }
        }

    })
}

