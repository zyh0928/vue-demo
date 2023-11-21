import { catRequest } from "./request";

export const getList = async () =>
  (await catRequest.get("/v1/images/search", { params: { limit: 8 } })) ?? [];
