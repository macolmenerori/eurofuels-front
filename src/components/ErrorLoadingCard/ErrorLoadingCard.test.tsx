import ErrorLoadingCard from './ErrorLoadingCard';

import { render, screen } from '@/test/setupTests';

describe('ErrorLoadingCard', () => {
  const defaultProps = {
    title: 'Test Error',
    message: 'Test error message',
    showReload: false
  };

  it('renders title and message correctly', () => {
    render(<ErrorLoadingCard {...defaultProps} />);

    expect(screen.getByText('⚠️ Test Error')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('shows reload button when showReload is true', () => {
    render(<ErrorLoadingCard {...defaultProps} showReload={true} />);

    const reloadButton = screen.getByText('Refresh');
    expect(reloadButton).toBeInTheDocument();
  });

  it('does not show reload button when showReload is false', () => {
    render(<ErrorLoadingCard {...defaultProps} showReload={false} />);

    expect(screen.queryByText('Refresh')).not.toBeInTheDocument();
  });
});
