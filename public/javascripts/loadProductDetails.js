var singeProductTempalte;

axios.get("templates/singleProductTemplate.htm").then((responseTemplate) => {
    singeProductTempalte = Handlebars.compile(responseTemplate.data);
}).catch((err) => {
        
});

var getProductDetails = (filterObj={}) => {

    $("#productDetailsBlock").html(""); // Clearing the container before appending new ones.
    var productDetails = [];
    
    axios.get('/load/productDetails', {params: filterObj}).then((response) => {
        productDetails = response.data.pdata;
        // console.log(productDetails);
        
        productDetails.forEach((product, index) => {
            product.description = product.description.substr(0, 100) + '...';
            product.discountedPrice = product.price - (product.price * product.discountPercent) / 100;
            $("#productDetailsBlock").append(singeProductTempalte(product));
            var id = `#product_${product.id}`;
            loadStarRatings(id, product.rating);
        })
    });

}

var applyFilterToProducts = () => {
    var filterObj = {};
    filterObj.priceRange = parseInt($("#priceRange").val());
    filterObj.selectedCategory = [];

    var selectedCategorys = document.querySelectorAll("[id^=category_]:checked")
    selectedCategorys.forEach((element) => {
        filterObj.selectedCategory.push(element.value)
    })
    getProductDetails(filterObj);

}

var ChangeSliderValue = (value) => {
    var static = document.querySelector("#staticPrice");
    static.style.display = 'none';
    var dynamic = document.querySelector("#priceRange");
    dynamic.innerHTML = value;
}



var viewDetailedPage = (productId) => {
    loadSelectedPage('detailedPage', productId)
}   