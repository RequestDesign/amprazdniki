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

const decorSliders = document.querySelectorAll(".decor__slider");
document.addEventListener("DOMContentLoaded", () => {
	decorSliders.forEach((item) => {
		const container = item.closest(".decor__container");
		const pagination = container.querySelector(".decor__slider-pagination");
		const thumbs = container.querySelector(".decor__swiper-text");
		const numberCur = container.querySelector(".pagination-number--current");
		const numberLast = container.querySelector(".pagination-number--all");
		const screenWidth = window.innerWidth;
		const btnPrev = container.querySelector(".slider__btns-prev");
		const btnNext = container.querySelector(".slider__btns-next");
		console.log("item: ", item);

		const decorSwiperText = new Swiper(thumbs, {
			modules: [Navigation, Pagination, EffectFade, Thumbs],
			speed: 2000,
			slidesPerView: 1,
			spaceBetween: 30,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
		});

		const decorSlider = new Swiper(item, {
			modules: [Navigation, Pagination, EffectCreative, Thumbs],
			speed: 1000,
			centeredSlides: true,
			// spaceBetween: 20,
			slidesPerView: "auto",
			// effect: "slide",
			effect: screenWidth < 769 ? "slide" : "creative",
			spaceBetween: 20,
			centeredSlides: false,
			pagination: {
				el: pagination,
			},
			navigation: {
				prevEl: btnPrev,
				nextEl: btnNext,
			},
			thumbs: {
				swiper: decorSwiperText,
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
				},
			},
			breakpoints: {
				769: {
					creativeEffect: {
						prev: {
							shadow: true,
							translate: ["-125%", 60, -300],
						},
						next: {
							shadow: true,
							translate: ["125%", 60, -300],
						},
					},
					spaceBetween: 0,
					centeredSlides: true,
				},
			},
		});
		window.addEventListener("load", () => {
			if (window.innerWidth < 769) {
				decorSlider.params.effect = "slide";
				console.log(decorSlider.params);
				console.log(decorSlider.params.effect);
			} else {
				decorSlider.params.effect = "creative";
			}
		});

		decorSlider.on("slideChange", function () {
			decorSwiperText.slideTo(this.activeIndex, 2000);
		});
	});
});
