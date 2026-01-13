const jwt = require("jsonwebtoken");

const signJwt = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const setAuthCookie = (res, token, maxAge) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
  });
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatarUrl: user.avatarUrl,
  anonymous_name: user.anonymous_name,
  no_hp: user.no_hp,
});

module.exports = { signJwt, setAuthCookie, sanitizeUser };
