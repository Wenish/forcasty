/// <reference types="vite/client" />

// add env variable here for IntelliSense autocomplete
interface ImportMetaEnv
  extends Readonly<Record<string, string | boolean | undefined>> {
  readonly VITE_FORCASTY_API_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
