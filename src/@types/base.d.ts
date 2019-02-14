interface ILanguage {
  code: string;
  label: string;
}

interface II18n {
  "zh-Hans": string;
  en: string;
}

interface IMenu {
  children?: IMenu[];
  icon?: string;
  id: number;
  label?: boolean;
  name: II18n;
  router?: string;
}
