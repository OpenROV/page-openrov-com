"use strict";!function(e){function i(i){setTimeout(function(){e("html,body").animate({scrollTop:e(i).offset().top-100},"slow")},250)}e(".carousel").bcSwipe({threshold:50}),e("#feature-list .slide-selector").on("mouseenter",function(){e("#feature-list").carousel(parseInt(this.dataset.slideTo))}),e('a[href="#specs"]').click(function(e){i("#specs")}),e(function(){location.hash&&(e('[href="'+location.hash+'"]'),i(location.hash))});var o=e(".page-header");o.length>0&&e(window).scroll(function(){e(document).scrollTop()>o.position().top?o.find(".sub-nav").addClass("fixed-top"):o.find(".sub-nav").removeClass("fixed-top")})}($),$(".trident-video.slider-for").slick({slidesToShow:1,slidesToScroll:1,arrows:!0,fade:!0,asNavFor:".trident-video.slider-nav",swipeToSlide:!0});var navSlider=$(".trident-video.slider-nav").slick({asNavFor:".trident-video.slider-for",infinite:!0,speed:300,slidesToShow:1,centerMode:!0,variableWidth:!0,focusOnSelect:!0});$(".trident-video.slider-for").on("beforeChange",function(e,i,o,t){$(".trident-video.slider-description").slick("slickGoTo",t)}),$(".slick.center.video").slick({centerMode:!0,centerPadding:"60px",slidesToShow:1}),$(document).ready(function(){YT.ready(function(){$("iframe.youtube.trident-video").each(function(e,i){var o=void 0;o=new YT.Player(i,{events:{onStateChange:function(e){0===e.data&&(o.seekTo(0),o.pauseVideo(),$(i).closest(".slick").slick("slickNext"))}}})})})});