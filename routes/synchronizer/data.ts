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

export default async function request(req: Request) {
  const username = "581e23942e4e751a36db0e73e4d44e53";
  const password = "api_token";

  const encoder = new TextEncoder();
  const data = encoder.encode(`${username}:${password}`);
  const token = btoa(
    new Uint8Array(data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  // const token = "581e23942e4e751a36db0e73e4d44e53:api_token";

  // call the toggl api to get the time entry
  const timeEntry = await fetch(
    "https://api.track.toggl.com/api/v9/me/time_entries",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    }
  )
    .then((resp) => {
      console.log("STATUS", resp.status);
      return resp;
    })
    .then((resp) => resp.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => console.error(err));

  const finalRes = JSON.stringify({
    items: timeEntry.map((entry: any) => ({
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
