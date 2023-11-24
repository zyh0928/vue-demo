import { corsRequest, girlRequest } from "./request";

export const getList = async (params?: Recordable<GenericScalar | undefined>) =>
  (await girlRequest.get("/api/", {
    params: {
      type: "json",
      ...params,
    },
  })) ?? {};

export const getView = async (id: string) => {
  const code = encodeURIComponent(`https://3650000.xyz/view/url/${id}`);

  return await corsRequest.get(code);
};
