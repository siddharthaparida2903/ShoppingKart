var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validateRouter = require("./routes/validateUserCredentials");
var productRouter = require("./routes/getProductDetails");
var signupRouter = require("./routes/signupUserDetails");
var addNewProductRouter = require("./routes/addNewProduct");
var uploadImage = require("./routes/uploadImage");
var testRouter = require("./routes/testing");
var checkUserLoginRouter = require("./routes/isUserLoggedIn");
var logoutSessionRouter = require("./routes/logoutSession");
var getEmployeeRouter = require("./routes/getEmployeeDetails");
var addItemToKartRouter = require("./routes/addItemToKart");
var cluster = require("cluster");
var os = require("os");
var noofcpus = os.availableParallelism();
var express = require('express');
var app = express();
var server;

if (cluster.isMaster) {
  for (var i = 0; i < noofcpus; i++) {
    cluster.fork();
  }
} else {
  server = require('http').createServer(app).listen(8081, () => {
    console.log("Server is lsting at 8081 and processer " + process.pid)
  });
}

const io = require('socket.io')(server);

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    originalMaxAge: 300000,
    secure: false // secure indicates whtehr its http|https server false is for http, true is for https
  }  
})) 
var totalNoOfConnections = 0;
io.on('connection', (socket) => {
  totalNoOfConnections++;
  console.log("Client got connected - total views " + totalNoOfConnections);
    // // socket.emit('connect', {message: 'a new client connected'})
    
    // socket.on("usermsg", (msg) => {
    //   console.log("received msg " + msg);
    //   socket.emit("test", "msg frm server")
    // })
    /*var i = 0;
    var scoreCard = {currentOver: 0, score: 12}
    setInterval(() => {
      scoreCard.currentOver = scoreCard.currentOver + 0.1; // GET CURRENT OVER FROM DB
      scoreCard.score += 2; // GET THE SCORE INFO FROM DB 
      if (scoreCard.currentOver == 0.6) {
        scoreCard.currentOver = Math.round(scoreCard.currentOver);
      }
      socket.emit("usermsg", "Current score is " + JSON.stringify(scoreCard));
    }, 3000) */

    socket.on("UserSendMsg", (data) => {
      

      socket.broadcast.emit("ReceiveMsg", data);
      //socket.emit("ReceiveMsg", data);
    })
    
    socket.on('disconnect', function () {
      totalNoOfConnections--;
      console.log("Client got Disconnected - total views " + totalNoOfConnections);
    });
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/validate/userCredentials", validateRouter);
app.use("/load/productDetails", productRouter);
app.use("/new/user/signup", signupRouter);
app.use("/add/newProductDetails", addNewProductRouter);
app.use("/upload/productImage", uploadImage);
app.use("/get/testingapi", testRouter);
app.use("/check/userLogin", checkUserLoginRouter);
app.use("/logout", logoutSessionRouter);
app.use("/get/EmpDetails", getEmployeeRouter);
app.use("/add/itemToKart", addItemToKartRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
