const Database = require("../models/Database");
let fs = require("fs");

class Testimonial {

    query = "";
    id = 0;
    name = "";
    qualification = "" ;
    message = "";
    imagename = "";
    base64image = "";

   
    db = new Database.Database();

    constructor(){
        this.id = 0;
        this.name = "";
        this.qualification = "" ;
        this.message = "";
        this.imagename = ""; 
        this.base64image = "";
    }

    save = ()=>{
        if(this.base64image != "")
        {
            this.base64image = this.base64image.replace(/^data:image\/png;base64,/, "");
            this.imagename = "testimonialpics/" +  this.db.randomString(10) + ".png";
            fs.writeFile("assets/" + this.imagename , this.base64image, 'base64', function(err){
                console.log("Error image saving-" + err);
            });
        }
        
        if(this.id == 0){
            this.query = "INSERT INTO testimonials(name, qualification, message, imagename) ";
            this.query += "VALUES('" + this.name + "', '" + this.qualification + "', '" + this.message + "', '" + this.imagename + "') ";
        }
        else{
            this.query = "UPDATE testimonials SET name = '" + this.name + "', ";
            this.query += "qualification = '" + this.qualification + "', ";            
            if(this.imagename != "")
                this.query += "imagename = '" + this.imagename + "', ";
            this.query += "message = '" + this.message + "' ";
            this.query += "WHERE id = " + this.id;                
        }
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    return reject(err);
                resolve(result);
            });
        });      
    }

    delete = ()=>{
            this.query = "DELETE FROM testimonials WHERE id = " + this.id; 
            return new Promise((resolve, reject)=>{
                this.db.query(this.query, (err, result)=>{
                    this.db.close();
                    if(err)
                        reject(err);
                    resolve(result);
                });
            });               
    }

    list = ()=>{
        this.query = "SELECT * FROM testimonials ORDER BY id";                
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
        this.query = "SELECT * FROM testimonials WHERE id = " + this.id;    
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
    Testimonial : Testimonial
}