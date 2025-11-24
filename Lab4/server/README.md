# 消息服务器后端

## 项目结构

```
server/
├── server.js           # 服务器入口文件
├── models/
│   └── Message.js      # Message 数据模型
├── routes/
│   └── messages.js     # 消息路由
├── .env                # 环境变量（需要自己创建）
└── package.json
```

## 安装依赖

依赖已经安装完成。如果需要重新安装：

```bash
npm install
```

## 配置 MongoDB Atlas

### 步骤 1: 创建 MongoDB Atlas 集群

1. 访问 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. 注册/登录账户
3. 创建一个新的集群（选择免费层 M0）
4. 等待集群创建完成（约 3-5 分钟）

### 步骤 2: 配置数据库访问

1. 在 Atlas 控制台中，点击 **"Database Access"**（数据库访问）
2. 点击 **"Add New Database User"**（添加新数据库用户）
3. 创建用户名和密码（记住这些信息！）
4. 设置用户权限为 **"Read and write to any database"**

### 步骤 3: 配置网络访问

1. 在 Atlas 控制台中，点击 **"Network Access"**（网络访问）
2. 点击 **"Add IP Address"**（添加 IP 地址）
3. 为了开发方便，可以点击 **"Allow Access from Anywhere"**（允许从任何地方访问）
   - 或者添加你的当前 IP 地址

### 步骤 4: 获取连接字符串

1. 在 Atlas 控制台中，点击 **"Database"**（数据库）
2. 点击你的集群名称
3. 点击 **"Connect"**（连接）按钮
4. 选择 **"Connect your application"**（连接你的应用程序）
5. 复制连接字符串，格式类似：
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. 将 `<username>` 和 `<password>` 替换为你创建的用户名和密码
7. 在连接字符串末尾添加数据库名称，例如：
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/messages?retryWrites=true&w=majority
   ```

### 步骤 5: 创建 .env 文件

在 `server` 目录下创建 `.env` 文件，内容如下：

```
MONGODB_URI=你的MongoDB连接字符串
PORT=3000
```

**重要**: 将 `你的MongoDB连接字符串` 替换为步骤 4 中获取的实际连接字符串。

## 运行服务器

### 开发模式（自动重启）

```bash
npm run dev
```

### 生产模式

```bash
npm start
```

服务器将在 `http://localhost:3000` 启动。

## API 端点

### GET /messages
获取所有消息

**响应示例:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "username": "张三",
      "text": "你好！",
      "timestamp": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### POST /messages
创建新消息

**请求体:**
```json
{
  "username": "张三",
  "text": "这是一条消息"
}
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "username": "张三",
    "text": "这是一条消息",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

## 测试 API

### 使用 Postman

1. **GET 请求**: 
   - 方法: GET
   - URL: `http://localhost:3000/messages`

2. **POST 请求**:
   - 方法: POST
   - URL: `http://localhost:3000/messages`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "username": "测试用户",
       "text": "这是一条测试消息"
     }
     ```

### 使用 curl

**GET 请求:**
```bash
curl http://localhost:3000/messages
```

**POST 请求:**
```bash
curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{"username":"测试用户","text":"这是一条测试消息"}'
```

