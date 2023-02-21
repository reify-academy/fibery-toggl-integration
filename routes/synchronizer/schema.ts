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
    type: "text",
    subType: "boolean",
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
    type: "text",
    subType: "boolean",
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
    type: "date",
    nullable: true,
    name: "Deleted At",
  },
  start: {
    description: "Start time in UTC",
    type: "date",
    name: "Start Time(UTC)",
  },
  stop: {
    description:
      'Stop time in UTC, can be null if it\'s still running or created with "duration" and "duronly" fields',
    type: "date",
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
  user_id: {
    type: "number",
    name: "User ID",
    description: "Time Entry creator ID",
  },
};
/* example - {"id":7066623,"organization_id":7038805,"name":"Maxim's workspace","profile":102,"premium":true,"business_ws":true,"admin":true,"suspended_at":null,"server_deleted_at":null,"default_hourly_rate":null,"rate_last_updated":null,"default_currency":"USD","only_admins_may_create_projects":false,"only_admins_may_create_tags":false,"only_admins_see_billable_rates":false,"only_admins_see_team_dashboard":false,"projects_billable_by_default":true,"reports_collapse":true,"rounding":1,"rounding_minutes":0,"at":"2023-02-12T06:31:23+00:00","logo_url":"https:\/\/assets.toggl.com\/images\/workspace.jpg","ical_url":"\/ical\/workspace_user\/e6a9782c38943bb010ce33f9b504e8fb","ical_enabled":true,"csv_upload":null,"subscription":null,"te_constraints":{}} */
const workspaceEntrySchema = {
  id: {
    description: "Workspace ID",
    type: "ID",
    name: "Id",
  },
  name: {
    description: "Workspace name",
    type: "text",
    name: "Name",
  },
  at: {
    description: "When was last updated",
    type: "date",
    name: "Last Updated",
  },
  logo_url: {
    description: "Workspace logo URL",
    type: "text",
    name: "Logo URL",
  },
  ical_url: {
    description: "Workspace iCal URL",
    type: "text",
    name: "iCal URL",
  },
  ical_enabled: {
    description: "Whether iCal is enabled for the workspace",
    type: "text",
    subType: "boolean",
    name: "iCal Enabled",
  },
  premium: {
    description: "Whether the workspace is premium",
    type: "text",
    subType: "boolean",
    name: "Premium",
  },
  admin: {
    description: "Whether the workspace is admin",
    type: "text",
    subType: "boolean",
    name: "Admin",
  },
  suspended_at: {
    description: "When was suspended, null if not suspended",
    type: "date",
    nullable: true,
    name: "Suspended At",
  },
  server_deleted_at: {
    description: "When was deleted, null if not deleted",
    type: "date",
    nullable: true,
    name: "Deleted At",
  },
  default_hourly_rate: {
    description:
      "Default hourly rate for the workspace, null if not provided at creation",
    type: "number",
    nullable: true,
    name: "Default Hourly Rate",
  },
  default_currency: {
    description: "Default currency for the workspace",
    type: "text",
    name: "Default Currency",
  },
};

/* example {"id":61963396,"wid":7066623,"archived":false,"name":"Test client","at":"2023-02-21T03:32:41+00:00"} */
const clientEntrySchema = {
  id: {
    description: "Client ID",
    type: "ID",
    name: "Id",
  },
  wid: {
    description: "Workspace ID",
    type: "number",
    name: "Workspace ID",
  },
  name: {
    description: "Client name",
    type: "text",
    name: "Name",
  },
  at: {
    description: "When was last updated",
    type: "date",
    name: "Last Updated",
  },
  archived: {
    description: "Whether the client is archived",
    type: "text",
    subType: "boolean",
    name: "Archived",
  },
};
/* example - {"id":189861405,"workspace_id":7066623,"client_id":null,"name":"A prject","is_private":true,"active":true,"at":"2023-02-21T03:55:35+00:00","created_at":"2023-02-21T03:55:35+00:00","server_deleted_at":null,"color":"#990099","billable":true,"template":false,"auto_estimates":false,"estimated_hours":null,"rate":null,"rate_last_updated":null,"currency":"USD","recurring":false,"recurring_parameters":null,"current_period":null,"fixed_fee":null,"actual_hours":0,"wid":7066623,"cid":null} */
export const projectEntrySchema = {
  id: {
    description: "Project ID",
    type: "ID",
    name: "Id",
  },
  name: {
    description: "Project name",
    type: "text",
    name: "Name",
  },
  at: {
    description: "When was last updated",
    type: "date",
    name: "Last Updated",
  },
  archived: {
    description: "Whether the project is archived",
    type: "text",
    subType: "boolean",
    name: "Archived",
  },
  wid: {
    description: "Workspace ID",
    type: "number",
    name: "Workspace ID",
  },
  cid: {
    description: "Client ID",
    type: "number",
    name: "Client ID",
  },
  active: {
    description: "Whether the project is active",
    type: "text",
    subType: "boolean",
    name: "Active",
  },
  is_private: {
    description: "Whether the project is private",
    type: "text",
    subType: "boolean",
    name: "Private",
  },
  billable: {
    description: "Whether the project is billable",
    type: "text",
    subType: "boolean",
    name: "Billable",
  },
  color: {
    description: "Project color",
    type: "text",
    name: "Color",
  },
  template: {
    description: "Whether the project is a template",
    type: "text",
    subType: "boolean",
    name: "Template",
  },
  auto_estimates: {
    description: "Whether the project has auto estimates",
    type: "text",
    subType: "boolean",
    name: "Auto Estimates",
  },
  estimated_hours: {
    description: "Estimated hours for the project",
    type: "number",
    nullable: true,
    name: "Estimated Hours",
  },
  rate: {
    description: "Rate for the project",
    type: "number",
    nullable: true,
    name: "Rate",
  },
  currency: {
    description: "Currency for the project",
    type: "text",
    name: "Currency",
  },
  recurring: {
    description: "Whether the project is recurring",
    type: "text",
    subType: "boolean",
    name: "Recurring",
  },
  recurring_parameters: {
    description: "Recurring parameters",
    type: "text",
    nullable: true,
    name: "Recurring Parameters",
  },
  current_period: {
    description: "Current period",
    type: "text",
    nullable: true,
    name: "Current Period",
  },
  fixed_fee: {
    description: "Fixed fee for the project",
    type: "number",
    nullable: true,
    name: "Fixed Fee",
  },
  actual_hours: {
    description: "Actual hours for the project",
    type: "number",
    nullable: true,
    name: "Actual Hours",
  },
};

export default function request() {
  return new Response(
    JSON.stringify({
      time_entry: timeEntrySchema,
      workspace: workspaceEntrySchema,
      client: clientEntrySchema,
      project: projectEntrySchema,
    }),
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
