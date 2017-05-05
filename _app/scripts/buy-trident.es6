const PRODUCT = '5637ca44df92ea03009633b3'; //trident

function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

class BuyScreen {

    getData(formData) {
        const address = {
            "first_name": formData.firstName,
            "last_name": formData.lastName,
            "company": null,
            "line1": formData.address1,
            "line2": formData.address2,
            "city": formData.city,
            "state": formData.country === 'US' ? formData.usState.toLowerCase() : formData.state,
            "zip": formData.zip,
            "country": formData.country.toLowerCase(),
            "phone": formData.phone,
        };

        const data = {
            "user_id": '5637c8d966e9ec03008989ef',
            "buyer": {
                "email": formData.email,
                "first_name": formData.firstName,
                "last_name": formData.lastName,
                "phone": formData.phone,
                "notes": formData.notes,
            },
            "shipping_address": address,
            "billing_address": Object.assign({}, address, { zip: formData.billingZip }),
            "line_items": [
                {
                    "product_id": PRODUCT,
                    "variant_id": formData.variant,
                    "quantity": parseInt(formData.quantity)
                }
            ],
            "payment_source": {
                "card": {
                    "name": `${formData.firstName} ${formData.lastName}`,
                    "number": formData.ccNumber,
                    "exp_month": formData.expDate.split('/')[0],
                    "exp_year": formData.expDate.split('/')[1],
                    "cvc": formData.cvc
                }
            },
            "discount_codes": [ formData.couponCode ]
        }
        return data;
    }

    getVariant(formData, variants) {

        let selectedVariants = [];
        for (const item in formData) {
            if (item.startsWith('option_')) {
                selectedVariants.push(formData[item])
            }
        }
        selectedVariants = selectedVariants.sort();

        for (const v of variants) {
            const ids = v.options.ids.sort();
            if (ids.join() === selectedVariants.join()) {
                return v.id;
            }
        }
        return undefined;
    }

    calculateShipping(form) {
        const formData = objectifyForm(form.serializeArray())
        const data = this.getData(formData);
        return this._calculateShipping(data, form);
    }

