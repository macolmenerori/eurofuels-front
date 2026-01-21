import { HelmetProvider } from 'react-helmet-async';

import { render } from '@testing-library/react';

import { JsonLd } from './JsonLd';

describe('JsonLd', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <JsonLd />
      </HelmetProvider>
    );
  });
});
