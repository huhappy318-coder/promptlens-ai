export type IssueSeverity = 'error' | 'warning' | 'info';

export type PromptIssue = {
  code: string;
  severity: IssueSeverity;
  message: string;
};

export type PromptScore = {
  structure: number;
  clarity: number;
  conflict: number;
  efficiency: number;
  overall: number;
};

export type PromptAnalysis = {
  score: PromptScore;
  issues: PromptIssue[];
  sections: string[];
};

const clampScore = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

const hasConflictingLanguage = (prompt: string) =>
  /(?:always|only|respond|answer)[^.\n]{0,80}\benglish\b/i.test(prompt) &&
  /(?:do not|don't|never)[^.\n]{0,80}\benglish\b/i.test(prompt);

export function analyzePrompt(input: string): PromptAnalysis {
  const prompt = input.trim();

  if (!prompt) {
    return {
      score: { structure: 0, clarity: 0, conflict: 0, efficiency: 0, overall: 0 },
      issues: [{ code: 'empty-prompt', severity: 'error', message: 'Add a prompt before running analysis.' }],
      sections: [],
    };
  }

  const lines = prompt.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const words = prompt.split(/\s+/).filter(Boolean);
  const issues: PromptIssue[] = [];
  const conflictingLanguage = hasConflictingLanguage(prompt);

  if (conflictingLanguage) {
    issues.push({
      code: 'conflicting-language',
      severity: 'warning',
      message: 'The prompt both requires and forbids English output. Choose one language rule.',
    });
  }

  if (words.length < 8) {
    issues.push({
      code: 'low-context',
      severity: 'info',
      message: 'Add audience, task, or output details to make the request easier to follow.',
    });
  }

  const hasAction = /\b(write|create|summari[sz]e|analy[sz]e|list|draft|explain|generate|translate)\b/i.test(prompt);
  const hasOutputShape = /\b(bullet|table|json|markdown|steps?|paragraph|format)\b/i.test(prompt);
  const hasConstraint = /\b(concise|brief|exactly|at most|must|include|avoid|only)\b/i.test(prompt);
  const structure = clampScore(45 + (lines.length > 1 ? 20 : 0) + (hasOutputShape ? 20 : 0) + (hasConstraint ? 15 : 0));
  const clarity = clampScore(35 + (hasAction ? 30 : 0) + (hasConstraint ? 20 : 0) + (words.length >= 12 ? 15 : 0));
  const conflict = conflictingLanguage ? 25 : 100;
  const efficiency = clampScore(90 - Math.max(0, words.length - 180) / 3 - (lines.length === 1 && words.length > 80 ? 10 : 0));
  const overall = clampScore((structure + clarity + conflict + efficiency) / 4);

  return {
    score: { structure, clarity, conflict, efficiency, overall },
    issues,
    sections: lines,
  };
}
