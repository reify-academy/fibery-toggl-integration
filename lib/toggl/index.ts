/* example - {"id":2841748647,"workspace_id":7066623,"project_id":null,"task_id":null,"billable":false,"start":"2023-02-12T07:00:00+00:00","stop":"2023-02-12T07:15:00Z","duration":900,"description":"213123312","tags":[],"tag_ids":[],"duronly":true,"at":"2023-02-12T07:00:48+00:00","server_deleted_at":null,"user_id":9174857,"uid":9174857,"wid":7066623}*/
interface TogglTimeEntry {
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
}

export function getTimeEnties(
  key: string,
  start_date: string,
  end_date: string,
): Promise<TogglTimeEntry[]> {
  const token = createAuthToken(key);
  const url = `https://api.track.toggl.com/api/v9/me/time_entries?start_date=${
    start_date ?? "2023-01-01"
  }&end_date=${end_date ?? "2023-12-12"}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  })
    .then((resp) => {
      if ([200, 201, 204].includes(resp.status)) {
        return resp;
      } else {
        throw new Error("Error in fetching time entries");
      }
    })
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error("ERR:", err);
      throw new Error("Error in fetching time entries");
    });
}

function createAuthToken(username: string) {
  const password = "api_token";

  const encoder = new TextEncoder();
  const data = encoder.encode(`${username}:${password}`);
  const token = btoa(
    new Uint8Array(data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      "",
    ),
  );
  return token;
}

export async function fetchWorkspaces(key: string) {
  const token = createAuthToken(key);
  return await fetch("https://api.track.toggl.com/api/v9/workspaces", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  })
    .then((resp) => {
      return resp;
    })
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error(err));
}