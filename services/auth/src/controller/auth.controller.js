import { getAuth } from "firebase-admin/auth";
import { User } from "../model/user.schema.js";
import crypto from "crypto";
export const login = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("Token : ",token)
    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({
      fireBaseUid: decoded.uri,
    });
    if (!user) {
      // create user if not exist
      user = await User.create({
        fireBaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }
    //store seesion
    const sessionId = crypto.randomUUID();
    res.cookie("auth_session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500)
  }
};
