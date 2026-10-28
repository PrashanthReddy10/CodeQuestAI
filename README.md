# CodeQuest AI ✦

A gamified learning platform concept that helps beginners explore Python, artificial intelligence, and web development through bite-sized lessons, quick checks, XP, and achievements.

## Features

- Responsive dashboard and mobile navigation
- Three learning paths: Python Foundations, AI Explorers, and Web Creator
- Six short lessons with examples and a knowledge check
- XP rewards for lesson completion and the daily challenge
- Progress bars and achievement badges
- Progress saved locally in the browser with `localStorage`
- No backend, API key, or paid service required

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

For a local development server, you can use the VS Code Live Server extension or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a new public GitHub repository, for example `codequest-ai`.
2. Upload `index.html`, `style.css`, `app.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under build and deployment, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. The URL will appear in the Pages settings.

## Project structure

```text
codequest-ai/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Current scope and limitations

This is a front-end prototype intended for learning and portfolio development. It does not currently have accounts, a database, server-side validation, a real AI tutor, or a shared leaderboard. Progress is stored only in the browser where the learner uses the app. The daily challenge is currently a fixed introductory question.

## Suggested next steps

- Add more lessons and question types.
- Add a code editor and safe code execution environment.
- Add an AI tutor using a server-side API route (never expose secret API keys in browser JavaScript).
- Add accounts and a database if you want progress to sync across devices.
- Test with real learners, gather feedback, and document what you improve.

## Credits

Created as a student-led learning project concept. Add your own name, project decisions, screenshots, and development log before publishing.
