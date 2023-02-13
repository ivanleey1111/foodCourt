//接口文档：https://console-docs.apipost.cn/preview/a45688c3d526dadc/0f0e386a2f4fd5af?target_id=f409617e-69fc-48d8-a453-3ca85f7f0c0d

//1.dom元素加载完毕后，再执行:
//2.单独的局部作用域，避免全局污染
$(function(){
   

    function getData(page){
    var url = 'https://serverms.xin88.top/video?page=' + page
    $.get(url,data=>{
        console.log('在请求');
        console.log(data);
        $('.list').html(

            data.data.map(value=>{
                const {duration,pic,title,views} = value
                return `
                <li>
      <div>
        <img src="./assets/img/video/${pic}" alt="" />
        <div>
          <span>${views}次播放</span>
          <span>${duration}</span>
        </div>
      </div>
      <p>${title}</p>
    </li>
                
                
                
                `
            })
        )
        const{page,pageCount} = data
        let maxPage = page + 2

        let minPage = page - 2
        if(minPage < 1) {minPage = 1
          maxPage = minPage + 4
        }
        if(maxPage > 20){
            maxPage = 20
            minPage = maxPage - 4
        }

        //新增页数之前，先删除旧的
        
        $('.pager>ul').empty()//empty：清空子元素
        for(let i = minPage;i <= maxPage;i++){
            //如果生成的是当前页，则添加激活样式
            $('.pager>ul').append(`
            
            <li class="${i == page ? 'active':''}">${i}</li>
            
            `)
        }
        //请求完后，回到页面的顶部，让用户从头开始浏览
        $(window).scrollTop(0)//0代表滚动距离为0
        //切换上一页按钮的显示状态
        if(page == 1){
            $('.pager>button').eq(0).hide()
        }else{
            $('.pager>button').eq(0).show()
        }

        if(page == 20){
            $('.pager>button').eq(1).hide()
        }else{
            $('.pager>button').eq(1).show()
        }

    })
    console.log('方法执行');

}

getData(1)


//页数是请求后才添加的，属于异步操作实现
//利用委托方式，监听子元素li的点击
//因为这个绑定会先执行，但是此时还没有li,li要等ajax请求时才会执行，ajax请求在这一步之后，所以要用到委托
$('.pager').on('click','li',function() {
    //获取页数文字
    const pno = $(this).text()
    getData(pno)
})


console.log('5555');

//下一页按钮
$('.pager>button').eq(1).click(function() {
    console.log('66666');
    $('.pager>ul>li.active').next().click()
})



$('.pager>button').eq(0).click(function() {
    $('.pager>ul>li.active').prev().click()
})

})