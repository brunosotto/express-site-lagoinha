var home = (function ($) {
    'use strict';

    /*************************  Navegação  *****************************/
    const def = 'main';
    const offtop = 80;
    const objSectionsScrool = {};

    function selectNav(id) {
        $('a.nav-link').each(function () {
            const $this = $(this);
            const hash = $this.get(0).hash;
            const path = $this.get(0).pathname;
            if (hash === `#${id}` || path === `/${id}`) {
                $this.parent().addClass('active');
            } else {
                $this.parent().removeClass('active');
            }
        });
    }

    function onScrollFunction() {
        const scrollTop = $(this).scrollTop();
        // somente sectons da home
        if (!$('.home section').length) return;
        $('.home section').each(function () {
            const topDistance = $(this).offset().top;
            if (topDistance - offtop < scrollTop) {
                objSectionsScrool[this.id] = topDistance - offtop - scrollTop;
            } else {
                objSectionsScrool[this.id] = offtop + 20;
            }
        });
        const keyValue = Object.keys(objSectionsScrool)
            .map((k) => {
                return { key: k, value: objSectionsScrool[k] };
            })
            .filter((o) => o.value <= 0);
        keyValue.sort((a, b) => a.value - b.value);
        const onTop = keyValue.pop();
        const id = (onTop && onTop.key) || def;
        selectNav(id);
    }
    $(window).on('scroll', onScrollFunction);
    onScrollFunction();

    /******************************  ScrollUp  *********************************/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    /*************************  Slider Revolution Home  *****************************/
    if ($('.fullwidthbanner').length) {
        $('.fullwidthbanner').revolution({
            hideThumbs: 1,
            startwidth: 1140,
            startheight: 370,
            shadow: 0,
            touchenabled: 'on',
            navigationType: 'bullet',
            navigationStyle: 'round-old',
            hideAllCaptionAtLimit: 350,
        });
    }

    /***************************  Fotos Galaria dizimo  ********************************/
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    const dir = 'images/galeria/'; // Carregar fotos da pasta images galeria
    const fileextension = '.jpeg'; // formato da imagem
    const qtde = 13;
    const arr = Array.from(Array(qtde), (_, i) => i + 1);
    const limit = 3;

    shuffle(arr).slice(0, limit).forEach(i => {
        $('<img style="margin: 10px 0 10px 0;padding: 5px;border-radius: 10px;" />')
            .attr('src', dir + i + fileextension)
            .appendTo('.galeriadizimo');
    });

    return {
        selectNav,
    };
})(jQuery);
