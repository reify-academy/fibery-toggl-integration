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

export default function request() {
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
