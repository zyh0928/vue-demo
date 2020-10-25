import { Method } from "axios";

export interface SendHttpOptions {
  url: string;
  method: Method;
  data: any;
  params: any;
  returnAll: boolean;
  respKey: string;
}
export interface Utils {
  sendHttp: (args: Partial<SendHttpOptions>) => Promise<any>;
  sleep: (milliseconds: number) => Promise<void>;
}

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
