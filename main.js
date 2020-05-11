'use sctrict'
const city = document.querySelector('#city'),
    checks = document.querySelectorAll('.checkbox'),
    stored = document.querySelector('.stored-сity'),
    btn = document.querySelector('.btn'),
    btnChecks = document.querySelector('.checks-btn');

function setCookie(name, value, options = {}) {
    options = {
        path: '/'
    }
    if (options.expires) {
        options.expires = options.expires.toUTCString();
    }
    let updateCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    for (let optionKey in options) {
        updateCookie += ';' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updateCookie += '=' + optionValue;
        }
    }
    document.cookie = updateCookie;
}


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    }
    )
        ;

}

let checked = getCookie('checks')
if (checked) {
    checks.forEach((elem) => {
        elem.setAttribute('disabled', true);
        if (getCookie(elem.id)) {
            elem.checked = true
        }
    }
    )
    btnChecks.textContent = 'Забыть выбор'
    btnChecks.addEventListener('click', () => {
        deleteCookie('checks');
        checks.forEach((elem) => {
            deleteCookie(elem.id)
        })
        window.location.reload();
    })

} else {
    btnChecks.addEventListener('click', () => {
        setCookie('checks', true)
        checks.forEach((elem) => {
            if (elem.checked) {
                setCookie(elem.id, true);

            }
        })
    })
}

let isCity = getCookie('town');
if (isCity) {
    city.classList.remove('show');
    city.classList.add('hidden')
    stored.classList.toggle('hidden');
    stored.textContent = isCity;
    btn.textContent = "Забыть город";
    btn.addEventListener('click', () => {
        deleteCookie('town');
        window.location.reload();
    });


} else {

    stored.classList.toggle('hidden');
    city.classList.remove('hidden')
    city.classList.add('show');
    btn.textContent = 'Запомнить город'
    btn.addEventListener('click', () => {
        if (city.value) {
            setCookie('town', city.value);

        }


    }

    )


}











