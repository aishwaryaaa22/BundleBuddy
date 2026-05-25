const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const auth = (req, res, next) => {
  // Header se token nikaalein
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    // Token verify karein
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey123");
    req.user = decoded; // User ki info request mein daal dein
    next(); // Agle step par bhejein
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware
app.use(cors());
app.use(express.json()); // Body parser: Iske bina 400 error aata hai
const server = http.createServer(app); // Express ko http server mein lapet de

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173", // Aapka frontend URL
    methods: ["GET", "POST"],
  },
});

// 1. Database Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/bundleBuddy")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("DB Connection Error:", err));

const groupSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: String,
  productPrice: Number,
  productImage: String,
  expiryDate: Date,
  // Location object alag rakhein
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  optimizedPrice: { type: Number, default: 0 },
  // Inhe bahar nikaal diya hai
  maxMembers: { type: Number, default: 5 },
  currentMembers: { type: Number, default: 0 },
});

// Indexing hamesha model banane se PEHLE ya turant baad karein
groupSchema.index({ location: "2dsphere" });

const Group = mongoose.model("Group", groupSchema);

// group join
const joinedGroupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: String, required: true }, // Product ki ID
  productName: String,
  productPrice: Number,
  productName: String,
  productImage: String,
  expiryDate: Date,
  joinedAt: { type: Date, default: Date.now },
});

const JoinedGroup = mongoose.model("JoinedGroup", joinedGroupSchema);

// 2. User Model (Schema)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: true }, // OTP hata diya isliye true
});

const User = mongoose.model("User", userSchema);

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now }
});

const Newsletter=mongoose.model("Newsletter", newsletterSchema);


app.post("/api/subscribe", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const newSubscriber = new Newsletter({ email });
        await newSubscriber.save();

        res.status(200).json({ message: "Subscribed successfully! 10% off code sent." });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: "You are already subscribed!" });
        } else {
            res.status(500).json({ message: "Server error" });
        }
    }
});

// 3. Signup Route (Directly in server.js)
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Request Received:", req.body); // Debugging ke liye

  try {
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Create New User
    user = new User({ name, email, password });
    await user.save();

    // Generate Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "1d" },
    );

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 4. Login Route (Directly in server.js)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// Join Group Route
app.post("/api/groups/join", auth, async (req, res) => {
  try {
    const {
      productId,
      productName,
      productPrice,
      productImage,
      expiryDate,
      location,
    } = req.body;

    console.log("Image received in backend:", productImage);

    // 1. Database mein group dhoondho
    let group = await Group.findOne({ productId: productId });
    console.log("Database se mila data:", group);

    // 2. Agar group nahi mila, toh naya create karein
    if (!group) {
      console.log("Naya group create ho raha hai...");
      group = new Group({
        productId,
        productName,
        productPrice,
        productImage,
        location, // Frontend se [longitude, latitude] aana chahiye
        maxMembers: 5,
        currentMembers: 0,
      });
    }

    // 3. Members update karein (Safety check ke saath)
    if (group.currentMembers < (group.maxMembers || 5)) {
    group.currentMembers += 1;
    await group.save();
let optimizedPrice = null;
    // --- GEMINI PRICE OPTIMIZATION START ---
    try {
        // Hum AI ko tabhi call karenge jab 2 ya zyada log ho jayein
        const members = group.currentMembers;
const basePrice = group.productPrice;
const fakeOptimizedPrice = basePrice - (members * 100); 

io.emit("priceUpdated", {
    productId: group.productId,
    newPrice: fakeOptimizedPrice
});
        }
     catch (aiErr) {
        console.error("Gemini AI Error:", aiErr);
       
    }
    

    io.emit("memberJoined", {
        productId,
        currentMembers: group.currentMembers,
        maxMembers: group.maxMembers || 5
    });
}

   
    const newJoin = new JoinedGroup({
      userId: req.user.id, 
      productId,
      productName,
      productPrice,
      productImage,
      expiryDate,
      location,
    });

    await newJoin.save();

    // 5. Final Response
    res.json({
      message: "Successfully joined and saved to your list!",
      group: {
        _id: group._id,
        productPrice: group.productPrice, 
        productName: group.productName,
      },
    });
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ message: err.message || "Server error occurred" });
  }
});

app.get("/api/my-groups", auth, async (req, res) => {
  try {
    const groups = await JoinedGroup.find({ userId: req.user.id });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Kisi specific joined bundle ko delete karne ke liye
app.delete("/api/my-groups/:id", auth, async (req, res) => {
  try {
    const bundleId = req.params.id;
    const userId = req.user.id;

    const deletedBundle = await JoinedGroup.findOneAndDelete({
      _id: bundleId,
      userId: userId,
    });

    if (!deletedBundle) {
      return res
        .status(404)
        .json({ message: "Bundle not found or unauthorized" });
    }

    res.json({ message: "Bundle removed successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/api/bundles/nearby", async (req, res) => {
  try {
    const { lat, lng } = req.query; // Frontend se user ki location ayegi

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Location coordinates are required" });
    }

    const nearbyBundles = await Group.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)], // User coordinates
          },
          $maxDistance: 5000, // Distance in meters (5000m = 5km)
        },
      },
    });

    res.json(nearbyBundles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/groups/finalize/:groupId", async (req, res) => {
  const { groupId } = req.params;

  try {
    // Option A: Agar aap chahti hain ki finalize hote hi bundle delete ho jaye
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Bundle not found" });
    }

    res.status(200).json({ message: "Bundle finalized aur deleted" });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
});
// Port settings
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
