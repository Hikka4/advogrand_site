// функции handleShadowVisibility & toggleShadow отвечают за
// появление тени в reviewsMenu, для прокручивания
function handleShadowVisibility(fatherElem, elShadowStart, elShadowEnd) {
    const maxScrollStartReached = fatherElem.scrollLeft <= 0;
    const maxScrollEndReached = fatherElem.scrollLeft >= fatherElem.scrollWidth - fatherElem.offsetWidth;
    toggleShadow(elShadowStart, maxScrollStartReached);
    toggleShadow(elShadowEnd, maxScrollEndReached);
}
function toggleShadow(el, maxScrollReached) {
    const shadowIsVisible = el.classList.contains('is-visible');
    const showShadow = !maxScrollReached && !shadowIsVisible;
    const hideShadow = maxScrollReached && shadowIsVisible;
    // requestAnimationFrame для оптимального исполнения прокрутки
    if(showShadow) {
        window.requestAnimationFrame(() => el.classList.add('is-visible'));        
    } else if(hideShadow) {
        window.requestAnimationFrame(() => el.classList.remove('is-visible'));
    }
}

// функция отвечает за переключение пунктов в reviewsMenu
function reviewsContentViev(el) {
    if(!el.target.classList.contains('active')) {
        for(let i = 0; i < reviewsMenuLink.length; i++) {
            if(reviewsMenuLink[i].classList.contains("active")) {
                switch(reviewsMenuLink[i].innerHTML) {
                    case "Здравоохранение":
                        allReviewsContentBlock[0].classList.add('hidden-content');
                    case "Бизнес":
                        allReviewsContentBlock[1].classList.add('hidden-content');
                    case "Семья":
                        allReviewsContentBlock[2].classList.add('hidden-content');
                    case "ЖКХ":
                        allReviewsContentBlock[3].classList.add('hidden-content');
                    case "Недвижимость":
                        allReviewsContentBlock[4].classList.add('hidden-content');
                    case "Все":
                        allReviewsContentBlock[5].classList.add('hidden-content');
                    default:
                        break;
                }
                reviewsMenuLink[i].classList.remove("active");
            }
            if(el.target == reviewsMenuLink[i]) {
                // возвращает исходное состояниее contentItem в активном блоке
                returnState();
                // запоминаем инекс блока на который переключились
                reviewsContentBlockIndex = i;
                // присваиваем в contentItem всех детей нужного блока
                contentItem = allReviewsContentBlock[reviewsContentBlockIndex].children;
                // функция для работы с экранами на которых будут стрелки навигации
                // находим какие элементы скрыть, какие показать
                findVisibleItem(contentItem, "content");
                // проверяем нужно ли показывать стрелки после переключения блока
                showVisibleArrow(visibleItem.firstHidden, visibleItem.firstVisible, contentItem, contentArrowRight, contentArrowLeft);
            }
        }
        // вешаем на нужный пункт reviewsMenu класс active
        el.target.classList.add('active');
        // перемещаем скролл на данную позицию в меню
        // reviewsMenu.scrollLeft = el.target.offsetLeft
        // убираем класс hidden-content с блока, который должен появиться
        allReviewsContentBlock[reviewsContentBlockIndex].classList.remove("hidden-content");
        // обновляем состояния скролла после отображения элементов
        handleShadowVisibility(allReviewsContentBlock[reviewsContentBlockIndex], contentShadowStart, contentShadowEnd);
    }
}
// Функция возвращает исходное состояние предыдущего блока слайдера
// перед переключением на следующий
function returnState() {
    // console.log(contentItem.length);
    for(let i = 0; i < contentItem.length; i++) {
        if(window.outerWidth <= 1170 && window.outerWidth > 767) {
            for(let i = 0; i < allReviewsContentBlock.length; i++) {
                allReviewsContentBlock[i].children[2].classList.add("hidden");
            }
        }
        if(i>2)
            contentItem[i].classList.add("hidden");
        else
            contentItem[i].classList.remove("hidden");
    }
}
// функция появления слайдов от взаимодействия с стрелками
function contentSliderMove(el) {
    if(el.target == contentArrowRight) {
        if(contentArrowRight.style.cursos != "default" && contentArrowRight.style.opacity != "0") {
            findVisibleItem(contentItem, "content");
            contentItem[visibleItem.firstVisible].classList.add('hidden');
            contentItem[visibleItem.firstHidden].classList.remove('hidden');
            visibleItem.firstHidden++; visibleItem.firstVisible++;
        }
    }
    if(el.target == contentArrowLeft) {
        if(contentArrowLeft.style.cursos != "default" && contentArrowLeft.style.opacity != "0") {
            contentItem[visibleItem.firstHidden - 1].classList.add("hidden");
            contentItem[visibleItem.firstVisible - 1].classList.remove("hidden");
            visibleItem.firstHidden--; visibleItem.firstVisible--;
        }
    }
    showVisibleArrow(visibleItem.firstHidden, visibleItem.firstVisible, contentItem, contentArrowRight, contentArrowLeft);
}
// функця отвечает за показывать ли нужную стрелку или нет
function showVisibleArrow(firstHiddenEl, firstVisibleEl, itemLenght, arrowRight, arrowLeft) {
    // Показывать ли правую стрелку
    if(firstHiddenEl == itemLenght.length) {
        arrowRight.style.opacity = 0;
        arrowRight.style.cursor = "default";
    } else {
        arrowRight.style.opacity = 1;
        arrowRight.style.cursor = "pointer";
    }
    // показывать ли левую стрелку
    if(firstVisibleEl != 0) {
        arrowLeft.style.opacity = 1;
        arrowLeft.style.cursor = "pointer";
    } else {
        arrowLeft.style.opacity = 0;
        arrowLeft.style.cursor = "default";
    }
}
// функция которая определяет сколько в блоке показывать видимых элементов
function findVisibleItem(itemLenght, elementName) {
    if(elementName == 'content') {
        for(let i = 0; i < itemLenght.length; i++) {
            if(!itemLenght[i].classList.contains("hidden")) {
                visibleItem.firstVisible = i;
                break;
            }
        }
        for(let i = itemLenght.length-1; i >= 0; i--) {
            if(!itemLenght[i].classList.contains("hidden"))
                break;
            else
                visibleItem.firstHidden = i;
        }
   }
   else if(elementName == 'partner') {
    for(let i = 0; i < itemLenght.length; i++) {
            if(!itemLenght[i].classList.contains("hidden")) {
                visibleItem.firstVisiblePartner = i;
                break;
            }
        }
        for(let i = itemLenght.length-1; i >= 0; i--) {
            if(!itemLenght[i].classList.contains("hidden"))
                break;
            else
                visibleItem.firstHiddenPartner = i;
        }
   }
}
// работа слайдера партнеров со стрелками
function partnerSliderMove(el) {
    if(el.target == partnerArrowRight) {
        if(partnerArrowRight.style.cursos != "default" && partnerArrowRight.style.opacity != "0") {
            findVisibleItem(partnerSliderItem, 'partner');
            partnerSliderItem[visibleItem.firstVisiblePartner].classList.add('hidden');
            partnerSliderItem[visibleItem.firstHiddenPartner].classList.remove('hidden');
            visibleItem.firstHiddenPartner++; visibleItem.firstVisiblePartner++;
        }
    }
    if(el.target == partnerArrowLeft) {
        if(partnerArrowLeft.style.cursos != "default" && partnerArrowLeft.style.opacity != "0") {
            partnerSliderItem[visibleItem.firstHiddenPartner - 1].classList.add("hidden");
            partnerSliderItem[visibleItem.firstVisiblePartner - 1].classList.remove("hidden");
            visibleItem.firstHiddenPartner--; visibleItem.firstVisiblePartner--;
        }
    }
    showVisibleArrow(visibleItem.firstHiddenPartner, visibleItem.firstVisiblePartner, partnerSliderItem, partnerArrowRight, partnerArrowLeft);
}

