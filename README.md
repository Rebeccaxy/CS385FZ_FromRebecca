# 课程项目：CS385FZ (移动应用开发）

这是一个用于存放 CS385FZ 课程所有实验项目的代码仓库，其中可能包含使用 **React Native CLI** 和 **Expo** 两种不同方式创建的项目。

## 如何运行项目

请首先根据项目文件夹的结构，判断它是 **CLI 项目**还是 **Expo 项目**，然后按照对应的指南进行操作。

- **CLI 项目**: 文件夹内包含 `ios` 和 `android` 目录。
- **Expo 项目**: 文件夹内**没有** `ios` 和 `android` 目录。

---

### A) 如何运行 CLI 项目 (例如: Lab1/MyFirstApp)

1.  **进入项目目录**:
    ```bash
    cd Lab1/MyFirstApp
    ```
    
2.  **安装依赖**:
    ```bash
    npm install
    ```
    
3.  **安装 iOS 原生依赖**:
    ```bash
    cd ios && pod install && cd ..
    ```
    
4.  **启动应用**:
    *   **iOS**: `npx react-native run-ios`
    *   **Android**: `npx react-native run-android`  //其实我在开发过程中没怎么考虑Android

---

### B) 如何运行 Expo 项目 (例如: Lab3/red-note)

1.  **进入项目目录**:
    
    ```bash
    cd Lab3/red-note
    ```
2.  **安装依赖**:
    ```bash
    npm install
    ```
3.  **启动开发服务器**:
    ```bash
    npx expo start
    ```
4.  **在手机上预览**:
    *   在你的 iPhone 或 Android 手机上从应用商店下载 **Expo Go** 应用。
    *   确保你的手机和电脑连接在**同一个 Wi-Fi 网络**下。
    *   使用 Expo Go 应用扫描终端里显示的二维码。
    *   应用代码将会被加载并运行在你的手机上。