
window.addEventListener("load", function(){
    let modal = document.querySelector(".modal")
    let modalCont = document.querySelector(".modal-cont")
    let body = document.querySelector("body")
    let workData;
    const workXttp = new XMLHttpRequest();
    workXttp.open("GET", "workdata.json");
    workXttp.send();
    workXttp.onreadystatechange = function(event){
        const req = event.target;
        if(req.readyState === XMLHttpRequest.DONE){
            workData = JSON.parse(req.response);
            parseWork(workData);
        }
    };

    function parseWork(_data){
        let workCate = document.querySelector(".work .tab-list");
        workData = _data;
        let tabHtml = ``;
        let dataArr = _data.work;
        for(let i = 0; i < dataArr.length; i++){
            let html = `<li><a href="#">${dataArr[i].catename}</a></li>`;
            tabHtml += html;
        }
        workCate.innerHTML = tabHtml;

        let tabs = document.querySelectorAll(".work .tab-list li");
        for(let i = 0; i < dataArr.length; i++){
            tabs[0].classList.add("active");
            console.log(tabs[i]);
            tabs[i].addEventListener("click",function(event){
                event.preventDefault();
                workSlide(i)
                for(let j = 0; j<tabs.length; j++){
                    tabs[j].classList.remove("active");
                }
                this.classList.add("active")
                
            })
            
        }
        workSlide(0)
        
    }
    let workSwiper;
    function workSlide(_idx){
        let swworkHtml = ``;
        let listData = workData.work[_idx].list;
        for(let i = 0; i < listData.length; i++){
            let obj = listData[i];
            let html = `
                <li class="swiper-slide">
                    <div class="imgbox">
                        <img src="https://img.youtube.com/vi/${obj.videoid}/maxresdefault.jpg" alt="" ${obj.videoid ? "style='display:block'" : "style='display:none'"}>
                        <img src="../img/${obj.imgurl}" alt="" ${obj.imgurl ? "style='display:block'" : "style='display:none'"}>
                    </div>
                    <div class="txtbox">
                        <p class="title">${obj.title}</p>
                        <p class="writer" 
                            ${obj.period ? "style='display:block'" : "style='display:none'"}>
                            ${obj.period}
                        </p>
                    </div>
                </li>
            `;
            swworkHtml += html;
        }
        let swworkWrapper = document.querySelector(".sw-work .swiper-wrapper");
        swworkWrapper.innerHTML = swworkHtml;
        
        if(workSwiper){
            workSwiper.destroy();
        }
        workSwiper = new Swiper(".sw-work", {
            slidesPerView: 1,
            spaceBetween: 15,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                },
            },
            navigation: {
                nextEl: ".work .sw-next",
                prevEl: ".work .sw-prev",
            },
        })

        // 썸네일 클릭 > 모달 오픈
        
        let workItem = document.querySelectorAll(".sw-work li")
        workItem.forEach(function(item, index){
            item.addEventListener("click", function(){
                let obj = workData.work[_idx].list[index];
                modal.classList.add("active")
                modalCont.innerHTML = `
                    <div class="view-img" ${obj.imgurl ? "style='display:block'" : "style='display:none'"}>
                        <img src="../img/${obj.imgurl}" alt="">
                    </div>
                    <div class="view-player" ${obj.videoid ? "style='display:block'" : "style='display:none'"}>
                        <iframe src="https://www.youtube.com/embed/${obj.videoid}" allowfullscreen></iframe>
                    </div>
                `
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