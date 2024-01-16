/// <reference types="vite/client" />

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

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<KVMap, KVMap, KVMap>;
  export default component;
}

declare module "@@/locales/*.yaml" {
  const data: StrMap<string | StrMap>;
  export default data;
}
