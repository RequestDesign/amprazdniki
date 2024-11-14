import $ from "jquery";


function remToPx(remValue) {
    // Получаем текущий базовый размер шрифта (font-size) из элемента <html>
    var htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    // Переводим значение из rem в px
    var pxValue = remValue * htmlFontSize;

    // Округляем значение до целых пикселей (по желанию)
    return Math.round(pxValue) + 'px';
}
$(document).ready(function () {
    if($('.baner').length) {
        if(!localStorage.getItem('enter')) {
            setTimeout(() => {
                const main = $('.baner-slide--active')
                main.addClass('show')
                // $('.baner-slider-main img').css('top', $('.baner-slide--active').offset().top)
                // $('.baner-slider-main img').css('left', $('.baner-slide--active').offset().left)
                setTimeout(() => {
                    $('.baner-slider-main').css('background', main.data('color'))
                    $('.header').removeClass('black')
                    $('.baner').addClass(main.data('baner'))
                    $('.header').addClass(main.data('baner'))
                }, 1000)
                setTimeout(() => {
                    $('.baner-slider').addClass('disabled')
                    // $('.baner-slider-main img').css('top', 0)
                    // $('.baner-slider-main img').css('left', 0)
                    $('.baner-slider-main').removeClass('disabled')
                    setTimeout(() => {
                        $('.baner-slider-main').addClass('showed')
                        localStorage.setItem('enter', 1);
                    }, 250)
                }, 2000)
            }, 3000)
        } else {
            $('.baner-slide--active').addClass('show')
            $('.header').removeClass('black')
            $('.header').addClass('white')
            $('.baner').addClass('white')
            $('.baner-slider').css('display','none')
            $('.baner-slider-main').removeClass('disabled')
            $('.baner-slider-main').addClass('showed')
        }

    }
})


$(document).ready(function(){
    if (screen.width > 769) {
        const slides = [];
        $('.home-advantages-slide').each(function (i) {
            const windowHeight = $(window).height();
            const _this = $(this);
            const height = _this.height();
            // console.log(`${i}. position: ${_this.position().top}; offset: ${_this.offset().top}`);
            // const positionTop = _this.position().top - windowHeight * 0.6 - Number(remToPx(20 * i).slice(0, -2));
            const positionTop = _this.offset().top - windowHeight * 0.6 - Number(remToPx(20 * i).slice(0, -2));
            const positionBottom = positionTop + height * 1.13 + Number(remToPx(20).slice(0, -2));
            slides.push({el: _this, positionTop, positionBottom});
        });
    
    
        const translateAnim = (scroll) => {
            // Добавил проверку (i === slides.length - 1) чтобы последний блок не улетал вверх
            slides.forEach((item, i) => {
                // console.log(`${i}. top: ${item.positionTop}, bottom: ${item.positionBottom}, scroll: ${scroll}`);
                if (scroll > item.positionTop && (scroll <= item.positionBottom || i === slides.length - 1)) {
                    item.el.css('transform', `translateY(${-20 * i}rem)`);
                } else if (scroll > item.positionBottom && i !== slides.length - 1) {
                    // item.el.css('transform', `translateY(calc(-100vh - ${20 * i}rem))`);
                } else {
                    item.el.css('transform', 'translateY(100vh)');
                }
            });
        }
        translateAnim($(document).scrollTop());
    
        const wrapper = $('.home-advantages-wrapper');
        wrapper.height(wrapper.height() - slides.length * Number(remToPx(20).slice(0, -2)));
    
        $(document).scroll(function () {
            translateAnim($(this).scrollTop());
        });
    }
})