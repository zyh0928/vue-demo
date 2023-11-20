interface About {
  placeholder: string;
  title: string;
}

interface Error {
  404: string;
  500: string;
}

interface Image {
  cat: string;
  dog: string;
  girl: string;
  title: string;
}

interface Welcome {
  axis: string;
  fade: string;
  slide: string;
  title: string;
  wave: string;
}

interface Validations {
  required: string;
}

interface Views {
  about: About;
  error: Error;
  image: Image;
  welcome: Welcome;
}

declare interface I18nSchema {
  validations: Validations;
  views: Views;
}

// npx ts-json-schema-generator --path src/types/schema/i18n.d.ts --type I18nSchema
// export interface I18nSchema {
//   validations: Validations;
//   views: Views;
// }
