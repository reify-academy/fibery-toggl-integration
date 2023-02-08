import { assertEquals } from "./dev_deps.ts";
import { routes } from "./mod.ts";
import { testRoute } from "./test_helpers.ts";

// import { fsRouter } from "./deps.ts";

Deno.test("can get index route", async () => {
  // const routes = await fsRouter("routes");
  const res = await testRoute(routes, "/");
  assertEquals(res.status, 200);
  assertEquals(await res.text(), "hello world!");
});
