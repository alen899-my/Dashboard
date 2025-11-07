// backend/routes/User.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth=require("../middleware/auth")
router.get("/users", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const search = req.query.search || "";
  const department=req.query.department||"";

  try {
     const query = {
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      }),
      ...(department && { Department:department }),
    };
    // Count total filtered users
    const totalUsers = await User.countDocuments(query);

    // Get only filtered + paginated users
    const users = await User.find(query, "name email phone Department").sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


//view a specific user
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.put("/users/:id", async (req, res) => {
  try {
    const { name, email, phone,Department, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone,Department, role },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//delete
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//profile
router.get("/profile",auth,async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update Admin Profile
router.put("/profile", auth, async (req, res) => {
  try {
    const adminId = req.user.id; // comes from middleware
    const { name, email, phone, Department } = req.body;

    const updatedAdmin = await User.findByIdAndUpdate(
      adminId,
      { name, email, phone, Department },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err });
  }
});

//get stats
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    // Unique departments
    const departments = await User.distinct("Department");

    // Users created in the last 30 days
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const newThisMonth = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.json({
      totalUsers,
      totalDepartments: departments.length,
      newThisMonth,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});
// backend/routes/adminRoutes.js

router.get("/chart-data", async (req, res) => {
  try {
    // Dummy data for now
    const userGrowth = [
      { month: "Jun", count: 12 },
      { month: "Jul", count: 19 },
      { month: "Aug", count: 25 },
      { month: "Sep", count: 30 },
      { month: "Oct", count: 28 },
      { month: "Nov", count: 35 },
    ];

    const departmentDistribution = [
      { department: "HR", value: 10 },
      { department: "IT", value: 20 },
      { department: "Finance", value: 8 },
      { department: "Sales", value: 12 },
      { department: "Marketing", value: 15 },
    ];

    res.json({ userGrowth, departmentDistribution });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chart data" });
  }
});
router.get("/recent", async (req, res) => {
  try {
    const recentUsers = await User.find({}, "name email Department createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(recentUsers);
  } catch (error) {
    console.error("Error fetching recent users:", error);
    res.status(500).json({ message: "Failed to fetch recent users" });
  }
});
module.exports = router;
