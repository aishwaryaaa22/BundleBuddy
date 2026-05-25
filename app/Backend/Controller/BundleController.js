
const joinOrCreateGroup = async (req, res) => {
  const { userId, productId, longitude, latitude } = req.body;

  // 1. Find nearby active group (5km radius)
  let group = await Group.findOne({
    productId,
    status: 'active',
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [longitude, latitude] },
        $maxDistance: 5000 // 5000 meters = 5km
      }
    }
  });

  if (group) {
    // 2. Agar group mila toh join karo (duplicate check ke baad)
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      if (group.members.length >= group.threshold) {
        group.status = 'completed'; // Discount unlocked!
      }
      await group.save();
    }
    return res.json({ message: "Joined existing group", group });
  } else {
    // 3. Naya group banao
    const newGroup = await Group.create({
      productId,
      members: [userId],
      location: { type: 'Point', coordinates: [longitude, latitude] }
    });
    return res.json({ message: "New group created", newGroup });
  }
};
// Auth controller mein
const handleSignUp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const mailOptions = {
    from: "Bundle Buddy <your-email@gmail.com>",
    to: email,
    subject: "Verify your email - Bundle Buddy",
    text: `Your verification code is: ${otp}`,
    html: `<b>Your verification code is: ${otp}</b>`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to email!" });
  } catch (error) {
    res.status(500).json({ message: "Email sending failed" });
  }
};