import { router, serve, getLogger } from "./deps.ts";
import indexRoute from "./routes/index.ts";
import validateRoute from "./routes/validate.ts";
import synchronizerConfigRoute from "./routes/synchronizer/config.ts";
import synchronizerSchemaRoute from "./routes/synchronizer/schema.ts";
import synchronizerDataRoute from "./routes/synchronizer/data.ts";
import synchronizerDataListRoute from "./routes/synchronizer/datalist.ts";

const logger = getLogger();
function logReqRes(fn: (req: Request) => Response | Promise<Response>) {
  return async (req: Request) => {
    const reqToLog = req.clone();
    logger.info(`Request: ${reqToLog.method} ${reqToLog.url}`);
    logger.info(`Request headers: ${JSON.stringify(reqToLog.headers)}`);
    logger.info(`Request body: ${await reqToLog.text()}`);

    try {
      const res = await fn(req);
      const resToLog = res.clone();
      logger.info(`Response: ${resToLog.status} ${resToLog.statusText}`);
      logger.info(`Response headers: ${JSON.stringify(resToLog.headers)}`);
      logger.info(`Response body: ${await resToLog.text()}`);
      return res;
    } catch (err) {
      console.error(err);
      return new Response("Something went wrong", {
        status: 500,
        headers: {
          "content-type": "text/plain",
        },
      });
    }
  };
}
export const routes = router({
  "/": logReqRes(indexRoute),
  "/validate": logReqRes(validateRoute),
  "/api/v1/synchronizer/config": logReqRes(synchronizerConfigRoute),
  "/api/v1/synchronizer/schema": logReqRes(synchronizerSchemaRoute),
  "/api/v1/synchronizer/data": logReqRes(synchronizerDataRoute),
  "/api/v1/synchronizer/datalist": logReqRes(synchronizerDataListRoute),
});
// if running via deno run serve automatically
// if running via deno test don't serve
if (import.meta.main) {
  serve(routes);
}
