import { testRoute, validateSchema } from "../test_helpers.ts";
import { schema } from "./validate.ts";
import { routes } from "../mod.ts";
import { load } from "/dev_deps.ts";

Deno.test("can validate /validate route", async () => {
  const config = await load();
  const res = await testRoute(
    routes,
    "/validate",
    JSON.stringify({
      id: "key",
      fields: {
        auth: "key",
        key: config.TOGGL_API_TOKEN,
      },
    })
  );
  validateSchema(res, schema);
});
