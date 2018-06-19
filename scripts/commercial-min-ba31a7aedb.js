"use strict";!function(n){function e(n,e){var t=[n.find("#email"),n.find("#name"),n.find("#phone"),n.find("#company"),n.find("#industry"),n.find("#descriptionField"),n.find("#website")],a=!1;return t.forEach(function(n){var t=n.val();if(e&&n[0]!==e)return!0;n.removeClass("is-invalid"),0!=t.trim().length&&n[0].checkValidity()||(a=!0,n.addClass("is-invalid"))}),a}function t(n){n.removeClass("show"),setTimeout(function(){return n.remove()},500)}function a(e,t,a,i,o,r,d){var c="Commercial contact form \n----------------------------------\nDate/time: "+new Date+"\nName: "+t+"\nEMail: "+e+"\nPhone: "+a+"\nCompany: "+i+"\nIndustry: "+o+"\nWebsite: "+d+"\nDescription:\n"+r+"\n\n",l={subject:"[Commercial Contact] By "+t,tags:["web","request","commercial"],via_id:48,comment:{body:c},requester:{name:t,email:e,locale_id:1},fields:{}};return n.ajax({type:"POST",url:"https://openrov.zendesk.com/api/v2/requests.json",data:JSON.stringify({request:l}),dataType:"json",contentType:"application/json",beforeSend:function(n){n.setRequestHeader("Authorization","Basic "+btoa(e+"/token:6A9xaIrAeQda4gPIMxpba8NILmYRPfPx11QbV8f2"))}})}var i=[];n(".contact-us").click(function(){n("#email").animate({left:0,duration:"slow",complete:function(){return n("#email").focus()}})});var o=(new Waypoint({element:n(".contact-cta").get(0),handler:function(e){"down"==e?(n("body").append('<div class="modal-backdrop cta d-none d-md-block"></div>'),setTimeout(function(){n(".modal-backdrop.cta").addClass("show").click(function(){t(n(this))})},1)):t(n(".modal-backdrop.cta"))},offset:"bottom-in-view"}),n("#form"));o.find("#uniqueId").val((new Date).valueOf()),o.find("input").on("change",function(n){e(o,n.currentTarget)}),o.find("textarea").on("change",function(n){return e(o)}),o.find("#send").on("click",function(n){n.preventDefault();var t=o.find("#uniqueId"),r=t.val();if(!(i.indexOf(r)>=0)){var d=e(o);try{if(d)return!1;var c=o.find("#email").val(),l=o.find("#name").val(),s=o.find("#phone").val(),f=o.find("#company").val(),u=o.find("#industry").val(),m=o.find("#descriptionField").val(),v=o.find("#website").val();i.push(r),a(c,l,s,f,u,m,v).done(function(n){alert("Thank you for your contact request. You will hear from us shortly."),o.find("#send").prop("disabled",!1),t.val((new Date).valueOf()),allFields.forEach(function(n){return n.val("")})}).fail(function(n){alert("Whoops, something went wrong. Please try again later."),o.find("#send").prop("disabled",!1),t.val((new Date).valueOf())})}catch(n){return void console.error(n)}}})}($);
