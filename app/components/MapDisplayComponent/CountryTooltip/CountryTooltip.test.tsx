import { describe, expect, it } from 'vitest';

import CountryTooltip from './CountryTooltip';

import { render, screen } from '@/test/test-utils';

const defaultProps = {
  name: 'Germany',
  gasoline: '1750',
  diesel: '1690',
  x: 100,
  y: 200,
  flipX: false,
  flipY: false
};

describe('CountryTooltip', () => {
  it('renders the country name', () => {
    render(<CountryTooltip {...defaultProps} />);
    expect(screen.getByText('Germany')).toBeTruthy();
  });

  it('renders formatted gasoline price', () => {
    render(<CountryTooltip {...defaultProps} />);
    // formatPrice('1750', 'en') → '1,750.00'
    expect(screen.getByText('1,750.00')).toBeTruthy();
  });

  it('renders formatted diesel price', () => {
    render(<CountryTooltip {...defaultProps} />);
    // formatPrice('1690', 'en') → '1,690.00'
    expect(screen.getByText('1,690.00')).toBeTruthy();
  });

  it('renders em-dash for missing (empty string) gasoline', () => {
    render(<CountryTooltip {...defaultProps} gasoline="" />);
    // formatPrice('', 'en') → '—'
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });

  it('renders em-dash for missing (empty string) diesel', () => {
    render(<CountryTooltip {...defaultProps} diesel="" />);
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });

  it('renders em-dash for non-numeric gasoline', () => {
    render(<CountryTooltip {...defaultProps} gasoline="n/a" />);
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the petrol label from i18n', () => {
    render(<CountryTooltip {...defaultProps} />);
    // map.gasoline = 'Petrol' in en
    expect(screen.getByText('Petrol')).toBeTruthy();
  });

  it('renders the diesel label from i18n', () => {
    render(<CountryTooltip {...defaultProps} />);
    // map.diesel = 'Diesel' in en
    expect(screen.getByText('Diesel')).toBeTruthy();
  });

  it('renders the unit string', () => {
    render(<CountryTooltip {...defaultProps} />);
    expect(screen.getByText('€/1000 L')).toBeTruthy();
  });

  it('has role="tooltip" and aria-atomic="true"', () => {
    const { container } = render(<CountryTooltip {...defaultProps} />);
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.getAttribute('aria-atomic')).toBe('true');
  });
});
