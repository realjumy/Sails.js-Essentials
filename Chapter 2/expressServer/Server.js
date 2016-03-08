var express = require("express");
var app = express();
var router = express.Router();

router.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
app.use(function(req,res,next) {
    console.log("Route is "+ req.path + " and type is "+req.method);
    next();
});
app.use('/home',router);

app.listen(3000);

console.log("Listening at Port 3000");
