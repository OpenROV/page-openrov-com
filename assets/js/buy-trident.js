'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PRODUCT = '5637ca44df92ea03009633b3'; //trident

function objectifyForm(formArray) {
    //serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

var BuyScreen = function () {
    function BuyScreen() {
        _classCallCheck(this, BuyScreen);
    }

    _createClass(BuyScreen, [{
        key: 'getData',
        value: function getData(formData) {
            var address = {
                "first_name": formData.firstName,
                "last_name": formData.lastName,
                "company": null,
                "line1": formData.address1,
                "line2": formData.address2,
                "city": formData.city,
                "state": formData.country === 'US' ? formData.usState.toLowerCase() : formData.state,
                "zip": formData.zip,
                "country": formData.country.toLowerCase(),
                "phone": formData.phone
            };

            var data = {
                "user_id": '5637c8d966e9ec03008989ef',
                "buyer": {
                    "email": formData.email,
                    "first_name": formData.firstName,
                    "last_name": formData.lastName,
                    "phone": formData.phone,
                    "notes": formData.notes
                },
                "shipping_address": address,
                "billing_address": Object.assign({}, address, { zip: formData.billingZip }),
                "line_items": [{
                    "product_id": PRODUCT,
                    "variant_id": formData.variant,
                    "quantity": parseInt(formData.quantity)
                }],
                "payment_source": {
                    "card": {
                        "name": formData.firstName + ' ' + formData.lastName,
                        "number": formData.ccNumber,
                        "exp_month": formData.expDate.split('/')[0],
                        "exp_year": formData.expDate.split('/')[1],
                        "cvc": formData.cvc
                    }
                },
                "discount_codes": [formData.couponCode]
            };
            return data;
        }
    }, {
        key: 'getVariant',
        value: function getVariant(formData, variants) {

            var selectedVariants = [];
            for (var item in formData) {
                if (item.startsWith('option_')) {
                    selectedVariants.push(formData[item]);
                }
            }
            selectedVariants = selectedVariants.sort();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = variants[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;

                    var ids = v.options.ids.sort();
                    if (ids.join() === selectedVariants.join()) {
                        return v.id;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return undefined;
        }
    }, {
        key: 'calculateShipping',
        value: function calculateShipping(form) {
            var formData = objectifyForm(form.serializeArray());
            var data = this.getData(formData);
            return this._calculateShipping(data, form);
        }
    }, {
        key: '_calculateShipping',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data, form) {
                var result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                form.find('tfoot').addClass('calculating');
                                _context.next = 3;
                                return $.ajax({
                                    "async": true,
                                    "crossDomain": true,
                                    "url": "https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",
                                    "method": "POST",
                                    "headers": { "content-type": "application/json" },
                                    "processData": false,
                                    "data": JSON.stringify(data)
                                });

                            case 3:
                                result = _context.sent;

                                form.find('#shipping').text('$' + (result.shipping / 100).toFixed(2));
                                // form.find('#subtotal').val('$' + (result.subtotal / 100).toFixed(2))
                                if (result.discount > 0) {
                                    $('#discount-container').removeClass('hidden-xs-up');
                                    $('#discount').text('$' + (result.discount / 100).toFixed(2));
                                } else {
                                    $('#discount-container').addClass('hidden-xs-up');
                                }
                                form.find('#tax').text('$' + (result.taxes / 100).toFixed(2));
                                form.find('#total').text('$' + (result.total / 100).toFixed(2));
                                form.find('tfoot').removeClass('calculating');

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function _calculateShipping(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return _calculateShipping;
        }()
    }, {
        key: 'setupForm',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(orderForm) {
                var _this = this;

                var result, idx, optionsHtml, formData, data, variants;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return $.ajax({
                                    url: 'https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/' + PRODUCT
                                });

                            case 2:
                                result = _context2.sent;

                                $('#description').html(result.data.description);
                                idx = 0;
                                optionsHtml = result.data.variants.map(function (v, idx) {
                                    return '<tr class="product-row">' + '<td class="product-selector product">' + ('<input type="radio" value="' + v.id + '" name="variant" ' + (idx === 0 ? 'checked' : '') + '>') + '</td>' + '<td class="product-info product hideOnMobile">Trident</td>' + v.options.values.map(function (val) {
                                        return '<td class="product">' + val.replace(/\([+$0-9].*\)/, '') + '</td>';
                                    }).join('') + '<td class="text-right product pricing">$' + (v.price / 100).toFixed(2) + '</td>' + '</tr>';
                                }).join('');

                                orderForm.find('#options').prepend(optionsHtml);

                                formData = objectifyForm(orderForm.serializeArray());

                                formData.country = 'us';
                                data = this.getData(formData);

                                this._calculateShipping(data, orderForm);

                                orderForm.find('#country option[value="US"]').attr('selected', 'true');
                                orderForm.find('#country').change(function (ev) {
                                    if (ev.currentTarget.options[ev.target.selectedIndex].value === 'US') {
                                        orderForm.find('.select-wrap #usState').parent().removeClass('hidden-xs-up').attr('required', false);
                                        orderForm.find('#state').attr('required', false).parent().addClass('hidden-xs-up');
                                    } else {
                                        orderForm.find('#state').attr('required', true).parent().removeClass('hidden-xs-up');
                                        orderForm.find('.select-wrap #usState').parent().addClass('hidden-xs-up').attr('required', false);
                                    }
                                    orderForm.validator('update');
                                    _this.calculateShipping(orderForm);
                                });

                                orderForm.find('#zip').change(function (ev) {
                                    _this.calculateShipping(orderForm);
                                });
                                orderForm.find('#usState').change(function (ev) {
                                    _this.calculateShipping(orderForm);
                                });
                                orderForm.find('#couponCode').change(function (ev) {
                                    _this.calculateShipping(orderForm);
                                });

                                orderForm.find('#quantity').change(function (ev) {
                                    $('#quantityOrdered').text(ev.target.value);
                                    var itemsOrdered = parseInt(ev.target.value);
                                    var valueLabel = itemsOrdered === 1 ? 'item' : 'items';
                                    $('#itemsLabel').text(valueLabel);
                                    _this.calculateShipping(orderForm);
                                });

                                orderForm.find('#ccNumber').keypress(function (event) {
                                    var char = String.fromCharCode(event.which);
                                    if (!char.match(/[0-9- ]/)) event.preventDefault();
                                });

                                orderForm.find('#expDate').keypress(function (event) {
                                    var char = String.fromCharCode(event.which);
                                    if (!char.match(/[0-9/]/)) event.preventDefault();
                                });

                                orderForm.find('tr.product-row').click(function (ev) {
                                    orderForm.find('input[type=radio][name="variant"][checked]')[0].removeAttribute('checked');
                                    $(ev.target).parent().find('input[type=radio][name="variant"]')[0].setAttribute('checked', 'checked');
                                    _this.calculateShipping(orderForm);
                                });

                                orderForm.on('valid.bs.validator', function (ev) {
                                    if (ev.relatedTarget.checkValidity()) {
                                        $(ev.relatedTarget).parent().removeClass('has-danger').removeClass('has-error');
                                    }
                                }).on('invalid.bs.validator', function (ev) {
                                    console.log(ev.relatedTarget.id + ' ' + ev.detail);
                                    if (!ev.relatedTarget.checkValidity()) {
                                        $(ev.relatedTarget).parent().addClass('has-danger').addClass('has-error');
                                    }
                                });

                                variants = result.data.variants;
                                return _context2.abrupt('return', variants);

                            case 23:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function setupForm(_x3) {
                return _ref2.apply(this, arguments);
            }

            return setupForm;
        }()
    }, {
        key: 'submit',
        value: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                var orderForm, variants, formData, data, result, order, total, currency, line_items, path;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                orderForm = this.orderForm, variants = this.variants;

                                orderForm.find('button.submit').attr('disabled', true);
                                orderForm.find('#orderProcessing').show();

                                formData = objectifyForm(orderForm.serializeArray());
                                data = this.getData(formData);
                                _context3.prev = 5;
                                _context3.next = 8;
                                return $.ajax({
                                    "async": true,
                                    "crossDomain": true,
                                    "url": "https://api.trycelery.com/v2/orders/checkout",
                                    "method": "POST",
                                    "headers": { "content-type": "application/json" },
                                    "processData": false,
                                    "data": JSON.stringify(data)
                                });

                            case 8:
                                result = _context3.sent;
                                order = result.data;
                                total = order.total / 100;
                                currency = order.currency;
                                line_items = order.line_items.map(function (item) {
                                    return item.celery_sku;
                                }).join(',');
                                path = "?number=" + order.number + "&amount=" + total + "&currency=" + currency + "&line_items=" + line_items;


                                window.location.assign(window.location.href + '../confirmation/' + path);
                                _context3.next = 24;
                                break;

                            case 17:
                                _context3.prev = 17;
                                _context3.t0 = _context3['catch'](5);

                                this.orderForm.find('.alert .title').text(_context3.t0.statusText);
                                this.orderForm.find('.alert .description').text(_context3.t0.responseJSON.data);
                                this.orderForm.find('.alert').show();
                                this.orderForm.find('button.submit').attr('disabled', false);
                                this.orderForm.find('#orderProcessing').hide();

                            case 24:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[5, 17]]);
            }));

            function submit() {
                return _ref3.apply(this, arguments);
            }

            return submit;
        }()
    }, {
        key: 'runSetupForm',
        value: function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.setupForm(this.orderForm);

                            case 2:
                                this.variants = _context4.sent;

                                this.orderForm.validator('update');

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function runSetupForm() {
                return _ref4.apply(this, arguments);
            }

            return runSetupForm;
        }()
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.orderForm = $('form#orderForm');
            var self = this;
            this.orderForm.validator().find('button.submit').click(function (ev) {
                ev.preventDefault();

                if (self.variants === undefined) {
                    return;
                }

                _this2.orderForm.validator('validate');

                if (!self.orderForm[0].checkValidity()) {
                    return;
                } else {
                    _this2.submit();
                }
            });

            $('#orderFormContainer').removeClass('invisible');
            $('#loader-wrapper').addClass('loaded');

            this.runSetupForm();
        }
    }]);

    return BuyScreen;
}();

(function () {
    var screen = new BuyScreen();
    screen.init();
})();
//# sourceMappingURL=buy-trident.js.map
