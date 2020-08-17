 var instagram = (function ($) {

     $(window).on('load', function() {
          $.instagramFeed({
                'username': 'lagoinhapromissao',
                'container': "#instagramLP",
                'display_profile': true,
                'display_biography': true,
                'display_gallery': true,
                'callback': null,
                'styling': true,
                'items': 8,
                'items_per_row': 4,
                'margin': 1,
                'lazy_load': true 
     });
     });
     

 })(jQuery)