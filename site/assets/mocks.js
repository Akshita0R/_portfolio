/* ==========================================================================
   Illustrative UI previews for each project (HTML, no images).
   Only numbers from the résumé are used; everything else is placeholder UI.
   Swap any of these for a real screenshot: set `image` on the project in content.js.
   ========================================================================== */
window.Mocks = (() => {
  const bars = (vals, cls = "") => `<div class="m-bars ${cls}">${vals.map((v) => `<i style="height:${v}%"></i>`).join("")}</div>`;

  const mednear = () => `
    <div class="m-app">
      <div class="m-phone">
        <div class="m-phone__bar"><b>MedNear</b><span>Bengaluru</span></div>
        <div class="m-search">⌕ paracetamol 650</div>
        <p class="m-label">Open now · sorted by “where should I go now?”</p>
        ${[["Pharmacy A", "0.4 km", "In stock", "confirmed 12 min ago"], ["Pharmacy B", "0.9 km", "In stock", "confirmed 40 min ago"], ["Pharmacy C", "1.3 km", "Likely", "1 report today"]]
          .map(([n, d, s, c], i) => `<div class="m-row"><div><b>${n}</b><small>${d} · ${c}</small></div><span class="m-badge ${i === 2 ? "m-badge--soft" : ""}">${s}</span></div>`).join("")}
        <div class="m-cta">Directions →</div>
        <div class="m-urgent">Emergency? Get urgent help</div>
      </div>
      <div class="m-side">
        <div class="m-card"><small>Launch bar · emergencies caught</small><b>≥95%</b></div>
        <div class="m-card"><small>Launch bar · lookup accuracy</small><b>≥90%</b></div>
        <div class="m-card"><small>Eval set</small><b>129 cases</b><span class="m-chips"><i>brand</i><i>salt</i><i>typo</i><i>Hindi</i><i>Kannada</i></span></div>
        <div class="m-card m-card--warn"><small>AI triage · blind set</small><b>20% caught</b><span>Held back → fallback</span></div>
      </div>
    </div>`;

  const dashboard = () => `
    <div class="m-dash">
      <div class="m-dash__nav"><b>Product KPIs</b><i></i><i></i><i></i><i></i></div>
      <div class="m-dash__main">
        <div class="m-kpis">
          <div><small>KPIs tracked</small><b>15+</b></div><div><small>Dashboards</small><b>10+</b></div>
          <div><small>Manual reporting</small><b>−40%</b></div><div><small>Rework</small><b>−25%</b></div>
        </div>
        <div class="m-panel"><small>Reporting funnel · drop-off found</small>
          <div class="m-funnel">${[100, 86, 80, 64].map((w, i) => `<i style="width:${w}%">${i === 3 ? "−20%" : ""}</i>`).join("")}</div>
        </div>
        <div class="m-panel"><small>Weekly usage</small>${bars([40, 55, 48, 66, 60, 78, 72, 90])}</div>
      </div>
    </div>`;

  const backend = () => `
    <div class="m-split">
      <div class="m-doc"><small>PRD · draft 3</small><b>Feature spec</b>
        ${["Problem", "User behaviour data", "Requirements", "Feasibility & trade-offs"].map((h) => `<p>${h}</p><i></i><i class="short"></i>`).join("")}
      </div>
      <div class="m-panel"><small>Analytics pipeline latency</small>
        <div class="m-compare"><div><i style="height:90%"></i><span>Before</span></div><div><i style="height:63%"></i><span>After</span></div></div>
        <b class="m-big">−30%</b>
      </div>
    </div>`;

  const parking = () => `
    <div class="m-split">
      <div class="m-lot">${Array.from({ length: 24 }, (_, i) => `<i class="${[1, 2, 5, 6, 9, 13, 14, 17, 20, 22].includes(i) ? "" : "on"}"></i>`).join("")}</div>
      <div class="m-side">
        <div class="m-card"><small>Live occupancy</small><b>58%</b>${bars([30, 45, 70, 85, 60, 58], "m-bars--sm")}</div>
        <div class="m-card"><small>Recognition</small><b>₹50K grant</b><span>Srishti 2024 · Smart Argothon 2023 · patent filed</span></div>
      </div>
    </div>`;

  const funnel = () => `
    <div class="m-split">
      <div class="m-panel"><small>Purchase funnel</small>
        ${[["Visit", 100], ["Product", 72], ["Cart", 48], ["Checkout", 37]].map(([l, w], i) => `<div class="m-step"><span>${l}</span><i style="width:${w}%" class="${i === 3 ? "hot" : ""}"></i></div>`).join("")}
        <b class="m-big">−23% <small>cart → checkout</small></b>
      </div>
      <div class="m-side">
        <div class="m-card"><small>Cohort dashboards</small><b>5+</b></div>
        <div class="m-card"><small>Stack</small><b>MySQL · Power BI · AWS</b></div>
      </div>
    </div>`;

  const byScene = { pharmacy: mednear, dashboard, server: backend, parking, funnel };
  return { render: (p) => (p.image ? `<img src="${p.image}" alt="${p.title} screenshot">` : (byScene[p.scene] || dashboard)()) };
})();
