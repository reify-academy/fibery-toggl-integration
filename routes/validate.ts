// example {"name": "Awesome Account"}
export const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};

export default function request() {
  return new Response(JSON.stringify({ name: "Test Toggl Account" }), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
