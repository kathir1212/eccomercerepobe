import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  console.log("Auth middleware triggered");

  const { token } = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODI1ZmMxOTg4ZWQwM2NkZjM2MGVmOCIsImlhdCI6MTc1Mzc5NTU1NSwiZXhwIjoxNzU0NDAwMzU1fQ.0Rh_xnPFChJJ4xBvF0eTOc8XhOWZOzCvbxDEIgrhf3M";

  console.log("Cookies received:", req.cookies.token);

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (decoded.id) {
      req.body.userId = decoded.id; 
      next(); 
    } else {
      return res.status(401).json({ success: false, message: "Invalid token structure" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token", error: error.message });
  }
};
