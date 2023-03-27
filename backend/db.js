const mongoose = require('mongoose');
const server = "127.0.0.1:27017";
const database = "Mynotebook"
const connectToMongo = async () => {
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log('mongoDB connected!!');
    }
    catch (err){
        console.log("failed to connect mongoDB!!", err)
    }
}
mongoose.set('strictQuery', true);
module.exports = connectToMongo;
