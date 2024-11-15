/* 
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
  */
/* 

это надо изменить

const wow = new WOW({
	boxClass: "wow",
	animateClass: "animate__animated",
	offset: 100,
	mobile: true, <===== вот тут надо поставить false, это отключит анимации скролла на мобиле
	live: true, 
});



*/

function initNewYearSelect() {

    const target = document.querySelector('.select._newYear')
    if (!target) return

    new Swiper(target.querySelector('.swiper'), {
        slidesPerView: 1.15,
        spaceBetween: remToPx(3),
        breakpoints: {
            768: {
                spaceBetween: remToPx(3),
                slidesPerView: 'auto'
            }
        }
    })

    const slides = target.querySelectorAll('.select__slide')
    slides.forEach((s) => {
        s.addEventListener('mouseenter', (e) => {
            clearHover()
            e.target.classList.add('_hover')
        })
    })
    function clearHover() {
        slides.forEach((el) => {
            el.classList.remove('_hover')
        })
    }

}

function initNewYearPrices() {
    const images = document.querySelector('.newyear-price__slider-images'),
        table = document.querySelector('.newyear-price__slider-table')

    if (!images || !table) return

    const bar = document.querySelector('.newyear-price__top'),
        btnNext = bar.querySelector('.swiper-btn-next'),
        btnPrev = bar.querySelector('.swiper-btn-prev'),
        numberCur = bar.querySelector('.pagination-number--current'),
        numberLast = bar.querySelector('.pagination-number--all')

    const imagesSwiper = new Swiper(images, {
        simulateTouch: false,
        loop: false,
        slidesPerView: 1.1,
        spaceBetween: remToPx(2),
        initialSlide: 1,
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: remToPx(2),
            }
        },

    })
    const tableSwiper = new Swiper(table, {
        modules: [Pagination],
        loop: false,
        simulateTouch: false,
        slidesPerView: 1.1,
        spaceBetween: remToPx(2),
        initialSlide: 0,

        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: remToPx(2),

            }
        },
        pagination: {
            el: bar.querySelector('.swiper-pagination'),
            type: "bullets"
        },
        on: {
            init: function (swiper) {
                const active = swiper.activeIndex;
                swiper.activeIndex = active + 1;
                numberCur.textContent = "0" + (active + 2);
                numberLast.textContent = "0" + swiper.slides.length;
            },
            slideChange: function (swiper) {
                const active = swiper.activeIndex;
                numberCur.textContent = "0" + (active + 1);
                if (window.innerWidth < 768) {
                    imagesSwiper.slideTo(active)
                }
            },
        }
    })

    imagesSwiper.on('slideChange', (swiper) => {
        const active = swiper.activeIndex;
        if (window.innerWidth < 768) {
            tableSwiper.slideTo(active)
        }

    })
    btnNext.addEventListener('click', (ev) => {
        imagesSwiper.slideNext()
        tableSwiper.slideNext()
    })
    btnPrev.addEventListener('click', (ev) => {
        imagesSwiper.slidePrev()
        tableSwiper.slidePrev()
    })

}