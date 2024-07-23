var express = require('express');
var router = express.Router();
var mongoDbDetails =  require("./common/dbConnectionDetails");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const sensitiveData = 'Sample1234';




/* GET home page. */
router.post('/', function(req, res, next) {
    console.log("process.pid - Signup");
    console.log(process.pid);
    var resObj = {};        
   
    bcrypt.hash(req.body.accountPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        req.body.accountPassword = hash;
        mongoDbDetails.getConnectToCollection("userAccountDetails", "insert", req.body).then((result) => {

            resObj.msg = 'Inserted Successfully';
            res.send(JSON.stringify(resObj));        
        }).catch((error) => {
            resObj.msg = 'Error While Inserting';
            res.send(JSON.stringify(resObj));
        })
    });

    

});


module.exports = router;
