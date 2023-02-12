import { routes } from "../../mod.ts";
import { testRoute, validateSchema } from "../../test_helpers.ts";
import { schema } from "./data.ts";
import * as mod from "https://deno.land/std@0.177.0/dotenv/mod.ts";

export async function setEnv() {
  const config = await mod.load();
  for (const key in config) {
    Deno.env.set(key, config[key]);
  }
}

Deno.test("can validate /api/v1/synchronizer/data route", async () => {
  // load env
  await setEnv();
  const res = await testRoute(routes, "/api/v1/synchronizer/data");
  validateSchema(res, schema);
});
