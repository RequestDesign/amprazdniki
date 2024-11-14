import $ from "jquery";
$(document).ready(function () {

	$(document).on('keyup', (evt) => {
		evt.keyCode === 27 ? closeModal() : null;
	})

	$('[data-modal="food"]').on('click', () => {
		$('.food-modal').addClass('active');
	});
	$('[data-modal="request"]').on('click', () => {
		$('.request-modal').addClass('active');
	});
	$('[data-modal="decor"]').on('click', () => {
		$('.decor-modal').addClass('active');
	});

	$('[data-modal]').on('click', () => {
		$('body').addClass('lock');
	})

	$('.modal-back').on('click', closeModal);
	$('.modal-return').on('click', closeModal);
	$('.modal-exit').on('click', closeModal);

	function closeModal() {
		$('.modal').removeClass('active');
		$('body').removeClass('lock');
	}
})