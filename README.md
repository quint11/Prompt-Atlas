# Prompt Atlas

一个面向 GPT Image 2.0 / Seedance 图片提示词的案例分享网站。当前案例数据来自 `freestylefly/awesome-gpt-image-2`，已整理为可搜索、可筛选、可复制 Prompt 的静态前端站点。

## 本地运行

```bash
npm install
npm run dev -- --port 5173
```

访问：

```text
http://127.0.0.1:5173/
```

不要直接打开 `index.html`，因为站点需要通过 Vite 服务加载 React 模块和 `public/cases.json`。

## 怎么维护案例

核心数据文件是：

```text
public/cases.json
```

新增案例时，在 `cases` 数组里追加一个对象：

```json
{
  "id": 401,
  "title": "新提示词标题",
  "image": "/images/case401.jpg",
  "imageAlt": "图片描述",
  "sourceLabel": "来源名称",
  "sourceUrl": "",
  "prompt": "完整提示词",
  "promptPreview": "提示词摘要",
  "category": "Posters & Typography",
  "styles": ["Poster"],
  "scenes": ["Marketing"],
  "featured": false,
  "githubUrl": ""
}
```

字段说明：

- `id`：案例编号，保持唯一。
- `title`：卡片标题。
- `image`：图片地址。可以使用远程 URL；如果放本地图片，建议放到 `public/images/`，然后写成 `/images/xxx.jpg`。
- `prompt`：完整提示词，详情弹层和复制按钮使用这个字段。
- `promptPreview`：卡片摘要，可以留短一点。
- `category`：分类名称，需要存在于顶层 `categories` 数组。
- `styles`：风格标签，需要存在于顶层 `styles` 数组。
- `scenes`：场景标签，需要存在于顶层 `scenes` 数组。
- `featured`：是否作为首屏拼贴素材候选。

## 怎么新增分类、风格、场景

在 `public/cases.json` 顶层数组里追加名称：

```json
{
  "categories": ["Posters & Typography"],
  "styles": ["Poster"],
  "scenes": ["Marketing"]
}
```

然后在案例对象里引用同样的字符串。页面会自动生成筛选入口。

如果新增英文分类后想显示中文名称，在 `src/main.jsx` 的 `categoryZh` 里补一条映射即可。

## 构建

```bash
npm run build
```
