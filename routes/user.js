var express = require('express');
var User = require("../models/User");
var Order = require("../models/Order");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql = require("mysql");
var fs = require("fs");
const router = express.Router();

router.post("/register/", async (req, res) => {
    let body = req.body;
    let pc = new User.User();
    pc.id = 0;
    pc.name = body.data.name;
    pc.email = body.data.email;
    pc.mobileno = body.data.mobileno;
    pc.password = body.data.password;

    pc.exist().then(result=>{
        if(result.length == 0){
            pc.register().then(result=>{
                let data = {
                    "data" : {
                        "userid":result.insertId,
                        "status":"success"
                    }
                }
                res.end(JSON.stringify(data));
            }, err=>{
                console.log("Error", + err);
                let data = {
                    "data" : {
                      "status":"Failed"
                    }
                }
                res.end(JSON.stringify(data));
            });
        }
        else{
            let data = {
                "data" : {
                    "status":"Failed"
                }
            }
            res.end(JSON.stringify(data));
        }
    }, err=>{
        console.log("Error", + err);
        let data = {
            "data" : {
                "status":"Failed"
            }
        }
        res.end(JSON.stringify(data));
    });
});

router.post("/login/", async (req, res) => {
    let body = req.body;
    let pc = new User.User();
    pc.id = 0;
    pc.email = body.data.email;
    pc.password = body.data.password;

    pc.checklogin().then(result=>{
        if(result.length == 0){
            let data = {
                "data" : {
                    "status":"Failed"
                }
            }
            res.end(JSON.stringify(data));
        }
        else{
            let data = {
                "data" : {
                    "userid":result[0].id,
                    "name":result[0].name,
                    "mobileno":result[0].mobileno,
                    "status":"Success"
                }
            }
            res.end(JSON.stringify(data));
        }
    }, err=>{
        console.log("Error", + err);
        let data = {
            "data" : {
                "status":"Failed"
            }
        }
        res.end(JSON.stringify(data));
    });
});

    router.post("/changepassword/", async (req, res) => {
        let body = req.body;
        let pc = new User.User();
        pc.id = 0;
        pc.id = body.data.id;
        pc.password = body.data.password;

        pc.changepassword(body.data.newpassword).then(result=>{
            if(result == true){
                let data = {
                    "data" : {
                        "status":"Success"
                    }
                }
                res.end(JSON.stringify(data));
            }
            else{
                let data = {
                    "data" : {
                        "status":"Failed"
                    }
                }
                res.end(JSON.stringify(data));
            }
        },err=>{
            console.log("Error", + err);
            let data = {
                "data" : {
                    "status":"Failed"
                }
            }
            res.end(JSON.stringify(data));
        });
    });

    router.post("/forgotpassword/", async (req, res) => {
        let body = req.body;
        let pc = new User.User();
        pc.email = body.data.email;
        
        pc.sendpassword().then(result=>{
            if(result == true){
                let data = {
                    "data" : {
                        "status":"Success"
                    }
                }
                res.end(JSON.stringify(data));
            }
            else{
                let data = {
                    "data" : {
                        "status":"Failed"
                    }
                }
                res.end(JSON.stringify(data));
            }
        },err=>{
            console.log("Error", + err);
            let data = {
                "data" : {
                    "status":"Failed"
                }
            }
            res.end(JSON.stringify(data));
        });
    });

    router.post("/saveorder/", async (req, res) => {
        let body = req.body;
        let pc = new Order.Order();
        pc.id = 0;
        pc.userid  = body.data.userid;
        pc.orderdate = body.data.orderdate;
        pc.mrptotal = body.data.mrptotal;
        pc.priceamount = body.data.priceamount;
        pc.discountamount = body.data.discountamount;
        pc.billamount = body.data.billamount;
        pc.shippingamount = body.data.shippingamount;
        pc.totalbillamount = body.data.totalbillamount;
        pc.address = body.data.address;
        pc.cityname = body.data.cityname;
        pc.pincode = body.data.pincode;
        pc.orderdetails = body.data.orderdetails;

        pc.save().then(result=>{
                let data = {
                    "data" : {
                        "status":"Success"
                    }
                }
                res.end(JSON.stringify(data));
        },err=>{
            console.log("Error", + err);
            let data = {
                "data" : {
                    "status":"Failed"
                }
            }
            res.end(JSON.stringify(data));
        });

});


module.exports = router;