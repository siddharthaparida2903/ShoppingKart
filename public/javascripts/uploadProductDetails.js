var ImagePath = '';

var readProductDetails = () => {
    var pDetails = {
        id: $("#id").val(),
        title: $("#title").val(),
        price: parseInt($("#price").val()),
        discountPercent: parseInt($("#discountPercent").val()),
        description: $("#description").val(),
        mainImage: ImagePath,
        imageList: [],
        rating: parseFloat($("#rating").val()),
        isLimitedDeal: true,
        category: $("#category").val()
    };

    axios.post("/add/newProductDetails", pDetails).then((result) => {
        console.log(result);
        $("#rblock").text("Inserted Successfly")
    }).catch((err) => {
        
    });
}

var uploadDetails = () => {
    

    var uploadFile = $("input[name=prodImage]")[0].files[0];
    let formData = new FormData();
    formData.append("prodImage", uploadFile);


    // if (uploadFile.type == 'images/jpeg' || uploadFile.type == 'images/jpeg' || uploadFile.type == 'images/webap') {
    //     //gohead in uploading logic
    // } else {
    //     // error
    // }

    axios.post('/upload/productImage', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
    }).then((response) => {
        ImagePath = response.data.file_path
    }).error((error) => {
        // handle error
    })

}