import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders a usable local analysis workspace without claiming provider access', () => {
    const markup = renderToStaticMarkup(<App />);

    expect(markup).toContain('Prompt editor');
    expect(markup).toContain('Analyze locally');
    expect(markup).toContain('Provider calls are not connected');
  });
});
