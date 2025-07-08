import jwt from 'jsonwebtoken';
import InviteToken from '../models/inviteToken.models.js';
import {sendInvite} from '../services/mailServices.js';

export const generateInviteToken = async (req, res) => {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2d' });
    const link = `http://localhost:${process.env.PORT}/invite/${token}`;

    //front end will use this token to create a new user
    //console.log(`invite link: ${process.env.FRONTEND_URL}/invite/${token}`);

    try {
        await sendInvite(email, link)
        await InviteToken.create({ token, email });
    
        res.status(200).json({
            success: true,
            message: `Invite link generated successfully!`,
            token: token,
        });
    } catch (err) {
        console.error("Invite not sent ", err);
        res.status(500).json({
            success: false,
            message: `Failed to send invite link: ${err.message}`,
        });
    }
}