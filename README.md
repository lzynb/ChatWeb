# 🤖 DeepSeek AI Chat Assistant

一个基于DeepSeek API的现代化AI聊天应用，具有多对话管理、实时AI对话和优雅的用户界面。

![ChatWeb Demo](https://img.shields.io/badge/Next.js-13.5.11-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![DeepSeek API](https://img.shields.io/badge/DeepSeek_API-Latest-green?style=for-the-badge)

## ✨ 特性

- 🚀 **多对话管理** - 支持创建、切换和删除多个对话
- 💬 **实时AI对话** - 基于DeepSeek大模型的智能对话
- 🎨 **现代化UI** - 采用Apple、Google设计审美的优雅界面
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🌙 **暗色模式** - 支持明暗主题切换
- ⚡ **快速响应** - 优化的性能和流畅的动画效果
- 🔒 **安全可靠** - API密钥安全存储，错误处理完善

## 🛠️ 技术栈

- **前端框架**: Next.js 13
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **AI服务**: DeepSeek API
- **状态管理**: React Hooks
- **构建工具**: Next.js App Router

## 🚀 快速开始

### 环境要求

- Node.js 18.18.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/lzynb/ChatWeb.git
   cd ChatWeb
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   在项目根目录创建 `.env.local` 文件：
   ```env
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   DEEPSEEK_BASE_URL=https://api.deepseek.com
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
ChatWeb/
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

## 🎯 功能特性

### 多对话管理
- 创建新的对话
- 切换不同对话
- 删除不需要的对话
- 自动保存对话历史

### 智能对话
- 基于DeepSeek大模型
- 支持多轮对话
- 上下文记忆
- 实时响应

### 用户界面
- 左侧对话列表
- 中间消息区域
- 底部输入框
- 固定布局，只有消息区域滚动

## 🔧 开发

### 构建项目
```bash
npm run build
```

### 运行生产版本
```bash
npm start
```

### 代码检查
```bash
npm run lint
```

## 🌐 部署

### 部署到Vercel（推荐）

1. 将代码推送到GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入你的GitHub仓库
4. 配置环境变量
5. 自动部署完成

### 部署到其他平台

项目支持部署到任何支持Next.js的平台：
- Netlify
- Railway
- Heroku
- 自托管服务器

## 🔐 环境变量

| 变量名 | 描述 | 必需 |
|--------|------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API密钥 | ✅ |
| `DEEPSEEK_BASE_URL` | DeepSeek API基础URL | ✅ |

## 🤝 贡献

欢迎提交Issue和Pull Request！

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [DeepSeek](https://www.deepseek.com/) - 提供强大的AI API
- [Next.js](https://nextjs.org/) - 优秀的React框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用的CSS框架
- [Vercel](https://vercel.com/) - 优秀的部署平台

## 📞 联系方式

- GitHub: [@lzynb](https://github.com/lzynb)
- 项目链接: [https://github.com/lzynb/ChatWeb](https://github.com/lzynb/ChatWeb)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
