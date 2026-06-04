import { describe, expect, it } from 'vitest';

import MapLegend from './MapLegend';

import { render, screen } from '@/test/test-utils';

const defaultDomain = { min: 1400, mean: 1650, max: 1900 };

describe('MapLegend', () => {
  it('renders formatted min price', () => {
    render(<MapLegend domain={defaultDomain} />);
    // formatPrice(String(1400), 'en') → '1,400.00'
    expect(screen.getByText('1,400.00')).toBeTruthy();
  });

  it('renders formatted max price', () => {
    render(<MapLegend domain={defaultDomain} />);
    // formatPrice(String(1900), 'en') → '1,900.00'
    expect(screen.getByText('1,900.00')).toBeTruthy();
  });

  it('renders unit string from i18n', () => {
    render(<MapLegend domain={defaultDomain} />);
    expect(screen.getByText('€/1000 L')).toBeTruthy();
  });

  it('renders the gradient bar element', () => {
    render(<MapLegend domain={defaultDomain} />);
    // MUI sx uses Emotion CSS classes, not inline styles.
    // Verify the bar is in the DOM via its testid.
    expect(screen.getByTestId('legend-gradient-bar')).toBeTruthy();
  });
});
