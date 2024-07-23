var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var empDetails = [
    {
        name: 'Raj',
        age: 20,
        gender: 'Male',
        location: 'Hyderabad'
    },
    {
        name: 'Teena',
        age: 20,
        gender: 'Male',
        location: 'Hyderabad'
    },
    {
        name: 'Meena',
        age: 20,
        gender: 'Male',
        location: 'Hyderabad'
    },
    {
        name: 'Krish',
        age: 20,
        gender: 'Male',
        location: 'Hyderabad'
    }

  ];

  // res.send(JSON.stringify(empDetails));
  res.render('employeeDetails', { data: empDetails });
  

});

module.exports = router;
