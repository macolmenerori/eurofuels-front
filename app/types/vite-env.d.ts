/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COUNTRY_DATA_ENDPOINT: string;
  readonly VITE_MAPBOX_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
