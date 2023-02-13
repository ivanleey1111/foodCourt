$(function(){
    $('button#login').click(function() {
        let phone = $('#phone').val()
        let pwd = $('#password').val()
        var url = 'https://serverms.xin88.top/users/login'
        $.post(url,{
            phone,pwd
        },data=>{
            console.log(data);
            if(data.code == 200){
                let checked = $('#autologin').prop('checked')
                if(checked){
                    localStorage.setItem('user',JSON.stringify(data.data))
                   
                }else{
                    sessionStorage.setItem('user',JSON.stringify(data.data))
                }
                alert('恭喜！登陆成功，即将回到首页')
                location.replace('?p=home')
            }else{
                alert('登陆失败，请检查用户名和密码')
            }
        })
    })
})