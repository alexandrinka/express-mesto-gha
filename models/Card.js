import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minLength: [2],
    maxLength: [30]
  },
  link:{
    type: String,
    required: true
  },
  owner:{
    type: mongoose.ObjectId,
    required: true
  },
  likes:[{
    type: mongoose.ObjectId,
    default: []
  }],
  createdAt:{
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('card', cardSchema);