$(function(){
    //||逻辑段路，从左向右读取第一个有值的
    let user = sessionStorage.getItem('user') || localStorage.getItem('user')
    if (user) {
        $('a#login').hide()
        user = JSON.parse(user)
        $('a#login+div>a').text(user.phone)
        if(user.avatar){
            $('a#login+div>img').prop('src',user.avatar)
        }
    } else {
        $('a#login+div').hide()
        
    }
    //点击搜索按钮后，读取输入框的值，修改url地址，跳转到搜索页面并传递搜索的内容
    $('.search>button').click(function() {
        const kw = $(this).prev().val()
        location.assign(`?p=search&kw=${kw}`)

    })
    //读取路由参数中的kw，设置为输入框的默认值
    const kw = new URLSearchParams(location.search).get("kw")
    $('.search>input').val(kw)
    //在输入框中按回车，也能触发搜索操作
    //keyup：按键抬起
    $('.search>input').keyup(function(e){
        if(e.keyCode == 13){
            $('.search>button').click()
        }
    })

    setInterval(() => {
        $('img.logo').toggleClass('animate__animated animate__rubberBand')
    }, 3000);
})