import { getTimeEnties } from "/lib/toggl/index.ts";
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
  getTimeEnties,
};

export default async function request(req: Request) {
  const incomingData = await req.json();
  const { key } = incomingData.account;
  const { filters } = incomingData;
  const { start_date, end_date } = filters ?? {};

  // call the toggl api to get the time entry
  const timeEntries = await getTimeEnties(key, start_date, end_date);

  const finalRes = JSON.stringify({
    items: timeEntries.map((entry) => ({
      ...entry,
      id: entry.id.toString(),
      name: entry.description,
    })),
  });
  console.log(finalRes);
  return new Response(finalRes, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}

//
// Compare this snippet from routes/synchronizer/validate.ts:
// /* Example
// {
//     "repository": {
//         "id": "fibery/apps-gallery",
//         "name": "Fibery Apps Gallery",
//         "url": "
