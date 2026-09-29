# Web Design Library

A personal library of web design references (components, sections, app screens) curated so AI agents can build in a specific taste instead of producing generic AI output.

Live: https://web-design-app.vercel.app

Each reference has a README written for agents (what it looks like, how it works, how to reproduce it), a preview, and, for components, reconstructed React source. The app lets you browse by section, copy a description, or download the files.

## For agents

| URL | Contents |
|---|---|
| `/llms.txt` | Index of every reference with a one-line summary ([llmstxt.org](https://llmstxt.org) format) |
| `/llms-full.txt` | Every README in one file |
| `/catalog.json` | Machine-readable catalog: metadata, page, README, source files, preview and video links |
| `/refs/<section>/<item>/README.md` | One reference's description (plain text), plus `meta.json` and source files |

## Content

References live in `design-references/<section>/<item>/`:

- `meta.json`: title, section, subtype, kind (`component` or `image`), source, tags, animated, stack, summary
- `README.md`: the agent-facing description
- `preview.webp`, `preview.thumb.webp`, optional `preview.mp4`
- component items: `*.tsx` / `*.css` source and `demo.tsx`

A new folder is all it takes to publish a reference. Sections and subtypes are derived from `meta.json` (labels and order in `src/data/sections.ts`).

Adding content:

- 21st.dev: `scripts/fetch-21st.sh <out-dir> <component page urls...>`, then reconstruct the component from `bundle.html` into an item folder
- Images: create the folder with the image, `README.md` and `meta.json`
- Always run `npm run compress` (sharp + ffmpeg) before committing media

## Development

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + build, also emits the agent files
npm run lint
npm run compress  # compress new media in design-references/
```

Stack: Vite, React 19, TypeScript, Tailwind CSS v4, react-router. Code blocks are highlighted at build time with Shiki (`plugins/highlight.ts`); the agent files come from `plugins/agent-catalog.ts`. Every push to `main` deploys to Vercel.

Docs: [vision](docs/PROJECT_VISION.md) and [plan](docs/PLAN.md).
