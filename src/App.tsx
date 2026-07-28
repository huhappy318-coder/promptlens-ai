import { useEffect, useMemo, useState } from 'react';
import { analyzePrompt } from './lib/analyzePrompt';
import { createJsonReport, createMarkdownReport } from './lib/exportReport';

const DEFAULT_PROMPT = 'Write a concise product summary for a busy reader. Include three bullet points.';
const PROMPT_STORAGE_KEY = 'promptlens.prompt';
const MODEL_STORAGE_KEY = 'promptlens.model-label';

export function App() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [modelLabel, setModelLabel] = useState('Local rules only');
  const analysis = useMemo(() => analyzePrompt(prompt), [prompt]);

  useEffect(() => {
    const savedPrompt = window.localStorage.getItem(PROMPT_STORAGE_KEY);
    const savedModelLabel = window.localStorage.getItem(MODEL_STORAGE_KEY);
    if (savedPrompt !== null) setPrompt(savedPrompt);
    if (savedModelLabel !== null) setModelLabel(savedModelLabel);
  }, []);

  const savePrompt = (value: string) => {
    setPrompt(value);
    window.localStorage.setItem(PROMPT_STORAGE_KEY, value);
  };

  const saveModelLabel = (value: string) => {
    setModelLabel(value);
    window.localStorage.setItem(MODEL_STORAGE_KEY, value);
  };

  const downloadReport = (format: 'markdown' | 'json') => {
    const contents = format === 'markdown'
      ? createMarkdownReport(prompt, analysis)
      : createJsonReport(prompt, analysis);
    const blob = new Blob([contents], { type: format === 'markdown' ? 'text/markdown' : 'application/json' });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = `promptlens-report.${format === 'markdown' ? 'md' : 'json'}`;
    anchor.click();
    URL.revokeObjectURL(href);
  };

  return (
    <main className="shell">
      <header className="hero">
        <p className="eyebrow">PromptLens · local MVP</p>
        <h1>Inspect a prompt before you send it.</h1>
        <p>Score prompt structure, clarity, contradictions, and length with deterministic browser-local rules.</p>
      </header>

      <section className="workspace" aria-label="PromptLens workspace">
        <div className="card editor-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Input</p>
              <h2>Prompt editor</h2>
            </div>
            <button type="button" onClick={() => savePrompt('')}>Clear</button>
          </div>
          <label htmlFor="prompt">Your prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(event) => savePrompt(event.target.value)}
            placeholder="Describe the task, audience, constraints, and expected format."
            rows={14}
          />
          <div className="actions">
            <button className="primary" type="button" onClick={() => savePrompt(prompt)}>Analyze locally</button>
            <button type="button" onClick={() => downloadReport('markdown')}>Export Markdown</button>
            <button type="button" onClick={() => downloadReport('json')}>Export JSON</button>
          </div>
        </div>

        <aside className="side-panel">
          <section className="card score-card" aria-live="polite">
            <p className="eyebrow">Local score</p>
            <p className="overall-score">{analysis.score.overall}<span>/100</span></p>
            <dl className="score-grid">
              <div><dt>Structure</dt><dd>{analysis.score.structure}</dd></div>
              <div><dt>Clarity</dt><dd>{analysis.score.clarity}</dd></div>
              <div><dt>Conflict safety</dt><dd>{analysis.score.conflict}</dd></div>
              <div><dt>Efficiency</dt><dd>{analysis.score.efficiency}</dd></div>
            </dl>
          </section>

          <section className="card">
            <p className="eyebrow">Findings</p>
            <h2>Instruction map</h2>
            {analysis.sections.length ? (
              <ol className="sections">{analysis.sections.map((section, index) => <li key={`${index}-${section}`}>{section}</li>)}</ol>
            ) : <p className="muted">Add text to map its instructions.</p>}
            <ul className="issues">
              {analysis.issues.length ? analysis.issues.map((issue) => (
                <li key={issue.code} className={issue.severity}><strong>{issue.severity}</strong> {issue.message}</li>
              )) : <li className="ok">No local rule conflicts detected.</li>}
            </ul>
          </section>

          <section className="card settings-card">
            <p className="eyebrow">Settings</p>
            <label htmlFor="model-label">Local model label</label>
            <input id="model-label" value={modelLabel} onChange={(event) => saveModelLabel(event.target.value)} />
            <p className="muted">Provider calls are not connected. This label is stored only in this browser.</p>
          </section>
        </aside>
      </section>
    </main>
  );
}
