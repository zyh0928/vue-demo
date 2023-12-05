import { dogRequest } from "./request";

// TODO: change api url
export const getList = async () =>
  (await dogRequest.get("/shibes", { params: { count: 20 } })) ?? [];
