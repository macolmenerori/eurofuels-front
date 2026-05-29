import React from 'react';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'EuroFuels – EU Fuel Prices Map' },
  { name: 'description', content: 'Real-time fuel prices across 27 EU member states.' }
];

export default function MapPage(): React.JSX.Element {
  return (
    <div>
      <h1>Map Page</h1>
      {/* Map component will go here */}
    </div>
  );
}
