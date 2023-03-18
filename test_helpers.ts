import { assert, assertArrayIncludes, Handler } from "./dev_deps.ts";
import validate from "./validator.ts";

export const testRoute = async (
  routes: Handler,
  path: string,
  body?: BodyInit,
  expectStatus?: number
) => {
  const options = {
    localAddr: { hostname: "localhost", port: 8080, transport: "tcp" as const },
    remoteAddr: {
      hostname: "localhost",
      port: 8080,
      transport: "tcp" as const,
    },
  };
  const res = await routes(
    new Request("http://localhost:8080" + path, {
      body,
      method: body ? "POST" : "GET",
    }),
    options
  );
  if (expectStatus) {
    assert(res.status === expectStatus);
    return res;
  } else {
    assertArrayIncludes([200, 201, 204], [res.status]);
    return res;
  }
};

export async function validateSchema(
  res: Response,
  schema: Record<string, unknown>
) {
  try {
    const json = await res.json();
    if (json.length && json.length === 0) {
      console.warn("Cheating... no data to validate");
    }
    validate(schema, json);
    return json;
  } catch (e) {
    console.log(e);
    assert(false, "Schema validation failed");
  }
}
