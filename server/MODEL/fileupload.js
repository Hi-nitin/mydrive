const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalname: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRegister',
        required: true,
    },
    uploadTime: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('File', fileSchema);
