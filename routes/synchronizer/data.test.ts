import { routes } from "../../mod.ts";
import { testRoute, validateSchema } from "../../test_helpers.ts";
import { schema } from "./data.ts";

Deno.test("can validate /api/v1/synchronizer/data route", async () => {
  const res = await testRoute(routes, "/api/v1/synchronizer/data");
  validateSchema(res, schema);
});
