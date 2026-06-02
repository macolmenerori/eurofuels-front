import { describe, expect, it } from 'vitest';

import { StatusCard, type StatusCardStatus } from './StatusCard';

import { render, screen } from '@/test/test-utils';

const ALL_STATUSES: StatusCardStatus[] = ['success', 'warning', 'error', 'info'];

describe('StatusCard', () => {
  it.each(ALL_STATUSES)('renders without crashing for status "%s"', (status) => {
    render(<StatusCard status={status} title="Test title" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the title text', () => {
    render(<StatusCard status="info" title="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders the message when provided', () => {
    render(<StatusCard status="error" title="Error" message="Could not fetch data" />);
    expect(screen.getByText('Could not fetch data')).toBeInTheDocument();
  });

  it('does not render a message paragraph when message is omitted', () => {
    render(<StatusCard status="success" title="All good" />);
    // Typography with component="p" renders a <p> — it must be absent when message is not passed
    expect(screen.getByRole('status').querySelector('p')).toBeNull();
  });

  it('has role="status" and aria-live="polite"', () => {
    render(<StatusCard status="warning" title="Watch out" />);
    const card = screen.getByRole('status');
    expect(card).toHaveAttribute('aria-live', 'polite');
  });

  it.each(ALL_STATUSES)('renders an aria-hidden icon for status "%s"', (status) => {
    const { container } = render(<StatusCard status={status} title="Test" />);
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });
});
