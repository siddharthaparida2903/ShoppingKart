var addItemToCart = (pid) => {
   axios.get("/add/itemToKart", {params: {productId: pid}}).then((result) => {
        console.log(response);
   }).catch((err) => {
    
   });
}