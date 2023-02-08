import { fsRouter, serve } from "./deps.ts";

export const routes = await fsRouter("routes");
// if running via deno run serve automatically
// if running via deno test don't serve
if (import.meta.main) {
  serve(routes);
}
