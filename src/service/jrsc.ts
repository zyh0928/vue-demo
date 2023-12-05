import { jrscRequest } from "./request";

// TODO: use api and token to store
export const getContent = async () => {
  if (!localStorage.getItem("jrscToken")) {
    localStorage.setItem(
      "jrscToken",
      (await jrscRequest.get("/token"))?.data ?? "",
    );
  }

  return (await jrscRequest.get("/sentence"))?.data ?? {};
};
