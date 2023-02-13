$(function() {
    console.log('outer',this);
    
    $('#phone').blur(function() {
        var phone = $(this).val()
        if(phone == '') return
        if(/^1[3-9]\d{9}$/.test(phone)){
             console.log(this);
            //利用接口询问服务器，看看注册与否
            var url = 'https://serverms.xin88.top/users/checkPhone'
            //post请求中，参数和接口地址要分开传递
            //参数1：请求地址
            //参数2：请求参数支持两种语法 --- 字符串  和   对象
            //--字符串  参数名=值&参数名=值
            //对象：{参数名：值，参数名：值}
            let dd = 2;
            let pupu = (data)=>{
                console.log(dd);
                
                console.log(url);
                if(data.code == 200){
                    // $(this).next().show()
                    
                    $(this).after(
                        `<p class="ok">手机号码对了</p>`
                    )
                    $(this).next().show()
                }
                if(data.code == 202){
                    $(this).addClass('err').nextAll().last().show()
                }
            }
            console.dir(pupu);
            $.post(url,{phone:phone},
                
                pupu
                
                
                
            //     data=>{
            //     console.log(this);
            //     dd = data
            //     console.log(dd);
            //     if(data.code == 200){
            //         // $(this).next().show()
                    
            //         $(this).after(
            //             `<p class="ok">手机号码对了</p>`
            //         )
            //         $(this).next().show()
            //     }
            //     if(data.code == 202){
            //         $(this).addClass('err').nextAll().last().show()
            //     }
            // }
            )
        }else{
            $(this).addClass('err').next().next().show()
           
        }
    }).focus(function() {
        $(this).removeClass('err').nextAll().hide()
    })

    $('#password').blur(function() {
        let pass = $(this).val()
        if(pass.length >= 6 && pass.length <= 12){
            $(this).next().next().show()
        }else{
            $(this).addClass('err').next().show()
        }
        $('#repassword').blur()
    }).focus(function() {
        $(this).removeClass('err').nextAll().hide()
        $('#repassword').removeClass('err').nextAll().hide()
    })

    $('#repassword').blur(function() {
        let pass = $('#password').val()
        let re = $(this).val()
        if(pass === re){
            $(this).next().next().show()
        }else{
            $(this).addClass('err').next().show()
        }
    }).focus(function() {
        $(this).removeClass('err').nextAll().hide()
    })
    $('.agree+button').click(function() {
        //读取是否勾选
        var checked = $('.agree input').prop('checked')
        if(!checked){
            $('.agree').addClass('animate__animated animate__bounce')
            $('.agree').on('animationend',function() {
                $(this).removeClass('animate__bounce')
                
            })
            return
        }
        const errs = $('input.err')
        if(errs.length > 0){
            errs.addClass('animate__animated animate__shakeX')
            
        }else{
            if($('p.ok:visible').length == 3){

            }else{
                alert('请正确填写所有信息!')
            }
        }
        $('input').on('animationend',function() {
            $(this).removeClass('animate__shakeX')
        })

        if(checked && errs.length == 0){
            let register_url = 'https://serverms.xin88.top/users/register'
            $.post(register_url,{
                phone:$('#phone').val(),
                pwd:$('#password').val()
            },data=>{
                if(data.code == 200){
                    console.log('wowowooo',this);
                    alert('恭喜，注册成功！即将跳转到登陆页面')
                    location.replace('?p=login')
                }else{
                    alert('注册失败'+ data.msg)
                }
                
            })
        }

        
    })
})