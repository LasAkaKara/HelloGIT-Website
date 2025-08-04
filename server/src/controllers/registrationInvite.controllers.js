import jwt from "jsonwebtoken";
import InviteToken from "../models/inviteToken.models.js";
import { sendInvite } from "../services/mailServices.js";

export const generateInviteToken = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  const frontendUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const link = `${frontendUrl}/register?token=${token}`;

  try {
    await sendInvite(email, link);
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
};
