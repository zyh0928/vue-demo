interface Page {
  title: string;
}

interface About extends Page {
  placeholder: string;
}

interface Error {
  404: string;
  500: string;
}

interface Image extends Page {
  cat: string;
  cover: string;
  dog: string;
  girl: string;
}

interface Welcome extends Page {
  axis: string;
  fade: string;
  wave: string;
}

interface Validations {
  required: string;
}

interface Views {
  about: About;
  error: Error;
  image: Image;
  node: Page;
  welcome: Welcome;
}

declare interface I18nSchema {
  validations: Validations;
  views: Views;
}

// pnpx ts-json-schema-generator --path types/schema/i18n.d.ts --type I18nSchema
// export interface I18nSchema {
//   validations: Validations;
//   views: Views;
// }
