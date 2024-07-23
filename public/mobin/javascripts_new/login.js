var generatedCaptchaText = '';
var readUserDetails = () => {
    var userDetails = {};
    userDetails.accountId = $("#userId").val();
    userDetails.accountPassword = $("#userPassword").val();
    rememberCredentials(userDetails); // calling the remember my credetial function

    // validating CaptchaText
    var userEnteredCaptchaText = $("#userEntrndCaptchaText").val();
    if (userEnteredCaptchaText == generatedCaptchaText) {
        document.querySelector("#signincapErr").style.display = 'none';
        validateUserCredentials(userDetails);
    } else {
        document.querySelector("#signincapErr").style.display = 'block'
    }
}

var validateUserCredentials = (userDetails) => {
    http://localhost:3000/validate/userCredentials
    axios.get('/validate/userCredentials', {params: userDetails}).then((response) => {
        console.log("Response");
        console.log(response);
    }).catch((error) => {
        console.log("error");
    })

}

var updateCaptchaText = () => {
    generatedCaptchaText = captchaUtilObj.generateCaptcha('#captchaImage');
}


var rememberCredentials = (userDetails) => {
    var isCheckBoxChecked = document.querySelector("#check").checked;
    if (isCheckBoxChecked) {
        localStorage.setItem("userData",JSON.stringify(userDetails));
    } else {
        localStorage.removeItem("userData");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("userData")!= null){
        priFillData();       
    }
    
});


var priFillData = () =>  {
    document.querySelector("#check").checked = true;
    var credentials = localStorage.getItem("userData");
    
    credentials = JSON.parse(credentials);
    console.log(credentials);
    $("#userId").val(credentials.accountId);
    $("#userPassword").val(credentials.accountPassword);
}
