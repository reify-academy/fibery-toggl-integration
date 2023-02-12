import { router, serve } from "./deps.ts";
import indexRoute from "./routes/index.ts";
import validateRoute from "./routes/validate.ts";

export const routes = router({
  "/": indexRoute,
  "/validate": validateRoute,
});
// if running via deno run serve automatically
// if running via deno test don't serve
if (import.meta.main) {
  serve(routes);
}
