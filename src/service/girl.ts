import { corsRequest, girlRequest } from "./request";

type GirlParams = Partial<{
  id: string;
  mode: string;
  type: string;
}>;

const env = import.meta.env;

export const getGirl = async (params?: GirlParams) =>
  await girlRequest.get("/api/", {
    params: { type: "json", ...params },
  });

export const getGirls = async (id: string) => {
  const code = encodeURIComponent(`${env.DEMO_GIRL_API}/view/url/${id}`);
  const file = (await corsRequest.get(code)) ?? "";
  const list: string[] = file.split(/[(\r\n)\r\n]+/);

  const imgs: string[] = [];
  const other: string[] = [];
  list.forEach((img) => {
    if (img.startsWith("http")) {
      imgs.push(img);
    } else if (img) {
      other.push(img);
    }
  });

  return { imgs, other };
};
