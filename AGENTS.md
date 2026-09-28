**Purpose**

This file provides concise guidance for AI coding agents working on this repository: what commands to run, where to find important files, and repository-specific conventions.

**Quick Commands**

- **Install**: `npm install`
- **Dev server**: `npm run dev` (opens Vite dev server)
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`

**Key Files & Links**

- **Project README**: [README.md](README.md)
- **Package scripts**: [package.json](package.json)
- **Vite config**: [vite.config.js](vite.config.js)
- **Tailwind config**: [tailwind.config.js](tailwind.config.js)
- **Firebase rules**: [firestore.rules](firestore.rules)
- **Frontend sources**: `src/` (React + Vite app)

**Repository conventions**

- **Framework**: Frontend React app powered by Vite and Tailwind.
- **State & backend**: Uses Firebase client SDK (see `src/pages/firebase.js`).
- **Keep changes small**: Create focused edits and run the dev server to verify UI behavior.
- **No secrets in repo**: Never add credentials to source files; use env or secret stores.
- **Linting**: Run `npm run lint` before committing.

**For the AI agent**

- Prefer adding or editing a single logical area per change (component, route, util).
- Link to existing docs instead of duplicating them; see links above.
- If uncertain about runtime behavior, run `npm run dev` and describe observed UI or console errors.

If you want a more specific agent (e.g., testing, backend, or CI hooks), suggest `/create-agent` with the focus area.
