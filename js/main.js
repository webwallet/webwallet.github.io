window.onload = function () {
    var apiUrlTag = document.querySelector('.api-console-form .api-url'),
        apiUrlToggler = apiUrlTag.querySelector('.api-url-toggler'),
        apiUrlText = apiUrlTag.querySelector('.api-url-text');
    // apiUrlToggler.addEventListener('click', handleUrlTagToggle);
    apiUrlTag.addEventListener('click', function handleUrlTagToggle(event) {
        // apiUrlToggler.innerHTML = (apiUrlToggler.innerHTML === '+') ? '-' : '+';
        apiUrlText.innerHTML = (apiUrlText.innerHTML === '/') ? apiUrlTag.attributes['name'].value : '/';
    });
};