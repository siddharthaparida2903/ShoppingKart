var frgtpswd = () => {
    var userEnteredCaptchaText = $("#userFrgtPwdCaptchaText").val();
    if (userEnteredCaptchaText == generatedCaptchaText) {
        console.log("right");
    } else {
        console.log("wrong");
    }
}

var updateFrgtpwdCaptchaText = () => {
    generatedCaptchaText = captchaUtilObj.generateCaptcha('#frgPwdCaptchaImage');
}
