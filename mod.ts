import { router, serve } from "./deps.ts";

export const routes = router({
  "/": () => new Response("hello world!"),
});
// if running via deno run serve automatically
// if running via deno test don't serve
if (import.meta.main) {
  serve(routes);
}
