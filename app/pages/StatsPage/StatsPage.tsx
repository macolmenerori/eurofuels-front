import React from 'react';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'Statistics – EuroFuels' },
  { name: 'description', content: 'Fuel price statistics and trends across the European Union.' }
];

export default function StatsPage(): React.JSX.Element {
  return (
    <div>
      <h1>Stats Page</h1>
      {/* Stats component will go here */}
    </div>
  );
}
