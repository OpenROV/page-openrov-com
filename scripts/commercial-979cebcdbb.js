"use strict";!function($){function validate(form,changedElement){var allFields=[form.find("#email"),form.find("#name"),form.find("#phone"),form.find("#company"),form.find("#industry"),form.find("#descriptionField"),form.find("#website")],error=!1;return allFields.forEach(function(field){var val=field.val();if(changedElement&&field[0]!==changedElement)return!0;field.removeClass("is-invalid"),0!=val.trim().length&&field[0].checkValidity()||(error=!0,field.addClass("is-invalid"))}),error}function closeBackdrop(backdrop){backdrop.removeClass("show"),setTimeout(function(){return backdrop.remove()},500)}function send(email,name,phone,company,industry,description,website){var body="Commercial contact form \n----------------------------------\nDate/time: "+new Date+"\nName: "+name+"\nEMail: "+email+"\nPhone: "+phone+"\nCompany: "+company+"\nIndustry: "+industry+"\nWebsite: "+website+"\nDescription:\n"+description+"\n\n",request={subject:"[Commercial Contact] By "+name,tags:["web","request","commercial"],via_id:48,comment:{body:body},requester:{name:name,email:email,locale_id:1},fields:{}};return $.ajax({type:"POST",url:"https://openrov.zendesk.com/api/v2/requests.json",data:JSON.stringify({request:request}),dataType:"json",contentType:"application/json",beforeSend:function(xhr){xhr.setRequestHeader("Authorization","Basic "+btoa(email+"/token:6A9xaIrAeQda4gPIMxpba8NILmYRPfPx11QbV8f2"))}})}var sentIds=[];$(".contact-us").click(function(){$("#email").animate({left:0,duration:"slow",complete:function(){return $("#email").focus()}})});var form=(new Waypoint({element:$(".contact-cta").get(0),handler:function(direction){"down"==direction?($("body").append('<div class="modal-backdrop cta d-none d-md-block"></div>'),setTimeout(function(){$(".modal-backdrop.cta").addClass("show").click(function(){closeBackdrop($(this))})},1)):closeBackdrop($(".modal-backdrop.cta"))},offset:"bottom-in-view"}),$("#form"));form.find("#uniqueId").val((new Date).valueOf()),form.find("input").on("change",function(ev){validate(form,ev.currentTarget)}),form.find("textarea").on("change",function(ev){return validate(form)}),form.find("#send").on("click",function(ev){ev.preventDefault();var uniqueIdField=form.find("#uniqueId"),uniqueId=uniqueIdField.val();if(!(sentIds.indexOf(uniqueId)>=0)){var error=validate(form);try{if(error)return!1;var email=form.find("#email").val(),name=form.find("#name").val(),phone=form.find("#phone").val(),company=form.find("#company").val(),industry=form.find("#industry").val(),description=form.find("#descriptionField").val(),website=form.find("#website").val();sentIds.push(uniqueId),send(email,name,phone,company,industry,description,website).done(function(res){alert("Thank you for your contact request. You will hear from us shortly."),form.find("#send").prop("disabled",!1),uniqueIdField.val((new Date).valueOf()),allFields.forEach(function(f){return f.val("")})}).fail(function(err){alert("Whoops, something went wrong. Please try again later."),form.find("#send").prop("disabled",!1),uniqueIdField.val((new Date).valueOf())})}catch(err){return void console.error(err)}}})}($);
