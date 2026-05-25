const mongoose = require('mongoose');

const JoinedGroupSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JoinedGroup', JoinedGroupSchema);