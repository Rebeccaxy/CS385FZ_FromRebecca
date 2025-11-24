const { MongoClient } = require('mongodb');
require('dotenv').config();

async function diagnose() {
  const uri = process.env.MONGODB_URI;
  console.log('🔍 诊断 MongoDB 连接问题\n');
  console.log('连接字符串（隐藏密码）:', uri.replace(/:[^:@]+@/, ':****@'));
  console.log('用户名:', uri.match(/mongodb\+srv:\/\/([^:]+):/)?.[1] || '未找到');
  console.log('数据库名:', uri.match(/mongodb\.net\/([^?]+)/)?.[1] || '未找到');
  
  console.log('\n📋 请确认以下信息：');
  console.log('1. 在 MongoDB Atlas 的 Database Access 中：');
  console.log('   - 用户名是否完全匹配（区分大小写）: Morning_glory');
  console.log('   - 密码是否正确: 1234');
  console.log('   - 用户权限是否为 "Atlas admin" 或 "Read and write to any database"');
  console.log('\n2. 在 MongoDB Atlas 的 Network Access 中：');
  console.log('   - 是否有 0.0.0.0/0 条目');
  console.log('   - 状态是否为 "Active"');
  
  console.log('\n🔄 尝试连接...\n');
  
  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    
    await client.connect();
    console.log('✅ 连接成功！');
    
    // 测试数据库操作
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('📊 数据库中的集合:', collections.map(c => c.name));
    
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ 连接失败:', error.message);
    
    if (error.message.includes('authentication') || error.message.includes('bad auth')) {
      console.error('\n🔐 认证失败！');
      console.error('请检查：');
      console.error('  1. 用户名是否正确（区分大小写）');
      console.error('  2. 密码是否正确');
      console.error('  3. 如果密码包含特殊字符，需要进行 URL 编码');
    } else if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.error('\n🌐 IP 白名单问题！');
      console.error('虽然你已经配置了 0.0.0.0/0，但可能：');
      console.error('  1. 配置还没有完全生效（等待 2-3 分钟）');
      console.error('  2. 实际上是认证问题（MongoDB 有时会返回 IP 错误）');
      console.error('  3. 请再次确认 Database Access 中的用户权限');
    }
    
    process.exit(1);
  }
}

diagnose();

