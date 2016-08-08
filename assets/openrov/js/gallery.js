(function() {
  'use strict'

  const slider = $('.slider');

  // slider.on('init',(slick) => {
  //   setTimeout(() => { 
  //     // slider.slick('slickGoto', 1);
  //     slider.slick('slickPlay'); 
  //   }, 200);
  // });

  slider.on('beforeChange',(event, slick, currentSlide, nextSlide) => {
    setImage(nextSlide);
  });

  slider.slick({
    slidesToShow: 5,
    dots: false,
    arrows: false,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    lazyLoad: 'ondemand',
  });

  $(() => {
    setImageToUrl(($('.slider .slick-current').find('img').data('lazy')));

    $('.arrow.left .arrow-container').click(() => {
      slider.slick('slickPrev');
      return false;
    })
    $('.arrow.right .arrow-container').click(() => {
      slider.slick('slickNext');
      return false;
    })
    $('.image-container').on( "swipeleft", () => {
      slider.slick('slickNext');
      return false;
    });
    $('.image-container').on( "swiperight", () => {
      slider.slick('slickPrev');
      return false;
    });

  });

  function setImage(nextSlide) {
    const image = slider.slick("getSlick").$slides.eq(nextSlide).find('img');
    let url = image.prop('src');
    if (url == '') {
      url = image.data('lazy');
    }
    setImageToUrl(url);
  }

  function setImageToUrl(url) {
    $('.image-container').css('background-image', 'url(' + url.trim() + ')');
    if (url != '') {
      $('.image-container .v-container .text-hide').fadeOut(100);
    }    
  }

})();