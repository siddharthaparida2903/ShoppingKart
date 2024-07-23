var express = require('express');
var router = express.Router();
var mongoDbDetails =  require("./common/dbConnectionDetails");

/* GET home page. */
router.get('/', function(req, res, next) {
   var obj = {userId: req.session.loggedInUserId, productId: req.query.productId}

    mongoDbDetails.getConnectToCollection("cartDetails", "addItemToKart", obj).then((result) => {
        res.send(JSON.stringify({msg: 'success'})); 
    }).catch((error) => {
        res.send(JSON.stringify({msg: 'Error'})); 
   })
   
});

module.exports = router;
