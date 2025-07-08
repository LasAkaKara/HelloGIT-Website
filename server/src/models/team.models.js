import mongoose from 'mongoose';

const teamMemberSchema=new mongoose.Schema({
  name:{type:String,required:true},
  role:{type:String,required:true},             // e.g. "President", "Mentor"
  bio:{type:String},
  imageUrl:{type:String},
  socials:{
    github:String,
    linkedin:String,
    email:String
  }
});

export default mongoose.model('TeamMember',teamMemberSchema);
