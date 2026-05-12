import { useEffect, useState } from "react";
import { seedPosts, type Post, type PostStatus } from "@/lib/data";

const STORAGE_KEY = "xhs-collect-v1";

interface StoredOverride {
  status: PostStatus;
  note: string;
}

// 安全读取 localStorage
function safeRead(): Record<number, StoredOverride> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function safeWrite(data: Record<number, StoredOverride>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 静默失败，比如隐私模式
  }
}

export function usePosts() {
  const [overrides, setOverrides] = useState<Record<number, StoredOverride>>({});

  useEffect(() => {
    setOverrides(safeRead());
  }, []);

  const posts: Post[] = seedPosts.map((p) => {
    const o = overrides[p.id];
    if (!o) return p;
    return { ...p, status: o.status, note: o.note };
  });

  const updatePost = (id: number, patch: Partial<Pick<Post, "status" | "note">>) => {
    setOverrides((prev) => {
      const current = prev[id] || { status: seedPosts.find((p) => p.id === id)!.status, note: "" };
      const next = {
        ...prev,
        [id]: {
          status: patch.status ?? current.status,
          note: patch.note ?? current.note,
        },
      };
      safeWrite(next);
      return next;
    });
  };

  const resetAll = () => {
    safeWrite({});
    setOverrides({});
  };

  return { posts, updatePost, resetAll };
}
