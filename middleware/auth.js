const jwt = require("jsonwebtoken");

/* =========================
   AUTHENTICATION
========================= */
const optionalAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next();

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    req.user = null;
  }

  next();
};

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau kadaluarsa",
    });
  }
};

/* =========================
   AUTHORIZATION
========================= */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Akses ditolak. Admin only.",
    });
  }
  return next();
};

module.exports = { authMiddleware, adminOnly, optionalAuth};
