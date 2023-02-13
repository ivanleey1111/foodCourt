$(function() {
    let aaa = 1
    console.log(aaa);
    function getData(pno){
        const ser = $('.sort>.active').index()
    const kw = new URLSearchParams(location.search).get("kw")
    console.log(kw);
    var url = `https://serverms.xin88.top/mall/search?type=${ser}&kw=${kw}&page=${pno}`

    $.get(url,data=>{
        aaa++
        console.log(data);
        $('.list').html(
            data.data.map(value=>{
                const{name,pic,price,sale_count} = value
                return `
                
                <li>
      <img src="./assets/img/mall/${pic}" alt="" />
      <div>
        <h3>${name}</h3>
        <b>￥${price}</b>
        <span>销量${sale_count}</span>
      </div>
    </li>
                
                `
            })
        )
        const{page,pageCount} = data
        $('.pager>button').eq(0).prop('disabled',page == 1)
        $('.pager>button').eq(1).prop('disabled',page == pageCount)
        let pp = parseInt(page)
        $('.pager>ul').empty()

       
        let minPage = pp - 2
        let maxPage = pp + 2
        if(minPage < 1){
            minPage = 1
            maxPage = minPage + 4
        }
        if(maxPage > pageCount){
            maxPage = pageCount
            minPage = maxPage - 4
        }

        if(pageCount < 5){
            minPage = 1
            maxPage = pageCount
        }
        

        for(let i = minPage;i <= maxPage;i++){
            $('.pager>ul').append(`
            
            <li class="${i == page ? 'active':''}">${i}</li>
            
            `)
        }
        $(window).scrollTop(0)
        console.log(aaa);
        
    })

    }

    getData(1)
    $('.pager>ul').on('click','li',function() {
        let pno = $(this).text()
        // console.log(pno);
        
        getData(pno)
    })

  
    $('.sort>li').click(function() {
        console.log(this);
        console.log($(this));
        $(this).addClass('active').siblings().removeClass('active')
        getData(1)
    })

    
    $('.pager>button').eq(0).click(function() {
       
        console.log($('.pager>ul>li').eq(0).get());
        $('.pager>ul>li').each((index,elem)=>{
            
            
            if($(elem).hasClass('active')){
                let find =  $('.pager>ul>li').eq(index)
                
                let noo = find.text()
                console.log('find index:', noo);
               
                getData(noo - 1)
                
            }
            
        })
    })
    

})