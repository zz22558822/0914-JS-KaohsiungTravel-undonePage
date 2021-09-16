var list = document.querySelector('.list')
var pagination = document.querySelector('.pagination')
var btnTop = document.querySelector('.top-btn')
var data = [];
var dataPage = [];
var str = 0;


var xhrURL = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
var xhr = new XMLHttpRequest();
xhr.open('GET', xhrURL,true);

xhr.send(null);

// 載入好資料後再執行
xhr.onload = function(){
    data = JSON.parse(xhr.responseText)
    data = data.result.records;
    init();
}


document.querySelector('.choose').addEventListener('change',updata,false);
document.querySelector('.popular-btns').addEventListener('click',updataBtn,false);

// TOP btn 顯示+效果
window.addEventListener('scroll', btnReveal);
btnTop.addEventListener('click', topscrollTo);




// 使用 change 執行選擇 無分頁行為
function updata(e) {
    var select = e.target.value;
    var addtext = '';
    document.querySelector('.list-title').textContent = select
    for (var i = 0; i < data.length; i++) {
        if (select == data[i].Zone) {
            addtext += '<li><div class="card-img" style="background: url('+ data[i].Picture1 +');background-size: cover;background-position-y: center;"><h3 class="card-title">' + data[i].Name + '<span>' + data[i].Zone + '</span></h3></div><div class="info"><p class="card-time"><img src="images/icons_clock.png" alt=""><span>' + data[i].Opentime + '</span></p><p class="card-address"><img src="images/icons_pin.png" alt=""><span>' + data[i].Add + '</span></p><p class="card-tel"><img src="images/icons_phone.png" alt=""><span>' + data[i].Tel + '</span></p><p class="card-tag"><img src="images/icons_tag.png" alt=""><span>' + data[i].Ticketinfo + '</span></p></div></li>';
        }
        list.innerHTML = addtext;
    }
}
// 熱門卡片 a 選擇區
function updataBtn(e) {
    if (e.target.nodeName !== 'A') {
        return;
    }

    var select = e.target.textContent;
    e.preventDefault();
    
    var addtext = '';
    document.querySelector('.list-title').textContent = select
    for (var i = 0; i < data.length; i++) {
        if (select == data[i].Zone) {
            addtext += '<li><div class="card-img" style="background: url('+ data[i].Picture1 +');background-size: cover;background-position-y: center;"><h3 class="card-title">' + data[i].Name + '<span>' + data[i].Zone + '</span></h3></div><div class="info"><p class="card-time"><img src="images/icons_clock.png" alt=""><span>' + data[i].Opentime + '</span></p><p class="card-address"><img src="images/icons_pin.png" alt=""><span>' + data[i].Add + '</span></p><p class="card-tel"><img src="images/icons_phone.png" alt=""><span>' + data[i].Tel + '</span></p><p class="card-tag"><img src="images/icons_tag.png" alt=""><span>' + data[i].Ticketinfo + '</span></p></div></li>';
        }
        list.innerHTML = addtext;
    }
}



//回到上放按鈕：控制顯示
function btnReveal(){
    if (window.scrollY <= 200) {
        btnTop.classList.remove('btn-none');
    } else {
        btnTop.classList.add('btn-none');
    } 
};
function topscrollTo(e) {
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};







// 在預設這邊嘗試使用分頁來渲染
function init(e) {
    var addtext = '';
    document.querySelector('.list-title').textContent = '全部區域'
    for (var i = 0; i < data.length; i++) {
        addtext += '<li><div class="card-img" style="background: url('+ data[i].Picture1 +');background-size: cover;background-position-y: center;"><h3 class="card-title">' + data[i].Name + '<span>' + data[i].Zone + '</span></h3></div><div class="info"><p class="card-time"><img src="images/icons_clock.png" alt=""><span>' + data[i].Opentime + '</span></p><p class="card-address"><img src="images/icons_pin.png" alt=""><span>' + data[i].Add + '</span></p><p class="card-tel"><img src="images/icons_phone.png" alt=""><span>' + data[i].Tel + '</span></p><p class="card-tag"><img src="images/icons_tag.png" alt=""><span>' + data[i].Ticketinfo + '</span></p></div></li>';
        list.innerHTML = addtext;
    }
}
























// 這邊往下 是測試 未完成 分頁功能

