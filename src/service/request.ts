import { extend } from "umi-request";

const timeout = 1000 * 15;

const env = import.meta.env;

const catRequest = extend({
  prefix: env.DEMO_CAT_API,
  timeout,
});

const corsRequest = extend({
  prefix: "https://corsproxy.io/?",
  timeout,
});

const dogRequest = extend({
  prefix: env.DEMO_DOG_API,
  timeout,
});

const girlRequest = extend({
  prefix: env.DEMO_GIRL_API,
  timeout,
});

const jrscRequest = extend({
  headers: {
    "X-User-Token": localStorage.getItem("jrscToken") ?? "",
  },
  prefix: env.DEMO_JRSC_API,
  timeout,
});

export { catRequest, corsRequest, dogRequest, girlRequest, jrscRequest };
