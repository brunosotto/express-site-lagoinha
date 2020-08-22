 var home = (function ($) {
    "use strict";

/*************************  Navegação  *****************************/
	$('.nav').onePageNav({
	filter: ':not(.external)',
	scrollThreshold: 0.25,
	scrollOffset: 90,
	});

/******************************  ScrollUp  *********************************/
	 $(window).scroll(function(){
		 if ($(this).scrollTop() > 100) {
			 $('.scrollup').fadeIn();
		 } else {
			 $('.scrollup').fadeOut();
		 }
	 }); 
 
	 $('.scrollup').click(function(){
		 $("html, body").animate({ scrollTop: 0 }, 600);
		 return false;
	 });



/*************************  Slider Revolution Home  *****************************/
	if($('.fullwidthbanner').length) {

		$('.fullwidthbanner').revolution({
			hideThumbs:1,
			startwidth:1140,
			startheight:370,
			shadow:0,
			touchenabled:"on",
			navigationType: "bullet",
			navigationStyle: "round-old",
			hideAllCaptionAtLimit: 350,
		});
	}

/***************************  prettyPhoto  ********************************/

	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});

    $("a[rel^='prettyPhoto']").prettyPhoto();
 
	return home;
})(jQuery)