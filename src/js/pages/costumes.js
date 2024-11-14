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

const charactersSwiper = document.querySelectorAll(".characters__list-swiper");
const charactersMob = document.querySelector(".characters__list-mob-swiper");
const charactersTextMob = document.querySelector(".characters__list-mob-text");

const navPrev = document.querySelector(".slider__btns-prev");
const navNext = document.querySelector(".slider__btns-next");
const swipers = [];
const textSlider = document.querySelector(".characters__list-text");
const paginCur = document.querySelector(".pagination-number--current");
const paginLast = document.querySelector(".pagination-number--all");

function remToPx(remValue) {
	// Получаем текущий базовый размер шрифта (font-size) из элемента <html>
	var htmlFontSize = parseFloat(
		getComputedStyle(document.documentElement).fontSize
	);

	// Переводим значение из rem в px
	var pxValue = remValue * htmlFontSize;

	// Округляем значение до целых пикселей (по желанию)
	return Math.round(pxValue) + "px";
}
if (window.screen.width < 769) {
	const mobText = new Swiper(charactersTextMob, {
		modules: [Navigation, Pagination, EffectFade],
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		slidesPerView: 1,
		spaceBetween: 20,
	});
	const mobSlider = new Swiper(charactersMob, {
		modules: [Navigation, Pagination, Thumbs, EffectCreative],
		slidesPerView: "auto",
		spaceBetween: 20,
		thumbs: {
			swiper: mobText,
		},
		// on: {
		// 	init: function (swiper) {

		// 	},
		// 	slideChange: function(swiper) {
		// 		mobText.slideNext()
		// 	},
		// },
	});
} else {
	charactersSwiper.forEach((swiper) => {
		const slider = new Swiper(swiper, {
			modules: [Navigation, Pagination, EffectCreative],
			speed: 2000,
			slidesPerView: 1,
			spaceBetween: `${remToPx(1.5)}rem`,
			pagination: {
				el: ".home-review-pagination",
			},
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					translate: ["-20%", 0, -1],
				},
				next: {
					translate: ["100%", 0, 0],
				},
			},
		});
		swipers.push(slider);
	});
	const textSwiper = new Swiper(textSlider, {
		modules: [Navigation, Pagination, EffectFade],
		speed: 1500,
		slidesPerView: 1,
		spaceBetween: 30,
		effect: "fade",
		pagination: {
			el: ".characters__slider-pagination",
		},
		on: {
			init: function (swiper) {
				if (swiper.slides.length < 9) {
					paginCur.textContent = `0${swiper.activeIndex + 1}`;
					paginLast.textContent = `0${swiper.slides.length}`;
				} else {
					swiper.activeIndex > 9
						? (paginCur.textContent = `${swiper.activeIndex + 1}`)
						: (paginCur.textContent = `0${swiper.activeIndex + 1}`);
					paginLast.textContent = `${swiper.slides.length}`;
				}
			},
			slideChange: function (swiper) {
				paginCur.textContent = `0${swiper.activeIndex + 1}`;
			},
		},
		fadeEffect: {
			crossFade: true,
		},
	});

	navPrev && swipers.length > 0
		? navPrev.addEventListener("click", () => {
				swipers.forEach((slider) => {
					slider.slidePrev();
				});
				textSwiper.slidePrev();
				// slider.slidePrev();
		  })
		: null;
	navNext && swipers.length > 0
		? navNext.addEventListener("click", () => {
				swipers.forEach((slider) => {
					slider.slideNext();
				});
				textSwiper.slideNext();
		  })
		: null;
}
