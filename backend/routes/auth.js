const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone,Department, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
       
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            phone,
            Department,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

     
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Create JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email ,Department:user.Department}
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // 📧 Build HTML message
    const html = `
      <h2>Password Reset Request</h2>
      <p>We received a request to reset your password.</p>
      <p>
        <a href="${resetLink}" 
           style="background:#2563eb;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;">
          Reset Password
        </a>
      </p>
      <p>This link will expire in 1 minutes.</p>
    `;

    // Send email via Mailtrap
    await sendEmail(user.email, "Password Reset Request", html);

    res.json({ message: "Reset link sent to your email address" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



//Reset PassWord 
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Verify reset token (for frontend check)
router.post("/verify-token", async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.json({ valid: false });

    res.json({ valid: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ valid: false });
  }
});

module.exports = router;
