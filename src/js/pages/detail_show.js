import $ from "jquery";
import Swiper from "swiper";
import {
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCoverflow,
	Thumbs,
	EffectCreative,
	Mousewheel,
} from "swiper/modules";

function remToPx(remValue) {
    // Получаем текущий базовый размер шрифта (font-size) из элемента <html>
    var htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    // Переводим значение из rem в px
    var pxValue = remValue * htmlFontSize;

    // Округляем значение до целых пикселей (по желанию)
    return Math.round(pxValue) + 'px';
}

$('.detail_show-main--open').on("click", function () {
    $(this).css('display', 'none')
    $('.detail_show-main--text').slideToggle()
});
$('.detail_show-questions-item--top').on("click", function () {
    $(this).toggleClass('active')
    $(this).next('.detail_show-questions-item--bottom').slideToggle()
});

if($('.detail_food').length) {
    let detail_food

    function detailFoodSwiper() {
        const cards = document.querySelectorAll('.detail_food-slide')
        if (screen.width < 769) {
            cards.forEach(card => {
                card.classList.add('swiper-slide')
            })
            detail_food = new Swiper('.detail_food-swiper', {
                modules: [Navigation, Pagination, EffectFade],
                speed: 2000,
                slidesPerView: 1.065,
                spaceBetween: `${remToPx(1)}rem`,
            });
        } else {
            cards.forEach(card => {
                card.classList.remove('swiper-slide')
              })
            if(detail_food) {
                if(detail_food.length) {
                    detail_food.forEach(swip => {
                        swip.destroy()
                        swip = undefined
                    })
                } else {
                    detail_food.destroy()
                    detail_food = undefined
                }
            }
        }
    }
    
    detailFoodSwiper();
    
    $(window).resize(function () {
        detailFoodSwiper();
    });
}

if($('.detail_decor').length) {
    let detail_decor

    function detailDecorSwiper() {
        const cards = document.querySelectorAll('.detail_decor-slide')
        if (screen.width < 769) {
            cards.forEach(card => {
                card.classList.add('swiper-slide')
            })
            detail_decor = new Swiper('.detail_decor-swiper', {
                modules: [Navigation, Pagination, EffectFade],
                speed: 2000,
                slidesPerView: 1.065,
                spaceBetween: `${remToPx(1)}rem`,
            });
        } else {
            cards.forEach(card => {
                card.classList.remove('swiper-slide')
              })
            if(detail_decor) {
                if(detail_decor.length) {
                    detail_decor.forEach(swip => {
                        swip.destroy()
                        swip = undefined
                    })
                } else {
                    detail_decor.destroy()
                    detail_decor = undefined
                }
            }
        }
    }
    
    detailDecorSwiper();
    
    $(window).resize(function () {
        detailDecorSwiper();
    });
}

if($('.detail_photo').length) {
    let detail_photo

    function detailPhotoSwiper() {
        const cards = document.querySelectorAll('.detail_photo-slide')
        if (screen.width < 769) {
            cards.forEach(card => {
                card.classList.add('swiper-slide')
            })
            detail_photo = new Swiper('.detail_photo-swiper', {
                modules: [Navigation, Pagination, EffectFade],
                speed: 2000,
                slidesPerView: 1.065,
                spaceBetween: `${remToPx(1)}rem`,
            });
        } else {
            cards.forEach(card => {
                card.classList.remove('swiper-slide')
              })
            if(detail_photo) {
                if(detail_photo.length) {
                    detail_photo.forEach(swip => {
                        swip.destroy()
                        swip = undefined
                    })
                } else {
                    detail_photo.destroy()
                    detail_photo = undefined
                }
            }
        }
    }
    
    detailPhotoSwiper();
    
    $(window).resize(function () {
        detailPhotoSwiper();
    });
}