// Работаем с tariff sliders
function tariffListMove(el) {
    if(el.target == tariffArrowRight && numberTarif != tariffListItem.length-1) {
        tariffListItem[numberTarif].style.display = 'none';
        tariffListItem[numberTarif+1].style.display = 'block';
        numberTarif++;
        if(numberTarif == tariffListItem.length-1) {
            tariffArrowRight.style.opacity = 0;
            tariffArrowRight.style.cursor = "default";
        }
    } else if(el.target == tariffArrowLeft && numberTarif != 0) {
        tariffListItem[numberTarif].style.display = 'none';
        tariffListItem[numberTarif-1].style.display = 'block';
        numberTarif--;
        if(numberTarif == 0) {
            tariffArrowLeft.style.opacity = 0;
            tariffArrowLeft.style.cursor = "default";
            
        }
    }
    if(numberTarif > 0) {
        tariffArrowLeft.style.opacity = 1;
        tariffArrowLeft.style.cursor = "pointer";
    }
    if(numberTarif < tariffListItem.length-1) {
        tariffArrowRight.style.opacity = 1;
        tariffArrowRight.style.cursor = "pointer";
    }
}


/*--------------ПЕРЕМЕННЫЕ ---------------- */
// вычисляем высоту плавающего меню
let floatMenu = document.querySelector('.float__menu');
let menu = document.querySelector('.menu');
let menuMarginTop = getComputedStyle(floatMenu, true).marginTop;
menuMarginTop = Number(menuMarginTop.slice(0, menuMarginTop.indexOf('px')));
let menuMarginBottom = getComputedStyle(floatMenu, true).marginBottom;
menuMarginBottom = Number(menuMarginBottom.slice(0, menuMarginBottom.indexOf('px')));
let menuHeight = floatMenu.offsetHeight + menuMarginBottom + menuMarginTop;
// вычисляем высоту header
let nav = document.querySelector('header');
let navMargin = getComputedStyle(nav, true).marginBottom;
navMargin = Number(navMargin.slice(0, navMargin.indexOf('px')));
let navHeight = nav.offsetHeight + navMargin;
// место где прилипает меню
let startFixMenu = menuHeight+navHeight + 30;

