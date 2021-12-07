const Database = require("../models/Database");
const nodemailer = require("nodemailer");

class User{

    query = "";
    id = 0;
    name = "";
    email = "";
    mobileno = "";
    password = "";
    db = new Database.Database();

    constructor(){
        this.id = 0;
        this.name = "";
        this.email = "";
        this.mobileno = "";
        this.password = "";
    }

    register = ()=>{
            this.query = "INSERT INTO users(name, email, mobileno, password)";
            this.query += "VALUES('" + this.name + "', '" + this.email + "', '" + this.mobileno + "', '" + this.password + "')";
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    return reject(err);
                resolve(result);
            });
        });      
    }
    exist = () =>{
        this.query = "SELECT * FROM users WHERE email = '" + this.email + "' ";
        this.query += "OR mobileno = '" + this.mobileno + "' ";
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                    return reject(err);
                resolve(result);
            });
        });    
    }
    checklogin = ()=>{
        this.query = "SELECT * FROM users WHERE email = '" + this.email + "' ";
        this.query += "AND password = '" + this.password + "' ";
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                    return reject(err);
                resolve(result);
            });
        });    
    }

    changepassword = (newpassword)=>{
        this.query = "SELECT * FROM users WHERE id = " + this.id + " ";
        this.query += "AND password = '" + this.password + "' ";
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                    return reject(err);

                if(result.length == 0)
                {
                    resolve(false);
                }
                else
                {
                    this.query = "UPDATE users SET password = '" + newpassword + "' WHERE id = " + this.id; 
                    this.db.query(this.query, (err, result)=>{
                        if(err)
                            return reject(err);
                            resolve(true);
                    });
                }
            });
        });    
    }

    sendpassword = () => {
        this.query = "SELECT * FROM users WHERE email = '" + this.email + "' ";
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                    return reject(err);

                if(result.length == 0)
                {
                    resolve(false);
                }
                else{
                    this.name = result[0].name;
                    this.mobileno = result[0].mobileno;
                    this.password = result[0].password;

                    var message = "Hello" + this.name + ", <br />";
                    message += "Your Password for iGAP store is " + this.password + ".</br>";
                    message += "Regards, <br /> Team iGAP store ";

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'sutarmayu9@gmail.com',
                          pass: 'ofkudzxkkuyopuch'
                        }
                      });

                    var mailOptions = {
                        from: 'sutarmayu9@gmail.com',
                        to: this.email,
                        subject: 'Your Password For iGAP Store',
                        html: message,
                        
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                    
                    //Code to Send email
                            resolve(true);
                    }
            });
        });  
    }
 }

module.exports = {
    User: User
}