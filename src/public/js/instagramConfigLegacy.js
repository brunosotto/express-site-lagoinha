 var instagram = (function ($) {

     $(window).on('load', function() {
          $.instagramFeed({
                'username': 'legacypromissao',
                'container': "#instagramLegacy",
                'display_profile': true,
                'display_biography': false,
                'display_gallery': true,
                'callback': null,
                'styling': true,
                'items': 9,
                'items_per_row': 3,
                'margin': 1,
                'lazy_load': true 
     });
     });
     

 })(jQuery)