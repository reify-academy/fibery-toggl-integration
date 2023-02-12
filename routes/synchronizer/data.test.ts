import { routes } from "../../mod.ts";
import { testRoute, validateSchema } from "../../test_helpers.ts";
import { schema } from "./data.ts";
import { load } from "../../dev_deps.ts";

Deno.test("can validate /api/v1/synchronizer/data route", async () => {
  const config = await load();

  const res = await testRoute(
    routes,
    "/api/v1/synchronizer/data",
    JSON.stringify({
      account: {
        key: config.TOGGL_API_TOKEN,
      },
    })
  );
  validateSchema(res, schema);
});
