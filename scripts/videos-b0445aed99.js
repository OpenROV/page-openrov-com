"use strict";$(".trident-video.slider-for").slick({slidesToShow:1,slidesToScroll:1,arrows:!0,fade:!0,asNavFor:".trident-video.slider-nav",swipeToSlide:!0});var navSlider=$(".trident-video.slider-nav").slick({asNavFor:".trident-video.slider-for",infinite:!0,speed:300,slidesToShow:1,centerMode:!0,variableWidth:!0,focusOnSelect:!0});$(".trident-video.slider-for").on("beforeChange",function(evt,slick,current,next){$(".trident-video.slider-description").slick("slickGoTo",next)}),$(document).ready(function(){YT.ready(function(){$("iframe.youtube.trident-video").each(function(idx,element){var player=void 0;player=new YT.Player(element,{events:{onStateChange:function(status){0===status.data&&(player.seekTo(0),player.pauseVideo(),$(element).closest(".slick").slick("slickNext"))}}})})})});