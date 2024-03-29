import { routes } from "/mod.ts";
import { testRoute, validateSchema } from "/test_helpers.ts";
import { schema, _internals } from "/routes/automations/action/execute.ts";
import { assert, assertEquals, load } from "/dev_deps.ts";
import { TogglTimeEntry } from "/lib/toggl/index.ts";

Deno.test("can start timer", async () => {
  const config = await load();

  let timerKey, timerArgs;
  _internals.startTimer = (key, args) => {
    timerKey = key;
    timerArgs = args;
    return Promise.resolve({} as TogglTimeEntry);
  };

  await testRoute(
    routes,
    "/api/v1/automations/action/execute",
    JSON.stringify({
      account: {
        key: config.TOGGL_API_TOKEN,
      },
      action: {
        action: "start-toggl-timer",
        args: {
          workspaceId: "123",
          description: "test description",
          projectId: "123",
          tags: "test,tag",
        },
      },
    })
  ).then((res) => validateSchema(res, schema));

  assertEquals(timerKey, config.TOGGL_API_TOKEN);
  assertEquals(timerArgs, {
    workspaceId: "123",
    description: "test description",
    projectId: "123",
    tags: ["test", "tag"],
  });
});
Deno.test(
  "can validate /api/v1/automations/action/execute route for stop-toggl-timer action",
  async () => {
    const config = await load();

    _internals.stopCurrentTimer = () =>
      Promise.resolve({
        id: 123,
        description: "test description",
        duration: 0,
      } as TogglTimeEntry);

    await testRoute(
      routes,
      "/api/v1/automations/action/execute",
      JSON.stringify({
        account: {
          key: config.TOGGL_API_TOKEN,
        },
        action: {
          action: "stop-toggl-timer",
          args: {
            workspaceId: "123",
          },
        },
      })
    ).then((res) => validateSchema(res, schema));
  }
);

Deno.test("it returns error to user when action is not supported", async () => {
  const res = await testRoute(
    routes,
    "/api/v1/automations/action/execute",
    JSON.stringify({
      account: {
        key: "123",
      },
      action: {
        action: "not-supported-action",
        args: {
          workspaceId: "123",
          description: "test description",
        },
      },
    }),
    400
  ).then((res) => validateSchema(res, schema));

  assert(res.message, "Invalid action requested not-supported-action");
});

Deno.test("returns errors when fail to start timer", async () => {
  const config = await load();

  _internals.startTimer = () =>
    Promise.reject(new Error("Something happened inside startTogglTimer"));

  const res = await testRoute(
    routes,
    "/api/v1/automations/action/execute",
    JSON.stringify({
      account: {
        key: config.TOGGL_API_TOKEN,
      },
      action: {
        action: "start-toggl-timer",
        args: {
          workspaceId: "123",
          description: "test description",
        },
      },
    }),
    500
  ).then((res) => validateSchema(res, schema));

  assert(res.message.includes("Error occured"));
});
