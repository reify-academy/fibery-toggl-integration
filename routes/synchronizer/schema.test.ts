import { routes } from "../../mod.ts";
import { testRoute, validateSchema } from "../../test_helpers.ts";
import { schema } from "./schema.ts";

Deno.test("can validate /api/v1/synchronizer/schema route", async () => {
  const res = await testRoute(routes, "/api/v1/synchronizer/schema");
  validateSchema(res, schema);
});
