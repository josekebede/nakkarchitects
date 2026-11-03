# NAKK Architects

Portfolio website for NAKK Architects, built with Vue 3, Vite, Vue Router, and Pinia.

## Portfolio structure

Every project belongs to exactly one project type (category). The categories, projects and image lists all live in `src/data/projects.js`:

- Houses & Villas
- Apartments
- Offices & Workplaces
- Commercial & Industrial
- Hospitality & Dining
- Healthcare
- Education & Training

A category only appears on the site once it holds at least one project. Each project is marked as a *Design visualization* (render) or a *Completed project* (photographs).

Images are stored as WebP in `public/projects/<slug>/`:

- `thumb/`: 720 px images for listings and gallery previews
- `full/`: up to 1920 px images (2560 px tall for portrait photos) for covers and the lightbox

Every project has a stable `/projects/:slug` page with a responsive gallery and keyboard-accessible lightbox. Titles, summaries, alt text, slugs and file names describe the type of project only; they never name the client. Add a permanent redirect in `public/_redirects` whenever a published slug changes.

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

1. Optimize the new images into matching `thumb` and `full` WebP files in `public/projects/<slug>/` (files numbered `001.webp`, `002.webp`, ...).
2. Add one entry to `definitions` in `src/data/projects.js`: pick the category, set `kind` (`render` or `photo`), write a client-free title and summary, and give every image descriptive alt text.
3. Add the slug to `public/sitemap.xml`.
4. Run `npm run build` and verify every referenced file exists before publishing.

## Deployment

The site is deployed on Cloudflare Pages, connected to this GitHub repository.

- **Build settings:** build command `npm run build`, output directory `dist`. Node 24 comes from `.nvmrc`; if the build uses an older version, set a `NODE_VERSION` variable to `24`.
- **Deep links:** with no top-level `404.html`, Cloudflare Pages serves `index.html` for unknown paths, so Vue Router deep links work without a catch-all rule.
- **Redirects:** old project slugs are redirected in `public/_redirects`, which is copied into `dist` at build time. Add a permanent redirect there whenever a published slug changes.
- **Contact form:** the form posts to `functions/api/contact.js` (a Pages Function at `/api/contact`), which emails the message through Resend. Set these in Cloudflare under Settings > Variables and Secrets: `RESEND_API_KEY` (secret), `CONTACT_TO_EMAIL`, and optionally `CONTACT_FROM_EMAIL` once the sending domain is verified in Resend. See `.dev.vars.example`.
- **Testing the form locally:** `npm run dev` does not run Pages Functions. Run `npm run build`, copy `.dev.vars.example` to `.dev.vars`, then run `npx wrangler pages dev dist`.
