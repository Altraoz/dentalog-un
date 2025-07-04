interface ImportMetaEnv {
  readonly DEV_ENV: string
  readonly BACKEND_DEV_URL: string
  readonly BACKEND_PROD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
