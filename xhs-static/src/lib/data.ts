// 种子数据 + 类型定义

export type PostStatus = "unread" | "todo" | "done";

export interface Post {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  coverColor: string;
  coverEmoji: string;
  category: string;
  tags: string[];
  excerpt: string;
  likes: number;
  status: PostStatus;
  note: string;
  savedAt: string;
  url: string;
}

const COVERS = [
  { color: "linear-gradient(135deg, #ff6b9d 0%, #ffc8a2 100%)", emoji: "🍰" },
  { color: "linear-gradient(135deg, #ff9a8b 0%, #ff6a88 100%)", emoji: "👗" },
  { color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", emoji: "✈️" },
  { color: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)", emoji: "📚" },
  { color: "linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)", emoji: "🛋️" },
  { color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", emoji: "💄" },
  { color: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)", emoji: "🧘" },
  { color: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", emoji: "📷" },
  { color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", emoji: "🍜" },
  { color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", emoji: "🌅" },
  { color: "linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%)", emoji: "📓" },
  { color: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", emoji: "🎨" },
];

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

const RAW: Array<[string, string, string, string[], string, number, PostStatus]> = [
  ["上海10家必打卡的brunch咖啡店", "美食探店阿May", "美食", ["brunch", "咖啡", "上海", "周末好去处"], "实测一周，每家都拍照超出片，价格 80-150 一位...", 12480, "todo"],
  ["秋冬通勤穿搭｜小个子5套法式叠穿", "穿搭日记Lily", "穿搭", ["法式", "通勤", "小个子", "秋冬"], "155cm 显高 10cm 的秘密，重点是腰线和鞋子...", 28902, "done"],
  ["京都5天自由行｜避雷+省钱攻略", "旅行的青木", "旅行", ["京都", "日本", "自由行", "攻略"], "JR pass 不是所有人都需要！住宿这样选最划算...", 45203, "unread"],
  ["Notion 模板分享｜年度计划复盘", "效率胖丁", "学习", ["Notion", "时间管理", "复盘", "模板"], "我用这个模板坚持了 2 年，附直接复制链接...", 8932, "todo"],
  ["租房改造｜30㎡ 卧室变美 5 件神器", "家装鹿小姐", "家居", ["租房", "改造", "好物推荐", "小户型"], "无痕安装，搬家可拆，房东都不会生气...", 19045, "done"],
  ["黄黑皮亲妈级粉底测评｜15支真实试色", "美妆研究所", "美妆", ["粉底", "测评", "黄黑皮"], "踩过雷的姐妹看过来，按持妆/遮瑕/价格三维打分...", 56712, "unread"],
  ["普拉提30天｜体态改善前后对比", "健身的小鹿", "健身", ["普拉提", "体态", "瘦身", "打卡"], "圆肩驼背改善超明显，附完整动作清单...", 33421, "todo"],
  ["手机摄影｜10个让照片高级的构图技巧", "摄影师小K", "摄影", ["手机摄影", "构图", "技巧", "Lightroom"], "不需要单反，参数全在手机自带相机里...", 22108, "unread"],
  ["成都人均80的隐藏苍蝇馆子", "吃货老饕", "美食", ["成都", "苍蝇馆子", "地道", "性价比"], "本地人才知道的5家，老板脾气都不太好但是真的好吃...", 18203, "unread"],
  ["万能基础款衣橱清单｜30件穿一年", "极简衣橱", "穿搭", ["极简", "基础款", "胶囊衣橱"], "色卡+材质+品牌全分享，告别冲动消费...", 41250, "done"],
  ["大理 7 天慢生活攻略", "Vlogger阿宁", "旅行", ["大理", "云南", "慢生活", "民宿"], "海西海东怎么选？这份地图收好...", 27801, "todo"],
  ["雅思 7 分备考｜2 个月经验贴", "考研上岸的Yuki", "学习", ["雅思", "英语", "备考", "经验贴"], "口语 7.0 的核心方法，普通人也能做到...", 15632, "todo"],
  ["IKEA 改造｜100 块打造 ins 风书桌", "家居灵感局", "家居", ["IKEA", "DIY", "书桌", "ins风"], "贴纸+灯带+置物架，下班一晚上搞定...", 9870, "done"],
  ["平价口红总结｜30 支真人试色", "口红收藏家", "美妆", ["口红", "平价", "试色"], "100 元以内 yyds，附适合肤色对照表...", 38421, "unread"],
  ["居家拉伸 15 分钟｜久坐救星", "拉伸老师Coco", "健身", ["拉伸", "居家", "上班族"], "每天睡前 15 分钟，腰酸背痛拜拜...", 21034, "todo"],
  ["人像摄影｜小红书爆款构图公式", "人像摄影师Leo", "摄影", ["人像", "构图", "拍照", "POSE"], "8 个万能 pose，男女朋友互拍都能用...", 17829, "unread"],
  ["杭州周末 city walk 路线分享", "城市漫游者", "旅行", ["杭州", "city walk", "周末", "路线"], "西湖周边 3 条小众路线，避开人潮...", 12390, "todo"],
  ["自制减脂餐｜一周不重样食谱", "减脂厨房", "美食", ["减脂餐", "食谱", "健康", "一周"], "每餐 400 卡以内，做法简单上班族友好...", 30215, "done"],
  ["秋冬叠穿公式｜矮个子显高 10cm", "穿搭博主小Q", "穿搭", ["叠穿", "秋冬", "显高"], "上短下长 + 同色系，超简单的法则...", 25103, "todo"],
  ["MBTI J 人收藏整理系统", "J人本人", "学习", ["MBTI", "整理", "效率", "系统"], "把收藏从「永远不看」变成「真的用上」...", 6543, "unread"],
];

export const seedPosts: Post[] = RAW.map((row, i) => {
  const cover = COVERS[i % COVERS.length];
  return {
    id: i + 1,
    title: row[0],
    author: row[1],
    authorAvatar: row[1].slice(0, 1),
    coverColor: cover.color,
    coverEmoji: cover.emoji,
    category: row[2],
    tags: row[3],
    excerpt: row[4],
    likes: row[5],
    status: row[6],
    note: "",
    savedAt: daysAgo(i * 3 + 1),
    url: `https://www.xiaohongshu.com/explore/${1000000 + i}`,
  };
});

export const CATEGORIES = ["美食", "穿搭", "旅行", "学习", "家居", "美妆", "健身", "摄影"] as const;

export const STATUS_LABEL: Record<PostStatus, string> = {
  unread: "未看",
  todo: "待打卡",
  done: "已实践",
};

export const STATUS_BADGE: Record<PostStatus, string> = {
  unread: "bg-gray-100 text-gray-600",
  todo: "bg-orange-100 text-orange-700",
  done: "bg-brand-100 text-brand-700",
};

export const CATEGORY_COLORS: Record<string, string> = {
  美食: "#ff3366",
  穿搭: "#ec4899",
  旅行: "#06b6d4",
  学习: "#3b82f6",
  家居: "#f97316",
  美妆: "#a855f7",
  健身: "#22c55e",
  摄影: "#eab308",
};
