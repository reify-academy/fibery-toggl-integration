import { assert, assertEquals } from "../dev_deps.ts";
import { routes } from "../mod.ts";
import { testRoute } from "../test_helpers.ts";
import validate from "../validator.ts";
import { schema } from "./index.ts";

// import { fsRouter } from "./deps.ts";

Deno.test("can validate index route", async () => {
  const res = await testRoute(routes, "/");
  try {
    validate(schema, await res.json());
  } catch (e) {
    console.log(e);
    assert(false, "Schema validation failed");
  }
});
