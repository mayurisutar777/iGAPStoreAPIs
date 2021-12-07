var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true}));
app.use(express.json());
app.use(express.static('assets'));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.get("/", function(req, res){
    res.send("Hello Welcome to iGAP Store.");
    res.end();
});

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(8082, function (){
    console.log("Server Started");
});