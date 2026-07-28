# PromptLens maintenance notes

## Product contract

PromptLens is an offline prompt-review MVP. Its committed behavior is deterministic local scoring, issue hints, local browser persistence, and Markdown/JSON export. Do not describe provider calls, AI rewrites, token accounting, screenshots, or deployment automation as available unless the corresponding implementation is committed and tested.

## Source of truth

- UI: `src/App.tsx` and `src/styles.css`
- Analysis rules: `src/lib/analyzePrompt.ts`
- Report formats: `src/lib/exportReport.ts`
- Product tests: `src/**/*.test.*`
- Static deployment configuration: `vite.config.ts`, `vercel.json`

## Commands

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm dev
```

## Local and generated files

- Never commit `node_modules/`, `dist/`, `.vite/`, logs, or local `.env*` files.
- Never place API keys or user prompt exports in source files, tests, screenshots, or commits.
- Browser persistence keys are `promptlens.prompt` and `promptlens.model-label`; changing them is a user-data migration.

## Release check

1. Run `pnpm test` and `pnpm build` successfully.
2. Load the built app and verify empty input, a conflicting language instruction, and both export buttons.
3. Confirm README claims match committed behavior and no provider integration is implied.
