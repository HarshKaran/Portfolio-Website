# Portfolio Website

A professional, interactive portfolio built with **React**, **Three.js** (via react-three-fiber), **Framer Motion**, and **Vite**.

## Sections
- **Home** — animated interactive 3D particle field + typewriter roles
- **About** — intro + quick stats
- **Skills** — categorized tech chips
- **Experience** — timeline
- **Projects** — card grid with live/code links
- **Contact** — form + social links (LinkedIn, GitHub, LeetCode, GeeksforGeeks)

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Editing your content

All text lives in one file: **`src/data/content.js`**.
Update your name, roles, social links, about text, skills, experience, and projects there — the UI reads everything from it. No need to touch the components.

### Social links
Set your real URLs in the `socials` object in `src/data/content.js`.

### Contact form
Messages are delivered to your inbox via [Web3Forms](https://web3forms.com).
Get a free access key, then copy `.env.example` to `.env` and set
`VITE_WEB3FORMS_KEY`. When deploying, add the same variable in your host's
environment settings. Without a key, the form falls back to opening the
visitor's email client.

### 3D section backgrounds
Each section has a decorative three.js scene (`src/components/SectionScene.jsx`)
plus floating tech-logo tiles (`src/components/TechTiles.jsx` — edit the
`TILES` map to change logos/positions). Scenes load lazily, pause off-screen,
and respect `prefers-reduced-motion`.

## Tech
- React 18
- Three.js + @react-three/fiber
- simple-icons (tech logos)
- Framer Motion (animations)
- react-icons (social + UI icons)
- Vite (build tooling)
