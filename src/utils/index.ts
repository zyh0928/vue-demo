import { sendHttp } from "./send-request";

export { sendHttp };

export const sleep = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
