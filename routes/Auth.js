import express from 'express';
import jwt from 'jsonwebtoken';
const route = express.Router();
import dotenv from 'dotenv';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';

dotenv.config();


// JWT secret
const JWT_SECRET = process.env.JWT_SECRET; //Stored securely in .env file


route.post('/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });
    

    const isMatch = await bcrypt.compare(password, bcrypt.hash(user.password));
    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
       { expiresIn: rememberMe ? '7d' : '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" , token: token});
    // console.log(res.data);
    // console.log("User logged in:", user.email);
    // console.log("Token issued:", token);
    // console.log("Token expires in:", rememberMe ? "7 days" : "15 minutes");

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});






// route.get("/profile", (req, res) => {
//   const token = req.cookies.token;
//   console
//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     res.json({ user: decoded }); // return only user info
//   } catch (err) {
//     res.status(403).json({ message: "Invalid or expired token" });
//   }
// });

route.get("/profile", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("User profile role accessed:", decoded.role);

    if (decoded.role) {
      res.json({token: token, user: decoded });
      
    }

  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
});

route.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});


export default route;