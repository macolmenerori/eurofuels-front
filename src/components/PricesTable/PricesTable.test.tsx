import { http, HttpResponse } from 'msw';
import { SWRConfig } from 'swr';

import PricesTable from './PricesTable';

import { server } from '@/test/mocks/server';
import { render, screen, waitFor } from '@/test/setupTests';

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SWRConfig
    value={{
      dedupingInterval: 0, // Disable deduping for tests
      provider: () => new Map() // Fresh cache for each test
    }}
  >
    {children}
  </SWRConfig>
);

describe('PricesTable', () => {
  beforeEach(() => {
    // Clear any cached data between tests
    jest.clearAllMocks();
  });

  beforeAll(() =>
    server.listen({
      onUnhandledRequest: 'error'
    })
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('shows loading spinner initially', async () => {
    render(<PricesTable />, { wrapper: TestWrapper });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders fuel prices table when data loads successfully', async () => {
    render(<PricesTable />, { wrapper: TestWrapper });

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Check for table headers
    expect(screen.getByText(/country/i)).toBeInTheDocument();
    expect(screen.getByText(/gasoline/i)).toBeInTheDocument();
    expect(screen.getByText(/diesel/i)).toBeInTheDocument();

    // Check for mock data
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Italy')).toBeInTheDocument();
    expect(screen.getByText('Spain')).toBeInTheDocument();

    // Check for formatted prices
    expect(screen.getByText('1.65')).toBeInTheDocument();
    expect(screen.getByText('1.45')).toBeInTheDocument();
  });

  it('displays error card when API call fails', async () => {
    // Override the default handler to return an error
    server.use(
      http.get('https://eurofuels-bucket.s3.eu-west-1.amazonaws.com/eurofuels_data.json', () => {
        return HttpResponse.error();
      })
    );

    render(<PricesTable />, { wrapper: TestWrapper });

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByTestId('error-loading-card')).toBeInTheDocument();
    });

    // Check that loading spinner is not shown
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();

    // Check that table is not shown
    expect(screen.queryByText(/country/i)).not.toBeInTheDocument();
  });

  it('displays error card when API returns invalid JSON', async () => {
    // Override the default handler to return invalid JSON
    server.use(
      http.get('https://eurofuels-bucket.s3.eu-west-1.amazonaws.com/eurofuels_data.json', () => {
        return HttpResponse.text('invalid json');
      })
    );

    render(<PricesTable />, { wrapper: TestWrapper });

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByTestId('error-loading-card')).toBeInTheDocument();
    });
  });

  it('renders table with correct price formatting', async () => {
    render(<PricesTable />, { wrapper: TestWrapper });

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Check that prices are formatted to 2 decimal places
    const priceElements = screen.getAllByText(/^\d+\.\d{2}$/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('handles empty data array', async () => {
    // Override the default handler to return empty array
    server.use(
      http.get('https://eurofuels-bucket.s3.eu-west-1.amazonaws.com/eurofuels_data.json', () => {
        return HttpResponse.json(JSON.stringify([]));
      })
    );

    render(<PricesTable />, { wrapper: TestWrapper });

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Table headers should still be present
    expect(screen.getByText(/country/i)).toBeInTheDocument();
    expect(screen.getByText(/gasoline/i)).toBeInTheDocument();
    expect(screen.getByText(/diesel/i)).toBeInTheDocument();

    // But no country data should be present
    expect(screen.queryByText('Germany')).not.toBeInTheDocument();
  });

  it('handles network delay', async () => {
    // Override the default handler to simulate delay
    server.use(
      http.get(
        'https://eurofuels-bucket.s3.eu-west-1.amazonaws.com/eurofuels_data.json',
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json(
            JSON.stringify([{ country: 'Test Country', gasoline: '1.23', diesel: '1.45' }])
          );
        }
      )
    );

    render(<PricesTable />, { wrapper: TestWrapper });

    // Loading spinner should be shown initially
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(
      () => {
        expect(screen.getByText('Test Country')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Loading spinner should be gone
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});
