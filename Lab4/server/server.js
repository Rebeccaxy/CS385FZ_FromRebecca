const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件：解析 JSON 请求体
app.use(express.json());

// 导入路由
const messageRoutes = require('./routes/messages');
app.use('/messages', messageRoutes);

// 连接 MongoDB Atlas
const connectDB = async () => {
  try {
    console.log('🔄 正在连接 MongoDB Atlas...');
    const mongoUri = process.env.MONGODB_URI;
    console.log('🔗 连接字符串:', mongoUri.replace(/:[^:@]+@/, ':****@')); // 隐藏密码
    
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000, // 30秒超时
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
    });
    console.log('✅ 成功连接到 MongoDB Atlas');
    console.log(`📊 数据库: ${conn.connection.name}`);
    console.log(`🌐 主机: ${conn.connection.host}`);
    // 启动服务器
    app.listen(PORT, () => {
      console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB 连接失败:', error.message);
    
    // 检查是否是认证问题
    if (error.reason && error.reason.servers) {
      const servers = Array.from(error.reason.servers.values());
      const serverErrors = servers.map(s => ({
        address: s.address,
        error: s.error ? s.error.message : '无错误',
        type: s.type
      }));
      console.error('📋 服务器连接状态:');
      serverErrors.forEach(s => {
        console.error(`   ${s.address}: ${s.type} - ${s.error}`);
      });
    }
    
    if (error.message.includes('authentication failed') || error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.error('💡 提示: 认证失败，请检查：');
      console.error('   1. 数据库用户名是否正确: lab4user_0');
      console.error('   2. 数据库密码是否正确: 1234');
      console.error('   3. 如果密码包含特殊字符，需要进行 URL 编码');
    } else if (error.message.includes('IP') || error.message.includes('whitelist') || error.reason?.type === 'ReplicaSetNoPrimary') {
      console.error('💡 提示: 无法连接到 MongoDB 服务器，请检查：');
      console.error('   1. Network Access 中 IP 白名单是否已生效（等待 1-2 分钟）');
      console.error('   2. Database Access 中用户权限是否为 "Atlas admin" 或 "Read and write to any database"');
      console.error('   3. 用户名和密码是否正确');
      console.error('   4. MongoDB Atlas 集群是否正常运行');
    } else if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
      console.error('💡 提示: 连接超时或 DNS 解析失败');
      console.error('   请检查网络连接和 MongoDB Atlas 集群状态');
    }
    process.exit(1);
  }
};

connectDB();

// 健康检查端点
app.get('/', (req, res) => {
  res.json({ message: '消息服务器运行正常', endpoints: ['GET /messages', 'POST /messages'] });
});

