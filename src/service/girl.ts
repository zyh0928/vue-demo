import { girlRequest } from "./request";

export const getList = async (params?: Recordable<GenericScalar>) =>
  (await girlRequest
    .get("/api/", {
      params: {
        type: "json",
        ...params,
      },
    })
    .catch(() => ({}))) ?? {};
