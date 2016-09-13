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

    $('.usecase-arrow.right').click(function(a, b) {
        const modalId = parseInt($(this).find('a')[0].dataset.modalId);
        $('#modal-' + (modalId +1)).modal('toggle');
        $('#modal-' + modalId).modal('toggle');
    });

    $('.usecase-arrow.left').click(function(a, b) {
        const modalId = parseInt($(this).find('a')[0].dataset.modalId);
        $('#modal-' + (modalId -1)).modal('toggle');
        $('#modal-' + modalId).modal('toggle');
    });
    


});
