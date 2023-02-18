import appConfig from "../app.config.json" assert { type: "json" };
/*
Action
Action model has the following structure:

Name	Type	Description	Required	Example
action	string	Identity of action	true	"Give the id for action"
name	string	Name of action	true	"Give the name for action"
description	string	Description of action	false	"Give the description for action"
args	Array	Action arguments	true	[]

Action Argument
Action argument model has the following structure:

Name	Type	Description	Required	Example
id	string	Identity of arg	true	"Give the id for argument"
name	string	Name of arg	true	"Give the name for argument"
description	string	Description of arg	false	"Give the description for argument"
type	string	Type of arg	true	Currently support text and textArea
textTemplateSupported	boolean	Whether templating is supported	false	true or false
*/
export const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
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
        automation: { type: "boolean" },
      },
    },
    actions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          args: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                description: { type: "string" },
                type: { type: "string" },
                textTemplateSupported: { type: "boolean" },
              },
              required: ["id", "name", "type"],
            },
          },
        },
        required: ["name", "description", "args"],
      },
    },
  },
  required: [
    "name",
    "version",
    "description",
    "authentication",
    "sources",
    "responsibleFor",
  ],
};
export default function request() {
  return new Response(JSON.stringify(appConfig), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
