import React from 'react';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'About – EuroFuels' },
  { name: 'description', content: 'About the EuroFuels project.' }
];

export default function AboutPage(): React.JSX.Element {
  return (
    <div>
      <h1>About Page</h1>
      {/* About component will go here */}
    </div>
  );
}
