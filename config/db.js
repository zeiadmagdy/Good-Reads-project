const mongoose = require("mongoose");

function connectToDb() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db");
    }
    catch {
        console.log("error connecting to db", err);
    }
}

module.exports = connectToDb;
