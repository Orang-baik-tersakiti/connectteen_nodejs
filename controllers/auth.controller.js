const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { oauth2Client, authorizationUrl } = require("../helpers/utils.js");
const { google } = require("googleapis");
const {
  generateAnonymousName,
} = require("../helpers/generateAnonymousName.js");

const googleSignIn = (req, res) => {
  res.redirect(authorizationUrl);
};

const googleSigInCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    if (!data) {
      return res.status(400).json({ error: "Google userinfo not found" });
    }

    let user = await User.findOne({ email: data.email });

    const anonymousName = await generateAnonymousName();

    if (!user) {
      user = await User.create({
        name: data.name,
        email: data.email,
        avatarUrl: data.picture,
        anonymous_name: anonymousName,
        no_hp: "",
        password: "",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatarUrl,
        anonymous_name: user.anonymous_name,
        no_hp: user.no_hp,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 hari
    });

    return res.json({
      success: true,
      message: "Login success",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatarUrl,
        anonymous_name: user.anonymous_name,
        no_hp: user.no_hp,
      },
    });
  } catch (err) {
    // console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { googleSignIn, googleSigInCallback };
