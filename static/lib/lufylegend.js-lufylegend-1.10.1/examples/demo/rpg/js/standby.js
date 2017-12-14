
$(function(){
    $("#stand").click(function(){
        standby();
    });
});


function standby() {
    $.ajax({
            type: "GET",

            url: "http://localhost/trivia/game/ready/1",

            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data);
                if (data=== "200") {
                    location.href = "index.aspx";
                    return true;
                }
                else {
                    alert("用户名已存在！");
                    /* $("#username").val("");
                     $("#userpwd").val("");
                     $("#userpwd").focus();*/
                    return false;
                }
            }
        }
    )
}

