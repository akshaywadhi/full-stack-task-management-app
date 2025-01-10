import { generateToken } from "../lib/utils.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import menuModel from "../model/menu.model.js";

export const signup = async (req, res) => {
  // extracted data from body

  const { username, email, password } = req.body;

  // using try and cache block for better error handeling

  try {
    // all fields must be filled

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    // password length less than 6 is not allowed

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Length Should Be Atleast 6 Characters" });
    }

    // checking user already exist or not

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "This Email Already Exist" });
    }

    // making password secure by hashing

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    //generating token, created utils.js in lib folder for generatedToken function

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const login = async (req,res) => {

  const {email, password} = req.body

 try {

  const user = await userModel.findOne({email})

  if(!user){
    return res.status(400).json({message : 'Invalid Credentials'})
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if(!isPasswordCorrect){
    return res.status(400).json({message : 'Invalid Credentials'})
  }

  generateToken(user._id,res)

  res.status(200).json({
    id : user._id,
    username : user.username,
    email : user.email
  })
  
 } catch (error) {
  
  res.status(500).json({message : 'Internal Server Error'})
 }
}


export const logout = (req,res) => {

  try{
    res.cookie("jwt", "", {maxAge : 0})
    res.status(200).json({message : 'Logged Out Successfully'})
  }
  catch(error){
    res.status(500).json({message : 'Internal Sever Error'})
  }
}




export const menuAdd = async (req,res) => {

  const {name, category, price, availability} = req.body


 
  try{


    if(!name || !category || price === undefined || availability === undefined){
      return res.status(400).json({message : 'All Fields Are Required'})
    }
   
    const menuItem = new menuModel({
      name,
      category,
      price,
      availability
    })
  
      await menuItem.save()
      res.status(200).json({message : 'Menu Items Added Successfully'})
  }
  catch(err){
res.status(500).json({message : 'Internal Server Error'})
  }
}




export const menu = async (req,res) => {

  try{

    const menuItems = await menuModel.find()
    res.status(200).json(menuItems)

  }
  catch(err){
res.status(500).json({message: 'Internal Server Error'})
  }
}