const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const http = require("http");
const nodemailer = require('nodemailer');
//const cron = require('node-cron');
const { Server } = require("socket.io");
const app = express();
const auth = (req, res, next) => {
 
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey123");
    req.user = decoded; 
    next(); 
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware
app.use(cors());
app.use(express.json()); 
const server = http.createServer(app); 

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
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

  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }, 
  },
  optimizedPrice: { type: Number, default: 0 },

  maxMembers: { type: Number, default: 5 },
  currentMembers: { type: Number, default: 0 },
});

//nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "Bundlebuddysupport@gmail.com", 
    pass: "ijdp ryfa zebe cotg"  
  }
});

// Route for Contact Section
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: "Bundlebuddysupport@gmail.com",
    to: "Bundlebuddysupport@gmail.com",
    replyTo: email, 
    subject: ` New Contact Form Message from ${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
        <h2 style="color: #333;">New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #fff; padding: 15px; border-left: 4px solid #434d5e; border-radius: 4px;">
          ${message}
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ error: 'Failed to dispatch email notification.' });
  }
});

// //cronjob
// cron.schedule('0 * * * *', async () => {
//   console.log(' [CRON] Starting automated check for active Bundle pools...');
  
//   try {
//     const currentTime = new Date();

//     console.log(' [CRON] Automated bundle pool processing completed clean.');
//   } catch (error) {
//     console.error(' [CRON] Error executing bundle check job:', error);
//   }
// });

//nodemailer for subscription 
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required to subscribe.' });
  }

  const mailOptions = {
    from: "Bundlebuddysupport@gmail.com",
    to: email,                     
    subject: '🎉 Subscribed to Bundle Buddy!',
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #171717; padding: 20px; text-align: center; border-radius: 6px 6px 0 0;">
          <h1 style="color: #ffffff; margin: 0; letter-spacing: 2px; font-size: 24px;">BUNDLE BUDDY</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6; color: #333333;">
          <h2 style="color: #171717;">Welcome to the Bundle Buddy! </h2>
          <p>Thank you for subscribing to our exclusive drops newsletter. You are now officially part of the squad.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #434d5e; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #434d5e;"></p>
            <p style="margin: 5px 0 0 0;">As promised, use code <strong>BUDDY5</strong> at checkout to get 5% off on your first group purchase!</p>
          </div>

          <p>We will keep you updated with early access to custom drops, community targets, and upcoming collection launches.</p>
          <p style="margin-top: 30px;">Stay tuned,<br><strong>Team Bundle Buddy</strong></p>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777777; border-radius: 0 0 6px 6px;">
          <p style="margin: 0;">You received this email because you subscribed on our website.</p>
          <p style="margin: 5px 0 0 0;">Delhi, India</p>
        </div>
      </div>
    `
  };
  try {
    
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Subscription Mail Error:', error);
    res.status(500).json({ error: 'Failed to complete subscription registration.' });
  }
});


groupSchema.index({ location: "2dsphere" });

const Group = mongoose.model("Group", groupSchema);

// group join
const joinedGroupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: String, required: true }, 
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
  isVerified: { type: Boolean, default: true }, 
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

// Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Request Received:", req.body); 

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Create New User
    user = new User({ name, email, password });
    await user.save()

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

// Login Route 
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

    let group = await Group.findOne({ productId: productId });
    console.log("Data from database:", group);

    if (!group) {
      console.log("New group can be created...");
      group = new Group({
        productId,
        productName,
        productPrice,
        productImage,
        location,
        maxMembers: 5,
        currentMembers: 0,
      });
    }

  
    if (group.currentMembers < (group.maxMembers || 5)) {
    group.currentMembers += 1;
    await group.save();
let optimizedPrice = null;
    try {
       
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
    const { lat, lng } = req.query; 

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
            coordinates: [parseFloat(lng), parseFloat(lat)], 
          },
          $maxDistance: 5000, 
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
