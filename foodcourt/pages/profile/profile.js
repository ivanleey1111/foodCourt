$(function() {
    $('#body>div li').click(function() {
        $(this).addClass('active').siblings().removeClass('active')

        const i = $(this).index()
        $('#body>ul>li').eq(i).show().siblings().hide()
    })
    $('#body>div li').eq(0).click()
    $('#body>ul>li:last-child button').click(function() {
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        location.replace('?p=home')
    })

    let user = sessionStorage.getItem('user') || localStorage.getItem('user')
    user = JSON.parse(user)
    $('.profile tr:eq(0)>td').eq(1).text(user.nickname || 'xxx')
    $('.profile tr:eq(1)>td').eq(1).text(user.phone)
    $('.profile tr:eq(2)>td').eq(1).text(moment(user.created).format('YYYY/MM/DD HH:mm:ss'))

    let url = 'https://serverms.xin88.top/users/head_photos'
    $.get(url,data=>{
        console.log(data);
        $('.my-photo>div>ul').html(
            data.hero.map((value)=>{
                const{alias,selectAudio} = value
                return `
                
                <li data-sa="${selectAudio}">
          <img src="https://game.gtimg.cn/images/lol/act/img/champion/${alias}.png" alt="" />
        </li>
                
                
                
                `
            })
        )
    })

    const audio = new Audio()//音频元素audio，实例化出音频播放器
    $('.my-photo').on('click','li',function() {
        let src = $(this).children().prop('src')
        console.log(src);
        $('.my-photo>div>img').prop('src',src)
        let sa = $(this).data('sa')
        audio.src = sa
        audio.play()
    })

    //更新头像
    $('.my-photo>div>button#confirm').click(function() {
        let url = 'https://serverms.xin88.top/users/head_photo'
        let src = $('.my-photo>div>img').prop('src')
        $.post(url,{
            id:user.id,
            alias:src
        },data=>{
            console.log(data);
            if(data.code == 200){
                alert('更新成功')
                $('#header>div>div:last-child>img').prop('src',src)
                user.avatar = src
                if(sessionStorage.getItem('user')){
                    sessionStorage.setItem('user',JSON.stringify(user))
                }
                if(localStorage.getItem('user')){
                    localStorage.setItem('user',JSON.stringify(user))
                }
            }else{
                alert('更新失败')
            }
        })
    })

})