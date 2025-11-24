const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名是必需的'],
    trim: true
  },
  text: {
    type: String,
    required: [true, '消息内容是必需的'],
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// 创建模型
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

