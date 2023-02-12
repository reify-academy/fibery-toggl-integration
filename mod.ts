import { router, serve } from "./deps.ts";
import indexRoute from "./routes/index.ts";
import validateRoute from "./routes/validate.ts";
import synchronizerConfigRoute from "./routes/synchronizer/config.ts";

export const routes = router({
  "/": indexRoute,
  "/validate": validateRoute,
  "/api/v1/synchronizer/config": synchronizerConfigRoute,
});
// if running via deno run serve automatically
// if running via deno test don't serve
if (import.meta.main) {
  serve(routes);
}
