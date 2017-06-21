"use strict";function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function a(n,i){try{var o=t[n](i),s=o.value}catch(e){return void r(e)}if(!o.done)return Promise.resolve(s).then(function(e){a("next",e)},function(e){a("throw",e)});e(s)}return a("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function objectifyForm(e){for(var t={},r=0;r<e.length;r++)t[e[r].name]=e[r].value;return t}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),PRODUCT="5637ca44df92ea03009633b3",BuyScreen=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"isEmail",value:function(e){return/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(e)}},{key:"getData",value:function(e){var t={first_name:e.firstName,last_name:e.lastName,company:null,line1:e.address1,line2:e.address2,city:e.city,state:"US"===e.country?e.usState.toLowerCase():e.state,zip:e.zip,country:e.country.toLowerCase(),phone:e.phone};return{user_id:"5637c8d966e9ec03008989ef",buyer:{email:e.email,first_name:e.firstName,last_name:e.lastName,phone:e.phone,notes:e.notes},shipping_address:t,billing_address:Object.assign({},t,{zip:e.billingZip}),line_items:[{product_id:PRODUCT,variant_id:e.variant,quantity:parseInt(e.quantity)}],payment_source:{},discount_codes:[e.couponCode]}}},{key:"getPaymentData",value:function(e){return{card:{name:e.firstName+" "+e.lastName,number:e.ccNumber,exp_month:e.expDate.split("/")[0],exp_year:e.expDate.split("/")[1],cvc:e.cvc}}}},{key:"getVariant",value:function(e,t){var r=[];for(var a in e)a.startsWith("option_")&&r.push(e[a]);r=r.sort();var n=!0,i=!1,o=void 0;try{for(var s,c=t[Symbol.iterator]();!(n=(s=c.next()).done);n=!0){var d=s.value;if(d.options.ids.sort().join()===r.join())return d.id}}catch(e){i=!0,o=e}finally{try{!n&&c.return&&c.return()}finally{if(i)throw o}}}},{key:"calculateShipping",value:function(e){var t=objectifyForm(e.serializeArray());t.couponCode=e.find("#couponCode").val();var r=this.getData(t);return this._calculateShipping(r,e)}},{key:"_calculateShipping",value:function(){function e(e,r){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t,r){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r.find("tfoot").addClass("calculating"),e.next=3,$.ajax({async:!0,crossDomain:!0,url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(t)});case 3:a=e.sent,r.find("#shipping").text("$"+(a.shipping/100).toFixed(2)),a.discount>0?($("#discount-container").removeClass("hidden-xs-up"),$("#discount").text("$"+(a.discount/100).toFixed(2))):$("#discount-container").addClass("hidden-xs-up"),a.discounts&&a.discounts.length>0&&(r.find("#couponCode").attr("disabled",!0),r.find("#applyDiscount").addClass("btn-success").attr("disabled",!0),a.discounts.filter(function(e){return 1==e.free_shipping}).length>0&&(r.find("#freeShipping").removeClass("d-none"),r.find("#shippingContainer").addClass("d-none"))),r.find("#tax").text("$"+(a.taxes/100).toFixed(2)),r.find("#total").text("$"+(a.total/100).toFixed(2)),r.find("tfoot").removeClass("calculating");case 10:case"end":return e.stop()}},e,this)}));return e}()},{key:"getOptionText",value:function(e){var t=e.replace(/\([+$0-9].*\)/,"").trim();return"None"==t?"":'<span class="text-nowrap">'+(t=t.indexOf("Standard")>-1?t:t.replace(/Add A/,""))+"</span>"}},{key:"getOptions",value:function(e){var t=this;return e.map(function(e){return t.getOptionText(e)}).filter(function(e){return 0!=e.trim().length}).join(" +&nbsp;")}},{key:"countryChanged",value:function(e){"US"===e.options[e.selectedIndex].value?(this.orderForm.find("#usState").parent().removeClass("hidden-xs-up").attr("required",!1),this.orderForm.find("#state").attr("required",!1).parent().addClass("hidden-xs-up")):(this.orderForm.find("#state").attr("required",!0).parent().removeClass("hidden-xs-up"),this.orderForm.find("#usState").parent().addClass("hidden-xs-up").attr("required",!1)),this.orderForm.validator("update"),this.calculateShipping(this.orderForm)}},{key:"setupForm",value:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,a,n,i,o,s,c,d,l=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.ajax({url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/"+PRODUCT});case 2:return r=e.sent,$("#description").html(r.data.description),a=r.data.variants.reverse().map(function(e,t){var r=e.price/100;return'<tr class="product-row" data-product-option="'+e.options.values.join(" + ")+'"><td class="product-selector product"><input type="radio" value="'+e.id+'" name="variant" '+(0===t?"checked":"")+'></td><td class="product-info product text-center text-md-left "><span class="font-weight-bold">Trident Underwater Drone</span> <br class="hidden-sm-up">+&nbsp;'+l.getOptions(e.options.values)+'<div class="hidden-sm-up price-sm pt-3"><em><small><s class="pr-2">$'+(r+300).toFixed(2)+"</s></small></em>&nbsp;$"+r.toFixed(2)+'</div></td><td class="text-right product pricing hidden-sm-down"><em><small><s  class="pr-2">$'+(r+300).toFixed(2)+"</s></small></em>$"+r.toFixed(2)+"</td></tr>"}).join(""),t.find("#options").prepend(a),t.find("#savingsContainer").removeClass("d-none"),n=objectifyForm(t.serializeArray()),n.country="us",i=this.getData(n),this._calculateShipping(i,t),o=t.find("#country"),o.attr("data-store-loaded")||o.val("US"),this.countryChanged(o.get(0)),o.change(function(e){l.countryChanged(e.target)}),t.find("#zip").change(function(e){l.calculateShipping(t)}),t.find("#usState").change(function(e){l.calculateShipping(t)}),t.find("#quantity").change(function(e){$("#quantityOrdered").text(e.target.value);var r=parseInt(e.target.value),a=1===r?"item":"items";$("#itemsLabel").text(a),l.calculateShipping(t),t.find("#savings").text((300*r).toFixed(2))}),t.find("#ccNumber").keypress(function(e){String.fromCharCode(e.which).match(/[0-9- ]/)||e.preventDefault()}),t.find("#expDate").keypress(function(e){String.fromCharCode(e.which).match(/[0-9\/]/)||e.preventDefault()}),t.find("tr.product-row").click(function(e){var r=t.find('input[type=radio][name="variant"][checked]')[0];r&&r.removeAttribute("checked");var a=$(e.target).parent().find('input[type=radio][name="variant"]')[0];a&&a.setAttribute("checked","checked"),l.calculateShipping(t);var n=t.find('input[type=radio][name="variant"][checked]').val();localStorage.setItem("buyNow.productVariant",n)}),t.on("valid.bs.validator",function(e){e.relatedTarget.checkValidity()&&$(e.relatedTarget).parent().removeClass("has-danger").removeClass("has-error")}).on("invalid.bs.validator",function(e){console.log(e.relatedTarget.id+" "+e.detail),e.relatedTarget.checkValidity()||$(e.relatedTarget).parent().addClass("has-danger").addClass("has-error")}),s=localStorage.getItem("buyNow.productVariant"),s&&(c=t.find('input[type=radio][name="variant"][checked]')[0],c&&c.removeAttribute("checked"),d=t.find('input[type=radio][name="variant"][value='+s+"]")[0],d&&d.setAttribute("checked","checked"),this.calculateShipping(t)),e.abrupt("return",r.data.variants);case 25:case"end":return e.stop()}},e,this)}));return e}()},{key:"submit",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,a,n,i,o,s,c,d,l,u,f;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return $(window).off("beforeunload"),t=this.orderForm,r=this.billingForm,a=this.variants,r.find("#order").attr("disabled",!0).addClass("btn-secondary"),r.find("#orderProcessing").show(),n=objectifyForm(t.serializeArray()),i=this.getData(n),o=objectifyForm(r.serializeArray()),i.payment_source=this.getPaymentData(o),e.prev=8,e.next=11,$.ajax({async:!0,crossDomain:!0,url:"https://api.trycelery.com/v2/orders/checkout",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(i)});case 11:s=e.sent,c=s.data,d=c.total/100,l=c.currency,u=c.line_items.map(function(e){return e.celery_sku}).join(","),f="?number="+c.number+"&amount="+d+"&currency="+l+"&line_items="+u,this.clearStorage(),document.__isSubmitted=!0,window.location.replace(window.location.href+"../confirmation/"+f),e.next=29;break;case 22:e.prev=22,e.t0=e.catch(8),r.find(".alert .title").text(e.t0.statusText),r.find(".alert .description").text(e.t0.responseJSON.data),r.find(".alert").show(),r.find("#orderProcessing").hide(),r.find("#order").attr("disabled",!1).removeClass("btn-secondary");case 29:case"end":return e.stop()}},e,this,[[8,22]])}));return e}()},{key:"runSetupForm",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setupForm(this.orderForm);case 2:this.variants=e.sent,this.orderForm.validator("update");case 4:case"end":return e.stop()}},e,this)}));return e}()},{key:"clearStorage",value:function(){if(localStorage)for(var e=0;e<=localStorage.length;e++){var t=localStorage.key(e);t&&localStorage.removeItem(t)}}},{key:"setupStorage",value:function(){var e=this;localStorage&&$("[data-store]").on("change",function(e){var t=e.currentTarget;"INPUT"===t.tagName&&localStorage.setItem("buyNow."+t.id,$(t).val()),"SELECT"===t.tagName&&localStorage.setItem("buyNow."+t.id,$(t).val())}).each(function(t,r){if("INPUT"===r.tagName&&$(r).val(localStorage.getItem("buyNow."+r.id)),"SELECT"===r.tagName){var a=localStorage.getItem("buyNow."+r.id);a&&$(r).val(a).attr("data-store-loaded","true")}"couponCode"===r.id&&e.calculateShipping(e.orderForm)})}},{key:"sendAbandondedEmail",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.orderForm.find("#email"),!this.isEmail(t.val())){e.next=12;break}return r={email_address:t.val(),status:"subscribed",merge_fields:{FNAME:this.orderForm.find("#firstName").val(),LNAME:this.orderForm.find("#lastName").val()}},e.prev=3,e.next=6,$.ajax({async:!0,crossDomain:!0,url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/mailchimp/abbandoned-card",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(r)});case 6:a=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),console.error("Could not add email address");case 12:case"end":return e.stop()}},e,this,[[3,9]])}));return e}()},{key:"setupAbandonedCart",value:function(){var e=this;this.orderForm.find("#email"),$(window).on("beforeunload",function(t){document.__isSubmitted||e.sendAbandondedEmail(),t.returnValue=void 0})}},{key:"init",value:function(){var e=this;this.orderForm=$("form#orderForm"),this.billingForm=$("form#billingForm");var t=this;this.billingForm.validator().find("#order").click(function(r){if(r.preventDefault(),void 0!==t.variants){if(e.billingForm.validator("validate"),!t.billingForm[0].checkValidity())return t.billingForm.find(".alert .title").text("Billing information."),t.billingForm.find(".alert .description").text("Please check your billing information."),void t.billingForm.find(".alert").show();e.submit()}}),this.orderForm.find("#applyDiscount").click(function(t){e.calculateShipping(e.orderForm)}),this.orderForm.find("#enterBilling").click(function(t){t.preventDefault(),e.orderForm.validator("validate"),e.orderForm[0].checkValidity()&&(e.orderForm.find("#shippingInformation").fadeOut(function(){e.billingForm.find("#billingInformation").fadeIn()}),e.setupAbandonedCart())}),this.billingForm.find("#goBack").click(function(){e.billingForm.find("#billingInformation").fadeOut(function(){e.orderForm.find("#shippingInformation").fadeIn()})}),$("#orderFormContainer").removeClass("invisible"),$("#loader-wrapper").addClass("loaded"),this.setupStorage(),this.runSetupForm()}}]),e}();!function(){(new BuyScreen).init()}();