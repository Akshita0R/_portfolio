// GET /api/stats?days=30 — aggregated analytics for stats.html.
// Protected by the STATS_TOKEN environment variable (send it as a Bearer token).
import { getStore } from "@netlify/blobs";

const bump = (obj, k, n = 1) => ((obj[k] = (obj[k] || 0) + n), obj);
const top = (obj, n = 12) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n);

export default async (req) => {
  const token = Netlify.env.get("STATS_TOKEN");
  if (!token) return Response.json({ error: "STATS_TOKEN is not set on this site." }, { status: 503 });
  if (req.headers.get("authorization") !== `Bearer ${token}`) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const days = Math.min(Math.max(parseInt(new URL(req.url).searchParams.get("days"), 10) || 30, 1), 90);
  const store = getStore("portfolio-analytics");

  const dayList = [];
  for (let i = days - 1; i >= 0; i--) dayList.push(new Date(Date.now() - i * 864e5).toISOString().slice(0, 10));

  const daily = Object.fromEntries(dayList.map((d) => [d, { views: 0, visitors: 0 }]));
  const totals = {}, sources = {}, sections = {}, projects = {}, links = {}, countries = {}, devices = {};
  const visitorsAll = new Set();

  // One list() per day keeps each call small; values are never read.
  const lists = await Promise.all(dayList.map((d) => store.list({ prefix: `${d}/` })));
  lists.forEach(({ blobs }, i) => {
    const day = dayList[i];
    const dayVisitors = new Set();
    for (const { key } of blobs) {
      const [, type, label, country, device, visitor] = key.split("/");
      bump(totals, type);
      dayVisitors.add(visitor);
      visitorsAll.add(`${day}/${visitor}`);
      if (type === "pageview") {
        daily[day].views++;
        bump(sources, label);
        bump(countries, country);
        bump(devices, device);
      } else if (type === "section") bump(sections, label);
      else if (type === "project") bump(projects, label);
      else if (type === "link") bump(links, label);
    }
    daily[day].visitors = dayVisitors.size;
  });

  return Response.json(
    {
      days,
      totals: { ...totals, visitors: visitorsAll.size },
      daily,
      sources: top(sources),
      sections: top(sections),
      projects: top(projects),
      links: top(links),
      countries: top(countries),
      devices: top(devices),
    },
    { headers: { "cache-control": "no-store" } }
  );
};

export const config = { path: "/api/stats" };
