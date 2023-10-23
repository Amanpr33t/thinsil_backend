const mongoose= require('mongoose')
//This function is used to connect to the mongoDB database
const connectDB=(connectionString)=>{
      return mongoose.connect(connectionString)
}
module.exports= connectDB