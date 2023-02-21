/*
Response example:

{
    "types:": [
        {"id": "bug", "name": "Bug"},
        {"id": "us", "name": "User Story"},
    ],
    "filters": [
        {
          "id": "modifiedAfter",
          "title": "Modified After",
          "optional": true,
          "type": "datebox"
        }
    ]
}*/

export const schema = {
  type: "object",
  properties: {
    types: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      },
    },
    filters: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          optional: { type: "boolean" },
          type: { type: "string" },
        },
      },
    },
  },
};

export default function request() {
  return new Response(
    JSON.stringify({
      types: [{ id: "time_entry", name: "Time Entry" }],
      filters: [
        {
          id: "start_date",
          type: "datebox",
          title: "From Date",
          optional: true,
        },
        {
          id: "end_date",
          type: "datebox",
          title: "To Date",
          optional: true,
        },
      ],
    }),
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    },
  );
}
