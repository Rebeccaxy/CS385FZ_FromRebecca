const mongoose = require('mongoose');
require('dotenv').config();

const baseUri = 'mongodb+srv://Morning_glory:1234@rebecca0.3kaxkol.mongodb.net';

const formats = [
  {
    name: '格式 1: 带数据库名和所有参数',
    uri: `${baseUri}/lab4?retryWrites=true&w=majority&appName=Rebecca0`
  },
  {
    name: '格式 2: 只带数据库名',
    uri: `${baseUri}/lab4`
  },
  {
    name: '格式 3: 不带数据库名',
    uri: `${baseUri}/?retryWrites=true&w=majority`
  },
  {
    name: '格式 4: 最简单的格式',
    uri: `${baseUri}/lab4?retryWrites=true&w=majority`
  }
];

async function tryFormats() {
  for (const format of formats) {
    console.log(`\n🔄 尝试: ${format.name}`);
    console.log(`   连接字符串: ${format.uri.replace(/:[^:@]+@/, ':****@')}`);
    
    try {
      await mongoose.disconnect();
      const conn = await mongoose.connect(format.uri, {
        serverSelectionTimeoutMS: 15000,
      });
      console.log('✅ 连接成功！');
      console.log(`📊 数据库: ${conn.connection.name}`);
      await mongoose.disconnect();
      
      // 如果成功，更新 .env 文件
      console.log('\n💾 更新 .env 文件...');
      const fs = require('fs');
      const envContent = `# MongoDB Atlas 连接字符串
MONGODB_URI=${format.uri}

# 服务器端口（可选，默认为 3000）
PORT=3000
`;
      fs.writeFileSync('.env', envContent);
      console.log('✅ .env 文件已更新！');
      
      process.exit(0);
    } catch (error) {
      console.error(`❌ 失败: ${error.message.substring(0, 100)}...`);
    }
  }
  
  console.log('\n❌ 所有格式都失败了');
  console.log('\n💡 建议：');
  console.log('1. 在 MongoDB Atlas 中，点击集群的 "Connect" 按钮');
  console.log('2. 选择 "Connect your application"');
  console.log('3. 复制完整的连接字符串');
  console.log('4. 确保替换了 <username> 和 <password>');
  console.log('5. 检查 Database Access 中用户权限是否为 "Atlas admin"');
  
  process.exit(1);
}

tryFormats();

