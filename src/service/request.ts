import { extend } from "umi-request";

const timeout = 1000 * 15;

const catRequest = extend({
  prefix: import.meta.env.DEMO_CAT_API,
  timeout,
});

const dogRequest = extend({
  prefix: import.meta.env.DEMO_DOG_API,
  timeout,
});

const girlRequest = extend({
  prefix: import.meta.env.DEMO_GIRL_API,
  timeout,
});

const jrscRequest = extend({
  headers: {
    "X-User-Token": localStorage.getItem("jrscToken") ?? "",
  },
  prefix: import.meta.env.DEMO_JRSC_API,
  timeout,
});

export { catRequest, dogRequest, girlRequest, jrscRequest };
