import { routes } from "../../mod.ts";
import { testRoute, validateSchema } from "../../test_helpers.ts";
import { schema } from "./config.ts";

Deno.test("can validate /api/v1/synchronizer/config route", async () => {
  const res = await testRoute(routes, "/api/v1/synchronizer/config");
  validateSchema(res, schema);
});
