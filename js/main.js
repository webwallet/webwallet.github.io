window.onload = function () {
    var apiUrlTag = document.querySelector('.api-console-form .api-url'),
        apiUrlToggler = apiUrlTag.querySelector('.api-url-toggler'),
        apiUrlText = apiUrlTag.querySelector('.api-url-text'),
        urlInput = document.querySelector('.api-console-form .resource-url');

    // apiUrlToggler.addEventListener('click', handleUrlTagToggle);
    apiUrlTag.addEventListener('click', function handleUrlTagToggle(event) {
        // apiUrlToggler.innerHTML = (apiUrlToggler.innerHTML === '+') ? '-' : '+';
        apiUrlText.innerHTML = (apiUrlText.innerHTML === '/') ? apiUrlTag.attributes['name'].value : '/';
    });

    var endpointSelectors = document.querySelectorAll('.api-console-form .api-endpoint-selector');
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
            });
        })(endpointSelectors[i]);
    }
};