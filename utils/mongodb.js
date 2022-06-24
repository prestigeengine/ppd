const mongoose = require("mongoose")

module.exports = async() => {

    let connKey = "mongodb://127.0.0.1:27017/ppd"
    mongoose.connect(connKey, {
            dbName: 'ppd',
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        .then(() => {
            console.log(`--> MongoDB is connected to ${connKey}.`)
        })
        .catch((err) => console.error(err));


    mongoose.Promise = global.Promise;

    
}