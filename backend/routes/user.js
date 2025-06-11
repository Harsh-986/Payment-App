const express = require("express");
const router = express.Router();
const { signinZodSchema, signupZodSchema, updateBody } = require("../zodSchema");
const { user, Account } = require("../MongoSchema");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
    const result = signupZodSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ msg: "Invalid input" });
    }

    const existing = await user.findOne({ username: req.body.username });
    if (existing) {
        return res.status(409).json({ msg: "Username already exists" });
    }

    const newUser = await user.create(req.body);
    const userId = newUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.floor(Math.random() * 10000)
    });

    const token = jwt.sign({ userId }, JWT_SECRET);
    return res.status(201).json({
        msg: "User created successfully",
        token: token  // 👈 Add 'Bearer ' prefix here if your frontend expects it
    });
});


// SIGNIN ROUTE
router.post("/signin", async (req, res) => {
    const result = signinZodSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(411).json({ msg: "Incorrect input" });
    }

    const foundUser = await user.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!foundUser) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: foundUser._id }, JWT_SECRET);
    return res.json({ token: token });  // 👈 Include 'Bearer ' prefix for standardization
});


// UPDATE USER ROUTE (requires token)
router.put("/", authMiddleware, async (req, res) => {
    const result = updateBody.safeParse(req.body);
    if (!result.success) {
        return res.status(411).json({ msg: "Error while updating information" });
    }

    try {
        await user.updateOne({ _id: req.userId }, req.body);
        return res.json({ msg: "Updated successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Update failed", error: err.message });
    }
});


// BULK USER SEARCH
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await user.find({
        $or: [
            { firstName: { $regex: filter, $options: "i" } },
            { lastName: { $regex: filter, $options: "i" } }
        ]
    });

    return res.json({
        user: users.map(u => ({
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
            _id: u._id
        }))
    });
});

module.exports = router;
