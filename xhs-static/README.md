# 小红收藏夹 (纯前端版)

让收藏真的被看见——为小红书重度用户和 J 人打造的个人收藏管理工具。

## 功能

- 📌 **收藏看板**：瀑布流卡片展示，支持搜索、分类、状态多维筛选
- 📊 **数据洞察**：分类分布、实践状态、收藏趋势、热门标签 TOP 10
- ✅ **三态管理**：未看 / 待打卡 / 已实践，追踪你的实践兑现率
- ✍️ **实践笔记**：给每条收藏写心得、踩坑、改进想法

## 技术栈

- 纯前端：React 18 + Vite + TypeScript + Tailwind CSS
- 状态持久化：浏览器 localStorage（无需后端）
- 图表：Recharts
- 图标：Lucide React

## 部署到 Vercel（推荐，2 分钟搞定）

### 方法一：通过 GitHub（无需命令行）

1. 把这个文件夹推到 GitHub（公开/私有都可以）
2. 打开 https://vercel.com/new
3. 用 GitHub 登录，选择刚才推的仓库
4. **不要改任何配置**，直接点 **Deploy**
5. 等 1-2 分钟，得到 `https://xxx.vercel.app` 公开链接

### 方法二：用 Vercel CLI（更快）

```bash
npm i -g vercel
cd xhs-collect
vercel
```

按提示一路回车，几分钟得到公开链接。

## 部署到 Netlify（拖拽即可）

```bash
npm install
npm run build
```

打开 https://app.netlify.com/drop，把 `dist` 文件夹**整个**拖进浏览器窗口。30 秒后得到公开链接。

## 本地运行

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 注意

- 状态和笔记保存在**浏览器 localStorage**——不同浏览器/设备各自独立
- 侧边栏底部「重置演示数据」可清空所有修改
- 项目无后端，部署到任何静态托管平台都能跑（Vercel / Netlify / Cloudflare Pages / GitHub Pages 等）

## 项目结构

```
xhs-static/
├── src/
│   ├── pages/          # Board.tsx, Insights.tsx
│   ├── components/     # PostDetail.tsx
│   ├── hooks/          # usePosts.ts
│   ├── lib/data.ts     # 种子数据 + 类型
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```
