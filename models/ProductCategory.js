const Database = require("../models/Database");

class ProductCategory{

    query = "";
    id = 0;
    name = "";
    db = new Database.Database();

    constructor(){
        this.id = 0;
        this.name = "";
    }

    save = ()=>{
        if(this.id == 0){
            this.query = "INSERT INTO productcategories(name) VALUES('" + this.name + "')";
        }
        else{
            this.query = "UPDATE productcategories SET name = '" + this.name + "' WHERE id = " + this.id;                
        }
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                    return reject(err);
                resolve(result);
            });
        });      
    }

    delete = ()=>{
            this.query = "DELETE FROM productcategories WHERE id = " + this.id; 
            return new Promise((resolve, reject)=>{
                this.db.query(this.query, (err, result)=>{
                    if(err)
                        reject(err);
                    resolve(result);
                });
            });               
    }

    list = ()=>{
        this.query = "SELECT * FROM productcategories ORDER BY name ";                
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                    reject(err);
                resolve(result);
            });
        });
    }

    get = ()=>{
        this.query = "SELECT * FROM productcategories WHERE id = " + this.id;    
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                    reject(err);
                resolve(result);
            });
        });           
    }
 }

module.exports = {
    ProductCategory: ProductCategory
}