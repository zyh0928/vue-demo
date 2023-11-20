import { extend } from "umi-request";

import type { ResponseError } from "umi-request";

export const CODE_MESSAGE: Record<number, string> = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  405: "请求方法不被允许。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = async (error: ResponseError) => {
  const { request, response } = error ?? {};

  if (!response) {
    throw error;
  }

  const { status } = response;

  const json = await response.clone().json();

  const { code, msg } = json ?? {};

  const httpCode = status === 200 ? code : status;

  let errorText = "您的网络发生异常，无法连接服务器";

  if (httpCode) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(`error handler: ${httpCode} ${request?.url}`);
    }

    errorText = `请求错误：${CODE_MESSAGE[status]}`;
  }

  // message.error(msg || errorText);

  throw error;
};

export const getRequest = (prefix: string, headers?: HeadersInit) => {
  const request = extend({
    // 默认请求是否带上cookie
    credentials: "include",
    // 默认错误处理
    errorHandler,
    // 请求头配置
    headers,
    // 前缀
    prefix,
    // 默认请求超时时间
    timeout: 1000 * 15,
  });

  const blobs = [
    "application/x-download",
    "application/vnd.ms-excel",
    "application/msword",
  ];

  request.interceptors.response.use(async (response, request) => {
    const contentType = response.headers.get("Content-Type");

    const isBlob = blobs.some((item) => contentType?.includes(item));

    if (isBlob) {
      request.responseType = "blob";

      return response;
    }

    const { status } = response;

    if (status !== 200) {
      throw {
        request,
        response,
      };
    }

    return response;
  });

  return request;
};

export const dogRequest = getRequest(import.meta.env.DEMO_DOG_API);

export const catRequest = getRequest(import.meta.env.DEMO_CAT_API);

export const jrscRequest = getRequest(import.meta.env.DEMO_JRSC_API, {
  "X-User-Token": localStorage.getItem("jrscToken") ?? "",
});
