window.onload = function () {
    var apiConsoleForm = document.querySelector('.api-console-form'),
        apiUrlTag = apiConsoleForm.querySelector('.api-console-form .api-url'),
        apiUrlToggler = apiUrlTag.querySelector('.api-url-toggler'),
        apiUrlText = apiUrlTag.querySelector('.api-url-text'),
        urlInput = apiConsoleForm.querySelector('.api-console-form .resource-url'),
        resourceUrl = apiConsoleForm.querySelector('.resource-url');

    // apiUrlToggler.addEventListener('click', handleUrlTagToggle);
    apiUrlTag.addEventListener('click', function handleUrlTagToggle(event) {
        // apiUrlToggler.innerHTML = (apiUrlToggler.innerHTML === '+') ? '-' : '+';
        apiUrlText.innerHTML = (apiUrlText.innerHTML === '/') ? apiUrlTag.attributes['name'].value : '/';
    });

    var endpointSelectors = apiConsoleForm.querySelectorAll('.api-console-form .api-endpoint-selector');
    // endpointSelector.forEach(function (selector) {
    for (var i = 0, length = endpointSelectors.length; i < length; i++) {
        (function (selector) {
            selector.addEventListener('click', function (event) {
                var inputValue = urlInput.value;
                if (inputValue === '' || inputValue[inputValue.length - 1] == '/') {
                    urlInput.value += selector.innerHTML.replace('/','');
                } else {
                    urlInput.value += selector.innerHTML;
                }
                resourceUrl.focus();
            });
        })(endpointSelectors[i]);
    }

    var preLinks = document.querySelectorAll('.pre-link');
    for (var i = 0, length = preLinks.length; i < length; i++) {
        (function (preLink) {
            preLink.addEventListener('click', function (event) {
                console.log(preLink);
            });
        })(preLinks[i]);
    }
};

/*
/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
*/