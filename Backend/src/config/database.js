const mongoose = require('mongoose')
const dns = require('dns')

// Windows DNS fix for MongoDB Atlas connection
dns.setServers(['8.8.8.8', '1.1.1.1'])
async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected succesfully')
    }
    catch (err){
        console.log('Connection failed', err.message)
        process.exit(1)
    }
}
module.exports= connectDB