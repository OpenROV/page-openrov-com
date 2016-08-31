jQuery(document).ready(function( $ ) {

    $('body').waypoint({
        offset: -200,
        handler: function(direction) {
            const banner = $('#pre-order-banner');
            if(direction === 'down'){
                banner.addClass("sticky");
            }
            else{
                banner.removeClass("sticky");
            }
        }
    });

});
