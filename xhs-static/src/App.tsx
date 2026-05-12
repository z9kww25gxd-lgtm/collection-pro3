import { useState } from "react";
import { LayoutGrid, BarChart3, Bookmark, Sparkles, RotateCcw } from "lucide-react";
import { usePosts } from "@/hooks/usePosts";
import { Board } from "@/pages/Board";
import { Insights } from "@/pages/Insights";
import { PostDetail } from "@/components/PostDetail";
import type { Post } from "@/lib/data";

type Page = "board" | "insights";

export default function App() {
  const { posts, updatePost, resetAll } = usePosts();
  const [page, setPage] = useState<Page>("board");
  const [active, setActive] = useState<Post | null>(null);

  // 当 posts 更新时，同步刷新当前选中的 post
  const currentActive = active ? posts.find((p) => p.id === active.id) || null : null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-pink-100 bg-pink-50/50 h-screen sticky top-0 flex flex-col">
        <div className="px-5 py-5 flex items-center gap-2 border-b border-pink-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-orange-400 flex items-center justify-center text-white shadow-md">
            <Bookmark className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-bold text-base leading-tight">小红收藏夹</div>
            <div className="text-[11px] text-gray-500 leading-tight">让收藏真的被看见</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavItem icon={LayoutGrid} label="收藏看板" active={page === "board"} onClick={() => setPage("board")} />
          <NavItem icon={BarChart3} label="数据洞察" active={page === "insights"} onClick={() => setPage("insights")} />
        </nav>

        <div className="px-3 pb-4 space-y-2">
          <button
            onClick={() => {
              if (confirm("确定要重置所有状态和笔记吗？")) resetAll();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 hover:bg-pink-100/60 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重置演示数据
          </button>
          <div className="rounded-xl bg-gradient-to-br from-brand-100/60 via-orange-50 to-brand-50 p-4 border border-brand-100">
            <Sparkles className="w-4 h-4 text-brand-500 mb-2" />
            <div className="text-xs font-semibold mb-1">J人专属</div>
            <div className="text-[11px] text-gray-600 leading-snug">
              把碎片收藏变成可执行的知识库
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {page === "board" ? (
          <Board posts={posts} onOpen={setActive} />
        ) : (
          <Insights posts={posts} />
        )}
      </div>

      <PostDetail
        post={currentActive}
        onClose={() => setActive(null)}
        onUpdate={updatePost}
      />
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
        active ? "bg-white text-brand-600 shadow-sm" : "text-gray-700 hover:bg-pink-100/60"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
