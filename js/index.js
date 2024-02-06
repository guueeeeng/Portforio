window.onload = function(){
    AOS.init();

    //스크롤 내리면 header에 active 추가
    let header = document.querySelector(".header")
    window.addEventListener("scroll",function(){
        if(window.scrollY >= 100){
            header.classList.add("active")
        }else{
            header.classList.remove("active")
        }
    //스크롤 내리면 menu span에 active 추가
        let scrollPosition = window.scrollY;
        let sectionItem = document.querySelectorAll("section");
        sectionItem.forEach(function(item){
            let sectionTop = item.offsetTop - 300;
            let sectionHeight = item.clientHeight;

            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight){
                let sectionId = item.id
                document.querySelector(".header-menu li.active").classList.remove("active")
                document.querySelector(".header-menu li a[href = '#"+ sectionId +"']").parentNode.classList.add("active")
            }
        })

    //상단으로 이동하는 버튼
        let goTop = document.querySelector(".go-top");
        if(scrollPosition >= 100){
            goTop.classList.add("active") //class를 추가

        }else{
            goTop.classList.remove("active")
        }
    })
    document.querySelector(".go-top").addEventListener("click", function(){
        window.scrollTo(0,0)
    })


    // 모바일 메뉴 버튼
    let moMenuBtn = document.querySelector(".mo-menu-btn")
    let sideMenu = document.querySelector(".side-menu")
    moMenuBtn.addEventListener("click",function(){
        sideMenu.classList.toggle("active")
        this.classList.toggle("active")
    })
    window.addEventListener("resize",function(){
        let winWidth = window.innerWidth
        if(winWidth > 768){
            sideMenu.classList.remove("active")
            moMenuBtn.classList.remove("active")
        }
    })
    // 클릭 시 해당 섹션으로 이동 후 모바일메뉴 닫힘
    let sideMenuItem = document.querySelectorAll(".side-menu ul li")
    sideMenuItem.forEach(function(item){
        item.addEventListener("click",function(){
            sideMenu.classList.remove("active")
            moMenuBtn.classList.remove("active")
        })
    })


    // 텍스트가 한 글자씩 나타나는 스크립트
    // let HomeTyped = new Typed(".home-text", {
    //     strings:["안녕하세요","멀티미디어 디자이너 <br> 이영미입니다"],
    //     typeSpeed:100,
    //     cursorChar:"",
    //     loop:true,
    //     fadeOut: true
    // })



    // 스킬 프로그레스
    function progressBar(selector, gauge, color){
        var bar = new ProgressBar.Circle(selector, {
            strokeWidth: 10,  //채워지는 선의 굵기
            easing: 'easeInOut',
            duration: 1400,
            color: color,
            trailColor: '#CFCFCF', // 배경 선 색상
            trailWidth: 8, //배경 선의 긁기
            // step : function(state, circle){
            //     circle.setText(Math.round(circle.value() *100)+"%")
            // }
        });
        bar.animate(gauge);
        return bar; // Return the progress bar instance
    }
    let observe = new IntersectionObserver(function(entries){
        entries.forEach(function(item){
            if(item.isIntersecting){
                proPs.animate(1)
                proAi.animate(0.95)
                proAe.animate(0.9)
                proPr.animate(0.75)
                proFigma.animate(0.8)
                proBlender.animate(0.6)
                proPpt.animate(0.9)
                proHtml.animate(0.5)
            }else{
                proPs.animate(0)
                proAi.animate(0)
                proAe.animate(0)
                proPr.animate(0)
                proFigma.animate(0)
                proBlender.animate(0)
                proPpt.animate(0)
                proHtml.animate(0)
            }
        })
    })
    let skillSection = document.querySelector(".skill")

    // Start the progress bars with initial values
    let proPs = progressBar(".ps", 0, "#1080E8");
    let proAi = progressBar(".ai", 0, "#FF9A00");
    let proAe = progressBar(".ae", 0, "#4B4BE1");
    let proPr = progressBar(".pr", 0, "#5151CF");
    let proFigma = progressBar(".figma", 0, "#FF835C");
    let proBlender = progressBar(".blender", 0, "#FF7021");
    let proPpt = progressBar(".ppt", 0, "#d14424");
    let proHtml = progressBar(".html", 0, "#52B2FF");
    observe.observe(skillSection)



    // 이메일 버튼 양식 펼치기 & 접기
    document.querySelector(".mail-btn").addEventListener("click",function(){
        document.querySelector(".form-view").classList.toggle("show")
        
    })
    document.querySelector(".btn-x").addEventListener("click",function(){
        document.querySelector(".form-view").classList.toggle("show")
        
    })
    
