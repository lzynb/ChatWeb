# 项目部署到GitHub说明

## 项目简介
这是一个基于DeepSeek API的AI聊天应用，具有以下特性：
- 多对话管理
- 实时AI对话
- 现代化UI设计
- 响应式布局
- 删除对话功能

## 技术栈
- Next.js 13
- TypeScript
- Tailwind CSS
- DeepSeek API

## 上传到GitHub的步骤

### 方法1：使用Git命令行（推荐）

1. **安装Git**
   - 访问 https://git-scm.com/download/win
   - 下载并安装Git for Windows

2. **初始化仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DeepSeek AI Chat Application"
   ```

3. **连接远程仓库**
   ```bash
   git remote add origin https://github.com/lzynb/ChatWeb.git
   git branch -M main
   git push -u origin main
   ```

### 方法2：使用GitHub Desktop

1. **下载GitHub Desktop**
   - 访问 https://desktop.github.com/
   - 下载并安装GitHub Desktop

2. **克隆仓库**
   - 打开GitHub Desktop
   - 点击 "Clone a repository from the Internet"
   - 选择 `lzynb/ChatWeb` 仓库
   - 选择本地保存路径

3. **复制项目文件**
   - 将当前项目的所有文件复制到克隆的文件夹中
   - 在GitHub Desktop中提交并推送

### 方法3：手动上传

1. **下载ZIP文件**
   - 在GitHub仓库页面点击 "Code" 按钮
   - 选择 "Download ZIP"

2. **解压并替换文件**
   - 解压下载的ZIP文件
   - 用当前项目的文件替换解压的文件

3. **上传到GitHub**
   - 在GitHub仓库页面点击 "Upload files"
   - 拖拽所有项目文件到上传区域
   - 添加提交信息并提交

## 项目结构
```
chatbot/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # DeepSeek API路由
│   │   ├── globals.css          # 全局样式
│   │   ├── layout.tsx           # 根布局
│   │   └── page.tsx             # 主页面
│   ├── components/
│   │   ├── ChatList.tsx         # 聊天列表组件
│   │   ├── ChatMessages.tsx     # 消息显示组件
│   │   └── ChatInput.tsx        # 输入框组件
│   └── types/
│       └── chat.ts              # 类型定义
├── public/                      # 静态资源
├── package.json                 # 项目配置
├── tailwind.config.js           # Tailwind配置
├── postcss.config.js            # PostCSS配置
└── next.config.js               # Next.js配置
```

## 环境变量配置
在项目根目录创建 `.env.local` 文件：
```
# DeepSeek API配置
DEEPSEEK_API_KEY=sk-80f1b61f68c04bd99c44764064b1b0fe
DEEPSEEK_BASE_URL=https://api.deepseek.com
```

## 部署到Vercel（可选）

1. **连接GitHub仓库**
   - 访问 https://vercel.com
   - 使用GitHub账号登录
   - 导入你的ChatWeb仓库

2. **配置环境变量**
   - 在Vercel项目设置中添加环境变量
   - 添加 `DEEPSEEK_API_KEY` 和 `DEEPSEEK_BASE_URL`

3. **自动部署**
   - Vercel会自动检测Next.js项目
   - 每次推送到GitHub都会自动部署

## 注意事项

1. **API密钥安全**
   - 不要将API密钥直接提交到代码中
   - 使用环境变量存储敏感信息

2. **依赖安装**
   - 确保所有依赖都已安装：`npm install`

3. **构建测试**
   - 本地测试构建：`npm run build`
   - 确保没有构建错误

## 联系方式
如有问题，请通过GitHub Issues联系。
