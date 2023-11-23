import { girlRequest } from "./request";

export const getList = async (params?: Recordable<GenericScalar | undefined>) =>
  (await girlRequest.get("/api/", {
    params: {
      type: "json",
      ...params,
    },
  })) ?? {};

export const getView = async (id: string) =>
  await girlRequest.get(`/view/url/${id}`, {
    headers: {
      contentType: "application/octet-stream",
    },
  });
