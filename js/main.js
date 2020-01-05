// Тут у нас будут функции для работы с навигацией в "отзывах"

const reviewsMenu = document.querySelector('.reviews__menu');
const shadowStart = document.querySelector('.menu__shadow--start');
const shadowEnd = document.querySelector('.menu__shadow--end');
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

handleShadowVisibility();
reviewsMenu.addEventListener('scroll', (e) => handleShadowVisibility(e));

const reviewsContentBlock = document.querySelector('.reviews__content-block');
const contentShadowStart = document.querySelector('.content__shadow--start');
const contentShadowEnd = document.querySelector('.content__shadow--end');

function handleShadowVisibilityContent() {
    const maxScrollStartReached = reviewsContentBlock.scrollLeft <= 0;
    const maxScrollEndReached = reviewsContentBlock.scrollLeft >= reviewsContentBlock.scrollWidth - reviewsContentBlock.offsetWidth;
    toggleShadowContent(contentShadowStart, maxScrollStartReached );
    toggleShadowContent(contentShadowEnd, maxScrollEndReached);
}

function toggleShadowContent(el, maxScrollReached) {
    const shadowIsVisible = el.classList.contains('is-active');
    const showShadow = !maxScrollReached && !shadowIsVisible;
    const hideShadow = maxScrollReached && shadowIsVisible;
    // requestAnimationFrame для оптимального исполнения прокрутки
    if(showShadow) {
        window.requestAnimationFrame(() => el.classList.add('is-active'));        
    } else if(hideShadow) {
        window.requestAnimationFrame(() => el.classList.remove('is-active'));
    }
}

handleShadowVisibilityContent();
reviewsContentBlock.addEventListener('scroll', (e) => handleShadowVisibilityContent(e));
