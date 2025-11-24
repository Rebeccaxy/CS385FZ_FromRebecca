# Chat App (Expo + React Native)

本目录实现了 Part B（前端）要求：主页 → 聊天页面的完整流程，包含消息列表、文本输入框、发送按钮，并已经与后端 REST API (`GET/POST /messages`) 打通。

## 快速开始
1. 安装依赖
   ```bash
   npm install
   ```
2. 复制环境变量模板并修改为你的局域网 IP（保持与后端同一网络）
   ```bash
   cp .env.example .env
   # 编辑 .env，把 EXPO_PUBLIC_API_URL 改成 http://<你的IP>:3000
   ```
3. 启动 Expo
   ```bash
   npx expo start
   ```
4. 根据终端提示选择：
   - `i` 运行 iOS 模拟器
   - `a` 运行 Android 模拟器
   - `w` 打开 Web
   - 或使用手机上的 Expo Go 扫描二维码

## 功能概览
| 文件 | 说明 |
| --- | --- |
| `app/(tabs)/index.tsx` | 主页，展示欢迎卡片与“GO TO CHAT”按钮。 |
| `app/chat.tsx` | 聊天界面：`FlatList` 展示来自后端的消息，底部输入框 + SEND 按钮，可实时创建新消息。 |
| `constants/config.ts` | 暴露 `API_BASE_URL` / `DEFAULT_USERNAME`，并读取 `.env` 中的 `EXPO_PUBLIC_*` 变量。 |
| `app/_layout.tsx` | 配置 Stack 路由，包含 `(tabs)` 与 `chat` 页面。 |

## 操作步骤（方便截屏）
1. 运行 `npx expo start`，截图终端二维码或 Expo DevTools。
2. 在 Expo Go/模拟器中访问应用：
   - 主页截图：展示欢迎信息与按钮。
   - 进入聊天页后，拉取到后端消息的状态（顶部会短暂显示“正在加载历史消息…”）。
   - 输入新消息并点击 SEND，截图包含成功发送后的列表（可配合 Postman/数据库查看新增记录）。

## 与后端联调说明
- `.env` 中的 `EXPO_PUBLIC_API_URL` 用于告诉前端访问哪个后端，例如 `http://192.168.1.8:3000`。
- `app/chat.tsx` 中：
  - `useEffect` 会调用 `GET /messages` 获取历史数据。
  - `handleSend` 会调用 `POST /messages` 创建新消息。
- 确保手机/模拟器与后端服务位于同一局域网（若使用 Expo Go，需要使用本机的局域网 IP，而不是 `localhost`）。

## 常用命令
| 命令 | 说明 |
| --- | --- |
| `npm start` 或 `npx expo start` | 启动开发服务器 |
| `npm run ios` / `npm run android` / `npm run web` | 直接打开指定平台 |

完成上述操作即可满足 Part B 的全部要求，并获得演示所需的过程截图。
