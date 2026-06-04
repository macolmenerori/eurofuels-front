import React from 'react';
import { Outlet } from 'react-router';

import { Navbar } from '@/components/Navbar/Navbar';

export default function Layout(): React.JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <main style={{ flex: 1, overflow: 'hidden' }}>
        <Outlet />
      </main>
    </div>
  );
}