    async _calculateShipping(data, form) {
        form.find('tfoot').addClass('calculating');
        const result = await $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "processData": false,
            "data": JSON.stringify(data),
        })
        form.find('#shipping').text('$' + (result.shipping / 100).toFixed(2))
        // form.find('#subtotal').val('$' + (result.subtotal / 100).toFixed(2))
        if (result.discount > 0) {
            $('#discount-container').removeClass('hidden-xs-up');
            $('#discount').text('$' + (result.discount / 100).toFixed(2))
        }
        else {
            $('#discount-container').addClass('hidden-xs-up');
        }
        form.find('#tax').text('$' + (result.taxes / 100).toFixed(2))
        form.find('#total').text('$' + (result.total / 100).toFixed(2))
        form.find('tfoot').removeClass('calculating');
    }

    async setupForm(orderForm) {
        const result = await $.ajax({
            url: 'https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/' + PRODUCT
        });
        $('#description').html(result.data.description);
        let idx = 0;


        const optionsHtml = result.data.variants.map((v, idx) => {
            return '<tr class="product-row">' +
                '<td class="product-selector product">' +
                    `<input type="radio" value="${v.id}" name="variant" ${idx === 0 ? 'checked' : ''}>` +
                '</td>' +
                '<td class="product-info product hideOnMobile">Trident</td>' +
                v.options.values.map(val => { return `<td class="product">${val.replace(/\([+$0-9].*\)/, '')}</td>`}).join('') +
                '<td class="text-right product pricing">$'+ (v.price / 100 ).toFixed(2)+ '</td>' +
            '</tr>';
        }).join('');
        orderForm.find('#options').prepend(optionsHtml);

        const formData = objectifyForm(orderForm.serializeArray())
        formData.country = 'us';
        const data = this.getData(formData);
        this._calculateShipping(data, orderForm);


        orderForm.find('#country option[value="US"]').attr('selected', 'true');
        orderForm.find('#country').change(ev => {
            if (ev.currentTarget.options[ev.target.selectedIndex].value === 'US') {
                orderForm.find('.select-wrap #usState').parent().removeClass('hidden-xs-up').attr('required', false);
                orderForm.find('#state').attr('required', false).parent().addClass('hidden-xs-up')

            }
            else {
                orderForm.find('#state').attr('required', true).parent().removeClass('hidden-xs-up');
                orderForm.find('.select-wrap #usState').parent().addClass('hidden-xs-up').attr('required', false);
            }
            orderForm.validator('update');
            this.calculateShipping(orderForm);
        })

        orderForm.find('#zip').change(ev => {
            this.calculateShipping(orderForm);
        });
        orderForm.find('#usState').change(ev => {
            this.calculateShipping(orderForm);
        });
        orderForm.find('#couponCode').change(ev => {
            this.calculateShipping(orderForm);
        });

        orderForm.find('#quantity').change(ev => {
            $('#quantityOrdered').text(ev.target.value);
            const itemsOrdered = parseInt(ev.target.value);
            const valueLabel = itemsOrdered === 1 ? 'item' : 'items';
            $('#itemsLabel').text(valueLabel);
            this.calculateShipping(orderForm);
        });

        orderForm.find('#ccNumber').keypress((event) => {
            var char = String.fromCharCode(event.which)
            if (!char.match(/[0-9- ]/)) event.preventDefault();
        });

        orderForm.find('#expDate').keypress((event) => {
            var char = String.fromCharCode(event.which)
            if (!char.match(/[0-9/]/)) event.preventDefault();
        });

        orderForm.find('tr.product-row').click(ev => {
            orderForm.find('input[type=radio][name="variant"][checked]')[0].removeAttribute('checked');
            $(ev.target).parent().find('input[type=radio][name="variant"]')[0].setAttribute('checked', 'checked');
            this.calculateShipping(orderForm);
        });

        orderForm
            .on('valid.bs.validator', ev => {
                if (ev.relatedTarget.checkValidity()) {
                    $(ev.relatedTarget).parent().removeClass('has-danger').removeClass('has-error');
                }

            })
            .on('invalid.bs.validator', ev => {
                console.log(ev.relatedTarget.id + ' ' + ev.detail);
                if (!ev.relatedTarget.checkValidity()) {
                    $(ev.relatedTarget).parent().addClass('has-danger').addClass('has-error');
                }
            })

        const variants = result.data.variants;
        return variants;
    };

    async submit() {
        const { orderForm, variants } = this;
        orderForm.find('button.submit').attr('disabled', true);
        orderForm.find('#orderProcessing').show();

        const formData = objectifyForm(orderForm.serializeArray())
        const data = this.getData(formData);
        try {
            const result = await $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "https://api.trycelery.com/v2/orders/checkout",
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "processData": false,
                "data": JSON.stringify(data),
            })

            var order = result.data;
            var total = order.total / 100;
            var currency = order.currency;
            var line_items = order.line_items.map(function (item) { return item.celery_sku; }).join(',');
            const path = "?number=" + order.number +
                "&amount=" + total +
                "&currency=" + currency +
                "&line_items=" + line_items;

            window.location.assign(window.location.href + '../confirmation/' + path);
        }
        catch (err) {
            this.orderForm.find('.alert .title').text(err.statusText);
            this.orderForm.find('.alert .description').text(err.responseJSON.data);
            this.orderForm.find('.alert').show();
            this.orderForm.find('button.submit').attr('disabled', false);
            this.orderForm.find('#orderProcessing').hide();
        }

    }

    async runSetupForm() {
        this.variants = await this.setupForm(this.orderForm);
        this.orderForm.validator('update');
    }

    init() {
        this.orderForm = $('form#orderForm');
        const self = this;
        this.orderForm.validator().find('button.submit').click((ev) => {
            ev.preventDefault();

            if (self.variants === undefined) { return; }

            this.orderForm.validator('validate');

            if (!self.orderForm[0].checkValidity()) {
                return;
            }
            else {
                this.submit();
            }
        });

        $('#orderFormContainer').removeClass('invisible');
        $('#loader-wrapper').addClass('loaded');

        this.runSetupForm();
    }
}


(function () {
    const screen = new BuyScreen();
    screen.init();
})()
