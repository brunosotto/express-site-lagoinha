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
    var dir = 'images/galeria/'; // Carregar fotos da pasta images galeria
    var fileextension = '.jpeg'; // formato da imagem
    var i = '1';

    $(function imageloop() {
        $('<img style="margin: 10px 0 10px 0;padding: 5px;border-radius: 10px;" />')
            .attr('src', dir + i + fileextension)
            .appendTo('.galeriadizimo');
        if (i == 13) {
            // alert('imagems carregadas');
        } else {
            i++;
            imageloop();
        }
    });

    return {
        selectNav,
    };
})(jQuery);
