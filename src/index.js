import express from 'express'
import router from './route/user.router.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'


dotenv.config()

const Port = process.env.PORT
const app = express()
app.use(express.json())
app.use('/', router)


app.get('/', (req,res) => {

  res.send(`<h1>Food Delivery System</h1>
    <h5>Use Postman For Sending Request</h5>
    <ol>
    <li>
<p>To Create User Go /signup, where user can be created using object
{
"username" : "Enter Your Username",
"email" : "Enter Your Email",
"password" : "Enter Password Here"
  }
</p>
</li>
<li>
<p>To Login User
{
"email" : "Enter Email Here",
"password" : "Enter Password Here"
}
</p>

</li>

<li>
<p>To See Menu List Go ON /menu Using Postman
</p>

</li>

<li>
<p>To Create Menu List Go ON /menu Using Postman
And Send Object 
{
"name" : "Enter Name Of Menu",
"category" : "Enter Category Here",
"price" : "Enter Price Here",
"availability" : "Enter True Or False"
}
</p>

</li>

<li>
<p>
To Update Or Delete The Menu Go To /menu/:id Enter Id Of the Menu
And Make A Request Put Or Delete Using Postman
</p>
</li>

<li>
<p> To Create Order Go To /order Url
and send this object
{
  "items": [
    {
      "menuItemId": "Here You Have To Menu Id, It Can Accessed Using /menu After Login",  
      "quantity": 2
    }
  ]
}

</p>
</li>

<li>
<p>
And To See Orders Made By An User Go To /Orders
Made By An Logged In User
</p>
</li>
</ol>
    `)
})


app.listen(Port, () => {
  console.log("sever is running on port 5001");
  connectDB();
})