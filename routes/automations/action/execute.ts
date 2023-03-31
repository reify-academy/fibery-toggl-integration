/* 
POST /api/v1/automations/action/execute
Executes specific action with specified parameters. In case of success response just return empty object with success status code
Request body sample:

{
  "action": {
    "action": "create-pull-request",
    "args": {
      "repo": "me/my-repo",
      "name": "new-branch-name",
      "ref": "main"
    }
  },
  "account": {
    "username": "test_user",
    "password": "test$user!"
  }
}
Success response:

{}
Failure response:

{
  "message": "Pull request with specified name exists."
}
*/
import { startTimer, stopCurrentTimer } from "/lib/toggl/index.ts";
export const schema = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};
export const _internals = {
  startTimer,
  stopCurrentTimer,
};

export default async function request(req: Request) {
  const incomingData = await req.json();
  const { action, account } = incomingData;

  const { key } = account;
  const { action: actionName, args } = action;
  try {
    switch (actionName) {
      case "start-toggl-timer": {
        // tags is a string with comma separated values
        const startTimerArgs = { ...args };
        if (args.tags) {
          const tags = args.tags.split(",");
          startTimerArgs.tags = tags;
        }
        await _internals.startTimer(key, startTimerArgs);
        return new Response(JSON.stringify({}), {
          status: 200,
        });
      }
      case "stop-toggl-timer": {
        // if there is no timer running, just return success
        await _internals.stopCurrentTimer(key, args);
        return new Response(JSON.stringify({}), {
          status: 200,
        });
      }
      default: {
        const response = {
          message: `Invalid action requested ${actionName}`,
        };
        return new Response(JSON.stringify(response), {
          status: 400,
        });
      }
    }
  } catch (e) {
    console.error(
      "Error occured during trying to perform an action on timer",
      e
    );
    console.error(JSON.stringify(action));
    const response = {
      message: `Error occured during trying to perform an action on timer. Please, contact developers of fibery toggl integration for further assistance.`,
    };
    return new Response(JSON.stringify(response), {
      status: 500,
    });
  }
}
