import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next)=>{
  const header = req.headers['authorization'];         // "Bearer <token>"
  const token  = header && header.split(' ')[1];
  if(!token) return res.status(401).json({msg:'No token'});
  jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
    if(err) return res.status(403).json({msg:'Invalid token'});
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

export const authorizeRole = (...roles)=> (req,res,next)=>{
  if(!roles.includes(req.userRole))
    return res.status(403).json({msg:'Forbidden'});
  next();
};
