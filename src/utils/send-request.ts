import axios from "axios";
import { SendHttpOptions } from "typings";

axios.defaults.timeout = 30000;

axios.interceptors.response.use(
  (resp) => {
    const { error } = resp.data;

    if (error) throw error;

    return resp;
  },
  (e) => {
    if (e.message.includes("timeout")) throw "请求超时，请重试";
  }
);

export const sendHttp = async ({
  url = "",
  method = "get",
  data = {},
  params = {},
  returnAll = !1,
  respKey = "data",
}: Partial<SendHttpOptions>): Promise<any> => {
  const resp = await axios({
    url,
    method,
    data,
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).catch((e) => {
    throw e;
  });

  if (returnAll) return resp.data;
  else return resp.data[respKey];
};
