const admin = (req, res, next) => {
  console.log("🔐 ADMIN MIDDLEWARE HIT");
  console.log("User:", req.user);

  if (req.user && req.user.role === "admin") {
    console.log("✅ Admin access granted");
    next();
  } else {
    console.log("❌ Admin access denied");

    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
};

module.exports = { admin };
