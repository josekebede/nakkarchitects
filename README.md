# NAKK Architecture

Portfolio website for NAKK Architecture, built with Vue 3, Vite, Vue Router, and Pinia.

## Portfolio structure

The portfolio combines 20 original project cards with nine expanded project galleries, for 29 projects in total. Projects are grouped by typology in the manifest assembled by `src/data/projects.js`. Optimized gallery media is stored in `public/projects/<slug>/`, while original single-image project covers are imported from `src/assets/images/` with optimized listing thumbnails in `public/projects/legacy/`:

- `thumb/`: 720 px WebP images for listings and gallery previews
- `full/`: up to 1920 px WebP images for project covers and the lightbox

Every project has a stable `/projects/:slug` page with a responsive gallery and keyboard-accessible lightbox.
Client-named residential and apartment work uses generic numbered titles and slugs. Keep each project as a separate record within its typology, and add permanent redirects whenever a published slug changes.

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
2. Add gallery records to `src/data/projects.js` or single-image project records to `src/data/legacyProjects.js`.
3. Keep image paths rooted at `/projects/<slug>/...`.
4. Run `npm run build` and verify every referenced file exists before publishing.

## Deployment

The site is deployed on Cloudflare Pages, connected to this GitHub repository.

- **Build settings:** build command `npm run build`, output directory `dist`. Node 24 comes from `.nvmrc`; if the build uses an older version, set a `NODE_VERSION` variable to `24`.
- **Deep links:** with no top-level `404.html`, Cloudflare Pages serves `index.html` for unknown paths, so Vue Router deep links work without a catch-all rule.
- **Redirects:** old project slugs are redirected in `public/_redirects`, which is copied into `dist` at build time. Add a permanent redirect there whenever a published slug changes.
- **Contact form:** the form posts to `functions/api/contact.js` (a Pages Function at `/api/contact`), which emails the message through Resend. Set these in Cloudflare under Settings > Variables and Secrets: `RESEND_API_KEY` (secret), `CONTACT_TO_EMAIL`, and optionally `CONTACT_FROM_EMAIL` once the sending domain is verified in Resend. See `.dev.vars.example`.
- **Testing the form locally:** `npm run dev` does not run Pages Functions. Run `npm run build`, copy `.dev.vars.example` to `.dev.vars`, then run `npx wrangler pages dev dist`.
