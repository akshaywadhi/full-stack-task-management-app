import mongoose from "mongoose";


const menuSchema = new mongoose.Schema({

  name : {
    type : String,
    required : true,
  },
  category : {
    type : String,
    required : true,
  },
  price : {
    type : Number,
    required : true,
  },
  availability : {
    type : Boolean,
    required : true
  }
})

const menuModel = mongoose.model("Menu", menuSchema)

export default menuModel;