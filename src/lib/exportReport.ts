import type { PromptAnalysis } from './analyzePrompt';

export function createMarkdownReport(prompt: string, analysis: PromptAnalysis): string {
  const issueLines = analysis.issues.length
    ? analysis.issues.map((issue) => `- **${issue.severity}** — ${issue.message}`).join('\n')
    : '- No issues detected by the local rules.';

  return `# PromptLens report

## Overall score

Overall: **${analysis.score.overall}/100**

| Structure | Clarity | Conflict safety | Efficiency |
| --- | --- | --- | --- |
| ${analysis.score.structure} | ${analysis.score.clarity} | ${analysis.score.conflict} | ${analysis.score.efficiency} |

## Prompt

${prompt || '_No prompt provided._'}

## Findings

${issueLines}
`;
}

export function createJsonReport(prompt: string, analysis: PromptAnalysis): string {
  return JSON.stringify({ prompt, analysis }, null, 2);
}