const reviewsMenu = document.querySelector('.reviews__menu');
const shadowStart = document.querySelector('.menu__shadow--start');
const shadowEnd = document.querySelector('.menu__shadow--end');
reviewsMenu.scrollLeft = 40;
// работа с reviewsMenu
var reviewsMenuLink = document.querySelectorAll('.menu__link');
var allReviewsContentBlock = document.getElementsByClassName('reviews__content-block');
var reviewsContentBlockIndex = 1;
// скролл для видео-отзывов
const contentShadowStart = document.querySelector('.content__shadow--start');
const contentShadowEnd = document.querySelector('.content__shadow--end');
// Объявляем переменные для работы с слайдером в отзывах
var allContentItem = document.getElementsByClassName('content__item');
var contentArrowLeft = document.querySelector('.reviews__arrow--left');
var contentArrowRight = document.querySelector('.reviews__arrow--right');
var maxVisibleSlide = 2;
var contentItem = allReviewsContentBlock[reviewsContentBlockIndex].children;
// переменные хранящие индекс видимых и показанных слайдов для обработки стрелки
// var firstVisible;
// var firstHidden;
let visibleItem = {
    firstHidden: 0,
    firstVisible: 0,
    firstVisiblePartner: 0,
    firstHiddenPartner: 0
};
findVisibleItem(contentItem, visibleItem.firstVisible, visibleItem.firstHidden);

// переменные для слайдера партнеров
var partnerSlider = document.querySelector('.slider__box');
var shadowPartnerStart = document.querySelector('.partners__shadow--start');
var shadowPartnerEnd = document.querySelector('.partners__shadow--end');
// Переменные для работы со стрелками слайдера партнеров
// var firstHiddenPartner;
// var firstVisiblePartner;
var partnerSliderItem = document.querySelectorAll('.slider__item');
var partnerArrowLeft = document.querySelector('.slider__arrow--left');
var partnerArrowRight = document.querySelector('.slider__arrow--right');
// определяем переменные для работы с слайдером тарифов
let tariffListItem = document.querySelectorAll('.tariff__list-item');
let tariffArrowLeft = document.querySelector('.tariff__arrow--left');
let tariffArrowRight = document.querySelector('.tariff__arrow--right');
tariffArrowLeft.style.opacity = 0;
tariffArrowLeft.style.cursor = "default"
let numberTarif = 0;

