import User from '../models/user.models.js';
import InviteToken from '../models/inviteToken.models.js';
import jwt from 'jsonwebtoken';

export const handleRegistration = async ({name, password, token}) => {
    if (!name || !password || !token) throw new Error('All fields are required');

    const email = jwt.verify(token, process.env.JWT_SECRET).email;
    console.log(`Registering user with email: ${email}`);

    const existingInvite = await InviteToken.findOne({ token });
    if (!existingInvite) throw new Error('Invalid or expired invite token');
    if (existingInvite.used) throw new Error('Invite token has already been used');

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    await User.create({ name, email, password });

    existingInvite.used = true;
    await existingInvite.save();
}