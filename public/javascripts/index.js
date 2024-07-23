

var loadSelectedPage = (pageType, pid) => {
    if (pageType == 'homePage') {
        $("#loginBtn").show();
        $("#signupBtn").show();
        $("#logoutBtn").hide();
    } else {
        $("#loginBtn").hide();
        $("#signupBtn").hide();
        $("#logoutBtn").show();
    }
    
    var templateUrl = ''; 
    switch (pageType) {
        case 'homePage':
            templateUrl = 'templates/homePage.htm';
            // enable login and signup buttons and hide logout button
            break;
        case 'productDetails':
            // hide login and signup buttons and enable logout button
            templateUrl = 'templates/productDetailsTemplate.htm';
            break;
        case 'detailedPage':
             // hide login and signup buttons and enable logout button
             templateUrl = 'templates/productDetailedPage.htm';
             break;
        case 'viewKart':
            templateUrl = 'viewkart.htm'
            break;
    }   

    axios.get(templateUrl).then((templtResponse) => {

        
        if (pageType == 'productDetails' || pageType == 'detailedPage') {
            if (pageType == 'detailedPage') {
                var productdata = {};
                $("main").html(templtResponse.data);
                axios.get('/load/productDetails', {params: {id: pid}}).then((response) => {
                    var detaildTmplt = Handlebars.compile(templtResponse.data);
                    var data1 = response.data.pdata[0];
                    data1.discountedPrice = data1.price - (data1.price * data1.discountPercent) / 100;
                    $("main").html(detaildTmplt(data1));
                });
            } else {
                $("main").html(templtResponse.data);
            }
            var data = {};
            if (pid) {
                data.id = pid;
                // console.log(data);
            }
            getProductDetails(data); // which loads the product details...
        } else {
            $("main").html(templtResponse.data);
        }
        modelInstance.hide();
    })
}   

var modelInstance; 
var lgooutModelInstance;
var signUpModelInstance;
document.addEventListener("DOMContentLoaded", () => {
    modelInstance = new bootstrap.Modal('#loginModel', {});
    lgooutModelInstance = new bootstrap.Modal('#logOutPopup', {});  
    signUpModelInstance = new bootstrap.Modal('#newSignupModel', {});
    
    axios.get('/check/userLogin').then((response) => {
        if (response.data.isLoggedinUser) {
            loadSelectedPage('productDetails');
        } else {
            loadSelectedPage('homePage');
        }
    })   
})

