import { layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('components/Layout/Layout.tsx', [
    route('/', 'pages/MapPage/MapPage.tsx'),
    route('/stats', 'pages/StatsPage/StatsPage.tsx'),
    route('/about', 'pages/AboutPage/AboutPage.tsx'),
    route('*', 'pages/NotFoundPage/NotFoundPage.tsx')
  ])
] satisfies RouteConfig;
