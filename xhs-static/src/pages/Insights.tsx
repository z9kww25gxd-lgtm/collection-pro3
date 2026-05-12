import { useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from "recharts";
import { TrendingUp, Bookmark, Tag, Flame } from "lucide-react";
import { CATEGORY_COLORS, type Post } from "@/lib/data";

export function Insights({ posts }: { posts: Post[] }) {
  const total = posts.length;
  const doneRate = total ? Math.round((posts.filter((p) => p.status === "done").length / total) * 100) : 0;
  const allTags = posts.flatMap((p) => p.tags);
  const uniqueTags = new Set(allTags).size;
  const avgLikes = total ? Math.round(posts.reduce((s, p) => s + p.likes, 0) / total) : 0;

  const categoryData = useMemo(() => {
    const m: Record<string, number> = {};
    posts.forEach((p) => { m[p.category] = (m[p.category] || 0) + 1; });
    return Object.entries(m).map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || "#999" }));
  }, [posts]);

  const statusData = useMemo(() => {
    const map = { unread: 0, todo: 0, done: 0 } as Record<string, number>;
    posts.forEach((p) => { map[p.status] = (map[p.status] || 0) + 1; });
    return [
      { name: "未看", value: map.unread, fill: "#9ca3af" },
      { name: "待打卡", value: map.todo, fill: "#f97316" },
      { name: "已实践", value: map.done, fill: "#ff3366" },
    ];
  }, [posts]);

  const tagData = useMemo(() => {
    const m: Record<string, number> = {};
    allTags.forEach((t) => { m[t] = (m[t] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, count]) => ({ name, count }));
  }, [allTags]);

  const trendData = useMemo(() => {
    const m: Record<string, number> = {};
    posts.forEach((p) => {
      const d = new Date(p.savedAt);
      const key = `${d.getMonth() + 1}月`;
      m[key] = (m[key] || 0) + 1;
    });
    const months = Object.keys(m).sort((a, b) => parseInt(a) - parseInt(b));
    return months.map((name) => ({ name, value: m[name] }));
  }, [posts]);

  const stats = [
    { label: "总收藏", value: total, icon: Bookmark, color: "text-brand-500" },
    { label: "已实践率", value: `${doneRate}%`, icon: TrendingUp, color: "text-orange-500" },
    { label: "标签数量", value: uniqueTags, icon: Tag, color: "text-purple-500" },
    { label: "平均热度", value: `${(avgLikes / 10000).toFixed(1)}w`, icon: Flame, color: "text-brand-500" },
  ];

  const tooltipStyle = {
    borderRadius: 12,
    border: "1px solid #fbcfe8",
    background: "white",
    fontSize: 12,
    boxShadow: "0 4px 12px rgba(255, 51, 102, 0.1)",
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-pink-100">
        <div className="px-8 py-5">
          <h1 className="text-xl font-bold tracking-tight">数据洞察</h1>
          <p className="text-sm text-gray-500 mt-0.5">看懂你的收藏行为，找到真实兴趣</p>
        </div>
      </header>

      <main className="px-8 py-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-pink-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">{label}</span>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="text-2xl font-bold tracking-tight">{value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ChartCard title="分类分布" subtitle="你最关心的领域">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={100}
                  paddingAngle={2}
                  label={({ name, value, cx, cy, midAngle, outerRadius }: any) => {
                    const RAD = Math.PI / 180;
                    const r = outerRadius + 14;
                    const x = cx + r * Math.cos(-midAngle * RAD);
                    const y = cy + r * Math.sin(-midAngle * RAD);
                    return (
                      <text x={x} y={y} fill="#374151" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={11} fontWeight={500}>
                        {`${name} ${value}`}
                      </text>
                    );
                  }}
                  labelLine={{ stroke: "#fbcfe8" }}
                >
                  {categoryData.map((c) => (
                    <Cell key={c.name} fill={c.color} stroke="white" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="实践状态" subtitle="收藏后真的用起来了吗">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={statusData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" horizontal={false} />
                <XAxis type="number" stroke="#9ca3af" style={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" stroke="#6b7280" style={{ fontSize: 12 }} width={60} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(252, 231, 243, 0.4)" }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} label={{ position: "right", fontSize: 11, fill: "#374151" }} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <ChartCard title="收藏趋势" subtitle="每月新增收藏数">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendData} margin={{ left: 0, right: 20, top: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ff3366" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: 11 }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#lineGrad)"
                    strokeWidth={3}
                    dot={{ fill: "#ff3366", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="col-span-2">
            <ChartCard title="热门标签 TOP 10" subtitle="你贴最多的标签">
              <div className="space-y-2">
                {tagData.map((t, i) => (
                  <div key={t.name} className="flex items-center gap-2">
                    <span className="w-5 text-[11px] font-bold text-gray-400">{i + 1}</span>
                    <span className="text-xs flex-1 truncate">#{t.name}</span>
                    <div className="flex-1 h-1.5 bg-pink-50 rounded-full overflow-hidden max-w-[120px]">
                      <div
                        className="h-full bg-gradient-to-r from-brand-500 to-orange-400 rounded-full"
                        style={{ width: `${(t.count / tagData[0].count) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold w-5 text-right">{t.count}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-pink-100 p-5">
      <div className="mb-2">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
