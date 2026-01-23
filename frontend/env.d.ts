/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BREVO_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
