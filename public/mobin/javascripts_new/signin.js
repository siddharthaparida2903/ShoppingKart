let showPassword = (event) => {
    if (event.target.checked) {
        document.querySelector("#userPassword").setAttribute("type", 'text');
    } else {
        document.querySelector("#userPassword").setAttribute("type", 'password');
    }
}