/* 
var pageTotle = 0;
var pageRemain = 0;
var nowPage = 1;


document.querySelector('.choose').addEventListener('change',updata,false);

function updata(e) {
    str = 0;
    dataPage = [];
    for (var i = 0; i < data.length; i++) {
        if (e.target.value == data[i].Zone) {
            str += 1;
            dataPage.push(data[i])
        }
    }
    // 一頁4個的頁數 無條件進位
    pageTotle = Math.ceil(str / 4)
    // 餘數
    pageRemain = str - (pageTotle-1)*4

    if (str <= 4) {

        var select = e.target.value;
        var addtext = '';
        var pagePrev = '<li><a class="prev no" href="#">&lt; prev</a></li>';
        var pageNext = '<li><a class="next no" href="#">next &gt;</a></li>';
        var page = 0;
        document.querySelector('.list-title').textContent = select
        for (var i = 0; i < str; i++) {
            if (select == dataPage[i].Zone) {
                addtext += '<li><div class="card-img" style="background: url('+ dataPage[i].Picture1 +');background-size: cover;background-position-y: center;"><h3 class="card-title">' + dataPage[i].Name + '<span>' + dataPage[i].Zone + '</span></h3></div><div class="info"><p class="card-time"><img src="images/icons_clock.png" alt=""><span>' + dataPage[i].Opentime + '</span></p><p class="card-address"><img src="images/icons_pin.png" alt=""><span>' + dataPage[i].Add + '</span></p><p class="card-tel"><img src="images/icons_phone.png" alt=""><span>' + dataPage[i].Tel + '</span></p><p class="card-tag"><img src="images/icons_tag.png" alt=""><span>' + dataPage[i].Ticketinfo + '</span></p></div></li>';
            }
            list.innerHTML = addtext;
        }
        addtext = pagePrev;
        for (var i = 0; i < pageTotle; i++) {
            addtext += '<li><a href="#" data-num="'+i+'">' + parseInt(page+1) + '</a></li>'
        }
        addtext += pageNext;
        pagination.innerHTML = addtext;
        document.querySelectorAll('.pagination li a')[nowPage].classList.add('now')
        nowPage = 1;

    }else if (str > 4){

        var select = e.target.value;
        var addtext = '';
        var pagePrev = '<li><a class="prev no" href="#">&lt; prev</a></li>';
        var pageNext = '<li><a class="next" href="#">next &gt;</a></li>';
        var page = 0;
        document.querySelector('.list-title').textContent = select
        for (var i = 0; i < 4; i++) {
            if (select == dataPage[i].Zone) {
                addtext += '<li><div class="card-img" style="background: url('+ dataPage[i].Picture1 +');background-size: cover;background-position-y: center;"><h3 class="card-title">' + dataPage[i].Name + '<span>' + dataPage[i].Zone + '</span></h3></div><div class="info"><p class="card-time"><img src="images/icons_clock.png" alt=""><span>' + dataPage[i].Opentime + '</span></p><p class="card-address"><img src="images/icons_pin.png" alt=""><span>' + dataPage[i].Add + '</span></p><p class="card-tel"><img src="images/icons_phone.png" alt=""><span>' + dataPage[i].Tel + '</span></p><p class="card-tag"><img src="images/icons_tag.png" alt=""><span>' + dataPage[i].Ticketinfo + '</span></p></div></li>';
            }
            list.innerHTML = addtext;
        }
        addtext = pagePrev;
        for (var i = 0; i < pageTotle; i++) {
            addtext += '<li><a href="#" data-num="'+i+'">' + parseInt(page+=1) + '</a></li>'
        }
        addtext += pageNext;
        pagination.innerHTML = addtext;
        document.querySelectorAll('.pagination li a')[nowPage].classList.add('now')
        nowPage = 1;

    }
    
} */

// 這邊往上 是測試 未完成 分頁功能





















/* 
// 這邊往下是分頁切換
// 點擊分頁
pagination.addEventListener('click',pageGo);

// 分頁
function pageGo(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        return
    }

    // 單點頁面判斷
    if (e.target.textContent !== '< prev' && e.target.textContent !== 'next >') {
        document.querySelectorAll('.pagination li a')[nowPage].classList.remove('now')
        nowPage = e.target.textContent
        document.querySelectorAll('.pagination li a')[nowPage].classList.add('now')
        openClose();
    }

    // 下一頁的判斷
    if (e.target.textContent == 'next >') {
        document.querySelectorAll('.pagination li a')[nowPage].classList.remove('now')
        nowPage+=1
        document.querySelectorAll('.pagination li a')[nowPage].classList.add('now')
        document.querySelector('.prev').classList.remove('no')
        openClose();
    }


    // 上一頁的判斷
    if (e.target.textContent == '< prev') {
        document.querySelectorAll('.pagination li a')[nowPage].classList.remove('now')
        nowPage-=1
        document.querySelectorAll('.pagination li a')[nowPage].classList.add('now')
        document.querySelector('.next').classList.remove('no')
        openClose();
    }


    // 頁數開關上下頁
    function openClose(e) {
        // 當前頁數 為第1頁
        if (nowPage == 1) {
            document.querySelector('.prev').classList.add('no')
        }else if (nowPage !== 1) { // 不再第1頁
            document.querySelector('.prev').classList.remove('no')
        }
        // 當前最後一頁
        if (pageTotle == nowPage) {
            document.querySelector('.next').classList.add('no')
        }else if (pageTotle !== nowPage) { // 不再最後一頁
            document.querySelector('.next').classList.remove('no')
        }
        // 總頁數等於當前頁數 並且只有1頁
        if (pageTotle == nowPage && nowPage == 1) {
            document.querySelector('.next').classList.add('no')
            document.querySelector('.prev').classList.add('no')
        }else if (pageTotle == nowPage && nowPage !== 1) { //總頁數等於當前頁數 並且不只1頁
            document.querySelector('.prev').classList.remove('no')
            document.querySelector('.next').classList.add('no')
        }
    }



}
 */