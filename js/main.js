// функции handleShadowVisibility & toggleShadow отвечают за
// появление тени в reviewsMenu, для прокручивания
function handleShadowVisibility() {
    const maxScrollStartReached = reviewsMenu.scrollLeft <= 0;
    const maxScrollEndReached = reviewsMenu.scrollLeft >= reviewsMenu.scrollWidth - reviewsMenu.offsetWidth;
    toggleShadow(shadowStart, maxScrollStartReached);
    toggleShadow(shadowEnd, maxScrollEndReached);
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
                        // generationBigSlider(5);
                        break;
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
                findVisibleItem();
                // проверяем нужно ли показывать стрелки после переключения блока
                showVisibleArrow();
            }
        }
        // вешаем на нужный пункт reviewsMenu класс active
        el.target.classList.add('active');
        // перемещаем скролл на данную позицию в меню
        reviewsMenu.scrollLeft = el.target.offsetLeft
        // убираем класс hidden-content с блока, который должен появиться
        allReviewsContentBlock[reviewsContentBlockIndex].classList.remove("hidden-content");
        // обновляем состояния скролла после отображения элементов
        handleShadowVisibilityContent();
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
// функции отвечающие за скролл видео в контетн слайдере
function handleShadowVisibilityContent() {
    var maxScrollStartReached = allReviewsContentBlock[reviewsContentBlockIndex].scrollLeft <= 0;
    var maxScrollEndReached = allReviewsContentBlock[reviewsContentBlockIndex].scrollLeft >= allReviewsContentBlock[reviewsContentBlockIndex].scrollWidth - allReviewsContentBlock[reviewsContentBlockIndex].offsetWidth;
    toggleShadowContent(contentShadowStart, maxScrollStartReached );
    toggleShadowContent(contentShadowEnd, maxScrollEndReached);
}
function toggleShadowContent(el, maxScrollReached) {
    var shadowIsVisible = el.classList.contains('is-active');
    var showShadow = !maxScrollReached && !shadowIsVisible;
    var hideShadow = maxScrollReached && shadowIsVisible;
    // requestAnimationFrame для оптимального исполнения прокрутки
    if(showShadow) {
        window.requestAnimationFrame(() => el.classList.add('is-active'));        
    } else if(hideShadow) {
        window.requestAnimationFrame(() => el.classList.remove('is-active'));
    }
}
// функция появления слайдов от взаимодействия с стрелками
function contentSliderMove(el) {
    if(el.target == contentArrowRight) {
        if(contentArrowRight.style.cursos != "default" && contentArrowRight.style.opacity != "0") {
            findVisibleItem();
            contentItem[firstVisible].classList.add('hidden');
            contentItem[firstHidden].classList.remove('hidden');
            firstHidden++; firstVisible++;
        }
    }
    if(el.target == contentArrowLeft) {
        if(contentArrowLeft.style.cursos != "default" && contentArrowLeft.style.opacity != "0") {
            contentItem[firstHidden - 1].classList.add("hidden");
            contentItem[firstVisible - 1].classList.remove("hidden");
            firstHidden--; firstVisible--;
        }
    }
    showVisibleArrow();
}
// функця отвечает за показывать ли нужную стрелку или нет
function showVisibleArrow() {
    // Показывать ли правую стрелку
    if(firstHidden == contentItem.length) {
        contentArrowRight.style.opacity = 0;
        contentArrowRight.style.cursor = "default";
    } else {
        contentArrowRight.style.opacity = 1;
        contentArrowRight.style.cursor = "pointer";
    }
    // показывать ли левую стрелку
    if(firstVisible != 0) {
        contentArrowLeft.style.opacity = 1;
        contentArrowLeft.style.cursor = "pointer";
    } else {
        contentArrowLeft.style.opacity = 0;
        contentArrowLeft.style.cursor = "default";
    }
}
// функция которая определяет сколько в блоке показывать видимых элементов
function findVisibleItem() {
    for(let i = 0; i < contentItem.length; i++) {
        if(!contentItem[i].classList.contains("hidden")) {
            firstVisible = i;
            break;
        }
    }
    for(let i = contentItem.length-1; i >= 0; i--) {
        if(!contentItem[i].classList.contains("hidden"))
            break;
        else
            firstHidden = i;
    }
}
// функция показа тени для партнерского слайдера
function handleShadowVisibilityPartner() {
    const maxScrollStartReached = partnerSlider.scrollLeft <= 0;
    const maxScrollEndReached = partnerSlider.scrollLeft >= partnerSlider.scrollWidth - partnerSlider.offsetWidth;
    toggleShadow(shadowPartnerStart, maxScrollStartReached);
    toggleShadow(shadowParnerEnd, maxScrollEndReached);
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

// работа слайдера партнеров со стрелками
function partnerSliderMove(el) {
    if(el.target == partnerArrowRight) {
        if(partnerArrowRight.style.cursos != "default" && partnerArrowRight.style.opacity != "0") {
            findVisibleItemPartner();
            partnerSliderItem[firstVisiblePartner].classList.add('hidden');
            partnerSliderItem[firstHiddenPartner].classList.remove('hidden');
            firstHiddenPartner++; firstVisiblePartner++;
        }
    }
    if(el.target == partnerArrowLeft) {
        if(partnerArrowLeft.style.cursos != "default" && partnerArrowLeft.style.opacity != "0") {
            partnerSliderItem[firstHiddenPartner - 1].classList.add("hidden");
            partnerSliderItem[firstVisiblePartner - 1].classList.remove("hidden");
            firstHiddenPartner--; firstVisiblePartner--;
        }
    }
    showVisibleArrowPartner();
}
// функця отвечает за показывать ли нужную стрелку или нет партнеров
function showVisibleArrowPartner() {
    // Показывать ли правую стрелку
    if(firstHiddenPartner == partnerSliderItem.length) {
        partnerArrowRight.style.opacity = 0;
        partnerArrowRight.style.cursor = "default";
    } else {
        partnerArrowRight.style.opacity = 1;
        partnerArrowRight.style.cursor = "pointer";
    }
    // показывать ли левую стрелку
    if(firstVisiblePartner != 0) {
        partnerArrowLeft.style.opacity = 1;
        partnerArrowLeft.style.cursor = "pointer";
    } else {
        partnerArrowLeft.style.opacity = 0;
        partnerArrowLeft.style.cursor = "default";
    }
}
// функция которая определяет сколько в блоке показывать видимых элементов
// в слайдере партнеров
function findVisibleItemPartner() {
    for(let i = 0; i < partnerSliderItem.length; i++) {
        if(!partnerSliderItem[i].classList.contains("hidden")) {
            firstVisiblePartner = i;
            break;
        }
    }
    for(let i = partnerSliderItem.length-1; i >= 0; i--) {
        if(!partnerSliderItem[i].classList.contains("hidden"))
            break;
        else
            firstHiddenPartner = i;
    }
}


/*--------------ПЕРЕМЕННЫЕ ---------------- */
// Тут у нас будут функции для работы с навигацией в "отзывах"

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
var firstVisible;
var firstHidden;
// переменные для слайдера партнеров
var partnerSlider = document.querySelector('.slider__box');
var shadowPartnerStart = document.querySelector('.partners__shadow--start');
var shadowParnerEnd = document.querySelector('.partners__shadow--end');
// Переменные для работы со стрелками слайдера партнеров
var firstHiddenPartner;
var firstVisiblePartner;
var partnerSliderItem = document.querySelectorAll('.slider__item');
var partnerArrowLeft = document.querySelector('.slider__arrow--left');
var partnerArrowRight = document.querySelector('.slider__arrow--right');


// вызываем для обновления состояния 
handleShadowVisibility();
// вешаем слушатель на скролл reviewsMenu
reviewsMenu.addEventListener('scroll', (e) => handleShadowVisibility(e));
// вешаем слушатель для обработки тапов по кнопкам в слайд-меню
reviewsMenu.addEventListener('click', (e) => reviewsContentViev(e) );
// обновление состояния контент блока
handleShadowVisibilityContent();
// вешаем слушатель на каждый контент блок 
allReviewsContentBlock[0].addEventListener('scroll', (e) => handleShadowVisibilityContent(e));
allReviewsContentBlock[1].addEventListener('scroll', (e) => handleShadowVisibilityContent(e));
allReviewsContentBlock[2].addEventListener('scroll', (e) => handleShadowVisibilityContent(e));
allReviewsContentBlock[3].addEventListener('scroll', (e) => handleShadowVisibilityContent(e));
allReviewsContentBlock[4].addEventListener('scroll', (e) => handleShadowVisibilityContent(e));
allReviewsContentBlock[5].addEventListener('scroll', (e) => handleShadowVisibilityContent(e));
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
handleShadowVisibilityPartner();
// добавляем слушатель на скролл слайдера партнеров
partnerSlider.addEventListener('scroll', (e) => handleShadowVisibilityPartner(e));
// Добавляем слушателей на стрелки слайдера партнеров
partnerArrowRight.addEventListener('click', (event) => partnerSliderMove(event));
partnerArrowLeft.addEventListener('click', (event) => partnerSliderMove(event));




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