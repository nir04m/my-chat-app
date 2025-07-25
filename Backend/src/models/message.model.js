// backend/models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  image: {
    type: String, // image URL or Cloudinary ID
    default: ''
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