// слушатель для прилипшего меню
window.addEventListener('scroll', () => {
    if( window.scrollY > startFixMenu)
        menu.classList.add('fixed');
    else
        menu.classList.remove('fixed');
});
// вызываем для обновления состояния 
handleShadowVisibility(reviewsMenu, shadowStart, shadowEnd);
// вешаем слушатель на скролл reviewsMenu
reviewsMenu.addEventListener('scroll', (e) => handleShadowVisibility(reviewsMenu, shadowStart, shadowEnd));
// вешаем слушатель для обработки тапов по кнопкам в слайд-меню
reviewsMenu.addEventListener('click', (e) => reviewsContentViev(e) );
// обновление состояния контент блока
handleShadowVisibility(allReviewsContentBlock[reviewsContentBlockIndex], contentShadowStart, contentShadowEnd);
// вешаем слушатель на каждый контент блок 
allReviewsContentBlock[0].addEventListener('scroll', (e) => handleShadowVisibility(allReviewsContentBlock[reviewsContentBlockIndex], contentShadowStart, contentShadowEnd));
allReviewsContentBlock[1].addEventListener('scroll', (e) => handleShadowVisibility(allReviewsContentBlock[reviewsContentBlockIndex], contentShadowStart, contentShadowEnd));
allReviewsContentBlock[2].addEventListener('scroll', (e) => handleShadowVisibility(allReviewsContentBlock[reviewsContentBlockIndex], contentShadowStart, contentShadowEnd));
allReviewsContentBlock[3].addEventListener('scroll', (e) => handleShadowVisibility(allReviewsContentBlock[reviewsContentBlockIndex], contentShadowStart, contentShadowEnd));
allReviewsContentBlock[4].addEventListener('scroll', (e) => handleShadowVisibility(allReviewsContentBlock[reviewsContentBlockIndex], contentShadowStart, contentShadowEnd));
allReviewsContentBlock[5].addEventListener('scroll', (e) => handleShadowVisibility(allReviewsContentBlock[reviewsContentBlockIndex], contentShadowStart, contentShadowEnd));
// скрываем изначально левую стрелку
contentArrowLeft.style.opacity = 0;
contentArrowLeft.style.cursor = "default";
// сбрасываем левую стрелку для слайдера партнеров
partnerArrowLeft.style.opacity = 0;
partnerArrowLeft.style.cursor = "default";
// Добавляем слушателей на стрелки
contentArrowRight.addEventListener('click', (event) => contentSliderMove(event));
contentArrowLeft.addEventListener('click', (event) => contentSliderMove(event));
// вызываем для объявления состояния
handleShadowVisibility(partnerSlider, shadowPartnerStart, shadowPartnerEnd);
// добавляем слушатель на скролл слайдера партнеров
partnerSlider.addEventListener('scroll', (e) => handleShadowVisibility(partnerSlider, shadowPartnerStart, shadowPartnerEnd));
// Добавляем слушателей на стрелки слайдера партнеров
partnerArrowRight.addEventListener('click', (event) => partnerSliderMove(event));
partnerArrowLeft.addEventListener('click', (event) => partnerSliderMove(event));
// Слушатель на стрелки слайдера тарифов
tariffArrowRight.addEventListener('click', (e) => tariffListMove(e));
tariffArrowLeft.addEventListener('click', (e) => tariffListMove(e));



// в данном условии мы проверяем разрешение экрана
// после мы делаем, чтобы contentItems стало вместо 3 >> 2
// и в слайдере партнеров так же
if(window.outerWidth <= 1170 && window.outerWidth > 767) {
    for(let i = 0; i < allReviewsContentBlock.length; i++) {
        if(!allReviewsContentBlock[i].classList.contains("all__content"))
            allReviewsContentBlock[i].children[2].classList.add("hidden");
        else
            for(let j = 0; j < allReviewsContentBlock[i].children.length; j++) {
                if(j > 2)
                    allReviewsContentBlock[i].children[j].classList.add("hidden");
            }
    }
    for(let k = 0; k < partnerSliderItem.length; k++) {
        if(window.outerWidth <= 1170 && window.outerWidth > 890) {
            if(k>2)
            partnerSliderItem[k].classList.add("hidden");
                else
            partnerSliderItem[k].classList.remove("hidden");
        } else if(window.outerWidth <= 889) {
            if(k>1)
                partnerSliderItem[k].classList.add("hidden");
            else
                partnerSliderItem[k].classList.remove("hidden");
        }
    }
}
if(window.outerWidth <= 767) {
    tariffListItem[1].style.display = 'none';
    tariffListItem[2].style.display = 'none';
}


let navButton = document.querySelector('.nav__button');
navButton.addEventListener('click', (e) => {
    if(navButton.classList.contains('hide')) {
        navButton.classList.remove('hide');
        navButton.classList.add('visible');
        fadein(".nav__menu");
    }
    else {
        navButton.classList.remove('visible');
        navButton.classList.add('hide');
        fadeout(".nav__menu");
    }    
});

function fadein(el) {
    var opacity = 0.01;
    document.querySelector(el).style.display = 'block';
    var timer = setInterval(function() {
        if(opacity >= 1) {
            clearInterval(timer);
        }
        document.querySelector(el).style.opacity = opacity;
        opacity += opacity * 0.1;
    }, 5);
}

function fadeout(el) {
    var opacity = 1;
    var timer = setInterval(function() {
        if(opacity <= 1) {
            clearInterval(timer);
            document.querySelector(el).style.display = "none"
        }
        document.querySelector(el).style.opacity = opacity;
        opacity -= opacity * 0.1;
    }, 10);
}