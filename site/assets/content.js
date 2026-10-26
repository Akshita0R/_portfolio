/* ==========================================================================
   CONTENT — edit this file only. Everything on the site is generated from it.
   ========================================================================== */
window.PORTFOLIO = {
  name: "Akshita R",
  first: "Akshita",
  last: "R.",
  quote: "“I care about products people can actually trust.”",
  now: { label: "Now", text: "Data Analyst · Product & Analytics, CSG" },
  prev: { label: "Prev", text: "Backend Engineer, Volopay" },
  next: { label: "Next", text: "Associate Product Manager" },
  city: "Bengaluru",
  email: "akshitar2003@gmail.com",
  resumeUrl: "assets/resume.pdf",
  photo: "", // optional: put a photo at assets/photo.jpg and write "assets/photo.jpg" here
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/akshita-r" },
    { label: "GitHub", url: "https://github.com/Akshita0R" },
    { label: "Email", url: "mailto:akshitar2003@gmail.com" },
  ],

  // ---- used by this (v2) site --------------------------------------------
  bio: "A product-minded data analyst who cares about what people use, understand, and trust. Currently making product metrics honest at",
  bioOrg: { label: "CSG", url: "https://www.csgi.com" },
  profileRole: "Data Analyst → Associate Product Manager",
  profileLine: "Defines the metric before building. Built MedNear 0→1 and knows when not to ship the AI part. State-level hockey player.",
  country: "India",
  timezone: "Asia/Kolkata",
  aboutIntro: {
    title: "Data told me what happened. Users told me why. I want to work where those two meet.",
    body: [
      "I'm Akshita, a Data Analyst with 1.5+ years in enterprise SaaS, and before that a backend engineer in a fintech product team. Now I'm moving into product management.",
      "The part of my work I enjoy most is the decision: setting the metric before building, finding the drop-off nobody noticed, and being honest when the evidence says “not yet”.",
    ],
  },
  // Inferred from how you work (see MedNear and CSG). Edit freely.
  values: [
    { text: ["WRITE THE", "METRIC", "FIRST."], style: "black" },
    { text: ["SHIP", "WHAT'S", "TRUE"], style: "blue" },
    { text: ["ASK USERS.", "THEN", "THE DATA."], style: "ring" },
  ],
  // "Beyond work" on the About page (and the Hockey node on the map).
  beyond: [
    { title: "State-level hockey player", text: "Years of competitive hockey taught me to read the game fast, hold my position under pressure and trust the team around me. Turns out that's most of product work too." },
  ],
  // Personal sections stay hidden until filled in.
  read: [],        // e.g. { title: "Inspired", author: "Marty Cagan" }
  listen: [],      // e.g. { title: "Song name", artist: "Artist", url: "https://open.spotify.com/..." }
  testimonials: [],// e.g. { quote: "...", name: "Name", role: "Role, Company" }

  about: {
    title: "Good products start with an honest number.",
    body: [
      "I'm a Data Analyst with 1.5+ years in enterprise SaaS, and before that a backend engineer in a fintech product team. Now I'm moving into product management.",
      "I like the moment when the data and the users disagree. That's usually where the real product decision is hiding.",
    ],
    roles: [
      { org: "CSG Systems International", role: "Data Analyst" },
      { org: "Volopay", role: "Backend Engineer" },
      { org: "MedNear", role: "Founder · 0→1" },
      { org: "CMR Institute of Technology", role: "B.E. CSE · 8.78" },
      { org: "Rise Club", role: "President" },
      { org: "Srishti 2024", role: "Finalist" },
      { org: "Smart Argothon 2023", role: "Finalist" },
      { org: "WIE Competition", role: "5th place" },
    ],
  },

  skills: [
    { group: "Product", items: "User research · PRDs · MVP scoping · RICE · KPIs · Funnel analysis · Agile/Scrum" },
    { group: "AI product", items: "AI evaluation · Launch criteria · Human-in-the-loop · Gemini API" },
    { group: "Technical", items: "SQL (MySQL, SQL Server, PostgreSQL) · BigQuery · Python · Supabase" },
    { group: "Tools", items: "Power BI · Microsoft Fabric · Excel · Jira · Confluence" },
  ],

  // Shown in Recruiter mode: the plain, scannable résumé.
  summary: "Data Analyst with 1.5+ years in enterprise SaaS and prior backend engineering in a fintech product team, transitioning to Associate Product Manager. Built MedNear 0→1, from user research and PRD to live launch, and ran a 129-case AI evaluation that drove the go/no-go call.",
  experience: [
    { org: "CSG Systems International", role: "Data Analyst, Product & Analytics", when: "Feb 2025 – Present", where: "Bengaluru", points: [
      "Defined and tracked 15+ product KPIs with Product and Engineering across 10+ Power BI dashboards, cutting manual reporting time by ~40%.",
      "Set SQL and data-quality standards adopted across a 6-person reporting pipeline, reducing rework by 25%.",
      "Ran funnel analysis across 5+ reporting workflows, uncovered a 20% drop-off pattern, and informed 3 product changes.",
      "Presented data-backed recommendations to Product and Leadership, shaping prioritisation across 10+ sprints.",
    ] },
    { org: "Volopay", role: "Backend Engineer, Product Team", when: "Apr 2024 – Feb 2025", where: "Bengaluru", points: [
      "Translated user-behaviour data into sprint priorities and feature specs with Product Managers across 10+ sprints.",
      "Gave technical input on requirements for 5+ PRDs, assessing feasibility and trade-offs.",
      "Optimised SQL queries powering product analytics, cutting pipeline latency by 30%.",
    ] },
  ],
  education: [{ org: "CMR Institute of Technology", role: "B.E. Computer Science · CGPA 8.78/10", when: "2021 – 2025" }],
  awards: ["State-level hockey player", "Merit Scholarship", "Best Mini-Project (Sem 1–5)", "President, Rise Club", "5th, WIE Competition", "₹50K grant · Srishti 2024 & Smart Argothon 2023 finalist · patent filed"],

  // Projects: `scene` picks the illustration: "pharmacy" | "dashboard" | "funnel" | "parking" | "server"
  projects: [
    {
      id: "mednear",
      status: "Live · lookup launched, AI triage held back",
      short: "MedNear",
      title: "MedNear",
      label: "Taking an AI medicine finder from 0 → 1",
      scene: "pharmacy",
      wide: true,
      year: "2026",
      role: "Solo PM · Design · Build",
      team: "Just me (+ AI pair)",
      timeline: "2026",
      tools: "PRD, Supabase, Gemini API, CI evals",
      tags: ["0→1", "AI evaluation", "User research"],
      intro: "People waste trips to pharmacies that turn out to be out of stock. MedNear answers one question: “where should I go now?” I took it from a user survey to a live app, then ran a 129-case AI evaluation that decided what not to launch.",
      site: "https://mednearproduct.netlify.app",
      sections: [
        { tag: "Problem", h: "A wasted trip, when it matters most", p: ["Patients and caregivers make costly trips to pharmacies that turn out to be out of stock, often when they need a medicine urgently.", "I ran a user survey, built personas from it, and wrote a PRD with user stories, an MVP scope and one success metric: stock accuracy, target 80%."] },
        { tag: "Build", h: "Shipping a working app, fast", p: ["I built it with AI-assisted development: medicine search, a pharmacy portal and a metrics dashboard, with sign-up, a PostgreSQL (Supabase) backend and crowdsourced stock confirmations."] },
        { tag: "Challenge", h: "Ranking for “where should I go now?”", p: ["Early results surfaced pharmacies that were closed or out of stock. I redesigned the ranking around that one user question."], stats: [{ v: "30%→0%", l: "closed / out-of-stock suggestions" }, { v: "2→1", l: "taps to directions" }] },
        { tag: "Evaluation", h: "Setting the bar before testing", p: ["Before testing, I set launch bars: ≥95% of emergencies caught and ≥90% lookup accuracy. Then I built a 129-case test set with an automated scorer covering brand names, salts, typos, Hindi, Kannada and emergency queries."], stats: [{ v: "129", l: "test cases" }, { v: "≥95%", l: "bar: emergencies caught" }, { v: "≥90%", l: "bar: lookup accuracy" }] },
        { tag: "Impact", h: "The go / no-go call", p: ["Rules scored 100% on known cases but caught only 20% of emergencies on a blind set, far below the bar.", "So I launched medicine lookup, blocked AI triage, and routed emergencies to an urgent-help fallback. The evaluation runs in CI, so every change is checked against the bar."] },
        { tag: "Reflection", h: "What I'd carry forward", p: ["Write the success metric and the launch bar before building, and be willing to hold back the impressive AI feature when the evidence says no."] },
      ],
    },
    {
      id: "kpi-dashboards",
      status: "Ongoing",
      type: "experience",
      short: "CSG",
      title: "Data Analyst at CSG",
      label: "15+ product KPIs across 10+ dashboards",
      scene: "dashboard",
      year: "2025",
      role: "Data Analyst · Product & Analytics",
      team: "Product, Engineering, 6-person reporting pipeline",
      timeline: "Feb 2025 – now",
      tools: "Power BI, SQL, Microsoft Fabric",
      tags: ["Product metrics", "Funnels", "Stakeholders"],
      intro: "At CSG Systems International I define and track the product KPIs that Product and Leadership use to prioritise.",
      site: "",
      sections: [
        { tag: "Problem", h: "Metrics nobody fully trusted", p: ["Reporting was manual and slow, and different teams pulled the same numbers differently."] },
        { tag: "Work", h: "KPIs, standards, funnels", p: ["Defined and tracked 15+ product KPIs with Product and Engineering across 10+ Power BI dashboards.", "Set SQL and data-quality standards adopted across a 6-person reporting pipeline.", "Ran funnel analysis across 5+ reporting workflows."] },
        { tag: "Impact", h: "What moved", p: ["A 20% drop-off pattern I uncovered informed 3 product changes agreed with cross-functional stakeholders, and my recommendations shaped prioritisation across 10+ sprints."], stats: [{ v: "~40%", l: "less manual reporting time" }, { v: "25%", l: "less rework" }, { v: "3", l: "product changes informed" }] },
      ],
    },
    {
      id: "fintech-backend",
      status: "Completed",
      type: "experience",
      short: "Volopay",
      title: "Backend Engineer at Volopay",
      label: "From user-behaviour data to sprint priorities",
      scene: "server",
      year: "2024",
      role: "Backend Engineer · Product Team",
      team: "Product Managers, engineering",
      timeline: "Apr 2024 – Feb 2025",
      tools: "SQL, backend services, PRDs",
      tags: ["Fintech", "PRDs", "Performance"],
      intro: "In Volopay's product team I sat between the data and the PMs, turning user behaviour into specs.",
      site: "",
      sections: [
        { tag: "Work", h: "Data → priorities → specs", p: ["Translated user-behaviour data into sprint priorities and feature specs with Product Managers across 10+ sprints.", "Gave technical input on requirements for 5+ PRDs, weighing feasibility and trade-offs against product goals."] },
        { tag: "Impact", h: "What moved", p: ["Optimised the SQL queries behind product analytics."], stats: [{ v: "30%", l: "pipeline latency cut" }, { v: "5+", l: "PRDs shaped" }, { v: "10+", l: "sprints" }] },
      ],
    },
    {
      id: "urban-parking",
      status: "Grant won · patent filed",
      short: "Parking",
      title: "Urban Parking Analytics",
      label: "Real-time parking occupancy for cities",
      scene: "parking",
      year: "2023–24",
      role: "Data pipeline & metrics",
      team: "College team",
      timeline: "2023 – 2024",
      tools: "Python, MongoDB, AWS",
      tags: ["Smart city", "Real-time data", "Patent filed"],
      intro: "A real-time pipeline that tracks parking occupancy and turns it into a handful of core metrics a city can act on.",
      site: "",
      sections: [
        { tag: "Work", h: "Pipeline and core metrics", p: ["Built a real-time parking-occupancy pipeline in Python on MongoDB and AWS, and defined its core metrics."] },
        { tag: "Impact", h: "Recognition", p: ["Won a ₹50,000 grant, reached the finals of Srishti 2024 and Smart Argothon 2023, and filed a patent."], stats: [{ v: "₹50K", l: "grant won" }, { v: "2×", l: "hackathon finalist" }, { v: "1", l: "patent filed" }] },
      ],
    },
    {
      id: "ecommerce-funnel",
      status: "Completed",
      short: "Funnel",
      title: "E-commerce Funnel",
      label: "Finding where shoppers drop off",
      scene: "funnel",
      year: "2023",
      role: "Analyst",
      team: "Solo",
      timeline: "2023",
      tools: "MySQL, Power BI, AWS",
      tags: ["SQL", "Cohorts", "Dashboards"],
      intro: "SQL funnel analysis on e-commerce data to find where shoppers abandon their purchase.",
      site: "",
      sections: [
        { tag: "Work", h: "Modelling the funnel", p: ["Modelled funnel steps in SQL and built 5+ cohort dashboards in Power BI."] },
        { tag: "Impact", h: "What moved", p: ["Found the leak: a 23% drop-off between cart and checkout."], stats: [{ v: "23%", l: "cart → checkout drop-off" }, { v: "5+", l: "cohort dashboards" }] },
      ],
    },
  ],
};
