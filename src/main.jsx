import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Clipboard,
  Filter,
  Layers3,
  Search,
  Sparkles,
  X
} from "lucide-react";
import "./styles.css";

const rawBase =
  "https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data";

const categoryZh = {
  "UI & Interfaces": "UI 与界面",
  "Charts & Infographics": "图表与信息可视化",
  "Posters & Typography": "海报与排版",
  "Products & E-commerce": "商品与电商",
  "Brand & Logos": "品牌与标志",
  "Architecture & Spaces": "建筑与空间",
  "Photography & Realism": "摄影与写实",
  "Illustration & Art": "插画与艺术",
  "Characters & People": "人物与角色",
  "Scenes & Storytelling": "场景与叙事",
  "History & Classical Themes": "历史与古风题材",
  "Documents & Publishing": "文档与出版物",
  "Other Use Cases": "其他应用场景"
};

const templateCards = [
  ["UI 与界面", "App、网页、仪表盘、社媒截图等高保真界面。", "UI & Interfaces"],
  ["信息图引擎", "结构化图解、时间线、知识图谱、科普解释图。", "Charts & Infographics"],
  ["海报排版系统", "活动、电影、商业传播、封面主视觉。", "Posters & Typography"],
  ["产品广告", "包装、电商详情页、品牌棚拍、技术拆解。", "Products & E-commerce"],
  ["品牌识别", "Logo、视觉系统、触点板、Campaign 规范。", "Brand & Logos"],
  ["写实摄影", "人像、街拍、棚拍、纪实风格图像。", "Photography & Realism"]
];

function imageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${rawBase}${path}`;
}

function labelCategory(category) {
  return categoryZh[category] ?? category;
}

function App() {
  const [siteData, setSiteData] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [style, setStyle] = useState("全部");
  const [scene, setScene] = useState("全部");
  const [selected, setSelected] = useState(undefined);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState("");
  const [visibleCount, setVisibleCount] = useState(72);

  useEffect(() => {
    let active = true;
    fetch("/cases.json")
      .then((response) => response.json())
      .then((data) => {
        if (!active) return;
        setSiteData(data);
      });

    return () => {
      active = false;
    };
  }, []);

  const featuredCases = useMemo(
    () => siteData?.cases.filter((item) => item.featured).slice(0, 8) ?? [],
    [siteData]
  );

  const categoryStats = useMemo(() => {
    if (!siteData) return [];
    return siteData.categories.map((item) => ({
      id: item,
      label: labelCategory(item),
      count: siteData.cases.filter((caseItem) => caseItem.category === item).length
    }));
  }, [siteData]);

  const filteredCases = useMemo(() => {
    if (!siteData) return [];
    const needle = query.trim().toLowerCase();
    return siteData.cases.filter((item) => {
      const haystack = [
        item.id,
        item.title,
        item.category,
        item.sourceLabel,
        item.prompt,
        ...(item.styles ?? []),
        ...(item.scenes ?? [])
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!needle || haystack.includes(needle)) &&
        (category === "全部" || item.category === category) &&
        (style === "全部" || item.styles.includes(style)) &&
        (scene === "全部" || item.scenes.includes(scene))
      );
    });
  }, [category, query, scene, siteData, style]);

  const visibleCases = filteredCases.slice(0, visibleCount);

  if (!siteData) {
    return (
      <main className="loadingScreen">
        <Sparkles size={26} />
        <h1>正在加载提示词案例库...</h1>
        <p>如果你直接打开了 file://index.html，请改用 http://127.0.0.1:5173/。</p>
      </main>
    );
  }

  async function copyPrompt(item) {
    const ok = await writeClipboard(item.prompt);
    if (!ok) {
      setCopyError(String(item.id));
      window.setTimeout(() => setCopyError(""), 1800);
      return;
    }
    setCopyError("");
    setCopied(String(item.id));
    window.setTimeout(() => setCopied(""), 1800);
  }

  function resetFilters() {
    setQuery("");
    setCategory("全部");
    setStyle("全部");
    setScene("全部");
    setVisibleCount(72);
  }

  return (
    <main>
      <section className="hero">
        <div className="heroMosaic" aria-hidden="true">
          {featuredCases.slice(0, 6).map((item) => (
            <img key={item.id} src={imageUrl(item.image)} alt="" />
          ))}
        </div>
        <div className="heroContent">
          <p className="eyebrow">
            <Sparkles size={16} />
            GPT Image 2.0 Prompt Atlas
          </p>
          <h1>一站收藏 GPT Image 2.0 爆款提示词</h1>
          <p>
            从真实图片案例里提炼可复制 Prompt，按创作任务、风格和场景快速筛选，让灵感从刷到变成马上可用。
          </p>
          <div className="heroStats" aria-label="数据概览">
            <span>
              <strong>{siteData.totalCases}</strong> 案例
            </span>
            <span>
              <strong>{siteData.categories.length}</strong> 分类
            </span>
            <span>
              <strong>{siteData.styles.length}</strong> 风格标签
            </span>
          </div>
          <div className="heroActions">
            <a className="button buttonPrimary" href="#cases">
              <BookOpen size={18} />
              浏览案例
            </a>
          </div>
        </div>
      </section>

      <section className="sectionHead">
        <div>
          <p>分类入口</p>
          <h2>按创作任务进入案例库</h2>
        </div>
      </section>

      <section className="categoryGrid" aria-label="案例分类">
        <button className={category === "全部" ? "active" : ""} onClick={() => setCategory("全部")}>
          <span>全部案例</span>
          <strong>{siteData.totalCases}</strong>
        </button>
        {categoryStats.map((item) => (
          <button
            key={item.id}
            className={category === item.id ? "active" : ""}
            onClick={() => {
              setCategory(item.id);
              setVisibleCount(72);
            }}
          >
            <span>{item.label}</span>
            <strong>{item.count}</strong>
          </button>
        ))}
      </section>

      <section className="templates" id="templates">
        <div className="sectionHead sectionHeadTight">
          <div>
            <p>模板起稿</p>
            <h2>从成熟类型开始，再回到案例里微调</h2>
          </div>
        </div>
        <div className="templateGrid">
          {templateCards.map(([title, description, nextCategory]) => (
            <button
              key={title}
              onClick={() => {
                setCategory(nextCategory);
                setVisibleCount(72);
                document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Layers3 size={22} />
              <span>{title}</span>
              <small>{description}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="filterBar" id="cases" aria-label="筛选案例">
        <label className="searchBox">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(72);
            }}
            placeholder="搜索标题、来源、风格、中文或英文 Prompt..."
          />
        </label>
        <FilterSelect label="风格" value={style} onChange={setStyle} options={siteData.styles} />
        <FilterSelect label="场景" value={scene} onChange={setScene} options={siteData.scenes} />
        <button className="iconButton" title="清空筛选" onClick={resetFilters}>
          <Filter size={18} />
        </button>
      </section>

      <section className="resultHead">
        <div>
          <p>{category === "全部" ? "全部分类" : labelCategory(category)}</p>
          <h2>{filteredCases.length} 个匹配案例</h2>
        </div>
        <span>当前展示 {visibleCases.length} 个</span>
      </section>

      <section className="gallery">
        {visibleCases.map((item) => (
          <article className="caseCard" key={item.id}>
            <button className="caseImage" onClick={() => setSelected(item)}>
              <img src={imageUrl(item.image)} alt={item.imageAlt || item.title} loading="lazy" />
              <span>#{item.id}</span>
            </button>
            <div className="caseBody">
              <p>{labelCategory(item.category)}</p>
              <h3>{item.title}</h3>
              <div className="tagRow">
                {item.styles.slice(0, 2).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
                {item.scenes.slice(0, 1).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p className="promptPreview">{item.promptPreview || item.prompt}</p>
              <div className="caseActions">
                <button className="button buttonSmall" onClick={() => setSelected(item)}>
                  <BookOpen size={17} />
                  详情
                </button>
                <button className="button buttonSmall copyButton" onClick={() => copyPrompt(item)}>
                  {copied === String(item.id) ? <Check size={18} /> : <Clipboard size={18} />}
                  {copied === String(item.id) ? "已复制" : copyError === String(item.id) ? "复制失败" : "复制"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {visibleCases.length < filteredCases.length && (
        <div className="loadMore">
          <button className="button buttonPrimary" onClick={() => setVisibleCount((count) => count + 72)}>
            再加载 72 个案例
          </button>
        </div>
      )}

      {filteredCases.length === 0 && (
        <section className="emptyState">
          <Search size={30} />
          <h2>没有匹配案例</h2>
          <p>换一个关键词，或清空分类、风格、场景筛选。</p>
        </section>
      )}

      <CaseDrawer
        item={selected}
        copied={copied}
        copyError={copyError}
        onClose={() => setSelected(undefined)}
        onCopy={copyPrompt}
        onZoom={(image) => setZoomedImage(image)}
      />
      <ImageLightbox image={zoomedImage} onClose={() => setZoomedImage(null)} />
    </main>
  );
}

async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy path used by file/local browser surfaces.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="selectBox">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        <option value="全部">全部</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function CaseDrawer({ item, copied, copyError, onClose, onCopy, onZoom }) {
  if (item === undefined) return null;

  return (
    <div className="drawerOverlay" role="presentation" onMouseDown={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="iconButton drawerClose" title="关闭" onClick={onClose}>
          <X size={20} />
        </button>

        <button
          className="drawerImageButton"
          onClick={() =>
            onZoom({
              src: imageUrl(item.image),
              alt: item.imageAlt || item.title,
              title: item.title
            })
          }
        >
          <img className="drawerImage" src={imageUrl(item.image)} alt={item.imageAlt || item.title} />
          <span>点击放大</span>
        </button>
        <div className="drawerHead">
          <p>
            #{item.id} / {labelCategory(item.category)}
          </p>
          <h2>{item.title}</h2>
        </div>
        <div className="metaList">
          <span>来源：{item.sourceLabel || "未提供"}</span>
          {item.sourceUrl && (
            <a href={item.sourceUrl} target="_blank" rel="noreferrer">
              查看来源 <ArrowUpRight size={15} />
            </a>
          )}
          {item.githubUrl && (
            <a href={item.githubUrl} target="_blank" rel="noreferrer">
              GitHub 案例 <ArrowUpRight size={15} />
            </a>
          )}
        </div>
        <div className="tagRow tagRowLarge">
          {[...item.styles, ...item.scenes].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="promptFull">
          <p>{item.prompt}</p>
        </div>
        <button className="button buttonPrimary drawerCopy" onClick={() => onCopy(item)}>
          {copied === String(item.id) ? <Check size={18} /> : <Clipboard size={18} />}
          {copied === String(item.id)
            ? "已复制"
            : copyError === String(item.id)
              ? "复制失败，请手动选中文本"
              : "复制完整 Prompt"}
        </button>
      </aside>
    </div>
  );
}

function ImageLightbox({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="lightboxOverlay" role="presentation" onMouseDown={onClose}>
      <div className="lightbox" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="iconButton lightboxClose" title="关闭" onClick={onClose}>
          <X size={20} />
        </button>
        <img src={image.src} alt={image.alt} />
        <p>{image.title}</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
