$(function(){
    let pno = 1
    let lock = false
    let hasMore = true
    function getData(page){
        console.log(111);
        if(lock) return
        if(!hasMore) return
        lock = true
    let url = 'https://serverms.xin88.top/mall?page=' + page
    $.get(url,data=>{
        console.log(data);
        $('.list').append(
            data.data.map(value=>{
                const{name,pic,price,sale_count} = value
                return `
                
                
                <li>
                <img
                  src="./assets/img/mall/${pic}"
                  alt=""
                />
                <p>${name}</p>
                <div>
                  <b>￥${price}</b>
                  <span>月售${sale_count}</span>
                </div>
              </li>
                `
            })
        )
        const{page,pageCount} = data
        if(page == pageCount){
            $('.loadmore').text('没有更多商品')
            hasMore = false
        }
        console.log(222);
        pno = page //更新当前页
        lock = false
        
    })
   
    
    }

    getData(1)
     //触底加载更多的思想：监听页面的滚动距离，当要到底的时候就触发下一页的请求
    //然后把请求道的数据累加到之前的已有数据上
    $(window).scroll(function(){
        var st = $(window).scrollTop()//滚动距离
        var win_h = $(window).height()//窗口高
        var content_h = $(document).height()//内容高
        //滚动距离 》 内容高 - 窗口高 就相当于触底
        if(st + 150 > content_h - win_h){
            getData(pno + 1)
        }
    })
   
    // $('.pager>ul>li').click(function() {
    //     console.log($(this).text());
    //     const pno = $(this).text()
    //     getData(pno)
    // })
   
})