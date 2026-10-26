# Akshita R — Portfolio (v2)

A light, minimal portfolio built around a **draggable mind-map**: Akshita in the centre, projects, roles and pages around her. Drag the centre and everything follows on springs; click a project for a quick preview, or open the full case study.

## Pages
- `#/`: mind-map home (drag the centre, hover to connect, click to open; click the centre for a profile card)
- `#/work`: all projects and roles with previews
- `#/work/<id>`: full case study
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
Import this repo in Netlify. `netlify.toml` publishes `site/` and sets up the functions. Add a `STATS_TOKEN` environment variable to use the private visitor stats at `/stats.html`.
