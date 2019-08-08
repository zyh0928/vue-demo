export interface Language {
  code: string;
  label: string;
}

export interface I18n {
  "zh-Hans": string;
  en: string;
}

export interface Menu {
  children?: Menu[];
  icon?: string;
  id: number;
  label?: boolean;
  name: I18n;
  route?: string;
}
