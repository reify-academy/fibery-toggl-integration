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
  required: ["items", "pagination", "synchronizationType"],
};

export default async function request() {
  const username = "maxim@reify.academy";
  const password = Deno.env.get("TOGGL_USER_PASS")!;

  const encoder = new TextEncoder();
  const data = encoder.encode(`${username}:${password}`);
  const token = btoa(
    new Uint8Array(data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  // console.log(base64);
  // const token = toUint8Array();
  // console.log(token);
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
    })
    .catch((err) => console.error(err));

  return new Response(
    JSON.stringify({
      items: [
        {
          id: "PR_1231",
          name: "Improve performance",
        },
        {
          id: "PR_1232",
          name: "Fix bugs",
        },
      ],
      pagination: {
        hasNext: false,
      },
      synchronizationType: "full",
    }),
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
//
// Compare this snippet from routes/synchronizer/validate.ts:
// /* Example
// {
//     "repository": {
//         "id": "fibery/apps-gallery",
//         "name": "Fibery Apps Gallery",
//         "url": "
