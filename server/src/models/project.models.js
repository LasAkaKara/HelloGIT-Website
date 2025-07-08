// server/models/Project.js
import mongoose from 'mongoose';

const projectSchema=new mongoose.Schema({
  title:{type:String,required:true},
  summary:{type:String,required:true},             // short overview
  description:{type:String},                       // full README‑style text
  repoUrl:{type:String},                           // e.g., GitHub link
  liveUrl:{type:String},                           // deployed demo
  imageUrl:{type:String},
  tags:[String],                                   // ['vue','api','tailwind']
  status:{type:String,enum:['draft','published'],default:'published'},
  likes:{type:Number,default:0},
  createdAt:{type:Date,default:Date.now}
});

projectSchema.index({title:'text',summary:'text',tags:'text'});

export default mongoose.model('Project',projectSchema);
