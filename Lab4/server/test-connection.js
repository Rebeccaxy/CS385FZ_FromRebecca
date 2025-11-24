const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  const uri = process.env.MONGODB_URI;
  console.log('🔍 测试连接字符串:', uri.replace(/:[^:@]+@/, ':****@'));
  
  // 尝试不同的连接选项
  const options = [
    {
      name: '选项 1: 标准连接',
      opts: {
        serverSelectionTimeoutMS: 10000,
      }
    },
    {
      name: '选项 2: 增加超时时间',
      opts: {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      }
    },
    {
      name: '选项 3: 使用 directConnection',
      opts: {
        serverSelectionTimeoutMS: 10000,
        directConnection: false,
      }
    }
  ];

  for (const option of options) {
    console.log(`\n📌 尝试: ${option.name}`);
    try {
      await mongoose.disconnect(); // 确保之前的连接已关闭
      const conn = await mongoose.connect(uri, option.opts);
      console.log('✅ 连接成功！');
      console.log(`📊 数据库: ${conn.connection.name}`);
      console.log(`🌐 主机: ${conn.connection.host}`);
      await mongoose.disconnect();
      process.exit(0);
    } catch (error) {
      console.error(`❌ 失败: ${error.message}`);
      if (error.message.includes('authentication')) {
        console.error('🔐 认证失败 - 请检查用户名和密码');
      }
    }
  }
  
  console.log('\n❌ 所有连接尝试都失败了');
  process.exit(1);
};

testConnection();

