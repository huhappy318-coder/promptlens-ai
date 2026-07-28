import { describe, expect, it } from 'vitest';
import type { PromptAnalysis } from './analyzePrompt';
import { createJsonReport, createMarkdownReport } from './exportReport';

const analysis: PromptAnalysis = {
  score: { structure: 70, clarity: 80, conflict: 100, efficiency: 90, overall: 85 },
  issues: [],
  sections: ['Write a release note.'],
};

describe('report export', () => {
  it('creates a readable Markdown report with the prompt and score', () => {
    const report = createMarkdownReport('Write a release note.', analysis);

    expect(report).toContain('# PromptLens report');
    expect(report).toContain('Overall: **85/100**');
    expect(report).toContain('Write a release note.');
  });

  it('creates structured JSON without dropping diagnostic fields', () => {
    const report = JSON.parse(createJsonReport('Write a release note.', analysis));

    expect(report).toMatchObject({ prompt: 'Write a release note.', analysis });
  });
});
