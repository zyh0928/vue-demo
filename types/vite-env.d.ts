/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Recordable, Recordable, Recordable>;
  export default component;
}

declare module "@@/locales/*.yaml" {
  const data: I18nSchema;
  export default data;
}

interface ImportMetaEnv {
  BASE_URL: string;
  DEMO_CAT_API: string;
  DEMO_DOG_API: string;
  DEMO_GIRL_API: string;
  DEMO_JRSC_API: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
