import {
  fetchTimeEnties,
  startTimer,
  getCurrentTimer,
  stopCurrentTimer,
} from "/lib/toggl/index.ts";
import { assert, assertEquals, load } from "/dev_deps.ts";
import { addDays } from "npm:date-fns";

Deno.test("fetchTimeEnties", async () => {
  const config = await load();

  const result = await fetchTimeEnties(
    config.TOGGL_API_TOKEN,
    addDays(new Date(), -14).toISOString(),
    new Date().toISOString()
  );

  assert(result.length > 0);
});

Deno.test("startTimer", async () => {
  const config = await load();

  const result = await startTimer(config.TOGGL_API_TOKEN, {
    workspaceId: config.TOGGL_WORKSPACE_ID,
    description: "test description",
  });

  assert(result.id > 0);

  // Finally, stop the timer
  await stopCurrentTimer(config.TOGGL_API_TOKEN, config.TOGGL_WORKSPACE_ID);
});

Deno.test("stopCurrentTimer", async () => {
  const config = await load();

  // First, start a new timer
  const description = "test description";
  await startTimer(config.TOGGL_API_TOKEN, {
    workspaceId: config.TOGGL_WORKSPACE_ID,
    description,
  });

  // Then, stop the current timer
  const res = await stopCurrentTimer(
    config.TOGGL_API_TOKEN,
    config.TOGGL_WORKSPACE_ID
  );

  // Finally, check that the timer is stopped
  assert(new Date(res.stop) < new Date());
});

Deno.test("getCurrentTimer", async () => {
  const config = await load();

  // First, start a new timer
  const description = "test description";
  const entry = await startTimer(config.TOGGL_API_TOKEN, {
    workspaceId: config.TOGGL_WORKSPACE_ID,
    description,
  });

  // Then, get the current timer
  const currentTimer = await getCurrentTimer(config.TOGGL_API_TOKEN);

  assertEquals(currentTimer.id, entry.id);
  assertEquals(currentTimer.description, description);

  // Finally, stop the timer
  await stopCurrentTimer(config.TOGGL_API_TOKEN, config.TOGGL_WORKSPACE_ID);
});
