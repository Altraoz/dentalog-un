const dev_enviroment =  import.meta.env.VITE_DEV_ENV === 'true'
export const url_backend = dev_enviroment ? import.meta.env.VITE_BACKEND_DEV_URL: import.meta.env.VITE_BACKEND_PROD_URL