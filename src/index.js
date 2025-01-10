import express from 'express'
import router from './route/user.router.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'


dotenv.config()

const Port = process.env.PORT
const app = express()
app.use(express.json())
app.use('/', router)


app.listen(Port, () => {
  console.log("sever is running on port 5001");
  connectDB();
})