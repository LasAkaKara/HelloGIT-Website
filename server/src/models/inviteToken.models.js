import mongoose from 'mongoose';

const InviteTokenSchema = new mongoose.Schema({
  token: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  used: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now, expires: '2d'} // auto-delete after 2 days
});

export default mongoose.model('InviteToken', InviteTokenSchema);
