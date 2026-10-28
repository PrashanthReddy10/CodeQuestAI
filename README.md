# CodeQuest AI ✦

A responsive, gamified coding-learning site for Python, AI, and web development. This upgrade preserves the original plain HTML/CSS/JavaScript structure and six lessons, while adding persistent progression, direct next-quest navigation, a browser Python playground, a clearly labelled tutor demo/connected mode, and a demo leaderboard.

## Quick start (guest mode)

1. Extract the ZIP.
2. Open a terminal in the `codequest-ai` folder.
3. Run `python -m http.server 8000` (or use VS Code Live Server).
4. Visit `http://localhost:8000`.

A local server is recommended because browser workers and external Python runtime loading may not work when opening the HTML directly as a `file://` URL. You do not need to sign in. Guest progress is stored in this browser's `localStorage`.

## What's included

- Existing learning paths and lessons: Python Foundations (3), AI Explorers (2), Web Creator (1).
- Lesson quiz checks and completion action; completion awards 25 XP once per quest.
- **Next Quest →** opens the next incomplete quest in the same path. The last quest offers a path-completed action. Completed lessons can be reviewed without duplicate XP.
- XP, level progress, achievement unlocks, local-calendar streak and longest streak.
- Daily challenge with date-based prompt rotation and one reward per daily prompt/date.
- Python playground with a CodeMirror editor (syntax highlighting, line numbers, indentation) when its CDN is reachable, plus a plain-text fallback. Pyodide runs in a Web Worker and requires internet access to download the runtime on first run. This is a learning sandbox, not a production-grade hostile-code security boundary; the worker can be terminated if it hangs.
- Tutor Demo Mode (rule-based helper responses) and an optional server-side AI endpoint. The UI only switches to AI Connected after receiving a valid response from that endpoint.
- A clearly labelled local/demo leaderboard. Sample players are not real people or global rankings.
- Responsive mobile layouts and reduced-motion support.

## Feature boundaries

| Feature | Works immediately? | Notes |
|---|---|---|
| Lessons, Next Quest, local XP, levels, achievements | Yes | Saved per browser with `localStorage` |
| Python playground | Yes, with internet | Pyodide CDN download; runs in a Web Worker |
| Tutor | Demo Mode | Rule-based example responses; not a real AI model |
| AI Connected tutor | Requires setup | Deploy the serverless endpoint and configure a secret API key |
| Guest mode | Yes | No account required |
| Real sign-in, registration, cross-device progress | Not configured | Requires an authentication provider and database, such as Supabase or Firebase |
| Leaderboard | Demo only | Local guest row plus explicitly labelled sample players; no shared global rankings |
| GitHub Pages | Yes for static features | GitHub Pages cannot run the included serverless API function |

## GitHub Pages deployment (static site)

1. Create a GitHub repository, for example `codequest-ai`.
2. Upload `index.html`, `style.css`, `app.js`, and `README.md` to the repository root. You can keep `api/`, `package.json`, and `vercel.json` in the repo, but GitHub Pages will not execute the API function.
3. In GitHub, open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.
5. Wait for the published URL shown on the Pages screen. The relative CSS/JS paths work when the site is published from a repository subpath.

On GitHub Pages, the tutor remains in Demo Mode unless you configure a separate backend and change the frontend endpoint accordingly. Do not put an API key in `app.js`, HTML, or any public repository.

## Optional real AI tutor (Vercel serverless function)

The included `api/tutor.js` calls the OpenAI-compatible Chat Completions API from the server. The secret is read only from a server environment variable.

1. Install Node.js LTS and create a Vercel account.
2. Install the Vercel CLI: `npm install -g vercel`.
3. In the project folder, run `npm install` (there are no runtime package dependencies) and `vercel` to link the project, then `vercel dev` for local development.
4. In the Vercel project dashboard, open **Settings → Environment Variables** and add `OPENAI_API_KEY` with your own API key. Optionally set `OPENAI_MODEL` to a model available to your account (default: `gpt-4o-mini`). Do not commit the key.
5. Redeploy the Vercel project. Open the deployed site and send a tutor message. The interface shows **AI Connected** only after the server responds successfully; missing keys, provider errors, or a static-only deployment remain in Demo Mode.

For local `vercel dev`, add the key through Vercel's local environment workflow (for example `vercel env pull .env.local`) and never commit `.env.local`. Usage may incur provider charges. Add rate limiting and abuse monitoring before public production use.

## Authentication and cloud progress setup

Authentication is intentionally not faked. The current version runs as a guest and saves progress locally. To add real accounts and cross-device sync, configure Supabase or Firebase:

1. Create a project with the provider and enable an authentication method.
2. Create a user-owned progress table/document store with fields for completed lesson IDs, XP, challenge completions, streak dates, and unlocked achievements.
3. Enforce per-user row/document access rules so users can only read/write their own records. Never place a service-role or admin key in browser code.
4. Validate score-changing actions on a trusted backend before using them for a shared leaderboard; client-only XP is editable by the user.
5. Add the provider's public client configuration and sign-in/register UI only after access rules are tested. The current guest flow should remain available when the service is unavailable.

No real login/register system or cloud database is claimed to be implemented in this ZIP.

## Testing and limitations

- `node --check app.js` and `node --check api/tutor.js` passed during project verification.
- Static checks found no duplicate HTML IDs, balanced CSS braces, and no unresolved static JavaScript element-ID references.
- The local HTTP server returned HTTP 200 for the main HTML, CSS, JavaScript, and README files.
- Focused Next Quest ordering checks passed for first, middle, final, and “skip completed quests to next incomplete” cases.
- A full interactive browser run could not be completed in this environment because headless Chromium stalled during startup. Manually test the complete flow in a normal browser before public deployment.
- The Pyodide runtime requires internet and a compatible browser. Arbitrary student code is not run on the page's main thread, but browser worker isolation is not a substitute for a backend sandbox against hostile workloads.
- The frontend is static and local-first. Clearing site data clears guest progress; it does not sync across devices.
- Daily streaks count a meaningful activity (quest completion, daily challenge completion, or running code) once per local calendar day. Missing a day resets the current streak; longest streak is retained.
