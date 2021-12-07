const Database = require("../models/Database");
let fs = require("fs");

class Order {

    query = "";
    id = 0;
    userid  = 0;
    orderdate = "";
    mrptotal = 0;
    priceamount = 0;
    discountamount = 0;
    billamount = 0;
    shippingamount = 0;
    totalbillamount = 0;
    address = "";
    cityname = "";
    pincode = "";
    status = "";
    paymentstatus = "";
    orderdetails = null;

    db = new Database.Database();

    constructor(){
        this.id = 0;
        this.userid  = 0;
        this.orderdate = "";
        this.mrptotal = 0;
        this.priceamount = 0;
        this.discountamount = 0;
        this.billamount = 0;
        this.shippingamount = 0;
        this.totalbillamount = 0;
        this.address = "";
        this.cityname = "";
        this.pincode = "";
        this.status = "new";
        this.paymentstatus = "not paid";
        this.orderdetails = null;
    }

    save = ()=>{
            this.query = "INSERT INTO orders(userid, orderdate, mrptotal, priceamount, discountamount, billamount, shippingamount, totalbillamount, address, cityname, pincode, status, paymentstatus) ";
            this.query += "VALUES(" + this.userid + ", '"+ this.orderdate +"', "  + this.mrptotal + ", " +  this.priceamount +", " + this.discountamount + ", ";
            this.query += + this.billamount + ", " + this.shippingamount + ", " + this.totalbillamount + ", '"+ this.address +"' , ";
            this.query += " '"+ this.cityname +"', '" + this.pincode + "', '" + this.status + "', '" + this.paymentstatus + "')";
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                //this.db.close();
                if(err)
                    return reject(err);

                this.id = result.insertId;
                for(let i = 0; i < this.orderdetails.length; i++)
                {
                    this.query = "INSERT INTO orderdetails(orderid, productid, mrp, price, quantity, mrptotal, pricetotal, billamount, shippingamount, totalbillamount )";
                    this.query += "VALUES("+ this.id +", " + this.orderdetails[i].productid + ", " + this.orderdetails[i].mrp + ", " + this.orderdetails[i].price + ", " ;
                    this.query += + this.orderdetails[i].quantity + "," + this.orderdetails[i].mrptotal +", ";
                    this.query += + this.orderdetails[i].pricetotal + ", " + this.orderdetails[i].billamount + ", ";
                    this.query += + this.orderdetails[i].shippingamount + ", " + this.orderdetails[i].totalbillamount +" )";
                    this.db.query(this.query, (err, result)=>{
                        if(err)
                            return reject(err);
                    });
                }
                resolve(result);
            });
        });      
    }

    list = ()=>{
        this.query = "SELECT O.*, U.name, U.email, U.mobileno FROM orders AS O, users AS U WHERE U.id = O.userid ";
        if(this.userid != 0)
            this.query += "AND U.id = " + this.userid + " ";
        if(this.status != "")
            this.query += "AND O.status = '" + this.status+ "' ";
        this.query += "ORDER BY o.id";                
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    reject(err);
                resolve(result);
            });
        });
    }

    get = ()=>{
        this.query = "SELECT * FROM orders WHERE id = " + this.id;    
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    reject(err);
                resolve(result);
            });
        });           
    }

    getorderdetails = ()=>{
        this.query = "SELECT P.*, OD.quantity, OD.mrptotal, OD.pricetotal, OD.billamount, OD.shippingamount ";
        this.query += "FROM orderdetails AS OD, products AS P WHERE P.id = OD.productid AND OD.orderid = " + this.id;    
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    reject(err);
                resolve(result);
            });
        });           
    }

 }

 

module.exports = {
    Order: Order
}