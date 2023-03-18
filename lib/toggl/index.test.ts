import { fetchTimeEnties } from "/lib/toggl/index.ts";
import { assert, load } from "/dev_deps.ts";
import { addDays } from "npm:date-fns";

Deno.test("fetchTimeEnties", async () => {
  const config = await load();

  console.log(config);

  const result = await fetchTimeEnties(
    config.TOGGL_API_TOKEN,
    addDays(new Date(), -14).toISOString(),
    new Date().toISOString()
  );

  assert(result.length > 0);
});
