var updateSignupCaptchaText = () => {
    generatedCaptchaText = captchaUtilObj.generateCaptcha('#signupCaptchaImage');
}

var newUserSignup = () => {
    var userEnteredCaptchaText = $("#userEntrndCaptchaTextSignup").val();
    console.log(userEnteredCaptchaText)
    if (userEnteredCaptchaText == generatedCaptchaText) {
        document.querySelector("#capErr").style.display = 'none';
        return passwordMatching()
    }
    else {
        document.querySelector("#capErr").style.display = 'block'
    }
}

// Inderjeet
// Show Passwrod :
var ChangeType = (event) => {
    if (event.target.checked) {
        document.querySelector("#signupuserPassword").setAttribute("type", "text");
    }
    else {
        document.querySelector("#signupuserPassword").setAttribute("type", "password");
    }
}

// Password validation Part :
var passwordMatching = () => {

    // UserId Mandate :
    var userId = document.querySelector("#signupuserName").value;

    // Accsessing the password and re-enter Password :
    var password = document.querySelector("#signupuserPassword").value;
    var rePassword = document.querySelector("#signupuserRePassword").value;

    //Error message if Password and repassword not matched :
    var displayMessage = document.querySelector("#pwdNotMatching");

    if (userId == '') {
        document.querySelector("#userIdEmpty").style.display = 'block';
        return;
    }
    else {
        document.querySelector("#userIdEmpty").style.display = 'none';
    }

    if (password == '') {
        document.querySelector("#pwdError").style.display = 'block';
        return;
    }
    else {
        document.querySelector("#pwdError").style.display = 'none';
    }

    if (password != rePassword) {
        displayMessage.innerHTML = "Password is not matching";
    }
    else {
        window.open("../public/login.html", "_self")
        return;
    }
}