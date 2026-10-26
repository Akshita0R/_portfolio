/* ==========================================================================
   Tiny, cookie-free analytics client. Sends events to /api/track
   (a Netlify Function, see netlify/functions/track.mjs).
   - No cookies, no localStorage IDs, no personal data.
   - Respects Do Not Track / Global Privacy Control.
   - Silent no-op if the backend isn't deployed (e.g. local preview).
   ========================================================================== */
(() => {
  const ENDPOINT = "/api/track";
  const optedOut = navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true;
  const local = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname) || location.protocol === "file:";

  function send(type, label = "") {
    if (optedOut || local) return;
    const body = JSON.stringify({ type, label: String(label).slice(0, 80), path: location.pathname });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "text/plain" }))) return;
      fetch(ENDPOINT, { method: "POST", body, keepalive: true }).catch(() => {});
    } catch {}
  }

  window.track = send;

  // Page view: label is the source (utm_source / ?ref= wins over the referrer).
  const params = new URLSearchParams(location.search);
  let source = params.get("utm_source") || params.get("ref");
  if (!source) {
    try {
      const host = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : "";
      source = host && host !== location.hostname ? host : "direct";
    } catch { source = "direct"; }
  }
  send("pageview", source);
})();
