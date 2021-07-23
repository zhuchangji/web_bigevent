$(function () {
    // 切换登陆和注册
    $("#log").on("click", function () {
        $(".log-page").show();
        $(".reg-page").hide();
    });
    $("#reg").on("click", function () {
        $(".reg-page").show();
        $(".log-page").hide();
    });
    // 密码可否查看切换
    $("#eyeopen").on("click", function () {
        $(this).hide();
        $("#eyeclose").show();
        $("#password-text").attr("type", "password");
    })
    $("#eyeclose").on("click", function () {
        $(this).hide();
        $("#eyeopen").show();
        $("#password-text").attr("type", "text");
    });
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        , repwd: function (value, item) {//value是表单的值 item是表单dom
            let va = $(".reg-page [name=password]").val();
            if (value != va) {
                return "两次密码不相同";
            }
        }

    });
    //    表单注册监听事件
    var layer = layui.layer;
    $('#formcont-reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var bata = {
            username: $(".reglog").val(),
            password: $(".regmi").val()
        }
        /* $.post('http://www.liulongbin.top:3007/api/reguser', bata, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
              }
              layer.msg('注册成功，请登录！')
              // 模拟人的点击行为
              $('#link_login').click()
            }) */
        
        $.ajax({
            method: "post",
            data: bata,
            url: 'http://www.liulongbin.top:3007/api/reguser',
            // async: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功，请去登陆");
                // 手动调用去登陆
                document.querySelector("#log").click();
                

            }
        })
    })
      // 表单登陆监听事件
      $("#formcont-log").on("submit", function (e) {
        e.preventDefault();
        var dalog = {
            username: $("#formcont-log [name=username]").val(),
            password: $("#formcont-log [name=password]").val()
        };
        $.post("http://www.liulongbin.top:3007/api/login", dalog, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("登陆成功！")
            // 获取权限参数token
            localStorage.setItem("token",res.token)
            location.href = "index.html"
            
               
            
            
        })
      })
    })
