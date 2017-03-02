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
        $('#modal-' + (modalId +1)).modal('show');
        $('.modal-backdrop').first().hide();

        $('#modal-' + (modalId)).delay(200).fadeOut(450);
        setTimeout(function() {
            $('#modal-' + (modalId)).modal('hide');
        }, 650);
    });

    $('.usecase-arrow.left').click(function(a, b) {
        const modalId = parseInt($(this).find('a')[0].dataset.modalId);
        // when we move to the previous modal, that modal is lower in the html node list,
        // therefore is 'behind' the current one z-index wise.
        // therefore we have to move the next slide to a higher z-index to make it the top most layer.
        // At the end this is pub back to how it should be. 
        const currentZIndex = parseInt( $('#modal-' + (modalId)).css( "z-index" ), 10 );
        
        $('#modal-' + (modalId -1)).modal('show');
        $('#modal-' + (modalId -1)).css('z-index', currentZIndex +1);
        
        $('.modal-backdrop').first().hide();

        $('#modal-' + (modalId)).delay(200).fadeOut(450);
        setTimeout(function() {
            $('#modal-' + (modalId)).modal('hide');
            $('#modal-' + (modalId -1)).css('z-index', currentZIndex);
        }, 650);

    });
    


});

//# sourceMappingURL=maps/main.js.map
