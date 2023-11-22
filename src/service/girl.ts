import { girlRequest } from "./request";

export const getList = async (params?: Recordable<GenericScalar | undefined>) =>
  (await girlRequest.get("/api/", {
    params: {
      type: "json",
      ...params,
    },
  })) ?? {};
