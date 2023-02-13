
$(function() {
    console.log('first');
    var url = 'https://serverms.xin88.top/index'
    let dd;
    $.get(url,data=>  {
        dd = data
        console.log(111);
        console.log(data);
        const{hot_video,index_items,today_hot,today_meal} = data;;
        $('.top ul').html(
            
            hot_video.map(function(value) {
                console.log('top ul',this);
                const{mp4,pic,vname} = value
                return `
                
                
                <li><video src="./assets/video/${mp4}" preload="none" poster="./assets/img/${pic}"></video>
                
                <div>
          <i style="background-image: url(./assets/img/979.png)"></i>
          <strong>${vname}</strong>
        </div>
                
                
                </li>
                
                `
            })
        )
       
        console.log('这是哪里',this);
        $('.today-hot>ul').html(

            today_hot.map(value =>{

                const{name,emphasize} = value
                return `
                
                <li><a class="${emphasize ? 'active':''}" href="?p=search&kw=${name}">${name}</a></li>
                
                
                `
            })
        )
        function aa() {
            let str = ``
            for(let i = 0;i<10;i++){
                str += i
            }
            return str
        }

        
        $('.index-items').html(
            
            index_items.map(value=>{
                const{title,items} = value
                const x = items.map(value=>{
                    console.log('this',this);
                    const{desc,pic,title,author} = value
                    return `
                    <li>
                    
        <img src="./assets/img/food/${pic}" alt="" />
        <span>${author}</span>
        

        <strong>${title}</strong>
        <p class="line-1">${desc}</p>
      </li>
                    
                    
                    `
                }).join('')
                return `
                
                <h2>${title}</h2>
    <ul>
      ${x}
    </ul>
                
                
                `
            })
        )
        
        console.log('run');
        
        $('.meals>.above>ul').html(
            today_meal.map(value=>{
                return `
                <li>${value.cate_name}</li>
                
                
                `
            })
            
        )
       

        console.log('run2');

        for(let i = 0;i<today_meal.length;i++){
            
            let x = today_meal[i].contents;
            for(let j = 0;j<today_meal[i].contents.length;j++){
                console.log(j);
                $('.swiper-wrapper').append(
                    `
                    
                    <div class="swiper-slide">
          <div class="content">
            <img src="./assets/img/food/${today_meal[i].contents[j].pic}" alt="" />
            <strong>${today_meal[i].contents[j].title}</strong>
            <p>${today_meal[i].contents[j].desc}</p>
          </div>
        </div>
                    
                    
                    
                    `
                )
            }
        }
        console.log('run3');
        // $('.swiper-wrapper').append(
           
        //     today_meal.map(value=>{
        //         console.log('222');
                
        //         const{contents} = value
        //         const x = contents.map(value=>{
        //             const{title,desc,pic} = value
        //             return `
        //             <div class="swiper-slide">
        //   <div class="content">
        //     <img src="./assets/img/food/${pic}" alt="" />
        //     <strong>${title}</strong>
        //     <p>${desc}</p>
        //   </div>
        // </div>
                    
                    
                    
        //             `
        //         }).join('')
                
        //         return x
        //     })
        // )
        $('.meals>.above>ul>li').eq(0).click()
        console.log(333);
        
    })
    $(document).ajaxComplete(function(event,xhr){
        console.log('completeeeee',dd);
    })

    var mySwiper = new Swiper(".swiper", {
        slidesPerView: 3, //同时显示的数量
        slidesPerGroup: 3, //3个一组
        spaceBetween: 10,
        on: {
          slideChange: function () {
            $(".above>ul>li").removeClass("active");
            $(".above>ul>li")
              .eq(this.activeIndex / 3)
              .addClass("active");
            console.log("改变了，activeIndex为" + this.activeIndex);
          },
        },
      });

      $('.above>ul').on('click','li',function() {
        $("li").removeClass("active");
        $(this).addClass("active");
        const i = $(this).index();
        //滚动到指定序号的元素
        mySwiper.slideTo(3 * i);
      })
      console.log('second');
     

    $('.meals>.above>ul').on('click','li',function() {
        $('.meals>.above>ul>li').removeClass('active')
        $(this).addClass('active')
    })
    //异步增加
    $('.top').on('click','video',function() {
        if(this.paused){
            $('.top video').trigger('pause').css('filter','blur(2px)')
            //遮罩：属于播放器的兄弟元素
            $('.top li>div').show()
            $(this).siblings().hide()
            $(this).trigger('play').css('filter','blur(0)').parent().stop().animate({width:332})
            .siblings().stop().animate({width:212})
        }else{
            $(this).siblings().show()
            $(this).trigger('pause').css('filter','blur(2px)')
            $('.top li').stop().animate({width:242})
            
        }
    })
})