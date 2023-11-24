import { dogRequest } from "./request";

export const getList = async () =>
  (await dogRequest.get("/shibes", { params: { count: 20 } })) ?? [];
