// POST /api/track — records one analytics event in Netlify Blobs.
//
// Every event is stored as an empty blob whose *key* holds the data:
//   <day>/<type>/<label>/<country>/<device>/<visitor>/<random>
// That keeps writes append-only (no read-modify-write races) and lets the
// stats function aggregate by listing keys, without reading any values.
//
// <visitor> is a salted daily hash of IP + user agent (Plausible-style):
// it lets us count unique visitors per day without cookies, and it can't be
// reversed or linked across days.
import { getStore } from "@netlify/blobs";

const TYPES = new Set(["pageview", "section", "project", "link", "resume", "postcard", "envelope", "ink"]);
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|embedly/i;

const clean = (s, max = 48) =>
  String(s ?? "").toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, max) || "none";

async function visitorHash(day, ip, ua) {
  const salt = Netlify.env.get("STATS_SALT") || "postmarked";
  const data = new TextEncoder().encode(`${salt}|${day}|${ip}|${ua}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest).slice(0, 6)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const ua = req.headers.get("user-agent") || "";
  if (BOT.test(ua)) return new Response(null, { status: 204 });

  let event;
  try {
    const text = await req.text();
    if (text.length > 1000) throw new Error("too large");
    event = JSON.parse(text);
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  if (!TYPES.has(event?.type)) return new Response("Unknown event", { status: 400 });

  const day = new Date().toISOString().slice(0, 10);
  const country = clean(context.geo?.country?.code || "xx", 2);
  const device = /mobi|android|iphone|ipad/i.test(ua) ? "mobile" : "desktop";
  const visitor = await visitorHash(day, context.ip || "", ua);
  const key = [day, event.type, clean(event.label), country, device, visitor, crypto.randomUUID().slice(0, 8)].join("/");

  await getStore("portfolio-analytics").set(key, "");
  return new Response(null, { status: 204 });
};

export const config = { path: "/api/track" };
