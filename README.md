# Egypt Social Operations Fieldbook

面向海外运营经理的公开、非官方学习站：用 30 天、11 个模块，把全球社交娱乐类别、SUGO 产品旅程、埃及市场语境与 Day 31–90 运营方案整理成可复核的证据包。本站不代表 MICO WORLD、SUGO 或任何政府、监管机构，也不提供专业意见。

拟定 GitHub Pages URL（本地发布就绪；本仓库不在 README 中声称已部署）：
`https://superdoge1.github.io/egypt-social-operations/`

## 学习结构

路线恰好包含 11 个顺序模块、30 个 daily sprints 和四道评审门：Day 8（经营基础）、Day 17（埃及市场）、Day 27（经营系统）与 Day 30（90 天交付）。每个模块都连接一个 evidence-pack artifact；结论明确标为公开资料已验证、内部数据待验证、访谈交叉验证或运营假设。最终包必须恰好包含三项优先级，未知数字保留为 `pending` 或 `baseline-request`。

## 安装、开发与验证

需要 Node.js 24（仓库的 `.nvmrc` 与 `package.json` engines 均以 Node 24 为准）和 npm。安装依赖并启动本地开发服务器：

```bash
npm ci
npm run dev
```

完整验证命令：

```bash
npm run verify
```

`verify` 依次执行 Astro 类型/内容检查、Vitest 单元测试、两个 Playwright 浏览器项目（桌面 Chromium 与移动端）以及生产构建。也可以按步骤运行：

```bash
npm run check
npm test
npm run test:e2e
npm run build
```

生产构建是静态站，Astro 配置中的 `base` 固定为 `/egypt-social-operations`；所有站内链接都通过 base-path helper 生成。预览构建可运行 `npm run preview`。

## 目录结构

```text
src/content/lessons/   11 个 MDX 课程与每日 sprint、证据、artifact
src/components/        进度、课程卡片与课程控制交互
src/layouts/           BaseLayout、静态 metadata 与全站免责声明
src/pages/              首页、路线、项目、来源登记、课程详情、404
src/lib/                URL、课程图、进度恢复与 source-date 校验
src/data/               formative quizzes（不构成认证）
src/styles/             无外部字体/追踪的 fieldbook 视觉样式
tests/e2e/              Playwright 行为与响应式契约
docs/superpowers/       历史设计规格与实现计划
.github/workflows/      Node 24 的 Pages verify/build/deploy workflow
```

## 来源与内容边界

课程使用公开来源的原创摘要与深链接，包括 MICO WORLD、SUGO 公开商店页/条款/隐私政策/Platform Guidelines、DataReportal Digital 2026 Egypt、Egypt PDPC、SCMR、Egypt Presidency 官方节日日历，以及 Apple/Google 平台政策。来源登记保留 URL、核验日期、jurisdiction、稳定性和是否需要内部验证；不复制大段原文。外部网页的商标、数据、规则和链接内容不属于本项目原创内容，并继续受各自许可或网站条款约束。

公开页面只放公开证据、原创解释和空白模板，绝不写入或渲染公司机密、账号凭据、个人数据、可识别个案、内部指标、商业/结算条款、私人链接、未发布策略或真实 moderation 记录。不要把这些内容写进浏览器笔记，也不要提交给 Firecrawl 或其他外部工具；Firecrawl 仅可处理公开研究资料。法律、税务、隐私、雇佣和监管段落仅作教育用途，正式行动前必须由有权限的专业人士与内部 owner 复核。

## 核验快照（2026-09-14）

截至 2026-09-14，公开来源登记与课程边界按 11 模块、30 天、四评审门的设计契约整理；静态站身份为 Cairo Signal Atlas / Nile evidence spine，配置目标为 GitHub Pages 项目路径 `/egypt-social-operations/`。快照是资料核验时间点，不是对外部页面持续可用、市场数字、节日日期、支付能力、监管解释或 SUGO 内部指标的保证。凡标为 `review-quarterly` 或 `review-before-use` 的事实，都必须在实际使用前由人工和相应 owner 再查阅；有冲突的公开公司/实体/商店说法保留为 diligence question。

## 浏览器数据与隐私

本站无账号、后端、分析脚本、第三方字体、第三方图片或追踪器。完成状态、测验分数、笔记和时间戳只保存在当前浏览器的 `localStorage`，固定 key 为 `egyptSocialOperationsProgress.v1`，不上传服务器；存储被阻止时降级为当前页面的易失状态。笔记仍不得包含秘密、凭据、个人数据或可识别个案。

## 许可

项目代码与原创内容按 [MIT License](LICENSE) 发布（Copyright 2026 superdoge1）。MIT 许可不延伸到外部来源、商标或链接资料；它们仍由各自权利人和适用许可/条款约束。本项目不声称拥有任何外部来源内容。
