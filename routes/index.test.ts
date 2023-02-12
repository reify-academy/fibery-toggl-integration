import { routes } from "../mod.ts";
import { testRoute, validateSchema } from "../test_helpers.ts";
import { schema } from "./index.ts";

Deno.test("can validate index route", async () => {
  const res = await testRoute(routes, "/");
  validateSchema(res, schema);
});
