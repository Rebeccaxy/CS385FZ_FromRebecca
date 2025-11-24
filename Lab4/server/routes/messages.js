const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /messages - 获取所有消息
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }); // 按时间倒序排列
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /messages - 创建新消息
router.post('/', async (req, res) => {
  try {
    const { username, text } = req.body;

    // 验证必填字段
    if (!username || !text) {
      return res.status(400).json({
        success: false,
        error: '用户名和消息内容都是必需的'
      });
    }

    // 创建新消息（timestamp 会自动设置为当前时间）
    const message = new Message({
      username: username.trim(),
      text: text.trim()
    });

    const savedMessage = await message.save();
    
    res.status(201).json({
      success: true,
      data: savedMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

