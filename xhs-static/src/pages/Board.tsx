import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Heart, BookmarkCheck } from "lucide-react";
import { CATEGORIES, STATUS_LABEL, STATUS_BADGE, type Post, type PostStatus } from "@/lib/data";

const STATUS_FILTERS: Array<{ value: "all" | PostStatus; label: string }> = [
  { value: "all", label: "全部" },
  { value: "unread", label: "未看" },
  { value: "todo", label: "待打卡" },
  { value: "done", label: "已实践" },
];

export function Board({ posts, onOpen }: { posts: Post[]; onOpen: (p: Post) => void }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (status !== "all" && p.status !== status) return false;
      if (q) {
        const lower = q.toLowerCase();
        return (
          p.title.toLowerCase().includes(lower) ||
          p.author.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.toLowerCase().includes(lower))
        );
      }
      return true;
    });
  }, [posts, q, category, status]);

  const stats = useMemo(
    () => ({
      total: posts.length,
      unread: posts.filter((p) => p.status === "unread").length,
      todo: posts.filter((p) => p.status === "todo").length,
      done: posts.filter((p) => p.status === "done").length,
    }),
    [posts]
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-pink-100">
        <div className="px-8 py-5">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight">收藏看板</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                共 <span className="font-semibold text-gray-900">{stats.total}</span> 篇收藏 · 未看{" "}
                <span className="font-semibold text-gray-900">{stats.unread}</span> · 待打卡{" "}
                <span className="font-semibold text-brand-600">{stats.todo}</span> · 已实践{" "}
                <span className="font-semibold text-gray-900">{stats.done}</span>
              </p>
            </div>
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索标题、作者、标签..."
                className="w-full pl-9 pr-3 h-9 rounded-full bg-pink-50 border border-transparent focus:bg-white focus:border-brand-300 focus:outline-none text-sm transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500 mr-1">状态</span>
              {STATUS_FILTERS.map((s) => (
                <Pill key={s.value} active={status === s.value} onClick={() => setStatus(s.value)}>
                  {s.label}
                </Pill>
              ))}
            </div>

            <div className="h-4 w-px bg-pink-200" />

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-gray-500 mr-1">分类</span>
              <Pill active={category === "all"} onClick={() => setCategory("all")}>
                全部
              </Pill>
              {CATEGORIES.map((c) => (
                <Pill key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="px-8 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-4xl mb-2">🔍</div>
            没有符合条件的收藏
          </div>
        ) : (
          <div className="masonry">
            {filtered.map((p) => (
              <PostCard key={p.id} post={p} onClick={() => onOpen(p)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
        active
          ? "bg-brand-500 text-white shadow-sm"
          : "bg-pink-50 text-gray-700 hover:bg-pink-100"
      }`}
    >
      {children}
    </button>
  );
}

function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  const heights = [220, 260, 200, 240, 280, 210];
  const h = heights[post.id % heights.length];

  return (
    <button
      onClick={onClick}
      className="block w-full text-left bg-white rounded-2xl overflow-hidden border border-pink-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div
        className="cover-gradient relative flex items-center justify-center"
        style={{ background: post.coverColor, height: h }}
      >
        <span className="text-6xl" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}>
          {post.coverEmoji}
        </span>
        <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-white/90 text-gray-800 backdrop-blur rounded-md shadow-sm font-medium">
          {post.category}
        </span>
        {post.status === "done" && (
          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
            <BookmarkCheck className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2">{post.title}</h3>

        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-md bg-pink-50 text-brand-700 font-medium">
              #{t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-500 to-orange-400 text-white text-[10px] font-bold flex items-center justify-center">
              {post.authorAvatar}
            </div>
            <span className="text-[11px] text-gray-500 truncate max-w-[80px]">{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-gray-500">
            <Heart className="w-3 h-3" />
            {post.likes >= 10000 ? `${(post.likes / 10000).toFixed(1)}w` : post.likes}
          </div>
        </div>

        <div className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md ${STATUS_BADGE[post.status]}`}>
          {STATUS_LABEL[post.status]}
        </div>
      </div>
    </button>
  );
}
