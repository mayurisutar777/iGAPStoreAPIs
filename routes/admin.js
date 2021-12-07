var express = require('express');

var ProductCategory = require("../models/ProductCategory");
var Product = require("../models/Product");
var Slider = require("../models/Slider");
var Testimonial = require("../models/Testimonial");
var Order = require("../models/Order");

var mysql = require("mysql");
var fs = require("fs");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const router = express.Router();
router.post("/login/", async (req, res) => {
    let body = req.body;
    let status = "";
    if(body.data.username == "admin" && body.data.password == "admin")
    {
        status = "success";
    }
    else{
        status = "failed";
    }
    let data = {
        "data" : {
            "status":status
        }
    }
    res.end(JSON.stringify(data));
});

// Product Categories APIs starts
router.post("/saveproductcategory/", async (req, res) =>{
    let body = req.body;    
    let pc = new ProductCategory.ProductCategory();
    pc.id = body.data.id;
    pc.name = body.data.name;
    pc.save().then(result=>{
        let data = {
            "data" : {
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
});

router.post("/deleteproductcategory/", async (req, res) =>{
    let body = req.body;    
    let pc = new ProductCategory.ProductCategory();
    pc.id = body.data.id;
    pc.delete().then(result=>{
        let data = {
            "data" : {
                "status":"success"
            }
        }
        res.end(JSON.stringify(data));
    }, err=>{
        let data = {
            "data" : {
                "status":"Failed"
            }
        }
        res.end(JSON.stringify(data));
    });
});

router.post("/productcategories/", async (req, res) =>{
    let pc = new ProductCategory.ProductCategory();
    pc.list().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error"  + err);
        let data = {
            "data":{
                "status":"failed"
            }
        }
    res.end(JSON.stringify({"data": data}));     
    })   
});

router.post("/productcategory/", async (req, res) =>{
    let body = req.body;
    let pc = new ProductCategory.ProductCategory();
    pc.id = body.data.id;
    pc.get().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error" + err);
        let data = {
            "data" : {
                "status":"failed"
            }
        }
            res.end(JSON.stringify(data));
    });
});
//End Of Product Categories APIs

// Product APIs starts
router.post("/saveproduct/", async (req, res) =>{
    let body = req.body;    
    let pc = new Product.Product();
    pc.id = body.data.id;
    pc.name = body.data.name;
    pc.pcid = body.data.pcid;
    pc.description = body.data.description;
    pc.specification = body.data.specification;
    pc.mrp = body.data.mrp;
    pc.price = body.data.price;
    pc.stock = body.data.stock;
    pc.availabiltity = body.data.availabiltity;
    pc.status = body.data.status;
    pc.imagename = "";
    pc.base64image = body.data.image;

    pc.save().then(result=>{
        let data = {
            "data" : {
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
});

router.post("/deleteproduct/", async (req, res) =>{
    let body = req.body;    
    let pc = new Product.Product();
    pc.id = body.data.id;
    pc.delete().then(result=>{
        let data = {
            "data" : {
                "status":"success"
            }
        }
        res.end(JSON.stringify(data));
    }, err=>{
        let data = {
            "data" : {
                "status":"Failed"
            }
        }
        res.end(JSON.stringify(data));
    });
});

router.post("/products/", async (req, res) =>{
    let pc = new Product.Product();
    pc.list().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error"  + err);
        let data = {
            "data":{
                "status":"failed"
            }
        }
    res.end(JSON.stringify({"data": data}));     
    })   
});

router.post("/product/", async (req, res) =>{
    let body = req.body;
    let pc = new Product.Product();
    pc.id = body.data.id;
    pc.get().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error" + err);
        let data = {
            "data" : {
                "status":"failed"
            }
        }
            res.end(JSON.stringify(data));
    });
});
//End Of Product APIs
//Slider APIs
router.post("/saveslider/", async (req, res) =>{
    let body = req.body;    
    let pc = new Slider.Slider();
    pc.id = body.data.id;
    pc.smalltitle = body.data.smalltitle;
    pc.title = body.data.title;
    pc.description = body.data.description;
    pc.linktopen = body.data.linktopen;
    pc.imagename = "";
    pc.base64image = body.data.image;

    pc.save().then(result=>{
        let data = {
            "data" : {
                "status":"success"
            }
        }
        res.end(JSON.stringify(data));
    }, err=>{
        console.log("Error " + err);
        let data = {
            "data" : {
                "status":"failed"
            }
        }
        res.end(JSON.stringify(data));
    });    
});

