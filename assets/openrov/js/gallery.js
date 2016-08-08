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
      $('.image-container .v-container').fadeOut(100);
    }    
  }

})();