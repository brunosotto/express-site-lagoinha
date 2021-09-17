window.onload = () => {
    gifs = [
        'https://media.giphy.com/media/5hmgkaHWSG35JkUC1j/giphy.gif',
        'https://media.giphy.com/media/KMcZ9XZeQIks8/giphy.gif',
        'https://media.giphy.com/media/UUt004fWdavuIHQ3Ds/giphy.gif',
        'https://media.giphy.com/media/3o7TKtOG3L80INQpfa/giphy.gif',
        'https://media.giphy.com/media/ycep8jWZELSOND02y1/giphy.gif',
        'https://thumbs.gfycat.com/EarnestShamelessGlassfrog-size_restricted.gif',
        'https://media.giphy.com/media/uACYCFEsVauYjTwtWp/giphy.gif',
        'https://media.giphy.com/media/kEZtOQwrQ2mVa/giphy.gif',
        'https://media.giphy.com/media/4JXNjv3MR21YXfsaqQ/giphy.gif',
        'https://media.giphy.com/media/7VC09OrvhvXpe/giphy.gif',
        'https://media.giphy.com/media/xUySTUzieFLBVIb97y/giphy.gif',
        'https://media.giphy.com/media/3RID97HU3TxEk/giphy.gif',
        'https://media.giphy.com/media/Tt8w4jipv7Tva/giphy.gif',
        'https://media.giphy.com/media/iHDkK61FCXnck/giphy.gif',
        'https://media.giphy.com/media/4RZgG6wU5BQkM/giphy.gif',
    ];
    
    
    const divAppend = $('<div>')
        .addClass('appended')
        .append(
            $('<img>').addClass('logo').attr('src', 'https://static.wixstatic.com/media/7e2a71_46af000ff66b453f8259853edadff4a7~mv2.jpg/v1/fill/w_291,h_223,al_c,q_80,usm_0.66_1.00_0.01/legacy.webp'),
            $('<img>').addClass('gif').attr('src', gifs[Math.floor(Math.random() * gifs.length)]),
            $('<h1>').text('Mande sua selfie'),
            $('<h2>').text('Tire agora mesmo uma selfie em seu Instagram e marque o Legacy Jovens Promissão (@legacypromissao) e sua foto aparecerá aqui em instantes')
        );
    $('body').append(divAppend);

    setTimeout(() => {
        init();
    }, 3500);
}

function init() {
    while($('.v1Nh3').length > 8){
        $('.v1Nh3').last().remove();
    }
    
    $('html, body').animate({
        scrollTop: $(document).height()
    }, 25000, 'linear');

    $(window).scroll(() => {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            setTimeout(() => {
                location.reload();
            }, 200);
        }
    });
}