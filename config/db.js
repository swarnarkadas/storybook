const mongoose = require('mongoose')
// mongoose.set('strictQuery', true);
const connectDB = async() =>{
    try{
        mongoose.set('strictQuery', true);     //add this to avoid deprecation error
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            keepAlive:true,
            useNewUrlParser:true,
            // mongoose.set('strictQuery', true);

        }
        )

        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit()
    }
}

module.exports = connectDB