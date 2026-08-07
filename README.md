# NAKK Architecture

Portfolio website for NAKK Architecture, built with Vue 3, Vite, Vue Router, and Pinia.

## Portfolio structure

The portfolio is organized as nine project records rather than one card per image. The project manifest lives in `src/data/projects.js`, and optimized media is stored in `public/projects/<slug>/`:

- `thumb/`: 720 px WebP images for listings and gallery previews
- `full/`: up to 1920 px WebP images for project covers and the lightbox

Every project has a stable `/projects/:slug` page with a responsive gallery and keyboard-accessible lightbox.

## Local development

Use Node 24 (the version is pinned in `.nvmrc`).

```sh
nvm use
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
npm run preview
```

## Updating projects

1. Optimize new source images into matching `thumb` and `full` WebP files.
2. Add the media metadata to `src/data/projects.js`.
3. Keep image paths rooted at `/projects/<slug>/...`.
4. Run `npm run build` and verify every referenced file exists before publishing.

## Deployment

The included `netlify.toml` publishes `dist` and redirects unknown paths to `index.html`, which preserves Vue Router deep links. The contact page uses Netlify Forms; the static form definition in `index.html` must remain in place so Netlify can discover its fields during the build.
