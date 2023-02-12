/* Example
{
  "repository": {
    "id": {
      "type": "id",
      "name": "Id"
    },
    "name": {
      "type": "text",
      "name": "Name"
    },
    "url": {
      "type": "text",
      "name": "Original URL",
      "subType": "url"
    } 
  }
}
*/

export const schema = {
  type: "object",
  patternProperties: {
    "^.*$": {
      type: "object",
      patternProperties: {
        "^.*$": {
          type: "object",
          properties: {
            id: { type: "string" },
            ignore: { type: "boolean" },
            name: { type: "string" },
            description: { type: "string" },
            readonly: { type: "boolean" },
            type: { type: "string" },
            relation: { type: "string" },
            subType: { type: "string" },
          },
          required: ["name", "type"],
        },
      },
    },
  },
};
// time_entry is based on schema of toggl time entry
/*
{
        "at": {
            "description": "When was last updated",
            "type": "string"
        },
        "billable": {
            "description": "Whether the time entry is marked as billable",
            "type": "boolean"
        },
        "description": {
            "description": "Time Entry description, null if not provided at creation/update",
            "type": "string",
            "nullable": true
        },
        "duration": {
            "description": "Time entry duration. For running entries should be -1 * (Unix start time)",
            "type": "integer"
        },
        "duronly": {
            "description": "Used to create a TE with a duration but without a stop time, this field is deprecated for GET endpoints where the value will always be true.",
            "type": "boolean"
        },
        "id": {
            "description": "Time Entry ID",
            "type": "integer"
        },
        "pid": {
            "description": "Project ID, legacy field",
            "type": "integer"
        },
        "project_id": {
            "description": "Project ID. Can be null if project was not provided or project was later deleted",
            "type": "integer",
            "nullable": true
        },
        "server_deleted_at": {
            "description": "When was deleted, null if not deleted",
            "type": "string",
            "nullable": true
        },
        "start": {
            "description": "Start time in UTC",
            "type": "string"
        },
        "stop": {
            "description": "Stop time in UTC, can be null if it's still running or created with \"duration\" and \"duronly\" fields",
            "type": "string"
        },
        "tag_ids": {
            "description": "Tag IDs, null if tags were not provided or were later deleted",
            "type": [
                "integer"
            ]
        },
        "tags": {
            "description": "Tag names, null if tags were not provided or were later deleted",
            "type": [
                "string"
            ]
        },
        "task_id": {
            "description": "Task ID. Can be null if task was not provided or project was later deleted",
            "type": "integer",
            "nullable": true
        },
        "tid": {
            "description": "Task ID, legacy field",
            "type": "integer"
        },
        "uid": {
            "description": "Time Entry creator ID, legacy field",
            "type": "integer"
        },
        "user_id": {
            "description": "Time Entry creator ID",
            "type": "integer"
        },
        "wid": {
            "description": "Workspace ID, legacy field",
            "type": "integer"
        },
        "workspace_id": {
            "description": "Workspace ID",
            "type": "integer"
        }
    } 
*/
const timeEntrySchema = {
  at: {
    description: "When was last updated",
    type: "text",
    name: "Last Updated",
  },
  billable: {
    description: "Whether the time entry is marked as billable",
    type: "bool",
    name: "Billable",
  },
  description: {
    description:
      "Time Entry description, null if not provided at creation/update",
    type: "text",
    nullable: true,
    name: "Description",
  },
  duration: {
    description:
      "Time entry duration. For running entries should be -1 * (Unix start time)",
    type: "number",
    name: "Duration",
  },
  duronly: {
    description:
      "Used to create a TE with a duration but without a stop time, this field is deprecated for GET endpoints where the value will always be true.",
    type: "bool",
    name: "Duration Only",
  },
  id: {
    description: "Time Entry ID",
    type: "ID",
    name: "Id",
  },
  name: {
    description: "Time Entry name",
    type: "text",
    name: "Name",
  },
  // project_id: {
  //   description:
  //     "Project ID. Can be null if project was not provided or project was later deleted",
  //   type: "integer",
  //   nullable: true,
  //   name: "Project ID",
  // },
  server_deleted_at: {
    description: "When was deleted, null if not deleted",
    type: "string",
    nullable: true,
    name: "Deleted At",
  },
  start: {
    description: "Start time in UTC",
    type: "string",
    name: "Start Time(UTC)",
  },
  stop: {
    description:
      'Stop time in UTC, can be null if it\'s still running or created with "duration" and "duronly" fields',
    type: "string",
    name: "Stop time(UTC)",
  },
  // tag_ids: {
  //   description:
  //     "Tag IDs, null if tags were not provided or were later deleted",
  //   type: ["integer"],
  // },
  // tags: {
  //   description:
  //     "Tag names, null if tags were not provided or were later deleted",
  //   type: ["string"],
  // },
  // task_id: {
  //   description:
  //     "Task ID. Can be null if task was not provided or project was later deleted",
  //   type: "Id",
  //   nullable: true,
  //   name: "ID",
  // },
  // user_id: {
  //   description: "Time Entry creator ID",
  // },
};

export default function request() {
  return new Response(
    JSON.stringify({
      time_entry: timeEntrySchema,
    }),
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
