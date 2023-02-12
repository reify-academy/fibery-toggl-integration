import { testRoute, validateSchema } from "../test_helpers.ts";
import { schema } from "./validate.ts";
import { routes } from "../mod.ts";

Deno.test("can validate /validate route", async () => {
  const res = await testRoute(routes, "/validate");
  validateSchema(res, schema);
});
