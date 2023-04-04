import { addMonths } from "npm:date-fns";

/* example - {"id":2841748647,"workspace_id":7066623,"project_id":null,"task_id":null,"billable":false,"start":"2023-02-12T07:00:00+00:00","stop":"2023-02-12T07:15:00Z","duration":900,"description":"213123312","tags":[],"tag_ids":[],"duronly":true,"at":"2023-02-12T07:00:48+00:00","server_deleted_at":null,"user_id":9174857,"uid":9174857,"wid":7066623}*/
export type TogglTimeEntry = {
  id: number;
  workspace_id: number;
  project_id: number | null;
  task_id: number | null;
  billable: boolean;
  start: string;
  stop: string;
  duration: number;
  description: string;
  tags: string[];
  tag_ids: number[];
  duronly: boolean;
  at: string;
  server_deleted_at: string | null;
  user_id: number;
  uid: number;
  wid: number;
};

export function userDetails(key: string) {
  const token = createAuthToken(key);
  const res = fetch("https://api.track.toggl.com/api/v9/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });
  return handleResponse(res);
}

export function fetchTimeEnties(
  key: string,
  start_date?: string,
  end_date?: string
): Promise<TogglTimeEntry[]> {
  const token = createAuthToken(key);
  const safeStartDate = start_date ?? addMonths(new Date(), -3).toISOString();
  const safeEndDate = end_date ?? new Date().toISOString();
  const url = `https://api.track.toggl.com/api/v9/me/time_entries?start_date=${safeStartDate}&end_date=${safeEndDate}`;
  const response = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });
  return handleResponse(response);
}

export function fetchWorkspaces(key: string) {
  const token = createAuthToken(key);
  const res = fetch("https://api.track.toggl.com/api/v9/me/workspaces", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });
  return handleResponse(res);
}

export function fetchClients(key: string) {
  const token = createAuthToken(key);
  const res = fetch("https://api.track.toggl.com/api/v9/me/clients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });
  return handleResponse(res);
}

export function fetchProjects(key: string) {
  const token = createAuthToken(key);
  const res = fetch("https://api.track.toggl.com/api/v9/me/projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });
  return handleResponse(res);
}

function handleResponse(response: Promise<Response>) {
  return response
    .then((resp) => {
      if ([200, 201, 204].includes(resp.status)) {
        return resp;
      } else {
        throw new Error("Error in request. Responded with:" + resp.status);
      }
    })
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error("ERR:", err);
      throw new Error("Error in request");
    });
}
function createAuthToken(username: string) {
  const password = "api_token";

  const encoder = new TextEncoder();
  const data = encoder.encode(`${username}:${password}`);
  const token = btoa(
    new Uint8Array(data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  return token;
}

export function startTimer(
  key: string,
  args: Record<string, unknown>
): Promise<TogglTimeEntry> {
  const { workspaceId, description } = args;
  const token = createAuthToken(key);
  const now = new Date();
  const now_in_epoch = Math.floor(now.getTime() / 1000);
  const duration = -1 * now_in_epoch;
  const res = fetch(
    `https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({
        duration,
        start: now.toISOString(),
        created_with: "fibery_integration",
        workspace_id: parseInt(workspaceId as string),
        description: description,
      }),
    }
  );
  return handleResponse(res);
}

export function getCurrentTimer(key: string): Promise<TogglTimeEntry> {
  const token = createAuthToken(key);
  const url = "https://api.track.toggl.com/api/v9/me/time_entries/current";
  const response = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });
  return handleResponse(response);
}

export async function stopCurrentTimer(
  key: string,
  { workspaceId }: { workspaceId: string }
): Promise<TogglTimeEntry | null> {
  const currentTimer = await getCurrentTimer(key);
  if (!currentTimer) {
    console.log("No current timer to stop");
    return Promise.resolve(null);
  }
  console.log("Current timer:", currentTimer);
  const token = createAuthToken(key);
  const url = `https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries/${currentTimer.id}/stop`;
  console.log("Stopping timer with:", url);
  const res = fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });
  return handleResponse(res);
}
