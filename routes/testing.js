var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log(req.body);
    console.log(req.query);
  res.send(JSON.stringify({MSG: 'SUCCESS'}));
});

module.exports = router;
