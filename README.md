# EuroFuels — Frontend

A web application showing current fuel prices across all 27 EU member states. An interactive map is the primary UI, letting users explore and compare prices by country.

This repository is the frontend. The backend API lives at [macolmenerori/eurofuels-back](https://github.com/macolmenerori/eurofuels-back).

## Prerequisites

- Node.js ≥ 24.11.0
- pnpm

Create a `.env` file at the project root (see `.env.example`):

```env
VITE_COUNTRY_DATA_ENDPOINT=<backend API URL>
VITE_MAPBOX_TOKEN=<Mapbox public token>
```

## Running the app

### Locally

```bash
pnpm install && pnpm dev
```

App runs at `http://localhost:3000`.

### Docker

Build and run the production image:

```bash
docker build -t eurofuels-front .
docker run -p 80:80 eurofuels-front
```

App is served by Nginx at `http://localhost`.

> **Note:** Environment variables (`VITE_*`) are baked in at build time by Vite. Pass them as build args or set them in `.env` before running `docker build`.
