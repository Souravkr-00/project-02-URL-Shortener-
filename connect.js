const mongoose = require("mongoose");

async function connectionMongoDB(URL){
    return mongoose.connect(URL);
}

module.exports = {
    connectionMongoDB
};