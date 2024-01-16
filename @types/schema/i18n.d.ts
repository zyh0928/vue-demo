interface About {
  placeholder: string;
}

interface Error {
  "404": string;
  "500": string;
}

interface Image {
  cat: string;
  cover: string;
  dog: string;
  girl: string;
}

interface Welcome {
  axis: string;
  fade: string;
  wave: string;
}

interface Validations {
  required: string;
}

interface Pages {
  about: About;
  error: Error;
  image: Image;
  welcome: Welcome;
}

// pnpx ts-json-schema-generator --path @types/schema/i18n.d.ts --type I18nSchema
export interface I18nSchema {
  pages: Pages;
  validations: Validations;
}