router.post("/deleteslider/", async (req, res) =>{
    let body = req.body;    
    let pc = new Slider.Slider();
    pc.id = body.data.id;
    pc.delete().then(result=>{
        let data = {
            "data" : {
                "status":"success"
            }
        }
        res.end(JSON.stringify(data));
    }, err=>{
        let data = {
            "data" : {
                "status":"failed"
            }
        }
        res.end(JSON.stringify(data));
    });   
});

router.post("/sliders/", async (req, res) =>{
    let pc = new Slider.Slider();
    pc.list().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>
    {
        console.log("Error " + err);
        let data = {
            "data":{
                "status":"failed"
            }
        }
        res.end(JSON.stringify(data));
    })
});

router.post("/slider/", async (req, res) =>{
    let body = req.body;
    let pc = new Slider.Slider();
    pc.id = body.data.id;
    pc.get().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error " + err);
        let data = {
            "data":{
                "status":"failed"
            }
        }
        res.end(JSON.stringify(data));
    });
});

//End of Slider APIs

// Testimonial APIs starts
router.post("/savetestimonial/", async (req, res) =>{
    let body = req.body;    
    let pc = new Testimonial.Testimonial();
    pc.id = body.data.id;
    pc.name = body.data.name;
    pc.qualification = body.data.qualification;
    pc.message = body.data.message;
    pc.imagename = "";
    pc.base64image = body.data.image;

    pc.save().then(result=>{
        let data = {
            "data" : {
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
});

router.post("/deletetestimonial/", async (req, res) =>{
    let body = req.body;    
    let pc = new Testimonial.Testimonial();
    pc.id = body.data.id;
    pc.delete().then(result=>{
        let data = {
            "data" : {
                "status":"success"
            }
        }
        res.end(JSON.stringify(data));
    }, err=>{
        let data = {
            "data" : {
                "status":"Failed"
            }
        }
        res.end(JSON.stringify(data));
    });
});

router.post("/testimonials/", async (req, res) =>{
    let pc = new Testimonial.Testimonial();
    pc.list().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error"  + err);
        let data = {
            "data":{
                "status":"failed"
            }
        }
    res.end(JSON.stringify({"data": data}));     
    })   
});

router.post("/testimonial/", async (req, res) =>{
    let body = req.body;
    let pc = new Testimonial.Testimonial();
    pc.id = body.data.id;
    pc.get().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error" + err);
        let data = {
            "data" : {
                "status":"failed"
            }
        }
            res.end(JSON.stringify(data));
    });
});

router.post("/orders/", async (req, res) =>{
    let pc = new Order.Order();
    let body = req.body;
    pc.status = body.data.status;
    pc.userid = body.data.userid;
    pc.list().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error"  + err);
        let data = {
            "data":{
                "status":"failed"
            }
        }
    res.end(JSON.stringify({"data": data}));     
    })   
});

router.post("/order/", async (req, res) =>{
    let pc = new Order.Order();
    let body = req.body;
    pc.id = body.data.id;

    pc.get().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error"  + err);
        let data = {
            "data":{
                "status":"failed"
            }
        }
    res.end(JSON.stringify({"data": data}));     
    })   
});

router.post("/orderdetails/", async (req, res) =>{
    let pc = new Order.Order();
    let body = req.body;
    pc.id = body.data.id;
    
    pc.getorderdetails().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log("Error"  + err);
        let data = {
            "data":{
                "status":"failed"
            }
        }
    res.end(JSON.stringify({"data": data}));     
    })   
});

//End Of Testimonial APIs

module.exports = router;