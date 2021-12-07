const mysql = require("mysql");
class Database{
    constructor(){
      var config ={
        host:"localhost",
        user:"root",
        password:"",
        database:"igapstore"
        }; 
        this.connection = mysql.createConnection(config);
    }
    query(sql, args){
        return new Promise((resolve, reject)=>{
            this.connection.query(sql, args, (err, result)=>{
                if(err)
                    return reject(err);
                resolve(result); 
            });
        })
    }
    close(){
        return new Promise((resolve, reject)=>{
            this.connection.end(err=>{
                if(err)
                    return reject(err);
                    resolve("success");
            });
        });
    }
    randomString(len){
        var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz+1);
        }
        return randomString;
    }
}

module.exports = {
    Database : Database
}