# spells

A small React + Vite word collection app.

## Development

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment under the `spells` repository path.

- `vite.config.js` uses `base: '/spells/'`
- Routing uses `HashRouter` so direct refresh and deep links work on Pages
- A GitHub Actions workflow is added at `.github/workflows/gh-pages.yml`
  to build the app and deploy the generated `dist/` folder.

### How to deploy

1. Push to the `main` branch.
2. GitHub Actions will build and deploy automatically.
3. Enable Pages in repository settings if needed, with the Pages source set to the "GitHub Pages" deployment output.

## Notes

- Keep `node_modules/` and `dist/` out of git.
- `package-lock.json` should stay committed if you want deterministic installs.

