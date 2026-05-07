export const categories = [
  {
    id: "all",
    label: "全部",
    description: "Seedance 2.0 与 GPT Image 2.0 示例合集"
  },
  {
    id: "portrait",
    label: "人物肖像",
    description: "面向角色、商业头像、情绪写真"
  },
  {
    id: "product",
    label: "产品摄影",
    description: "适合电商、品牌物料、包装视觉"
  },
  {
    id: "cinematic",
    label: "电影感场景",
    description: "叙事镜头、灯光、环境氛围"
  },
  {
    id: "editorial",
    label: "杂志编辑",
    description: "封面、海报、社媒主视觉"
  },
  {
    id: "concept",
    label: "概念设计",
    description: "空间、道具、世界观视觉"
  }
];

export const models = [
  { id: "seedance2", label: "Seedance 2.0" },
  { id: "gpt-image2", label: "GPT Image 2.0" }
];

export const promptExamples = [
  {
    id: "seedance-neon-runner",
    title: "雨夜霓虹跑者",
    model: "seedance2",
    category: "cinematic",
    ratio: "16:9",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=82",
    tags: ["雨夜", "赛博朋克", "运动", "电影感"],
    prompt:
      "A cinematic wide shot of a runner crossing an empty neon-lit avenue at midnight, heavy rain, wet asphalt reflections, cyan and crimson signage, handheld camera feeling, shallow depth of field, realistic motion blur, dramatic rim light, 35mm film still, high detail."
  },
  {
    id: "gpt-image-studio-cosmetics",
    title: "高端护肤品台面",
    model: "gpt-image2",
    category: "product",
    ratio: "4:5",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=82",
    tags: ["电商", "护肤", "柔光", "奢华"],
    prompt:
      "Premium skincare bottle on polished travertine, soft morning window light, translucent serum texture, water droplets, cream and jade accents, editorial product photography, controlled shadows, ultra clean composition, commercial retouching."
  },
  {
    id: "seedance-portrait-amber",
    title: "琥珀色窗边肖像",
    model: "seedance2",
    category: "portrait",
    ratio: "3:4",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=82",
    tags: ["人像", "自然光", "温暖", "胶片"],
    prompt:
      "Intimate portrait of a young creative director sitting by an amber glass window, soft side light, natural skin texture, relaxed expression, subtle film grain, muted teal jacket, editorial realism, 85mm lens, quiet confidence."
  },
  {
    id: "gpt-image-cover-desert",
    title: "沙漠建筑杂志封面",
    model: "gpt-image2",
    category: "editorial",
    ratio: "2:3",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
    tags: ["封面", "建筑", "沙漠", "极简"],
    prompt:
      "Editorial magazine cover image, monolithic desert house at golden hour, long architectural shadows, warm limestone and pale blue sky, minimal composition with generous negative space for masthead, crisp realism, luxury travel mood."
  },
  {
    id: "seedance-library-future",
    title: "未来图书馆中庭",
    model: "seedance2",
    category: "concept",
    ratio: "21:9",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82",
    tags: ["空间", "未来感", "室内", "概念"],
    prompt:
      "A vast future library atrium with floating reading platforms, warm oak shelves, translucent solar glass ceiling, visitors as tiny silhouettes, calm scholarly atmosphere, believable architecture, cinematic scale, intricate environmental detail."
  },
  {
    id: "gpt-image-coffee-packaging",
    title: "精品咖啡包装广告",
    model: "gpt-image2",
    category: "product",
    ratio: "1:1",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=82",
    tags: ["咖啡", "包装", "广告", "桌面"],
    prompt:
      "Specialty coffee bag standing beside a ceramic cup on a walnut table, roasted beans scattered with intention, soft directional studio light, smoky morning atmosphere, premium packaging campaign, crisp label area, tactile realism."
  },
  {
    id: "seedance-street-fashion",
    title: "街头机能风大片",
    model: "seedance2",
    category: "editorial",
    ratio: "4:5",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=82",
    tags: ["时装", "街拍", "机能", "杂志"],
    prompt:
      "High fashion streetwear editorial, model in technical black jacket and silver accessories, urban overpass background, overcast daylight, confident pose, clean magazine styling, dynamic fabric folds, realistic photography."
  },
  {
    id: "gpt-image-botanical-room",
    title: "植物疗愈工作室",
    model: "gpt-image2",
    category: "concept",
    ratio: "16:9",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=82",
    tags: ["室内", "植物", "治愈", "空间"],
    prompt:
      "A botanical wellness studio filled with layered green plants, clay walls, linen curtains, filtered afternoon sun, quiet seating niches, natural materials, calming spatial design, realistic interior visualization, serene and breathable."
  }
];
