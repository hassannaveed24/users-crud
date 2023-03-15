const mongoose = require("mongoose");

module.exports = class Database {
    constructor() {
        console.log("Created instance of DB");
        
        this.connectionString = process.env.DB_CONNECTION_STRING;
        // this.authString = this.getAuthString(process.env.DB_PASSWORD);
        this.authString = process.env.DB_CONNECTION_STRING;
    }

    getAuthString(password) {
        return this.connectionString.replace("<password>", password);
    }

    connect() {
        mongoose.set("strictQuery", false);
        console.log("Connecting to DB...");
        return mongoose.connect(this.authString);
    }
};
