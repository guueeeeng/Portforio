
window.addEventListener("load", function(){
    
    // ▼ work tab_modal 
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
                                    <li ${obj.figma ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_figma.png" alt="">
                                    </li>
                                    <li ${obj.blender ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_blender.svg" alt="">
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
                            <div class="close-modal"><p>모달닫기</p></div>
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
                                    <li ${obj.figma ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_figma.png" alt="">
                                    </li>
                                    <li ${obj.blender ? "style='display:block'" :"style='display:none'"}>
                                        <img src="img/folder_blender.svg" alt="">
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
                            <div class="close-modal"><p>모달닫기</p></div>
                                <h1>카테고리 : ${obj.title}</h1>
                                <h2>작업기간 : ${obj.period}</h2> 
                                <h3>설명 : ${obj.comment}</h3>
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
                modal.classList.add("active")
                modalCont.innerHTML = item.querySelector(".work-view").outerHTML;
                setTimeout(function(){
                    modalCont.classList.add("active")
                },500)
                body.classList.add("scrollfix")
            })
        })
        modal.addEventListener("click", function(){
            modal.classList.remove("active")
            modalCont.classList.remove("active")
            body.classList.remove("scrollfix")
            modalCont.innerHTML = ``
        })

    }


})