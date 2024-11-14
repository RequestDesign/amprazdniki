import $ from "jquery";

import Swiper from "swiper";

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

	let contactsSwiper = new Swiper('.contacts__pictures', {
		slidesPerView: 'auto',
		spaceBetween: `${remToPx(3.2)}rem`,
		breakpoints: {
			769: {
				spaceBetween: `${remToPx(4.2)}rem`,
			}
		}
	})
});