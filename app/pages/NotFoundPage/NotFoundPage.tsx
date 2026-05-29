import React from 'react';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: '404 – EuroFuels' },
  { name: 'description', content: 'Page not found.' }
];

export default function NotFoundPage(): React.JSX.Element {
  return (
    <div>
      <h1>404 – Page Not Found</h1>
    </div>
  );
}
