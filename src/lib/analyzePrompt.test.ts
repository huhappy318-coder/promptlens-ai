import { describe, expect, it } from 'vitest';
import { analyzePrompt } from './analyzePrompt';

describe('analyzePrompt', () => {
  it('reports an actionable issue for empty input', () => {
    const result = analyzePrompt('   ');

    expect(result.issues).toContainEqual(
      expect.objectContaining({ code: 'empty-prompt', severity: 'error' }),
    );
    expect(result.score.overall).toBe(0);
  });

  it('detects contradictory instructions', () => {
    const result = analyzePrompt('Always answer in English. Do not answer in English.');

    expect(result.issues).toContainEqual(
      expect.objectContaining({ code: 'conflicting-language', severity: 'warning' }),
    );
  });

  it('returns a bounded score with four diagnostic dimensions', () => {
    const result = analyzePrompt('Write a concise product summary for a busy reader. Include three bullet points.');

    expect(result.score).toMatchObject({
      structure: expect.any(Number),
      clarity: expect.any(Number),
      conflict: expect.any(Number),
      efficiency: expect.any(Number),
      overall: expect.any(Number),
    });
    expect(result.score.overall).toBeGreaterThanOrEqual(0);
    expect(result.score.overall).toBeLessThanOrEqual(100);
  });
});
