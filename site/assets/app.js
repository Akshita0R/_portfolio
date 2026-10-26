/* ==========================================================================
   Akshita R — portfolio v2. Hash-routed single page:
   #/ graph · #/projects[/<id>] · #/work[/<id>] · #/about[/<section>] · #/contact
   ========================================================================== */
(() => {
  const P = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const track = (type, label) => window.track && window.track(type, label);
  const view = $("[data-view]");
  const projects = P.projects.filter((p) => p.type !== "experience");
  const roles = P.projects.filter((p) => p.type === "experience");
  const ordered = [...projects, ...roles];
  const byId = (id) => P.projects.find((p) => p.id === id);
  const section = (p) => (p.type === "experience" ? "work" : "projects");
  const href = (p) => `#/${section(p)}/${encodeURIComponent(p.id)}`;

  const lights = `<span class="tls"><button class="tl tl--close" type="button" data-tl="close" aria-label="Close window"></button><button class="tl tl--min" type="button" data-tl="min" aria-label="Minimise window"></button><button class="tl tl--max" type="button" data-tl="max" aria-label="Full screen"></button></span>`;
  const BURST = `<svg class="burst" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 1l3.2 5.4 6.2-1.3-1.3 6.2L29.5 15l-5.4 3.2 1.3 6.2-6.2-1.3L16 28.5l-3.2-5.4-6.2 1.3 1.3-6.2L2.5 15l5.4-3.2-1.3-6.2 6.2 1.3z"/></svg>`;
  const SHAPES = {
    circle: (s = 7) => `<circle r="${s}" />`,
    square: (s = 7) => `<rect x="${-s}" y="${-s}" width="${s * 2}" height="${s * 2}" rx="1.5" />`,
    triangle: (s = 8) => `<path d="M 0 ${-s} L ${s} ${s * 0.75} L ${-s} ${s * 0.75} Z" />`,
    diamond: (s = 8) => `<path d="M 0 ${-s} L ${s} 0 L 0 ${s} L ${-s} 0 Z" />`,
    hex: (s = 8) => `<path d="M ${s} 0 L ${s / 2} ${s * 0.87} L ${-s / 2} ${s * 0.87} L ${-s} 0 L ${-s / 2} ${-s * 0.87} L ${s / 2} ${-s * 0.87} Z" />`,
  };
  const icon = (shape) => `<svg viewBox="-10 -10 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5">${SHAPES[shape](7)}</svg>`;

  /* ---------------------------------------------------------- sidebar --- */
  const NAV = [
    { label: "Projects", shape: "hex", href: "#/projects", key: "projects" },
    { label: "Work", shape: "circle", href: "#/work", key: "work" },
    { label: "About", shape: "triangle", href: "#/about", key: "about" },
    { label: "Resume", shape: "diamond", href: P.resumeUrl, key: "resume", ext: true },
    { label: "Contact", shape: "square", href: "#/contact", key: "contact" },
  ];
  $("[data-side]").innerHTML = `
    <a class="side__head" href="#/">${BURST}<b>${esc(P.name)}</b></a>
    <p class="side__bio">${esc(P.bio)} <a href="${esc(P.bioOrg.url)}" target="_blank" rel="noopener">${esc(P.bioOrg.label)}</a>.</p>
    <ul class="nav">${NAV.map((n) => `<li><a href="${esc(n.href)}" data-nav="${n.key}" ${n.ext ? 'target="_blank" rel="noopener"' : ""}>${icon(n.shape)}<span>${n.label}</span><span class="arrow">${n.ext ? "↗" : "→"}</span></a></li>`).join("")}</ul>`;
  $('[data-nav="resume"]').addEventListener("click", () => track("resume", "sidebar"));

  /* ------------------------------------------------------------ graph --- */
  let W = 1000, H = 640, CX = 500, CY = 320;
  const NODES = [
    ["MedNear", "hex", "p:mednear", -90, 1],
    ["Funnel Analytics", "hex", "p:ecommerce-funnel", -64, 0.84],
    ["Projects", "hex", "#/projects", -39, 1.02],
    ["Work", "circle", "#/work", -13, 0.86],
    ["CSG Systems", "square", "p:kpi-dashboards", 13, 1],
    ["Contact", "square", "#/contact", 39, 0.84],
    ["Resume", "diamond", "pdf", 64, 1],
    ["Volopay", "square", "p:fintech-backend", 90, 0.86],
    ["Experience", "triangle", "#/about/experience", 116, 1.02],
    ["Toolkit", "square", "#/about/toolkit", 141, 0.84],
    ["About", "triangle", "#/about", 167, 1],
    ["Hockey", "circle", "#/about/beyond", 193, 0.86],
    ["Urban Parking", "hex", "p:urban-parking", 219, 1.02],
    ["Values", "circle", "#/about/values", 244, 0.84],
  ].map(([label, shape, go, deg, k], i) => {
    const a = (deg * Math.PI) / 180;
    return { label, shape, go, i, bx: Math.cos(a) * 370 * k, by: Math.sin(a) * 240 * k };
  });

  // Spring layout: every node wants to sit at its offset from the hub. Drag the hub and they trail behind.
  let raf = 0;
  function renderGraph() {
    cancelAnimationFrame(raf);
    // Phones get a tall, narrow map so labels stay readable.
    const narrow = matchMedia("(max-width: 860px) and (orientation: portrait)").matches;
    [W, H, CX, CY] = narrow ? [420, 640, 210, 310] : [1000, 640, 500, 320];
    const hub = { x: CX, y: CY };
    NODES.forEach((n, i) => {
      n.ox = narrow ? n.bx * 0.45 : n.bx;
      n.oy = narrow ? n.by * 1.12 : n.by;
      n.x = CX + Math.cos(i) * 6; n.y = CY + Math.sin(i) * 6; // start bunched at the hub: they burst out
      n.vx = n.vy = 0;
      n.k = 0.035 + ((i * 7) % 5) * 0.009; // varied stiffness gives the comet-tail trail
    });
    view.innerHTML = `
      <div class="graph" data-graph>
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-label="Map of Akshita's work: click a node, or drag the centre">
          <g data-edges>${NODES.map((n) => `<line class="edge" data-edge="${n.i}" />`).join("")}</g>
          ${NODES.map((n) => `
            <g class="node" data-node="${n.i}" tabindex="0" role="button" aria-label="${esc(n.label)}">
              <g data-pos>
                <g class="node__float" style="animation-delay:${-n.i * 0.7}s">
                  <circle r="34" fill="transparent" />
                  <g class="node__shape">${SHAPES[n.shape]()}</g>
                  <text class="node__label" y="24" text-anchor="middle">${esc(n.label)}</text>
                </g>
              </g>
            </g>`).join("")}
          <g class="hub" data-hub tabindex="0" role="button" aria-label="About ${esc(P.name)}">
            <circle r="40" fill="transparent" />
            <path class="hub__burst" transform="translate(-16 -26)" d="M16 1l3.2 5.4 6.2-1.3-1.3 6.2L29.5 15l-5.4 3.2 1.3 6.2-6.2-1.3L16 28.5l-3.2-5.4-6.2 1.3 1.3-6.2L2.5 15l5.4-3.2-1.3-6.2 6.2 1.3z" />
            <text class="hub__name" y="22" text-anchor="middle">${esc(P.name)}</text>
            <text class="hub__place" y="39" text-anchor="middle">⌖ ${esc(P.city)}, ${esc(P.country)}</text>
          </g>
        </svg>
        <div class="profile card" data-profile hidden></div>
        <p class="graph__hint"><span class="mouse">Drag the centre · hover to connect · click to open</span><span class="touch">Drag the centre · tap a node to open</span></p>
      </div>`;
    const g = $("[data-graph]"), svg = $("svg", g), hubEl = $("[data-hub]", g), profile = $("[data-profile]", g);
    const nodeEls = NODES.map((n) => $(`[data-node="${n.i}"]`, g)), edges = NODES.map((n) => $(`[data-edge="${n.i}"]`, g));
    const toSvg = (e) => { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); };
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    let dragNode = null, hubDrag = false;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      hubEl.setAttribute("transform", `translate(${hub.x} ${hub.y})`);
      NODES.forEach((n, i) => {
        $("[data-pos]", nodeEls[i]).setAttribute("transform", `translate(${n.x} ${n.y})`);
        const e = edges[i];
        e.setAttribute("x1", hub.x); e.setAttribute("y1", hub.y); e.setAttribute("x2", n.x); e.setAttribute("y2", n.y);
      });
      if (!profile.hidden) placeProfile();
    };
    const step = () => {
      let energy = 0;
      NODES.forEach((n) => {
        if (n === dragNode) return;
        n.vx = (n.vx + (hub.x + n.ox - n.x) * n.k) * 0.84;
        n.vy = (n.vy + (hub.y + n.oy - n.y) * n.k) * 0.84;
        n.x += n.vx; n.y += n.vy;
        energy += Math.abs(n.vx) + Math.abs(n.vy);
      });
      draw();
      raf = energy > 0.05 || hubDrag || dragNode ? requestAnimationFrame(step) : 0;
      g.classList.toggle("is-moving", !!raf);
    };
    const wake = () => raf || (raf = requestAnimationFrame(step));
    if (still) NODES.forEach((n) => ((n.x = hub.x + n.ox), (n.y = hub.y + n.oy)));
    draw();
    wake();

    // Hub: drag to pull the whole map; click to open the profile card.
    let start = null, moved = false;
    hubEl.addEventListener("pointerdown", (e) => { start = { x: e.clientX, y: e.clientY }; moved = false; hubEl.setPointerCapture(e.pointerId); });
    hubEl.addEventListener("pointermove", (e) => {
      if (!start || (!moved && Math.hypot(e.clientX - start.x, e.clientY - start.y) < 5)) return;
      moved = hubDrag = true;
      const p = toSvg(e);
      hub.x = clamp(p.x, 60, W - 60); hub.y = clamp(p.y, 60, H - 60);
      wake();
    });
    hubEl.addEventListener("pointerup", () => {
      if (start && !moved) toggleProfile();
      if (moved) track("section", "graph-drag-hub");
      start = null; hubDrag = false; wake();
    });
    hubEl.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggleProfile()));
    hubEl.addEventListener("pointerenter", () => g.classList.add("is-hub"));
    hubEl.addEventListener("pointerleave", () => g.classList.remove("is-hub"));

    // Nodes: hover lights the line; drag to move (its new spot sticks); click to open.
    nodeEls.forEach((el, i) => {
      const n = NODES[i];
      let s = null, mv = false;
      const show = (on) => edges[i].classList.toggle("is-on", on || el.classList.contains("is-open"));
      el.addEventListener("pointerenter", () => show(true));
      el.addEventListener("pointerleave", () => show(false));
      el.addEventListener("focus", () => show(true));
      el.addEventListener("blur", () => show(false));
      el.addEventListener("pointerdown", (e) => { s = { x: e.clientX, y: e.clientY }; mv = false; el.setPointerCapture(e.pointerId); });
      el.addEventListener("pointermove", (e) => {
        if (!s || (!mv && Math.hypot(e.clientX - s.x, e.clientY - s.y) < 5)) return;
        mv = true; dragNode = n; el.classList.add("is-dragging");
        const p = toSvg(e);
        n.x = clamp(p.x, 30, W - 30); n.y = clamp(p.y, 30, H - 30); n.vx = n.vy = 0;
        n.ox = n.x - hub.x; n.oy = n.y - hub.y;
        wake();
      });
      el.addEventListener("pointerup", () => { el.classList.remove("is-dragging"); dragNode = null; if (s && !mv) activate(n, el); s = null; });
      el.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), activate(n, el)));
    });

    // Profile card, anchored under the hub.
    const linkedin = P.links.find((l) => /linkedin/i.test(l.label)), github = P.links.find((l) => /github/i.test(l.label));
    profile.innerHTML = `
      <div class="win__bar">${lights}<span class="win__sub"></span></div>
      <div class="profile__body">
        <div class="profile__photo">${P.photo ? `<img src="${esc(P.photo)}" alt="${esc(P.name)}">` : BURST}</div>
        <div><b>${esc(P.name)}</b><span class="profile__role">${esc(P.profileRole || "Data Analyst, future PM")}</span>
          <p>${esc(P.profileLine || "")}</p>
          <span class="profile__links"><a href="#/contact">Contact</a>${linkedin ? `<a href="${esc(linkedin.url)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}${github ? `<a href="${esc(github.url)}" target="_blank" rel="noopener">GitHub</a>` : ""}</span></div>
      </div>
      <div class="profile__foot"><span>⌖ ${esc(P.city)}, ${esc(P.country)} | <span data-ptime></span></span><a class="btn" href="#/projects">See my work</a></div>`;
    const placeProfile = () => {
      const m = svg.getScreenCTM(), gr = g.getBoundingClientRect();
      const x = m.a * hub.x + m.e - gr.left, y = m.d * hub.y + m.f - gr.top;
      const w = profile.offsetWidth, h = profile.offsetHeight;
      profile.style.left = `${clamp(x - w / 2, 8, gr.width - w - 8)}px`;
      profile.style.top = `${y + 56 + h > gr.height - 8 ? Math.max(8, y - h - 40) : y + 56}px`;
    };
    function toggleProfile() {
      profile.hidden = !profile.hidden;
      if (!profile.hidden) {
        $("[data-ptime]", profile).textContent = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit", timeZone: P.timezone }).format(new Date());
        placeProfile();
        track("section", "profile-card");
      }
    }
    addEventListener("resize", () => !profile.hidden && placeProfile());
  }

  function activate(n, el) {
    track("section", "graph-" + n.label);
    if (n.go === "pdf") return window.open(P.resumeUrl, "_blank", "noopener");
    if (n.go.startsWith("p:")) return openPreview(n.go.slice(2), el);
    location.hash = n.go;
  }

  /* -------------------------------------------------------- preview ---- */
  const scrim = $("[data-scrim]"), pv = $("[data-preview]");
  let pvIndex = -1, pvNode = null;
  function openPreview(id, nodeEl) {
    pvIndex = ordered.findIndex((p) => p.id === id);
    if (pvNode) pvNode.classList.remove("is-open");
    pvNode = nodeEl || document.querySelector(`[data-node="${NODES.findIndex((n) => n.go === "p:" + id)}"]`);
    if (pvNode) {
      pvNode.classList.add("is-open");
      document.querySelector(`[data-edge="${pvNode.dataset.node}"]`)?.classList.add("is-on");
    }
    const p = ordered[pvIndex];
    pv.innerHTML = `
      <div class="win__bar">${lights}
        <span class="win__title" id="pv-title">${esc(p.title)}</span><span class="win__sub">${esc(p.label)}</span>
        <span class="win__tag">${p.type === "experience" ? "Work" : "Project"}</span></div>
      <div class="pv">
        <dl class="pv__meta">
          <div><dt>My role</dt><dd>${esc(p.role)}</dd></div>
          <div><dt>Team</dt><dd>${esc(p.team)}</dd></div>
          <div><dt>Timeline</dt><dd>${esc(p.timeline)}</dd></div>
          <div><dt>Status</dt><dd>${esc(p.status || "")}</dd></div>
        </dl>
        <div class="pv__stage">${Mocks.render(p)}</div>
      </div>
      <div class="pv__foot">
        <div><button class="btn btn--ghost sq" type="button" data-pv-step="-1" aria-label="Previous">←</button><button class="btn btn--ghost sq" type="button" data-pv-step="1" aria-label="Next">→</button></div>
        <a class="btn" href="${href(p)}" data-pv-full>View full ${p.type === "experience" ? "role" : "project"}</a>
      </div>`;
    scrim.hidden = pv.hidden = false;
    $("[data-tl=close]", pv).focus();
    track("project", p.id + "-preview");
  }
  function closePreview() {
    scrim.hidden = pv.hidden = true;
    if (pvNode) {
      pvNode.classList.remove("is-open");
      document.querySelector(`[data-edge="${pvNode.dataset.node}"]`)?.classList.remove("is-on");
      pvNode.focus?.();
      pvNode = null;
    }
  }
  pv.addEventListener("click", (e) => {
    const step = e.target.closest("[data-pv-step]");
    if (step) return openPreview(ordered[(pvIndex + +step.dataset.pvStep + ordered.length) % ordered.length].id);
    if (e.target.closest("[data-pv-full]")) closePreview();
  });
  scrim.addEventListener("click", closePreview);
  addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!pv.hidden) return closePreview();
    const pr = document.querySelector("[data-profile]");
    if (pr) pr.hidden = true;
  });

  /* ------------------------------------------------------------ pages --- */
  const page = (title, sub, tag, body) => `
    <section class="win page${maxed ? " is-max" : ""}"><div class="win__bar">${lights}
      <span class="win__title">${title}</span><span class="win__sub">${sub}</span><span class="win__tag">${tag}</span></div>
      <div class="win__body" data-scroll>${body}</div></section>`;

  const workItem = (p) => `
    <article class="wk">
      <a class="wk__stage" href="${href(p)}" aria-label="${esc(p.title)}">${Mocks.render(p)}</a>
      <div class="wk__bar"><p><b>${esc(p.title)}</b>${esc(p.label)}</p><a class="btn" href="${href(p)}">View ${p.type === "experience" ? "role" : "project"}</a></div>
    </article>`;

  function renderList(kind) {
    view.innerHTML = kind === "work"
      ? page("Work", "Roles I've held", "Experience", `<div class="inner">${roles.map(workItem).join("")}</div>`)
      : page("Projects", "Things I've built from scratch", "Projects", `<div class="inner">${projects.map(workItem).join("")}</div>`);
  }

  function renderCase(id) {
    const p = byId(id);
    if (!p) return (location.hash = "#/projects");
    const group = p.type === "experience" ? roles : projects, kind = section(p);
    const i = group.indexOf(p), next = group[(i + 1) % group.length], prev = group[(i - 1 + group.length) % group.length];
    view.innerHTML = page(kind === "work" ? "Work" : "Projects", esc(p.title), esc(p.type === "experience" ? "Role" : "Project"), `<article class="inner case">
      <p class="eyebrow"><a href="#/${kind}">← All ${kind}</a></p>
      <h1>${esc(p.title)}</h1>
      <p class="lede">${esc(p.intro)}</p>
      <dl class="facts"><div><dt>Role</dt><dd>${esc(p.role)}</dd></div><div><dt>Team</dt><dd>${esc(p.team)}</dd></div>
        <div><dt>Timeline</dt><dd>${esc(p.timeline)}</dd></div><div><dt>Tools</dt><dd>${esc(p.tools)}</dd></div></dl>
      <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      ${p.site ? `<p><a class="btn" href="${esc(p.site)}" target="_blank" rel="noopener" data-out="${esc(p.id)}">Visit the live app ↗</a></p>` : ""}
      <div class="wk__stage">${Mocks.render(p)}</div>
      ${p.sections.map((s, n) => `<section class="case__sec"><span class="num">${String(n + 1).padStart(2, "0")} · ${esc(s.tag)}</span><h2>${esc(s.h)}</h2>
        ${s.p.map((t) => `<p>${esc(t)}</p>`).join("")}
        ${s.stats ? `<div class="stats">${s.stats.map((x) => `<div><b>${esc(x.v)}</b><span>${esc(x.l)}</span></div>`).join("")}</div>` : ""}</section>`).join("")}
      <nav class="case__nav"><a href="${href(prev)}">← ${esc(prev.title)}</a><a href="${href(next)}">${esc(next.title)} →</a></nav>
    </article>`);
    track("project", p.id + "-case");
  }

  // Two crossed hockey sticks and a ball, line-drawn.
  const HOCKEY = `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M 28 14 L 74 86 q 6 10 18 8 l 10 -2" /><path d="M 92 14 L 46 86 q -6 10 -18 8 l -10 -2" />
    <path d="M 30 22 l 6 -4 M 90 22 l -6 -4" stroke-width="5" />
    <circle cx="60" cy="104" r="7" fill="var(--blue)" stroke="var(--blue)" /></svg>`;
  const BOOK_COLORS = ["#1a7cff", "#111", "#c0352b", "#2f6b3f", "#a8691a", "#6b2e5f"];
  function renderAbout(section) {
    const A = P.aboutIntro;
    view.innerHTML = page("About", "My corner on the internet", "My corner", `<div class="inner">
      <div class="intro"><div><h1>${esc(A.title)}</h1>${A.body.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        <div class="photo">${P.photo ? `<img src="${esc(P.photo)}" alt="${esc(P.name)}">` : BURST}</div></div>

      <span class="pill" id="experience">Experience</span>
      ${P.experience.map((x) => `<div class="xp"><div><h3>${esc(x.org)}</h3><div class="xp__role">${esc(x.role)}</div></div><div class="xp__when">${esc(x.when)}<br>${esc(x.where)}</div>
        <ul>${x.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("")}
      ${P.education.map((x) => `<div class="xp"><div><h3>${esc(x.org)}</h3><div class="xp__role">${esc(x.role)}</div></div><div class="xp__when">${esc(x.when)}</div></div>`).join("")}

      <span class="pill" id="values">Values</span>
      <div class="posters">${P.values.map((v) => v.style === "ring"
        ? `<div class="poster poster--ring"><span>${v.text.map(esc).join("<br>")}</span></div>`
        : `<div class="poster poster--${v.style}"><span>${v.text.map(esc).join("<br>")}</span></div>`).join("")}</div>

      ${(P.beyond || []).length ? `<span class="pill" id="beyond">Beyond work</span>
      ${P.beyond.map((x) => `<div class="beyond"><div class="beyond__art">${HOCKEY}</div><div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></div>`).join("")}` : ""}

      <span class="pill" id="toolkit">Toolkit</span>
      <dl class="toolkit">${P.skills.map((s) => `<div><dt>${esc(s.group)}</dt><dd>${esc(s.items)}</dd></div>`).join("")}</dl>

      <span class="pill">Awards</span>
      <ul class="awards">${P.awards.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>

      ${P.read.length ? `<span class="pill" id="read">Read</span><div class="shelf">${P.read.map((b, i) => `<div class="book" style="background:${BOOK_COLORS[i % BOOK_COLORS.length]}">${esc(b.title)}<small>${esc(b.author)}</small></div>`).join("")}</div>` : ""}
      ${P.listen.length ? `<span class="pill" id="listen">Listen</span><div class="ipod" data-ipod></div>` : ""}
      ${P.testimonials.length ? `<span class="pill">Testimonials</span>${P.testimonials.map((q) => `<blockquote class="quote">“${esc(q.quote)}”<b>${esc(q.name)} · ${esc(q.role)}</b></blockquote>`).join("")}` : ""}
    </div>`);
    if (P.listen.length) ipod($("[data-ipod]"));
    if (section) requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ block: "start" }));
  }

  function ipod(el) {
    let sel = 0, playing = -1;
    const draw = () => (el.innerHTML = `
      <div class="ipod__screen" aria-live="polite"><header>${playing < 0 ? "All Songs" : "Now Playing"}</header>
        ${playing < 0 ? `<ul>${P.listen.map((s, i) => `<li class="${i === sel ? "is-sel" : ""}">${esc(s.title)} — ${esc(s.artist)}</li>`).join("")}</ul>`
          : `<p style="text-align:center;margin:18px 0 0"><b>${esc(P.listen[playing].title)}</b><br>${esc(P.listen[playing].artist)}</p>`}</div>
      <div class="ipod__wheel"><button class="ipod__menu" type="button" data-k="menu">MENU</button><button class="ipod__prev" type="button" data-k="prev" aria-label="Previous">⏮</button>
        <button class="ipod__next" type="button" data-k="next" aria-label="Next">⏭</button><button class="ipod__play" type="button" data-k="play" aria-label="Play">⏯</button>
        <button class="ipod__center" type="button" data-k="play" aria-label="Select"></button></div>`);
    el.addEventListener("click", (e) => {
      const k = e.target.closest("[data-k]")?.dataset.k;
      if (!k) return;
      const n = P.listen.length;
      if (k === "menu") playing = -1;
      if (k === "prev") sel = (sel - 1 + n) % n;
      if (k === "next") sel = (sel + 1) % n;
      if (k === "play") { playing = sel; if (P.listen[sel].url) window.open(P.listen[sel].url, "_blank", "noopener"); }
      draw();
    });
    draw();
  }

  let clock;
  function renderContact() {
    const li = (k, v) => `<div><dt>${k}</dt><dd>${v}</dd></div>`;
    const linkedin = P.links.find((l) => /linkedin/i.test(l.label)), github = P.links.find((l) => /github/i.test(l.label));
    view.innerHTML = page("Contact", "Get in touch", "Contact", `<div class="inner contact">
      <h1>My inbox is open</h1><p class="lede">A role, a product idea, or just want to talk metrics and messy user problems? Drop a message.</p>
      <div class="contact__grid">
        <dl>${li("Email", `<a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`)}
          ${linkedin ? li("LinkedIn", `<a href="${esc(linkedin.url)}" target="_blank" rel="noopener">${esc(linkedin.url.replace(/^https?:\/\/(www\.)?/, ""))}</a>`) : ""}
          ${github ? li("GitHub", `<a href="${esc(github.url)}" target="_blank" rel="noopener">${esc(github.url.replace(/^https?:\/\/(www\.)?/, ""))}</a>`) : ""}
          ${li("Currently in", `${esc(P.city)}, ${esc(P.country)}`)}${li("Local time", `<span data-clock></span>`)}</dl>
        <form class="form" data-form>
          <label>Name<input name="name" required autocomplete="name" placeholder="Jane Smith" /></label>
          <label>Email<input name="email" type="email" required autocomplete="email" placeholder="jane@work.com" /></label>
          <label>Message<textarea name="message" required placeholder="Hi Akshita, I wanted to reach out…"></textarea></label>
          <button class="btn" type="submit">Send message</button>
          <p class="form__status" role="status" data-status></p>
        </form>
      </div></div>`);
    const tick = () => { const c = $("[data-clock]"); if (c) c.textContent = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit", timeZone: P.timezone }).format(new Date()); };
    tick();
    clock = setInterval(tick, 20000);
    const form = $("[data-form]"), status = $("[data-status]");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "Sending…";
      const data = new FormData(form);
      data.append("form-name", "contact");
      try {
        const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() });
        if (!res.ok) throw new Error(res.status);
        status.textContent = "Sent. I'll get back to you soon!";
        form.reset();
        track("postcard", "sent");
      } catch {
        status.textContent = "Opening your mail app instead…";
        track("postcard", "mailto");
        location.href = `mailto:${P.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} (${data.get("email")})`)}`;
      }
    });
  }

  /* --------------------------------------------- window controls + dock --- */
  // macOS-style: red closes, yellow minimises into the dock, green toggles full screen.
  let maxed = false;
  const dock = document.createElement("nav");
  dock.className = "dock";
  dock.setAttribute("aria-label", "Minimised windows");
  dock.hidden = true;
  document.body.appendChild(dock);
  const docked = new Map();
  const drawDock = () => {
    dock.innerHTML = [...docked].map(([key, d]) => `<button type="button" data-dock="${esc(key)}"><span class="dock__ico">${icon(d.shape)}</span>${esc(d.label)}</button>`).join("");
    dock.hidden = !docked.size;
  };
  const toDock = (key, label, shape, restore) => { docked.set(key, { label, shape, restore }); drawDock(); };
  function undock(key) { if (docked.delete(key)) drawDock(); }
  dock.addEventListener("click", (e) => {
    const b = e.target.closest("[data-dock]");
    if (!b) return;
    const d = docked.get(b.dataset.dock);
    docked.delete(b.dataset.dock); drawDock();
    d.restore();
  });
  const minimise = (win, done) => {
    win.classList.add("is-minimising");
    setTimeout(done, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 320);
  };
  document.addEventListener("click", (e) => {
    const tl = e.target.closest("[data-tl]");
    if (!tl) return;
    const win = tl.closest(".win, .profile"), act = tl.dataset.tl;
    if (win.matches("[data-profile]")) {
      if (act === "close" || act === "min") win.hidden = true;
      else win.classList.toggle("is-max");
      return;
    }
    if (win.matches("[data-preview]")) {
      const p = ordered[pvIndex];
      if (act === "close") return closePreview();
      if (act === "max") return win.classList.toggle("is-max");
      return minimise(win, () => { win.classList.remove("is-minimising"); closePreview(); toDock("pv:" + p.id, p.title, p.type === "experience" ? "square" : "hex", () => openPreview(p.id)); });
    }
    // page windows
    if (act === "close") return (location.hash = "#/");
    if (act === "max") { maxed = !maxed; return win.classList.toggle("is-max", maxed); }
    const key = location.hash, label = $(".win__title", win).textContent + ($(".win__sub", win).textContent ? ` · ${$(".win__sub", win).textContent}` : "");
    const shape = (NAV.find((n) => key.startsWith(n.href)) || NAV[0]).shape;
    minimise(win, () => { toDock(key, label, shape, () => (location.hash = key)); location.hash = "#/"; });
  });
  // Double-click a title bar to toggle full screen, as on a Mac.
  document.addEventListener("dblclick", (e) => {
    const bar = e.target.closest(".win__bar");
    if (!bar || e.target.closest("[data-tl]")) return;
    bar.closest(".win, .profile").querySelector("[data-tl=max]").click();
  });

  /* ----------------------------------------------------------- router --- */
  function route() {
    clearInterval(clock);
    cancelAnimationFrame(raf);
    raf = 0;
    if (!pv.hidden) closePreview();
    const [, a = "", b = ""] = (location.hash.replace(/^#/, "") || "/").split("/");
    document.querySelectorAll("[data-nav]").forEach((x) => x.classList.toggle("is-active", x.dataset.nav === a));
    document.title = a ? `${a[0].toUpperCase() + a.slice(1)} — ${P.name}` : P.name;
    if ((a === "work" || a === "projects") && b) {
      const p = byId(b);
      if (p && section(p) !== a) return (location.hash = href(p)); // old links
      renderCase(b);
    } else if (a === "work" || a === "projects") renderList(a);
    else if (a === "about") renderAbout(b);
    else if (a === "contact") renderContact();
    else renderGraph();
    if (a) track("section", a + (b ? "/" + b : ""));
    undock(location.hash);
    $("[data-scroll]")?.scrollTo?.(0, 0);
    if (!b || a !== "about") scrollTo(0, 0);
  }
  addEventListener("hashchange", route);
  route();
})();
