import { routes } from "/mod.ts";
import { testRoute, validateSchema } from "../../test_helpers.ts";
import { schema } from "/routes/synchronizer/data.ts";
import { assertExists, load } from "/dev_deps.ts";

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

  const projectRes = await testRoute(
    routes,
    "/api/v1/synchronizer/data",
    JSON.stringify({
      account: {
        key: config.TOGGL_API_TOKEN,
      },
      requestedType: "project",
    })
  ).then((res) => res.json());

  assertExists(
    projectRes.items[0].project_id,
    "Project id should be specified"
  );
});
