# PromptLens

PromptLens is a browser-local prompt review workspace. It scores structure, clarity, contradiction risk, and length using deterministic rules before a prompt is sent to another tool.

## What it does today

- Edit a prompt and inspect four local diagnostic scores.
- Flag empty prompts, limited context, and contradictory English-language instructions.
- View each non-empty line as an instruction map.
- Keep the current prompt and a local model label in the current browser's `localStorage`.
- Export the analysis as Markdown or JSON.

## What it deliberately does not do

- It does not call OpenAI, Anthropic, Gemini, DeepSeek, or any other provider.
- It does not claim semantic correctness, token counts, or an AI-generated rewrite.
- It does not transmit prompts or store them on a server.

## Run locally

Requirements: Node.js 20+ and pnpm 10+.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Vite. The app is a static React/Vite app.

## Verify and build

```bash
pnpm test
pnpm build
```

`pnpm build` emits the deployable static files to `dist/`. `vercel.json` supplies an SPA rewrite when deploying to Vercel; no hosted deployment workflow is committed yet.

## Project layout

- `src/lib/analyzePrompt.ts` — deterministic analysis rules and scores.
- `src/lib/exportReport.ts` — Markdown and JSON report serialization.
- `src/App.tsx` — browser-local workspace and export controls.
- `src/*.test.*` — executable product behavior checks.

## Privacy

Prompt text and the local model label are stored only in the browser where you run the app. Clear the prompt through the UI or remove this site's local storage in the browser to erase it.

## License

MIT. See [LICENSE](LICENSE).
