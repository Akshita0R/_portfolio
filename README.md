# Akshita R — Portfolio (v2)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Akshita0R/_portfolio)

A light, minimal portfolio built around a **draggable mind-map**: Akshita in the centre, projects, roles and pages around her. Drag the centre and everything follows on springs; click a project for a quick preview, or open the full case study.

## Pages
- `#/`: mind-map home (drag the centre, hover to connect, click to open; click the centre for a profile card)
- `#/projects` and `#/projects/<id>`: projects and their case studies
- `#/work` and `#/work/<id>`: roles (CSG, Volopay) and what I did there
- Every window has working macOS buttons: red closes, yellow minimises to the dock, green toggles full screen (or double-click the title bar)
- `#/about`: intro, experience, values, toolkit, awards (+ Read / Listen / Testimonials once filled in)
- `#/contact`: contact details, live local time and a message form (Netlify Forms)

## Edit content
Everything is in **`site/assets/content.js`**:
- `photo`: add `assets/photo.jpg` and set the path, for the About page and profile card
- `read`, `listen`, `testimonials`: empty lists stay hidden; fill them to show the bookshelf, the iPod and quotes
- per project, `image`: a screenshot path replaces the illustrative preview

## Run locally
```bash
npm run dev   # http://localhost:5174
```

## Deploy (Netlify)
Click **Deploy to Netlify** above, or in Netlify choose *Add new project → Import an existing project → GitHub → _portfolio*.
No build command is needed: `netlify.toml` publishes `site/` and bundles the tracking functions in `netlify/functions/`.

After the first deploy:
1. *Project configuration → General → Change project name* (e.g. `akshita-pm`).
2. *Environment variables → Add* `STATS_TOKEN` (any secret), then redeploy, to open `/stats.html`.
3. *Forms*: the contact form is detected automatically; turn on email notifications there.
