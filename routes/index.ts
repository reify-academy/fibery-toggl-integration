import appConfig from "../app.config.json" assert { type: "json" };
export const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    website: { type: "string" },
    version: { type: "string" },
    description: { type: "string" },
    authentication: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      },
    },
    sources: {
      type: "array",
      items: { type: "object" },
    },
    responsibleFor: {
      type: "object",
      properties: {
        dataSynchronization: { type: "boolean" },
      },
    },
  },
};
export default function request() {
  return new Response(JSON.stringify(appConfig), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
