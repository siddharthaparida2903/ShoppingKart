var express = require('express');
var router = express.Router();
var mongoDbDetails =  require("./common/dbConnectionDetails");

/* GET home page. */
router.get('/', function(req, res, next) {
    var reqFilter = req.query;
    var userFilterQueryObj = {};
    
    if (Object.keys(reqFilter).length > 0) {
        if (reqFilter.priceRange) {
            userFilterQueryObj.price = {
                $lt: parseInt(reqFilter.priceRange)
            }
        }
        if (reqFilter.selectedCategory && reqFilter.selectedCategory.length) {
            userFilterQueryObj.category = {
                $in: reqFilter.selectedCategory
            }
        }
        if (reqFilter.id) {
            userFilterQueryObj.id = reqFilter.id
        }
    }
    var productDetails = {
        pdata: []
    }
    mongoDbDetails.getConnectToCollection("productDetails", "find", userFilterQueryObj).then((result) => {
        productDetails.pdata = result;
        res.send(JSON.stringify(productDetails));
    });

});

module.exports = router;
