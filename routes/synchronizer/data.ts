import {
  fetchClients,
  fetchProjects,
  fetchTimeEnties,
  fetchWorkspaces,
} from "/lib/toggl/index.ts";
/* Example
{
    "items": [
        {
            "id": "PR_1231",
            "name": "Improve performance"
        },
        {
            "id": "PR_1232",
            "name": "Fix bugs"
        }
    ],
    "pagination": {
        "hasNext": true,
        "nextPageConfig": {
            "repositories": ["fibery/apps-gallery"]
        }
    },
    "synchronizationType": "full"
}
*/
export const schema = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      },
    },
    pagination: {
      type: "object",
      properties: {
        hasNext: { type: "boolean" },
        nextPageConfig: { type: "object" },
      },
    },
    synchronizationType: {
      type: "string",
    },
  },
  required: ["items"],
};

export const internals = {
  fetchTimeEnties,
};

export default async function request(req: Request) {
  const incomingData = await req.json();
  const { key } = incomingData.account;
  const { filters } = incomingData;
  const { start_date, end_date } = filters ?? {};
  switch (incomingData.requestedType) {
    case "time_entry":
      // call the toggl api to get the time entry
      return await getTimeEntries(key, start_date, end_date);
    case "workspace":
      return await getWorkspaces(key);
    case "client":
      return await getClients(key);
    case "project":
      return await getProjects(key);
    default:
      return new Response(
        `Invalid type requested ${incomingData.requestedType}`,
        {
          status: 404,
        }
      );
  }
}

async function getClients(key: string) {
  const clients = await fetchClients(key);

  const finalRes = JSON.stringify({
    items: clients,
  });
  return new Response(finalRes, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
async function getWorkspaces(key: string) {
  const workspaces = await fetchWorkspaces(key);

  const finalRes = JSON.stringify({
    items: workspaces.map((workspace: { id: number }) => ({
      ...workspace,
      id: workspace.id.toString(),
      workspaceId: workspace.id.toString(),
    })),
  });
  return new Response(finalRes, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}

async function getTimeEntries(
  key: string,
  start_date: string,
  end_date: string
) {
  const timeEntries = await fetchTimeEnties(key, start_date, end_date);

  const finalRes = JSON.stringify({
    items: timeEntries.map((entry) => ({
      ...entry,
      id: entry.id.toString(),
      name: entry.description || "Untitled",
    })),
  });

  return new Response(finalRes, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}

async function getProjects(key: string) {
  const projects = await fetchProjects(key);
  const finalRes = JSON.stringify({
    items: projects,
  });
  return new Response(finalRes, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
