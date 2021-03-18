// ===================== Postgre Database Configuration=======================

const Promise = require("bluebird");
Promise.config({
    cancellation: true
});

const initOptions = {
    promiseLib: Promise,
    capSQL: true, // capitalize all generated SQL
    extend(obj) {
        obj.queryTimeout = (query, values, delay) => {
            return obj.any(query, values).timeout(delay);
        }
    }
};
const pgp = require('pg-promise')(initOptions);  


    class Connection {        

        constructor(){

            this.config_postgre = {
                host: 'john.db.elephantsql.com',
                port: 5432,
                database: 'zznmptjd',
                user: 'zznmptjd',
                password: 'WL_AaCimgP1s4xUlYSsehlVaUUj7Hi1t',
                ssl : false
                };

            this.postgredb = '';

            this.postgre_connect();
        }

        postgre_connect(){
            const db = pgp(this.config_postgre);
            db.connect()
                .then(function (obj) {
                    obj.done();
                    console.log("Postgre DB Connected successfully!!!!!!!");
                })
                .catch(function (error) {
                    // console.log("ERROR:", error.message);
                });
                this.postgredb = db;
        }

        connect_db(){
            if(this.postgredb==""){
                this.postgre_connect();
            }
        }
    }

    const obj = new Connection();
    obj.connect_db();
    const postgredbconnect= obj.postgredb;

    
module.exports = postgredbconnect;