// 썸네일 Work 부분

    // ▼ work tab_modal 
    
    let mask = document.querySelector(".mask")

    let modal = document.querySelector(".modal")
    let modalCont = document.querySelector(".modal-cont")
    let body = document.querySelector("body")

    let workData; // json 파일 불러오는 코드
    const eventXhttp = new XMLHttpRequest();
    eventXhttp.open("GET", "js/workdata.json");
    eventXhttp.send();
    eventXhttp.onreadystatechange = function(event){
        const req = event.target;
        if(req.readyState === XMLHttpRequest.DONE){
            workData = JSON.parse(req.response);
            workSection(workData)
        }
    }
    function workSection(_data){
        let tabList = document.querySelector(".tab-list")
        workData = _data;
        let tabHtml = ``;
        let dataArr = _data.work;
        for(let i = 0; i < dataArr.length; i++){
            let html = `<li>${dataArr[i].catename}</li>`
            tabHtml += html
        }
        tabList.innerHTML = tabHtml

        let tabItem = document.querySelectorAll(".tab-list li")
        for(let i = 0; i< dataArr.length; i++){
            tabItem[0].classList.add("active")
            tabItem[i].addEventListener("click", function(){
                for(let j = 0; j < tabItem.length; j++){
                    tabItem[j].classList.remove("active")
                }
                tabItem[i].classList.add("active")
                workSlide(i)
                workSwiper.slideTo(0);
            })
        }
        workSlide(0)
    }
    let workSwiper;
    function workSlide(_idx){
        let swWorkHtml = ``
        if(_idx === 0){
            for(let i = 1; i < workData.work.length; i++){
                let listData = workData.work[i].list;
                for(let j = 0; j<listData.length; j++){
                    let obj = listData[j];
                    let html = `
                    <li class="swiper-slide">
                        <div class="imgbox">
                            <img ${obj.videoid ? "style='display:block'" :"style='display:none'"} src="https://img.youtube.com/vi/${obj.videoid}/mqdefault.jpg" alt="">
                            <img ${obj.imgurl ? "style='display:block'" :"style='display:none'"} src="${obj.imgurl}" alt="">
                        </div>
                        <div class="textbox">
                            <h1>${obj.title}</h1>
                            <p>작업기간 : ${obj.period}</p>
                            <div class="skill">
                                <h3>사용툴</h3>
                                <ul>
                                    <li ${obj.photoshop ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_photoshop.svg" alt="">
                                    </li>
                                    <li ${obj.illust ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_illust.svg" alt="">
                                    </li>
                                    <li ${obj.afterEffect ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_after_effects.svg" alt="">
                                    </li>
                                    <li ${obj.premiere ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_premiere.svg" alt="">
                                    </li>
                                    <li ${obj.html ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_html.svg" alt="">
                                    </li>
                                    <li ${obj.css ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_css.svg" alt="">
                                    </li>
                                    <li ${obj.js ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_js.svg" alt="">
                                    </li>
                                    <li ${obj.git ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_git.svg" alt="">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="work-view">
                            <div class="view-img" ${obj.imgurl ? "style='display:block'" :"style='display:none'"}>
                                <img src="${obj.imgurl}" alt="">
                            </div>
                            <div class="view-player" ${obj.videoid ? "style='display:block'" :"style='display:none'"}>
                                <iframe src="https://www.youtube.com/embed/${obj.videoid}?autoplay=1&mute=1" allowfullscreen></iframe>
                            </div>
                            <div class="info">
                                <h1>카테고리 : ${obj.title}</h1>
                                <h2>작업기간 : ${obj.period}</h2> 
                                <h3>코멘트 : ${obj.comment}</h3>
                            </div>
                        </div>
                    </li> 
                    `;
                    swWorkHtml += html
                }
                let swWorkWrapper = document.querySelector(".sw-work ul")
                swWorkWrapper.innerHTML = swWorkHtml
            }
        }else{
            let listData = workData.work[_idx].list;
            for(let i = 0; i< listData.length; i++){
                let obj = listData[i];
                let html = `
                    <li class="swiper-slide">
                        <div class="imgbox">
                            <img ${obj.videoid ? "style='display:block'" :"style='display:none'"} src="https://img.youtube.com/vi/${obj.videoid}/mqdefault.jpg" alt="">
                            <img ${obj.imgurl ? "style='display:block'" :"style='display:none'"} src="${obj.imgurl}" alt="">
                        </div>
                        <div class="textbox">
                            <h1>${obj.title}</h1>
                            <p>작업기간 : ${obj.period}</p>
                            <div class="skill">
                                <h3>사용툴</h3>
                                <ul>
                                    <li ${obj.photoshop ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_photoshop.svg" alt="">
                                    </li>
                                    <li ${obj.illust ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_illust.svg" alt="">
                                    </li>
                                    <li ${obj.afterEffect ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_after_effects.svg" alt="">
                                    </li>
                                    <li ${obj.premiere ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_premiere.svg" alt="">
                                    </li>
                                    <li ${obj.html ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_html.svg" alt="">
                                    </li>
                                    <li ${obj.css ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_css.svg" alt="">
                                    </li>
                                    <li ${obj.js ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_js.svg" alt="">
                                    </li>
                                    <li ${obj.git ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_git.svg" alt="">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="work-view">
                            <div class="view-img" ${obj.imgurl ? "style='display:block'" :"style='display:none'"}>
                                <img src="${obj.imgurl}" alt="">
                            </div>
                            <div class="view-player" ${obj.videoid ? "style='display:block'" :"style='display:none'"}>
                                <iframe src="https://www.youtube.com/embed/${obj.videoid}?autoplay=1&mute=1" allowfullscreen></iframe>
                            </div>
                            <div class="info">
                                <h1>카테고리 : ${obj.title}</h1>
                                <h2>작업기간 : ${obj.period}</h2> 
                                <h3>코멘트 : ${obj.comment}</h3>
                            </div>
                        </div>
                    </li> 
                `;
                swWorkHtml += html
            }
            let swWorkWrapper = document.querySelector(".sw-work ul")
            swWorkWrapper.innerHTML = swWorkHtml
        }
        if(workSwiper){
            workSwiper.destroy();
        }
        workSwiper = new Swiper(".sw-work",{
            navigation : {
                nextEl : '.work-next',
                prevEl : '.work-prev',
            },
            slidesPerView: 1,
            loop:true,
            spaceBetween: 15,
            loopedSlides: 5,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                },
            },
        })
        // 썸네일 클릭 > 모달 오픈
        let workItem = document.querySelectorAll(".sw-work li")
        
        workItem.forEach(function(item){
            item.addEventListener("click", function(){
                mask.classList.add("active")                
                modalCont.innerHTML = item.querySelector(".work-view").outerHTML;
                setTimeout(function(){
                    modalCont.classList.add("active")
                },500)
                body.classList.add("scrollfix")
            })
        })
        mask.addEventListener("click",function(){
            mask.classList.remove("active")
            modalCont.classList.remove("active")
            body.classList.remove("scrollfix")
            modalCont.innerHTML = ``
        })

    }


        
// 이미지만 띄우는 모달 (경력전체보기 버튼 클릭 시)

let cMask = document.querySelector(".c-mask")
let cModalCont = document.querySelector(".career-modal")
// let cModal = document.querySelector(".career-modal")
let workItem = document.querySelector(".c-all-btn")
workItem.addEventListener("click", function(){
    cMask.classList.add("active")
    // cModal.classList.add("active")
    setTimeout(function(){
        cModalCont.classList.add("active")
    },10)
    cModalCont.classList.add("active")
    body.classList.add("scrollfix")            
})
    cMask.addEventListener("click",function(){
        cMask.classList.remove("active")
        // cModal.addEventListener("click",function(){
        // cModal.classList.remove("active")
        cModalCont.classList.remove("active")
        body.classList.remove("scrollfix")        
})

}



