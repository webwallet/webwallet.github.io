var apiURL = 'http://52.7.236.189';
window.onload = function () {
    ['agent-widget', 'customer-widget', 'merchant-widget', 'provider-widget'].forEach(function (id) {
        var widget = document.querySelector('#' + id),
            transactionForm = widget.querySelector('form'),
            sendButton = widget.querySelector('.sendTransaction'),
            from = widget.querySelector('.fromAddress'),
            to = widget.querySelector('.toAddress'),
            amount = widget.querySelector('.transactionAmount');

            var formData = {
                lowerLimit: 0,
                upperLimit: 1000,
                currency: 'IOU:LUCAS'
            };
            if (id === 'agent-widget') {
                formData.lowerLimit = -1000;
                formData.upperLimit = 0;
            }

            $.ajax({
                type: 'POST',
                url: apiURL + '/address',
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: onAddress.bind(null, from, widget)
            });

            sendButton.addEventListener('click', function (event) {
                sendTransaction({
                    source: from.value,
                    destination: to.value,
                    amount: amount.value
                });
            }, function (err, result) {

            });

            transactionForm.addEventListener('submit', function (event) {
                console.log(event);
            })
    });

    function onAddress(from, widget, res) {
        from.value = res.address;
        widget.id = 'address_' + res.address;
        widget = document.querySelector('#'+widget.id);
        $.ajax({
            type: 'GET',
            url: apiURL + '/address/' + res.address + '/balance',
            contentType: 'application/json',
            success: onBalance.bind(null, widget)
        });
    }

    function onBalance(widget, res) {
            var balance = widget.querySelector('.headerBalance'),
                currency = widget.querySelector('.headerCurrency'),
                progressBar = {
                    positive: widget.querySelector('.progress-bar-positive'),
                    negative: widget.querySelector('.progress-bar-negative')
                };

            balance.innerHTML = res.balance;
            currency.innerHTML = res.currency;

            if (res.balance >= 0) {
                progressBar.positive.parentNode.style.display = 'block';
                progressBar.positive.style.width = (res.balance/res.limits.upper)*100 + '%';
                progressBar.negative.parentNode.style.display = 'none';
                progressBar.negative.style.width = '0%';
            } else {
                progressBar.positive.parentNode.style.display = 'none';
                progressBar.negative.parentNode.style.display = 'block';
                progressBar.positive.style.width = '0%';
                progressBar.negative.style.width = (Math.abs(res.balance/res.limits.lower))*100 + '%';
            }
    }

    function sendTransaction(options, callback) {
        if (!options.source || !options.destination || !options.amount) {
            console.log('bad request.', options.source, options.destination, options.amount);
            return (callback || function () {})(true, null); 
        }

        $.ajax({
            type: 'POST',
            url: apiURL + ['/address', options.destination, 'transactions'].join('/') ,
            data: JSON.stringify({
                source: options.source,
                amount: options.amount,
                currency: ' '
            }),
            contentType: 'application/json',
            success: function (res) {
                setTimeout(function () {
                    $.ajax({
                        type: 'GET',
                        url: apiURL + '/address/' + options.source + '/balance',
                        contentType: 'application/json',
                        success: onBalance.bind(null, document.querySelector('#address_' + options.source))
                    });
                    $.ajax({
                        type: 'GET',
                        url: apiURL + '/address/' + options.destination + '/balance',
                        contentType: 'application/json',
                        success: onBalance.bind(null, document.querySelector('#address_' + options.destination))
                    });
                }, 1000)
            }
        });
    }
}

 