import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import { handleRegistration } from '../utils/inviteToken.js';

const jwtOpts = {expiresIn:'1h'};

export const register = async (req,res)=>{
  try{
    await handleRegistration(req.body);
    res.status(201).json({msg:'User registered successfully'});
  }catch(err){
    res.status(400).json({msg:'Registration failed', error: err.message});
  }
};

export const login = async (req,res)=>{
  const {email, password} = req.body;
  if(!email || !password)
    return res.status(400).json({msg:'All fields are required'});

  const user = await User.findOne({email});
  if(!user || !(await user.isValidPassword(password)))
    return res.status(400).json({msg:'Invalid credentials'});

  const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, jwtOpts);
  res.json({token});
};
