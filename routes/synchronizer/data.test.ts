import { routes } from "/mod.ts";
import { testRoute, validateSchema } from "../../test_helpers.ts";
import { schema } from "/routes/synchronizer/data.ts";
import { load } from "/dev_deps.ts";

Deno.test("can validate /api/v1/synchronizer/data route", async () => {
  const config = await load();

  await testRoute(
    routes,
    "/api/v1/synchronizer/data",
    JSON.stringify({
      account: {
        key: config.TOGGL_API_TOKEN,
      },
      requestedType: "time_entry",
    })
  ).then((res) => validateSchema(res, schema));

  await testRoute(
    routes,
    "/api/v1/synchronizer/data",
    JSON.stringify({
      account: {
        key: config.TOGGL_API_TOKEN,
      },
      requestedType: "workspace",
    })
  ).then((res) => validateSchema(res, schema));

  await testRoute(
    routes,
    "/api/v1/synchronizer/data",
    JSON.stringify({
      account: {
        key: config.TOGGL_API_TOKEN,
      },
      requestedType: "client",
    })
  );

  await testRoute(
    routes,
    "/api/v1/synchronizer/data",
    JSON.stringify({
      account: {
        key: config.TOGGL_API_TOKEN,
      },
      requestedType: "project",
    })
  );
});
