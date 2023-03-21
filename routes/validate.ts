import { userDetails } from "../lib/toggl/index.ts";

// example {"name": "Awesome Account"}
export const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};

export default async function request(req: Request) {
  const incomingData = await req.json();
  const { key } = incomingData.account;
  const user = await userDetails(key);

  return new Response(JSON.stringify({ name: user.fullname || user.email }), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
