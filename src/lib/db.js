import mongoose from 'mongoose'


export const connectDB = async () => {

  try {

    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected To Database'+ connect.connection.host)
    
  } catch (error) {

    console.log('Something Went Wrong', error)
    
  }
}