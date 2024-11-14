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

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import "animate.css";
import WOW from "wow.js";

const wow = new WOW({
	boxClass: "wow",
	animateClass: "animate__animated",
	offset: 100,
	mobile: true,
	live: true,
});
wow.init();

import "./js/utils/jquery.mask";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/mousewheel";
import "./js/components/header";
import "./js/components/footer";
import "./js/components/modal";
import "./js/components/uploadFlie";
import "./js/pages/home";
import "./js/pages/programs";
import "./js/pages/decor";
import "./js/pages/costumes";
import "./js/pages/contacts";
import "./js/pages/detail_show";
import "./js/pages/detail_program";
import "./index.scss";

$(document).ready(function () {
	if ($("input[type=tel]").length) {
		$("input[type=tel]").mask("+7(999) 999-99-99");
	}
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

	if ($(".baner").length) {
		const baner = new Swiper(".baner-slider-main", {
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
		countSlider(baner, ".baner-slider-pagination-number");
		setTimeout(() => {
			baner.autoplay.start();
			baner.params.autoplay.delay = 2500;
		}, 5250);
	}

	let home_second;
	if (!$(".home-second-swiper").data("platform")) {
		screen.width < 769
			? $(".home-second-swiper").data("platform", "mobile")
			: $(".home-second-swiper").data("platform", "desktop");
	}
	if (screen.width < 769) {
		home_second = new Swiper(".home-second-swiper", {
			modules: [Navigation, Pagination, EffectFade],
			speed: 1500,
			slidesPerView: "auto",
			spaceBetween: `${remToPx(2)}rem`,
			breakpoints: {
				769: {
					spaceBetween: `${remToPx(1.5)}rem`,
				},
			},
		});
	} else {
		home_second = new Swiper(".home-second-swiper", {
			modules: [Navigation, Pagination, EffectFade],
			speed: 1500,
			slidesPerView: 1,
			spaceBetween: 30,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			pagination: {
				el: ".home-second-pagination",
			},
		});
		countSlider(home_second, ".home-second-pagination-number");
	}
	$(window).resize(function () {
		changeHomeSecond();
	});
	function changeHomeSecond() {
		if (screen.width < 769) {
			if ($(".home-second-swiper").data("platform") == "desktop") {
				$(".home-second-swiper").data("platform", "mobile");
				home_second.destroy();
				home_second = new Swiper(".home-second-swiper", {
					modules: [Navigation, Pagination, EffectFade],
					speed: 2000,
					slidesPerView: "auto",
					spaceBetween: `${remToPx(2)}rem`,
					breakpoints: {
						769: {
							spaceBetween: `${remToPx(1.5)}rem`,
						},
					},
				});
			}
		} else {
			if ($(".home-second-swiper").data("platform") == "mobile") {
				$(".home-second-swiper").data("platform", "desktop");
				home_second.destroy();
				home_second = new Swiper(".home-second-swiper", {
					modules: [Navigation, Pagination, EffectFade],
					speed: 2000,
					slidesPerView: 1,
					spaceBetween: 30,
					effect: "fade",
					fadeEffect: {
						crossFade: true,
					},
					pagination: {
						el: ".home-second-pagination",
					},
				});
			}
		}
	}

	$(".home-second-swiper-btn--next").on("click", function (e) {
		e.preventDefault();
		home_second.slideNext();
	});
	$(".home-second-swiper-btn--prev").on("click", function (e) {
		e.preventDefault();
		home_second.slidePrev();
	});

	function startProgramAnim() {
		setTimeout(() => {
			$(".home-programs-img").css("left", 0);
			$(".home-programs-img").addClass("change");
			$(".home-programs--left").addClass("start");

			setTimeout(() => {
				$(".home-programs--anime").removeClass("home-programs--anime");
				setTimeout(() => {
					$(".home-programs--swiper-img")
						.find(".swiper-wrapper")
						.css("transition", "unset");
					const home_programs_img = new Swiper(".home-programs--swiper-img", {
						modules: [Navigation, Pagination, EffectCoverflow, Thumbs],
						speed: 2000,
						slidesPerView: "auto",
						centeredSlides: true,
						effect: "coverflow",
						coverflowEffect: {
							rotate: 0,
							stretch: 0,
							depth: 300,
							modifier: 3,
							slideShadows: false,
							scale: 1.12,
						},
						pagination: {
							el: ".home-programs-pagination",
						},
						breakpoints: {
							coverflowEffect: {
								rotate: 0,
								stretch: 0,
								depth: 1000,
								modifier: 2,
								slideShadows: false,
								scale: 1.7,
							},
						},
					});
					$(".home-programs-btn--next").on("click", function (e) {
						e.preventDefault();
						home_programs_img.slideNext();
					});
					$(".home-programs-btn--prev").on("click", function (e) {
						e.preventDefault();
						home_programs_img.slidePrev();
					});
					countSlider(home_programs_img, ".home-programs-pagination-number");
					home_programs_img.on("slideChange", function () {
						home_programs_info.slideTo(this.activeIndex, 2000);
					});
				}, 50);
			}, 1000);
		}, 500);
	}
	if ($(".home-programs").length) {
		if (screen.width < 769) {
			$(".home-programs--swiper-img")
				.find(".swiper-wrapper")
				.css("transition", "unset");
			$(".home-programs--anime").removeClass("home-programs--anime");
			const home_programs_img = new Swiper(".home-programs--swiper-img", {
				modules: [Navigation, Pagination, EffectCoverflow, Thumbs],
				speed: 2000,
				slidesPerView: "auto",
				centeredSlides: true,
				effect: "coverflow",
				coverflowEffect: {
					rotate: 0,
					stretch: 0,
					depth: 300,
					modifier: 3,
					slideShadows: false,
					scale: 1.12,
				},
				pagination: {
					el: ".home-programs-pagination",
				},
				breakpoints: {
					coverflowEffect: {
						rotate: 0,
						stretch: 0,
						depth: 1000,
						modifier: 2,
						slideShadows: false,
						scale: 1.7,
					},
				},
			});
			home_programs_img.on("slideChange", function () {
				home_programs_info.slideTo(this.activeIndex, 2000);
			});
		} else {
			$(document).scroll(function () {
				if (
					$(this).scrollTop() > $(".home-programs").position().top &&
					$(this).scrollTop() <
					$(".home-programs").position().top + $(".home-programs").height() &&
					!$(".home-programs").hasClass("playing")
				) {
					$(".home-programs").addClass("playing");
					startProgramAnim();
				}
			});
		}
	}
	const home_programs_info = new Swiper(".home-programs--swiper-text", {
		modules: [Navigation, Pagination, EffectFade, Thumbs],
		speed: 2000,
		slidesPerView: 1,
		spaceBetween: 30,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
	});

	let home_review_swiper;
	if (!$(".home-review-swiper").data("platform")) {
		screen.width < 769
			? $(".home-review-swiper").data("platform", "mobile")
			: $(".home-second-swiper").data("platform", "desktop");
	}
	if (screen.width < 769) {
		home_review_swiper = new Swiper(".home-review-swiper", {
			modules: [Navigation, Pagination, EffectCreative],
			speed: 2000,
			slidesPerView: "auto",
			spaceBetween: `${remToPx(3.2)}rem`,
			pagination: {
				el: ".home-review-pagination",
			},
			breakpoints: {
				769: {
					slidesPerView: 1,
				},
			},
		});
	} else {
		home_review_swiper = new Swiper(".home-review-swiper", {
			modules: [Navigation, Pagination, EffectCreative],
			speed: 2000,
			slidesPerView: 1,
			loop: true,
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
		countSlider(home_review_swiper, ".home-review-pagination-number");
	}
	$(window).resize(function () {
		changeHomeSecond();
	});

	const home_review_swiper__img = new Swiper(".home-review-swiper--img", {
		modules: [Navigation, Pagination, EffectCreative],
		speed: 2000,
		slidesPerView: 1,
		loop: true,
		spaceBetween: `${remToPx(1.5)}rem`,
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
	const home_review_swiper__text = new Swiper(".home-review-swiper--text", {
		modules: [Navigation, Pagination, EffectFade],
		speed: 2000,
		slidesPerView: 1,
		loop: true,
		spaceBetween: `${remToPx(1.5)}rem`,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
	});
	function changeHomeSecond() {
		if (screen.width < 769) {
			if ($(".home-review-swiper").data("platform") == "desktop") {
				$(".home-review-swiper").data("platform", "mobile");
				home_review_swiper.destroy();
				home_review_swiper = new Swiper(".home-review-swiper", {
					modules: [Navigation, Pagination, EffectCreative],
					speed: 2000,
					slidesPerView: "auto",
					spaceBetween: `${remToPx(1.5)}rem`,
					pagination: {
						el: ".home-review-pagination",
					},
					breakpoints: {
						769: {
							slidesPerView: 1,
						},
					},
				});
			}
		} else {
			if ($(".home-review-swiper").data("platform") == "mobile") {
				$(".home-review-swiper").data("platform", "desktop");
				home_review_swiper.destroy();
				home_review_swiper = new Swiper(".home-review-swiper", {
					modules: [Navigation, Pagination, EffectCreative],
					speed: 2000,
					slidesPerView: "auto",
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
			}
		}
	}

	$(".home-review-btn--next").on("click", function (e) {
		e.preventDefault();
		home_review_swiper.slideNext();
		home_review_swiper__text.slideNext();
		home_review_swiper__img.slideNext();
	});
	$(".home-review-btn--prev").on("click", function (e) {
		e.preventDefault();
		home_review_swiper__img.slidePrev();
		home_review_swiper__text.slidePrev();
		home_review_swiper.slidePrev();
	});

	$(".home-command-slide").each(function (i) {
		(i + 1) % 2 ? $(this).data("rot", 30) : $(this).data("rot", -30);
	});
	let home_command_swiper;
	function mainCommandSwiper() {
		if (screen.width < 769) {
			if ($(".home-command-swiper").data("platform") == "desktop") {
				$(".home-second-swiper").data("platform", "mobile");
				home_second.destroy();
				home_command_swiper = new Swiper(".home-command-swiper", {
					modules: [Navigation, Pagination, EffectFade, EffectCreative],
					speed: 1500,
					slidesPerView: 1,
					spaceBetween: 300,
					pagination: {
						el: ".home-command-pagination",
					},
					effect: "fade",
					fadeEffect: {
						crossFade: true,
					},
				});
			}
		} else {
			if ($(".home-command-swiper").data("platform") == "mobile") {
				$(".home-second-swiper").data("platform", "desktop");
				home_second.destroy();
				home_command_swiper = new Swiper(".home-command-swiper", {
					modules: [Navigation, Pagination, EffectFade, EffectCreative],
					direction: "vertical",
					speed: 1500,
					slidesPerView: 1,
					spaceBetween: 300,
					pagination: {
						el: ".home-command-pagination",
					},
					effect: "creative",
					creativeEffect: {
						prev: {
							translate: [0, "-200%", 0],
							rotate: [0, 0, 0],
						},
						next: {
							translate: [0, 0, -1],
							rotate: [0, 0, 0],
						},
					},
				});
			}
		}
	}
	if (!$(".home-command-swiper").data("platform")) {
		screen.width < 769
			? $(".home-second-swiper").data("platform", "mobile")
			: $(".home-second-swiper").data("platform", "desktop");
	}
	mainCommandSwiper();
	if (screen.width < 769) {
		home_command_swiper = new Swiper(".home-command-swiper", {
			modules: [Navigation, Pagination, EffectFade, EffectCreative],
			speed: 1500,
			slidesPerView: 1,
			spaceBetween: 300,
			pagination: {
				el: ".home-command-pagination",
			},
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
		});
	} else {
		home_command_swiper = new Swiper(".home-command-swiper", {
			modules: [Navigation, Pagination, EffectFade, EffectCreative],
			direction: "vertical",
			speed: 1500,
			slidesPerView: 1,
			spaceBetween: 300,
			pagination: {
				el: ".home-command-pagination",
			},
			effect: "creative",
			creativeEffect: {
				prev: {
					translate: [0, "-200%", 0],
					rotate: [0, 0, 0],
				},
				next: {
					translate: [0, 0, -1],
					rotate: [0, 0, 0],
				},
			},
		});
		countSlider(home_command_swiper, ".home-command-pagination-number");
	}

	countSlider(home_command_swiper, ".home-command-pagination-number");
	const home_command_text = new Swiper(".home-command-swiper--text", {
		modules: [Navigation, Pagination, EffectFade, Thumbs],
		speed: 1500,
		slidesPerView: 1,
		spaceBetween: 300,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
	});
	home_command_swiper.on("slideChange", function () {
		home_command_text.slideTo(this.activeIndex, 2000);
	});
	home_command_text.on("slideChange", function () {
		home_command_swiper.slideTo(this.activeIndex, 2000);
	});
	$(".home-command-swiper-btns--right").on("click", function () {
		const deg = $(".home-command-slide.swiper-slide-active").data("rot");
		home_command_swiper.params.creativeEffect.prev.rotate = [0, 0, deg];
		home_command_swiper.slideNext();
		home_command_swiper.init();
	});
	$(".home-command-swiper-btns--left").on("click", function () {
		const deg = $(".home-command-slide.swiper-slide-active").data("rot");
		home_command_swiper.params.creativeEffect.prev.rotate = [0, 0, deg];
		home_command_swiper.slidePrev();
		home_command_swiper.init();
	});
	$(window).resize(function () {
		mainCommandSwiper();
	});

	$(".home-command-slide-other").each(function (i) {
		(i + 1) % 2 ? $(this).data("rot", 30) : $(this).data("rot", -30);
	});
	let home_command_swiper_other;
	function mainCommandSwiperOther() {
		if (screen.width < 769) {
			if ($(".home-command-swiper-other").data("platform") == "desktop") {
				$(".home-second-swiper").data("platform", "mobile");
				home_second.destroy();
				home_command_swiper_other = new Swiper(".home-command-swiper-other", {
					modules: [Navigation, Pagination, EffectFade, EffectCreative],
					speed: 1500,
					slidesPerView: 1,
					spaceBetween: 300,
					pagination: {
						el: ".home-command-pagination-other",
					},
					effect: "fade",
					fadeEffect: {
						crossFade: true,
					},
				});
			}
		} else {
			if ($(".home-command-swiper").data("platform") == "mobile") {
				$(".home-second-swiper").data("platform", "desktop");
				home_second.destroy();
				home_command_swiper_other = new Swiper(".home-command-swiper-other", {
					modules: [Navigation, Pagination, EffectFade, EffectCreative],
					direction: "vertical",
					speed: 1500,
					slidesPerView: 1,
					spaceBetween: 300,
					pagination: {
						el: ".home-command-pagination-other",
					},
					effect: "creative",
					creativeEffect: {
						prev: {
							translate: [0, "-200%", 0],
							rotate: [0, 0, 0],
						},
						next: {
							translate: [0, 0, -1],
							rotate: [0, 0, 0],
						},
					},
				});
			}
		}
	}
	if (!$(".home-command-swiper-other").data("platform")) {
		screen.width < 769
			? $(".home-second-swiper").data("platform", "mobile")
			: $(".home-second-swiper").data("platform", "desktop");
	}
	mainCommandSwiperOther();
	if (screen.width < 769) {
		home_command_swiper_other = new Swiper(".home-command-swiper-other", {
			modules: [Navigation, Pagination, EffectFade, EffectCreative],
			speed: 1500,
			slidesPerView: 1,
			spaceBetween: 300,
			pagination: {
				el: ".home-command-pagination-other",
			},
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
		});
	} else {
		home_command_swiper_other = new Swiper(".home-command-swiper-other", {
			modules: [Navigation, Pagination, EffectFade, EffectCreative],
			direction: "vertical",
			speed: 1500,
			slidesPerView: 1,
			spaceBetween: 300,
			pagination: {
				el: ".home-command-pagination-other",
			},
			effect: "creative",
			creativeEffect: {
				prev: {
					translate: [0, "-200%", 0],
					rotate: [0, 0, 0],
				},
				next: {
					translate: [0, 0, -1],
					rotate: [0, 0, 0],
				},
			},
		});
		countSlider(home_command_swiper_other, ".home-command-pagination-number-other");
	}

	countSlider(home_command_swiper_other, ".home-command-pagination-number-other");
	const home_command_text_other = new Swiper(".home-command-swiper--text-other", {
		modules: [Navigation, Pagination, EffectFade, Thumbs],
		speed: 1500,
		slidesPerView: 1,
		spaceBetween: 300,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
	});
	const home_command_buttons_swiper = new Swiper(".home-command-buttons-swiper", {
		modules: [EffectFade],
		speed: 1500,
		slidesPerView: 1,
		spaceBetween: 300,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
	});
	home_command_swiper_other.on("slideChange", function () {
		home_command_text_other.slideTo(this.activeIndex, 2000);
		home_command_buttons_swiper.slideTo(this.activeIndex, 2000);
	});
	home_command_text_other.on("slideChange", function () {
		home_command_swiper_other.slideTo(this.activeIndex, 2000);
		home_command_buttons_swiper.slideTo(this.activeIndex, 2000);
	});
	$(".home-command-swiper-btns--right-other").on("click", function () {
		const deg = $(".home-command-slide-other.swiper-slide-active").data("rot");
		home_command_swiper_other.params.creativeEffect.prev.rotate = [0, 0, deg];
		home_command_swiper_other.slideNext();
		home_command_swiper_other.init();
	});
	$(".home-command-swiper-btns--left-other").on("click", function () {
		const deg = $(".home-command-slide-other.swiper-slide-active").data("rot");
		home_command_swiper_other.params.creativeEffect.prev.rotate = [0, 0, deg];
		home_command_swiper_other.slidePrev();
		home_command_swiper_other.init();
	});
	$(window).resize(function () {
		mainCommandSwiperOther();
	});

	if (screen.width < 769) {
		const home_advantages_swiper = new Swiper(".home-advantages-swiper", {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 30,
			pagination: {
				el: ".home-advantages-pagination",
			},
		});
	}

	const home_client_swiper = new Swiper(".home-client--swiper", {
		modules: [Navigation, Pagination, EffectCoverflow],
		speed: 2000,
		slidesPerView: 'auto',
		centeredSlides: true,
		effect: "coverflow",
		loop: true,
		coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 300,
			modifier: 1,
			slideShadows: false,
			scale: 1.12,
		},
		breakpoints: {
			slidesPerView: 4,
			coverflowEffect: {
				rotate: 0,
				stretch: 0,
				depth: 1000,
				modifier: 2,
				slideShadows: false,
				scale: 1.7,
			},
		},
	});
});
