$(function () {
    $("#submit-btn").click(function () {
        if(checkForm('#login-form')){
            let params = formToJson('#login-form')
            $ajax({
                type: 'post',
                url: 'user/login',
                data: {
                    username: params.username,
                    password: params.password
                }
            }, false, '', function (res) {
                alert(res.msg)
                if (res.code > 0) {
                    window.location.href = "html/main.html";
                }
            })
        }
    })
})