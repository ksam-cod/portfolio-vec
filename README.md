# Samalex Kariuki — Software Engineering Portfolio

Portfolio website for **Samalex Kariuki** (`samalexkariuki2@gmail.com` · Tel: `0706915713`), built with React, TypeScript, Tailwind CSS, and Vite.

## Project Structure

- `index.html` — Entry document and typography imports
- `src/data/portfolioData.ts` — Profile, projects, skills, GitHub highlights, education, and technical blog data
- `src/components/` — Modular portfolio sections (`Hero`, `AboutSection`, `ProjectShowcase`, `CodeLabSection`, `SkillsAndGithub`, `EducationAndJournal`, `ContactSection`, `Footer`)
- `src/assets/images/` — Bundled portfolio photography
- `dist/` — Compiled static site ready to host on any static hosting provider

## Run Locally

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

This generates a self-contained static folder in `dist/` (`index.html` + `assets/`) ready for deployment.

## Hosting Options

### 1. Netlify (Drag & Drop — Fastest)
1. Run `npm run build` (or unzip `samalex-kariuki-portfolio-static.zip`).
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder directly onto the page.

### 2. Vercel
1. Push this repository to GitHub (`github.com/samalexkariuki`).
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite** · Build command: `npm run build` · Output directory: `dist`.

### 3. Render (Static Site)
1. Connect your GitHub repository in Render and select **New Static Site**.
2. Build command: `npm install && npm run build`.
3. Publish directory: `dist`.

### 4. GitHub Pages
1. Run `npm run build`.
2. Deploy the contents of `dist/` to your `gh-pages` branch (or configure GitHub Actions with `actions/upload-pages-artifact` pointing to `dist`).
