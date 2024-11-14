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

$(document).ready(function () {
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
	function countSlider(swip, info) {
		$(info)
			.find(".pagination-number--all")
			.html("0" + swip.slides.length);
		$(info)
			.find(".pagination-number--current")
			.html("0" + (swip.activeIndex + 1));
		swip.on("slideChange", function () {
			$(info)
				.find(".pagination-number--current")
				.html("0" + (swip.activeIndex + 1));
		});
	}

	let programDetailDiff = new Swiper('.program-difficult__swiper', {
		slidesPerView: 'auto',
		spaceBetween: `${remToPx(3.2)}rem`,
	})

	let programDetailCharacter = new Swiper('.program-character__content--swiper', {
		slidesPerView: 'auto',
		spaceBetween: `${remToPx(3.2)}rem`,
	})
	if ($(".program-detail__banner").length) {
		let programDetailBanner = new Swiper('.program-detail__banner', {
			modules: [Navigation, Pagination, EffectFade, Autoplay],
			speed: 1500,
			slidesPerView: 1,
			spaceBetween: 30,
			effect: "fade",
			// autoplay: {
			//     delay: 1000,
			// },
			fadeEffect: {
				crossFade: true,
			},
			pagination: {
				el: ".baner-slider-pagination",
			},
		});
		countSlider(programDetailBanner, ".baner-slider-pagination-number");
		setTimeout(() => {
			programDetailBanner.autoplay.start();
			programDetailBanner.params.autoplay.delay = 2500;
		}, 1000);
	}


	let separate = document.querySelector('.program-character__separate');

	if (window.outerWidth > 768) {
		$('.program-character__content-item').on('mouseover', function (evt) {
			$(this).addClass('active');
			$('.program-character__header').addClass('remove');
			$(separate).addClass('remove');
		})
		$('.program-character__content-item').on('mouseout', function (evt) {
			$(this).removeClass('active');
			$('.program-character__header').removeClass('remove');
			$(separate).removeClass('remove');
		})
	}
})