import { useEffect, useState } from "react";
import { X, Heart, ExternalLink, Bookmark, Clock, CheckCircle2 } from "lucide-react";
import type { Post, PostStatus } from "@/lib/data";

const STATUS_OPTIONS: Array<{ value: PostStatus; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { value: "unread", label: "未看", icon: Bookmark },
  { value: "todo", label: "待打卡", icon: Clock },
  { value: "done", label: "已实践", icon: CheckCircle2 },
];

export function PostDetail({
  post,
  onClose,
  onUpdate,
}: {
  post: Post | null;
  onClose: () => void;
  onUpdate: (id: number, patch: { status?: PostStatus; note?: string }) => void;
}) {
  const [note, setNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (post) setNote(post.note || "");
  }, [post?.id]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!post) return null;

  const handleStatusChange = (newStatus: PostStatus) => {
    onUpdate(post.id, { status: newStatus });
    setToast(`已标记为${STATUS_OPTIONS.find((o) => o.value === newStatus)?.label}`);
  };

  const handleSaveNote = () => {
    onUpdate(post.id, { note });
    setToast("笔记已保存");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed top-0 right-0 h-screen w-full sm:max-w-[480px] bg-white shadow-2xl z-50 overflow-y-auto animate-[slideIn_0.3s_ease]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className="cover-gradient h-64 flex items-center justify-center relative"
          style={{ background: post.coverColor }}
        >
          <span className="text-8xl" style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.25))" }}>
            {post.coverEmoji}
          </span>
          <span className="absolute top-4 left-4 px-2 py-0.5 text-xs bg-white/90 text-gray-800 rounded-md backdrop-blur font-medium">
            {post.category}
          </span>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold leading-snug mb-3">{post.title}</h2>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-orange-400 text-white text-xs font-bold flex items-center justify-center">
                  {post.authorAvatar}
                </div>
                <span className="text-gray-500">{post.author}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Heart className="w-4 h-4" />
                {post.likes.toLocaleString()}
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-700">{post.excerpt}</p>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-pink-50 text-brand-700 font-medium">
                #{t}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">实践状态</div>
            <div className="grid grid-cols-3 gap-2">
              {STATUS_OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => handleStatusChange(value)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-lg border text-xs font-medium transition ${
                    post.status === value
                      ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                      : "bg-white border-pink-100 text-gray-700 hover:bg-pink-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">我的实践笔记</div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="记录你的实践心得、踩坑提醒、改进想法..."
              rows={5}
              className="w-full px-3 py-2 rounded-lg border border-pink-100 focus:border-brand-300 focus:outline-none text-sm resize-none"
            />
            <button
              onClick={handleSaveNote}
              className="w-full py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition"
            >
              保存笔记
            </button>
          </div>

          <button
            onClick={() => window.open(post.url, "_blank")}
            className="w-full py-2 rounded-lg border border-pink-100 hover:bg-pink-50 text-sm font-medium transition flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            在小红书打开原帖
          </button>
        </div>

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-[60] animate-[fadeIn_0.2s_ease]">
            {toast}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>
    </>
  );
}
