/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COUNTRY_DATA_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
