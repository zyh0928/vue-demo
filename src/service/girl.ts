import { corsRequest, girlRequest } from "./request";

type GirlParams = Partial<{
  id: string;
  mode: string;
  type: string;
}>;

export const getGirl = async (params?: GirlParams) =>
  await girlRequest.get("/api/", {
    params: { type: "json", ...params },
  });

export const getGirls = async (id: string) => {
  const code = encodeURIComponent(`https://3650000.xyz/view/url/${id}`);

  return await corsRequest.get(code);
};
