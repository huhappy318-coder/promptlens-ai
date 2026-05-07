<p align="center">
  <img src="./docs/banner.svg" alt="PromptLens 项目横幅" width="100%" />
</p>

# PromptLens

一个面向 AI Prompt 的可视化调试器。分析结构、检测冲突，并通过 AI 辅助优化 Prompt。

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)
![React Flow](https://img.shields.io/badge/React%20Flow-%E5%8F%AF%E8%A7%86%E5%8C%96-FF0072)

## 功能特性

- 🔍 本地 Prompt 解析：结构完整性、指令清晰度、冲突程度、Token 效率四维评分
- 🗺️ 指令地图：使用 React Flow 可视化 Prompt 节点关系
- ✨ AI 分析：冲突验证、片段优化、流式生成 Markdown 分析报告
- 📤 导出分享：支持 Markdown、JSON、指令地图 PNG 和社交分享卡片
- ⌨️ 快捷键：快速切换分析、打开设置、导出报告、触发 AI 优化
- 📱 响应式体验：适配桌面、平板和移动端单面板模式

## 技术栈

- React + TypeScript
- Vite + Tailwind CSS
- CodeMirror 编辑器
- React Flow 可视化
- 浏览器 localStorage 保存模型配置
- Web Worker 处理大型 Prompt 解析

## 快速开始

```bash
pnpm install
pnpm dev
```

启动后打开 Vite 输出的本地地址，粘贴 Prompt 即可开始分析。

## 截图

顶部横幅是一个 SVG 占位预览，展示了产品的核心界面：编辑器、评分、问题列表和指令地图。

## 支持的模型提供商

- DeepSeek
- OpenAI 兼容接口
- Anthropic
- Google Gemini
- 自定义 OpenAI 兼容 Provider

API Key 仅保存在当前浏览器的本地存储中，请求只会发送到你配置的模型提供商接口。

## 部署

生成静态构建产物：

```bash
pnpm build
```

项目已包含：

- `vercel.json`：适配 Vercel 的 SPA rewrite 配置
- `.github/workflows/deploy.yml`：推送到 `main` 后自动构建并部署到 GitHub Pages
- `vite.config.ts`：`base: './'` 与基础代码分割配置，方便静态托管

## 许可证

MIT
